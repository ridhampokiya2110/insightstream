"use client"

import * as React from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { BrainCircuit, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { runPrioritizationAction } from "@/app/actions"
import type { PrioritizedFeaturesOutput } from "@/ai/flows/prioritize-features"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"

const featureSchema = z.object({
  name: z.string().min(1, "Feature name is required."),
  description: z.string().min(1, "Description is required."),
  reach: z.coerce.number().min(1, "Reach must be a positive number."),
  impact: z.coerce.number().min(1).max(10, "Impact must be between 1 and 10."),
  confidence: z.coerce
    .number()
    .min(1)
    .max(10, "Confidence must be between 1 and 10."),
  effort: z.coerce.number().min(1).max(10, "Effort must be between 1 and 10."),
})

const formSchema = z.object({
  keyMetrics: z
    .string()
    .min(10, "Please describe your key metrics in more detail."),
  features: z.array(featureSchema).min(1, "Please add at least one feature."),
})

type FormValues = z.infer<typeof formSchema>

export default function PrioritizationPage() {
  const [isPending, startTransition] = React.useTransition()
  const [result, setResult] =
    React.useState<PrioritizedFeaturesOutput | null>(null)
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyMetrics: "Our primary focus for this quarter is to increase user conversion rates by 15%, boost average order value (AOV) by 20%, and grow our monthly active user base in regional markets.",
      features: [
        {
          name: "Integrate Regional Payment Methods",
          description: "Add UPI and major digital wallets (Paytm, PhonePe) to the checkout process. This is critical for the Indian market where these methods are preferred and will likely reduce cart abandonment.",
          reach: 150000,
          impact: 9,
          confidence: 9,
          effort: 4,
        },
        {
          name: "AI-Powered 'Shop the Look'",
          description: "Develop an AI feature that suggests complementary products based on an item a user is viewing. For example, show matching accessories for a dress. This aims to directly increase AOV.",
          reach: 500000,
          impact: 8,
          confidence: 7,
          effort: 8,
        },
        {
            name: "Vernacular Language Support",
            description: "Translate the app interface and product descriptions into Hindi, Tamil, and Bengali to better penetrate regional markets and improve user experience for a large segment of our audience.",
            reach: 250000,
            impact: 7,
            confidence: 8,
            effort: 6,
        },
        {
            name: "Seller Performance Dashboard",
            description: "Create a new analytics dashboard for our sellers to track their sales, view top-performing products, and understand customer feedback. This is key to seller retention.",
            reach: 15000,
            impact: 6,
            confidence: 9,
            effort: 7,
        },
        {
            name: "Video Product Reviews",
            description: "Allow customers to upload short video reviews for products. User-generated content builds trust and has been shown to increase conversion rates.",
            reach: 400000,
            impact: 7,
            confidence: 6,
            effort: 9,
        }
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features",
  })

  const onSubmit = (data: FormValues) => {
    startTransition(async () => {
      setResult(null)
      try {
        const response = await runPrioritizationAction(data)
        setResult(response)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "An error occurred",
          description:
            error instanceof Error ? error.message : String(error),
        })
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">AI Feature Prioritization</h1>
        <p className="text-muted-foreground">
          Let AI help you decide what to build next using the RICE scoring model.
        </p>
      </div>
      
      <Alert>
        <BrainCircuit className="h-4 w-4" />
        <AlertTitle>How does this work?</AlertTitle>
        <AlertDescription>
          This tool uses a Genkit AI flow to analyze your proposed features. The AI considers each feature's **R**each, **I**mpact, and your **C**onfidence in those estimates, then weighs them against the **E**ffort required. It generates a priority score and explains its reasoning, all in the context of the **Key Metrics** you provide.
        </AlertDescription>
      </Alert>


      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Input Features</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="keyMetrics"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Key Metrics & Business Goals</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Increase user conversion rates, improve retention, boost revenue..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Describe the main objectives you want to achieve with these features.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <h3 className="text-lg font-medium">Features to Prioritize</h3>
                  <div className="mt-4 space-y-4">
                    {fields.map((field, index) => (
                      <Card key={field.id} className="p-4 relative bg-muted/20">
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name={`features.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Feature Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., One-Click Checkout" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`features.${index}.description`}
                            render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Brief Description</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="What is this feature and why is it important?" {...field} rows={3} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`features.${index}.reach`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Monthly Reach</FormLabel>
                                  <FormControl>
                                    <Input type="number" placeholder="How many users?" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`features.${index}.impact`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Impact (1-10)</FormLabel>
                                  <FormControl>
                                    <Input type="number" placeholder="How much impact?" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`features.${index}.confidence`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Confidence (1-10)</FormLabel>
                                  <FormControl>
                                    <Input type="number" placeholder="How sure are you?" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`features.${index}.effort`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Effort (1-10)</FormLabel>
                                  <FormControl>
                                    <Input type="number" placeholder="How much work?" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </Card>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() =>
                      append({
                        name: "",
                        description: "",
                        reach: 1,
                        impact: 5,
                        confidence: 5,
                        effort: 5,
                      })
                    }
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Another Feature
                  </Button>
                </div>

                <Button type="submit" disabled={isPending} className="w-full text-base py-6">
                  {isPending ? "Prioritizing with AI..." : "Run AI Prioritization"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Prioritization Results</CardTitle>
          </CardHeader>
          <CardContent>
            {isPending && (
              <div className="space-y-4 pt-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            )}
            {result ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Feature</TableHead>
                    <TableHead className="text-right w-[100px]">Priority Score</TableHead>
                    <TableHead>AI Rationale</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.prioritizedFeatures.map((feature, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{feature.name}</TableCell>
                      <TableCell className="text-right font-bold text-2xl text-primary">{feature.priorityScore}</TableCell>
                      <TableCell className="text-muted-foreground">{feature.rationale}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              !isPending && (
              <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg h-full">
                <BrainCircuit className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">Your insights are waiting</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Fill in your features and metrics, then click the button to see the AI's analysis here.
                </p>
              </div>
              )
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

    
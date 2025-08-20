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
  reach: z.coerce.number().min(0, "Reach must be a positive number."),
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
    React.useState<PrioritizeFeaturesOutput | null>(null)
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyMetrics: "Increase user conversion rates and monthly recurring revenue (MRR).",
      features: [
        {
          name: "Integrate Regional Payment Methods",
          description: "Add GrabPay and GoPay to checkout for SEA market.",
          reach: 50000,
          impact: 9,
          confidence: 8,
          effort: 5,
        },
        {
          name: "Revamp Search Algorithm",
          description: "Improve product search relevance using machine learning.",
          reach: 250000,
          impact: 7,
          confidence: 6,
          effort: 9,
        },
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
          Use AI to prioritize your product features based on RICE scoring and your key metrics.
        </p>
      </div>
      
      <Alert>
        <BrainCircuit className="h-4 w-4" />
        <AlertTitle>How it works</AlertTitle>
        <AlertDescription>
          The AI calculates a priority score for each feature based on its Reach, Impact, Confidence, and Effort relative to your Key Metrics, providing a data-driven rationale for its suggestions.
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
                      <FormLabel>Key Metrics</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Increase user conversion rates, improve retention, boost revenue..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        What business goals are you trying to achieve?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>Features</FormLabel>
                  <div className="mt-2 space-y-4">
                    {fields.map((field, index) => (
                      <Card key={field.id} className="p-4 relative">
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name={`features.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="sr-only">Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Feature Name" {...field} />
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
                                 <FormLabel className="sr-only">Description</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="Description" {...field} rows={2} />
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
                                  <FormLabel>Reach</FormLabel>
                                  <FormControl>
                                    <Input type="number" placeholder="Users impacted" {...field} />
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
                                    <Input type="number" placeholder="e.g. 8" {...field} />
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
                                    <Input type="number" placeholder="e.g. 7" {...field} />
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
                                    <Input type="number" placeholder="e.g. 4" {...field} />
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
                        reach: 0,
                        impact: 5,
                        confidence: 5,
                        effort: 5,
                      })
                    }
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Feature
                  </Button>
                </div>

                <Button type="submit" disabled={isPending} className="w-full">
                  {isPending ? "Prioritizing..." : "Prioritize with AI"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Prioritization</CardTitle>
          </CardHeader>
          <CardContent>
            {isPending && (
              <div className="space-y-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            )}
            {result ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Feature</TableHead>
                    <TableHead className="text-right w-[100px]">Score</TableHead>
                    <TableHead>Rationale</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.prioritizedFeatures.map((feature, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{feature.name}</TableCell>
                      <TableCell className="text-right font-bold text-lg text-primary">{feature.priorityScore}</TableCell>
                      <TableCell>{feature.rationale}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              !isPending && (
              <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg h-full">
                <BrainCircuit className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">Ready for Insights</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Fill in your features and metrics, then click "Prioritize with AI" to see the results here.
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

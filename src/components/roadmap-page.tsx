"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

const roadmapData = {
  backlog: [
    {
      id: "feat-1",
      title: "User Profile Redesign",
      description: "Update the user profile page with a modern look and feel.",
      tags: ["UI/UX", "Q3"],
      assignee: "https://placehold.co/32x32/FF9800/FFFFFF.png?text=A",
      assigneeFallback: "A",
    },
    {
      id: "feat-2",
      title: "Implement Two-Factor Authentication",
      description: "Enhance account security with 2FA.",
      tags: ["Security", "Q3"],
      assignee: "https://placehold.co/32x32/3F51B5/FFFFFF.png?text=B",
      assigneeFallback: "B",
    },
  ],
  inProgress: [
    {
      id: "feat-3",
      title: "Integrate Regional Payment Methods",
      description: "Add GrabPay and GoPay for the SEA market.",
      tags: ["Payments", "Q2", "High-Impact"],
      assignee: "https://placehold.co/32x32/4CAF50/FFFFFF.png?text=C",
      assigneeFallback: "C",
    },
    {
      id: "feat-4",
      title: "Performance Dashboard for Sellers",
      description: "Create a new dashboard for sellers to track their sales.",
      tags: ["Analytics", "Q2"],
      assignee: "https://placehold.co/32x32/F44336/FFFFFF.png?text=D",
      assigneeFallback: "D",
    },
  ],
  review: [
    {
        id: "feat-5",
        title: "API Rate Limiting",
        description: "Implement rate limiting on public API endpoints.",
        tags: ["Backend", "Q2"],
        assignee: "https://placehold.co/32x32/3F51B5/FFFFFF.png?text=B",
        assigneeFallback: "B",
    }
  ],
  done: [
    {
      id: "feat-6",
      title: "Onboarding Tutorial",
      description: "Create a new interactive tutorial for first-time users.",
      tags: ["Onboarding", "Q1"],
      assignee: "https://placehold.co/32x32/4CAF50/FFFFFF.png?text=C",
      assigneeFallback: "C",
    },
  ],
}

type Feature = {
    id: string;
    title: string;
    description: string;
    tags: string[];
    assignee: string;
    assigneeFallback: string;
}

const FeatureCard = ({ feature }: { feature: Feature }) => (
  <Card className="mb-4">
    <CardContent className="p-4">
      <div className="flex justify-between items-start">
        <h4 className="font-semibold mb-2">{feature.title}</h4>
        <Avatar className="h-8 w-8">
            <AvatarImage src={feature.assignee} data-ai-hint="person avatar" />
            <AvatarFallback>{feature.assigneeFallback}</AvatarFallback>
        </Avatar>
      </div>
      <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
      <div className="flex gap-2 flex-wrap">
        {feature.tags.map(tag => (
          <Badge key={tag} variant={tag === "High-Impact" ? "destructive" : "secondary"}>{tag}</Badge>
        ))}
      </div>
    </CardContent>
  </Card>
)

const RoadmapColumn = ({ title, features, color }: { title: string; features: Feature[], color: string }) => (
  <div className="flex-1 min-w-[300px] bg-muted/50 rounded-lg p-4">
    <div className="flex items-center gap-2 mb-4">
        <div className={`w-3 h-3 rounded-full ${color}`}></div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <span className="text-sm font-bold text-muted-foreground bg-background rounded-full px-2 py-0.5">{features.length}</span>
    </div>
    <div>
      {features.map(feature => (
        <FeatureCard key={feature.id} feature={feature} />
      ))}
    </div>
  </div>
)

export default function RoadmapPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Product Roadmap</h1>
        <p className="text-muted-foreground">Track features from idea to launch.</p>
      </div>
      <div className="flex gap-6 overflow-x-auto pb-4">
        <RoadmapColumn title="Backlog" features={roadmapData.backlog} color="bg-gray-400" />
        <RoadmapColumn title="In Progress" features={roadmapData.inProgress} color="bg-blue-500" />
        <RoadmapColumn title="In Review" features={roadmapData.review} color="bg-purple-500" />
        <RoadmapColumn title="Done" features={roadmapData.done} color="bg-green-500" />
      </div>
    </div>
  )
}

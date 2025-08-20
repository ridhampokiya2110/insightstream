"use client"

import * as React from "react"
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

type Feature = {
    id: string;
    title: string;
    description: string;
    tags: string[];
    assignee: string;
    assigneeFallback: string;
}

type RoadmapData = {
  backlog: Feature[];
  inProgress: Feature[];
  review: Feature[];
  done: Feature[];
}

const initialRoadmapData: RoadmapData = {
  backlog: [
    {
      id: "feat-1",
      title: "Gamified Loyalty Program",
      description: "Introduce a points-based system with tiers and rewards to encourage repeat purchases and increase customer lifetime value.",
      tags: ["Retention", "Q4-Goal"],
      assignee: "https://placehold.co/32x32.png",
      assigneeFallback: "R",
    },
    {
      id: "feat-2",
      title: "Social Sharing & Wishlists",
      description: "Allow users to share their favorite products on social media and create public/private wishlists to drive organic growth.",
      tags: ["Growth", "User-Request"],
      assignee: "https://placehold.co/32x32.png",
      assigneeFallback: "S",
    },
     {
      id: "feat-7",
      title: "Bulk Product Upload for Sellers",
      description: "Enable sellers to upload and manage their product inventory in bulk using a CSV file, improving seller efficiency.",
      tags: ["Seller-Experience", "Q4-Goal"],
      assignee: "https://placehold.co/32x32.png",
      assigneeFallback: "M",
    },
    {
      id: "feat-9",
      title: "Live Chat Support Integration",
      description: "Integrate a live chat widget to provide real-time support to buyers, aiming to reduce cart abandonment and improve satisfaction.",
      tags: ["Support", "Conversion"],
      assignee: "https://placehold.co/32x32.png",
      assigneeFallback: "L",
    },
  ],
  inProgress: [
    {
      id: "feat-3",
      title: "Integrate Regional Payment Methods",
      description: "Adding UPI, Paytm, and PhonePe as payment options to cater to the Indian market and increase payment success rates.",
      tags: ["Payments", "Q3-Key-Result", "High-Impact"],
      assignee: "https://placehold.co/32x32.png",
      assigneeFallback: "P",
    },
    {
      id: "feat-4",
      title: "AI-Powered Product Recommendations",
      description: "Implementing a 'Frequently Bought Together' recommendation engine on product and cart pages to increase average order value.",
      tags: ["AI", "AOV-Boost", "Q3-Key-Result"],
      assignee: "https://placehold.co/32x32.png",
      assigneeFallback: "A",
    },
  ],
  review: [
    {
        id: "feat-5",
        title: "Vernacular Language Support (Hindi)",
        description: "Translating the core user flow and product listings into Hindi to better serve our regional user base.",
        tags: ["Localization", "Q2-Rollout"],
        assignee: "https://placehold.co/32x32.png",
        assigneeFallback: "S",
    },
    {
        id: "feat-8",
        title: "Advanced Order Tracking",
        description: "Providing more granular, real-time shipment updates with an interactive map view for customers.",
        tags: ["UX", "Post-Purchase"],
        assignee: "https://placehold.co/32x32.png",
        assigneeFallback: "P",
    }
  ],
  done: [
    {
      id: "feat-6",
      title: "Seller Onboarding Tutorial",
      description: "Launched an interactive, step-by-step guide for new sellers to complete their profile and list their first product.",
      tags: ["Onboarding", "Q1-Launch"],
      assignee: "https://placehold.co/32x32.png",
      assigneeFallback: "P",
    },
    {
      id: "feat-10",
      title: "Performance & Core Web Vitals",
      description: "Improved page load times by 30% and optimized images across the site, resulting in a better Lighthouse score.",
      tags: ["Performance", "Q1-Launch"],
      assignee: "https://placehold.co/32x32.png",
      assigneeFallback: "A",
    }
  ],
}

const FeatureCard = ({ feature, index }: { feature: Feature, index: number }) => (
    <Draggable draggableId={feature.id} index={index}>
        {(provided, snapshot) => (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                <Card className={`mb-4 ${snapshot.isDragging ? "ring-2 ring-primary" : ""}`}>
                    <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                        <h4 className="font-semibold mb-2 pr-2">{feature.title}</h4>
                        <Avatar className="h-8 w-8 flex-shrink-0">
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
            </div>
        )}
    </Draggable>
)

const RoadmapColumn = ({ title, features, droppableId, color }: { title: string; features: Feature[], droppableId: keyof RoadmapData, color: string }) => (
    <div className="flex-1 min-w-[320px] bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2 p-4">
            <div className={`w-3 h-3 rounded-full ${color}`}></div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <span className="text-sm font-bold text-muted-foreground bg-background rounded-full px-2 py-0.5">{features.length}</span>
        </div>
        <Droppable droppableId={droppableId}>
            {(provided, snapshot) => (
                <div 
                    ref={provided.innerRef} 
                    {...provided.droppableProps}
                    className={`px-4 pb-4 min-h-[100px] transition-colors ${snapshot.isDraggingOver ? 'bg-primary/10' : ''}`}
                >
                {features.map((feature, index) => (
                    <FeatureCard key={feature.id} feature={feature} index={index} />
                ))}
                {provided.placeholder}
                </div>
            )}
        </Droppable>
    </div>
)

export default function RoadmapPage() {
  const [data, setData] = React.useState(initialRoadmapData)

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const startColumn = data[source.droppableId as keyof RoadmapData];
    const endColumn = data[destination.droppableId as keyof RoadmapData];
    const draggedFeature = startColumn.find(f => f.id === draggableId);

    if (!draggedFeature) return;

    if (source.droppableId === destination.droppableId) {
        // Moving within the same column
        const newFeatures = Array.from(startColumn);
        newFeatures.splice(source.index, 1);
        newFeatures.splice(destination.index, 0, draggedFeature);

        const newState = {
            ...data,
            [source.droppableId]: newFeatures,
        };
        setData(newState);

    } else {
        // Moving to a different column
        const startFeatures = Array.from(startColumn);
        startFeatures.splice(source.index, 1);

        const endFeatures = Array.from(endColumn);
        endFeatures.splice(destination.index, 0, draggedFeature);

        const newState = {
            ...data,
            [source.droppableId]: startFeatures,
            [destination.droppableId]: endFeatures,
        };
        setData(newState);
    }
  };


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Product Roadmap</h1>
        <p className="text-muted-foreground">Drag and drop features to move them between columns.</p>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-4">
            <RoadmapColumn title="Backlog" features={data.backlog} droppableId="backlog" color="bg-gray-400" />
            <RoadmapColumn title="In Progress" features={data.inProgress} droppableId="inProgress" color="bg-blue-500" />
            <RoadmapColumn title="In Review" features={data.review} droppableId="review" color="bg-purple-500" />
            <RoadmapColumn title="Done" features={data.done} droppableId="done" color="bg-green-500" />
        </div>
      </DragDropContext>
    </div>
  )
}

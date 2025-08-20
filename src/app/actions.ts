"use server"

import {
  prioritizeFeaturesWithAI,
  type PrioritizeFeaturesInput,
  type PrioritizeFeaturesOutput,
} from "@/ai/flows/prioritize-features"

export async function runPrioritizationAction(
  input: PrioritizeFeaturesInput
): Promise<PrioritizeFeaturesOutput> {
  try {
    const result = await prioritizeFeaturesWithAI(input)
    return result
  } catch (error) {
    console.error("AI Prioritization Error:", error)
    throw new Error("Failed to prioritize features. Please try again.")
  }
}

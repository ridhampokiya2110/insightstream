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
    if (!result) {
      throw new Error("The AI model failed to return a valid response. Please try again.");
    }
    return result
  } catch (error) {
    console.error("AI Prioritization Error:", error)
    throw new Error("Failed to prioritize features. Please try again.")
  }
}

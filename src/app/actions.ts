"use server"

import {
  prioritizeFeaturesWithAI,
  type PrioritizeFeaturesInput,
  type PrioritizeFeaturesOutput,
} from "@/ai/flows/prioritize-features"

export async function runPrioritizationAction(
  input: PrioritizeFeaturesInput
): Promise<PrioritizeFeaturesOutput> {
  const result = await prioritizeFeaturesWithAI(input)
  if (!result || !result.prioritizedFeatures) {
    console.error("AI Prioritization Error: The AI model returned an invalid or empty response.", result);
    throw new Error("The AI model failed to return a valid response. Please try again.");
  }
  return result;
}

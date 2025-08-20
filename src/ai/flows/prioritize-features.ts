'use server';

/**
 * @fileOverview This file defines a Genkit flow for prioritizing features using AI.
 *
 * - prioritizeFeaturesWithAI - A function that prioritizes features based on their potential impact on key metrics.
 * - PrioritizeFeaturesInput - The input type for the prioritizeFeaturesWithAI function.
 * - PrioritizeFeaturesOutput - The return type for the prioritizeFeaturesWithAI function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PrioritizeFeaturesInputSchema = z.object({
  features: z
    .array(
      z.object({
        name: z.string().describe('The name of the feature.'),
        description: z.string().describe('A detailed description of the feature.'),
        reach: z.number().describe('The estimated reach of the feature (number of users impacted).'),
        impact: z.number().describe('The estimated impact of the feature on key metrics (on a scale of 1-10).'),
        confidence: z.number().describe('The confidence level in the impact estimate (on a scale of 1-10).'),
        effort: z.number().describe('The estimated effort required to implement the feature (on a scale of 1-10).'),
      })
    )
    .describe('A list of features to prioritize.'),
  keyMetrics: z.string().describe('The key performance indicators (KPIs) to consider when prioritizing features.'),
});

export type PrioritizeFeaturesInput = z.infer<typeof PrioritizeFeaturesInputSchema>;

const PrioritizeFeaturesOutputSchema = z.object({
  prioritizedFeatures: z.array(
    z.object({
      name: z.string().describe('The name of the feature.'),
      priorityScore: z.number().describe('The calculated priority score for the feature.'),
      rationale: z.string().describe('The AI rationale for the assigned priority score.'),
    })
  ),
});

export type PrioritizeFeaturesOutput = z.infer<typeof PrioritizeFeaturesOutputSchema>;

export async function prioritizeFeaturesWithAI(input: PrioritizeFeaturesInput): Promise<PrioritizeFeaturesOutput | null> {
  return prioritizeFeaturesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'prioritizeFeaturesPrompt',
  input: {schema: PrioritizeFeaturesInputSchema},
  output: {schema: PrioritizeFeaturesOutputSchema},
  prompt: `You are an expert product manager AI. Your task is to prioritize a list of features based on the provided data and key business metrics using the RICE framework.

You MUST follow these instructions:
1.  Analyze the provided features and key metrics.
2.  For each feature, calculate a priority score. A good heuristic for the score is (Reach * Impact * Confidence) / Effort.
3.  Provide a concise rationale for the score, explaining how it aligns with the key metrics.
4.  Sort the features in descending order based on the 'priorityScore'.
5.  You MUST return ONLY a valid JSON object that strictly adheres to the 'PrioritizeFeaturesOutput' schema. Do not include any introductory text, markdown formatting, or conversational filler in your response.

Key Metrics: {{{keyMetrics}}}

Features to analyze:
{{#each features}}
- Name: {{{name}}}
  - Description: {{{description}}}
  - Reach: {{{reach}}}
  - Impact: {{{impact}}}/10
  - Confidence: {{{confidence}}}/10
  - Effort: {{{effort}}}/10
{{/each}}`,
});

const prioritizeFeaturesFlow = ai.defineFlow(
  {
    name: 'prioritizeFeaturesFlow',
    inputSchema: PrioritizeFeaturesInputSchema,
    outputSchema: PrioritizeFeaturesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output;
  }
);

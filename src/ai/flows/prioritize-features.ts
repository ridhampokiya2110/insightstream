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

export async function prioritizeFeaturesWithAI(input: PrioritizeFeaturesInput): Promise<PrioritizeFeaturesOutput> {
  return prioritizeFeaturesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'prioritizeFeaturesPrompt',
  input: {schema: PrioritizeFeaturesInputSchema},
  output: {schema: PrioritizeFeaturesOutputSchema},
  prompt: `You are an expert product manager specializing in feature prioritization using the RICE framework.
  Your task is to analyze a list of features, calculate a RICE score for each, and provide a clear rationale for the prioritization.

  The key business metrics to focus on are: {{{keyMetrics}}}

  Analyze the following features:
  {{#each features}}
  - Feature: {{{name}}}
    - Description: {{{description}}}
    - Reach: {{{reach}}} users per month
    - Impact: {{{impact}}} (Scale of 1-10)
    - Confidence: {{{confidence}}} (Scale of 1-10)
    - Effort: {{{effort}}} (Scale of 1-10, person-months)
  {{/each}}

  Instructions:
  1.  For each feature, calculate a priority score. A standard RICE score is (Reach * Impact * Confidence) / Effort, but you can use your expert judgment to adjust the final score.
  2.  Provide a concise rationale for each feature's score, explaining how it aligns with the key business metrics.
  3.  Return the list of features sorted by the highest priority score first.
  `,
});

const prioritizeFeaturesFlow = ai.defineFlow(
  {
    name: 'prioritizeFeaturesFlow',
    inputSchema: PrioritizeFeaturesInputSchema,
    outputSchema: PrioritizeFeaturesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

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
  prompt: `You are an expert product manager specializing in feature prioritization.

  Given the following list of features and key metrics, prioritize the features based on their potential impact on the metrics.
  Calculate a priority score for each feature based on its reach, impact, confidence, and effort (RICE score).
  Provide a rationale for the assigned priority score, explaining why the feature is important and how it will impact the key metrics.

  Key Metrics: {{{keyMetrics}}}

  Features:
  {{#each features}}
  - Name: {{{name}}}
    Description: {{{description}}}
    Reach: {{{reach}}}
    Impact: {{{impact}}}
    Confidence: {{{confidence}}}
    Effort: {{{effort}}}
  {{/each}}

  Prioritized Features:
  Output the features with calculated priority scores and rationales.
  Make sure to output valid json.
  Output should look like this:
  {
    "prioritizedFeatures": [
      {
        "name": "Feature 1",
        "priorityScore": 123,
        "rationale": "This feature is important because..."
      }
    ]
  }
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


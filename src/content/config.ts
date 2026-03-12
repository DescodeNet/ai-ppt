import { defineCollection, z } from "astro:content";

const lessonCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    level: z.enum(["beginner", "intermediate", "advanced"]),
    order: z.number().int().positive(),
    tools: z.array(z.string()).min(1),
    prerequisites: z.array(z.string()).min(1),
    steps: z.array(
      z.object({
        title: z.string(),
        body: z.string()
      })
    ).min(1),
    promptIds: z.array(z.string()).min(1),
    notes: z.array(z.string()).min(1),
    warnings: z.array(z.string()).default([]),
    result: z.object({
      status: z.enum(["placeholder", "available"]),
      image: z.string().nullable().default(null),
      alt: z.string().optional(),
      caption: z.string().optional()
    }).optional()
  })
});

const promptCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    order: z.number().int().positive(),
    level: z.enum(["beginner", "intermediate", "advanced"]),
    tools: z.array(z.string()).min(1),
    tags: z.array(z.string()).min(1),
    lessonSlug: z.string()
  })
});

const resourcesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    category: z.enum(["tool", "tutorial", "font"]),
    url: z.string(),
    description: z.string(),
    relatedLevels: z.array(z.enum(["beginner", "intermediate", "advanced"]))
  })
});

export const collections = {
  lessons: lessonCollection,
  prompts: promptCollection,
  resources: resourcesCollection
};

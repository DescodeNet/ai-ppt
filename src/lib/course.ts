import type { CollectionEntry } from "astro:content";

const levelWeight: Record<"beginner" | "intermediate" | "advanced", number> = {
  beginner: 1,
  intermediate: 2,
  advanced: 3
};

export const sortLessons = (lessons: CollectionEntry<"lessons">[]) => {
  return [...lessons].sort((a, b) => {
    const levelA = a.data.level as "beginner" | "intermediate" | "advanced";
    const levelB = b.data.level as "beginner" | "intermediate" | "advanced";
    const levelDiff = levelWeight[levelA] - levelWeight[levelB];
    if (levelDiff !== 0) {
      return levelDiff;
    }

    return a.data.order - b.data.order;
  });
};

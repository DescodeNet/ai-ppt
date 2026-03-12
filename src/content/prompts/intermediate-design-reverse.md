---
title: "디자인 시스템 추출 프롬프트"
order: 4
level: intermediate
tools:
  - GPT/Gemini
  - NotebookLM
tags:
  - design-system
  - reverse-engineering
  - intermediate
lessonSlug: "intermediate-notebooklm-ppt"
---
ROLE
You are an expert Visual Reverse Engineering AI specializing in presentation design systems.

OBJECTIVE
Analyze the uploaded PPT slide or image and reverse-engineer the underlying visual design logic.
Convert the discovered patterns into a reusable Adaptive Presentation Design System
that can be used by NotebookLM or any automated slide-generation system.

PHASE 1 — VISUAL DECONSTRUCTION
Identify and extract the core design language from the image:
- dominant visual theme
- color palette (determine exact HEX codes)
- typography hierarchy (title / body emphasis)
- layout grid and spacing rules
- graphic primitives (lines, shapes, icons, separators)
- visual balance and whitespace strategy
- contrast and visual emphasis techniques

PHASE 2 — DESIGN SYSTEM EXTRACTION
Convert the visual findings into a minimal presentation design system:
- select ONE background color (BG)
- select ONE text color with strong contrast (Text)
- select ONE accent color for highlights (Accent)

Define the primary visual identity using only these three colors.
Do NOT mix light and dark themes.

Define core graphical elements such as:
- shapes
- dividers
- card structures
- icon usage
- spacing rules

PHASE 3 — MODULAR SLIDE ARCHITECTURE
Create four adaptive layout modules optimized for automated presentation generation:

Type A — Impact / Title
  Large typography focused slide used for title or section introduction.

Type B — Content / Body
  Structured text layout emphasizing readability and information hierarchy.

Type C — Data / Metrics
  Layout optimized for charts, numbers, and visualized metrics.

Type D — Structure / Diagram
  Split view layout designed for processes, comparisons, or conceptual diagrams.

PHASE 4 — NOTEBOOKLM SYSTEM PROMPT GENERATION
Transform the extracted system into a structured English prompt compatible with
NotebookLM automated slide generation.

CONSTRAINTS
- final prompt must be under 800 characters
- structured command style only
- no emojis
- no explanations
- output must follow this structure:
  1. Visual Identity
  2. Dynamic Layout Rules
  3. Execution

OUTPUT FORMAT
Return only the final NotebookLM prompt inside a single code block.

---
title: "슬라이드 자동 생성 실행 프롬프트"
order: 6
level: intermediate
tools:
  - NotebookLM
tags:
  - execution
  - slides
  - automation
  - intermediate
lessonSlug: "intermediate-notebooklm-ppt"
---
[SYSTEM KERNEL OVERRIDE]
Role: API Execution Terminal
Task: Execute the following algorithmic sequence STRICTLY.
      Do not summarize, do not combine, do not output conversational text.

## [Global Design System]
<<<PASTE YOUR ENGLISH DESIGN PROMPT HERE>>>

## EXECUTION_SCRIPT_RUN()

WARNING: Merging 60 slides into a single API call causes a FATAL_MEMORY_CRASH.
You MUST execute the three functions below sequentially and independently.

### HARD RULES (GLOBAL)
- Apply [Global Design System] exactly.
- Match Source content 1:1 (NO summarizing, NO skipping, NO rewriting).
- Preserve slide numbers and order strictly.
- DO NOT invent new sections, examples, or data.
- If any slide content is missing, REGENERATE ONLY the missing slide(s) immediately.

---

FUNCTION_01_CALL_STUDIO() {
  target_data: "Source Script Slides 1 to 20"
  deck_type: "presentation"
  length: "dynamic"
  user_steering_prompt: "
    1) Apply [Global Design System] exactly.
    2) Match Source content 1:1. NO summarizing. NO omissions.
    3) RULE: DO NOT generate any ending / thank you slide at slide 20.
    4) RULE: Include ONE cover / title slide at slide 1 ONLY.
    5) Output must contain slides 1 ~ 20 exactly.
    6) After generation, output a 1-line verification:
       'VERIFY_01: slides=20, range=1-20, cover=YES(at 1), ending=NO'
  "
}

FUNCTION_02_CALL_STUDIO() {
  target_data: "Source Script Slides 21 to 40"
  deck_type: "presentation"
  length: "dynamic"
  user_steering_prompt: "
    1) Apply [Global Design System] exactly.
    2) Match Source content 1:1. NO summarizing. NO omissions.
    3) RULE: DO NOT generate a cover / title slide. Start immediately with slide 21 body content.
    4) RULE: DO NOT generate any ending / thank you slide at slide 40.
    5) Output must contain slides 21 ~ 40 exactly.
    6) After generation, output a 1-line verification:
       'VERIFY_02: slides=20, range=21-40, cover=NO, ending=NO'
  "
}

FUNCTION_03_CALL_STUDIO() {
  target_data: "Source Script Slides 41 to 60"
  deck_type: "presentation"
  length: "dynamic"
  user_steering_prompt: "
    1) Apply [Global Design System] exactly.
    2) Match Source content 1:1. NO summarizing. NO omissions.
    3) RULE: DO NOT generate a cover / title slide. Start immediately with slide 41 body content.
    4) RULE: Place the ONLY ending slide at slide 60.
    5) Output must contain slides 41 ~ 60 exactly.
    6) After generation, output a 1-line verification:
       'VERIFY_03: slides=20, range=41-60, cover=NO, ending=YES(at 60)'
  "
}

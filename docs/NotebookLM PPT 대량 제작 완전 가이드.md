---
title: "NotebookLM PPT 대량 제작 완전 가이드"
source: "https://kkongdon.notion.site/notebooklm-ppt-kkongdon"
author:
  - "[[Notion의 kkongdon]]"
published:
created: 2026-03-09
description: "NotebookLM으로 20~60장짜리 슬라이드를 전문 디자인으로 자동 생성하는 3단계 워크플로우"
tags:
  - clippings
  - AI도구
  - 프레젠테이션
  - NotebookLM
  - PPT-자동화
  - 프롬프트-엔지니어링
cssclasses:
  - center-titles
---

## NotebookLM PPT 대량 제작 완전 가이드

> 💡 NotebookLM으로 20~60장짜리 슬라이드를 전문 디자인으로 자동 생성하는 3단계 워크플로우입니다.

---

### 전체 흐름 요약

| 단계 | 제목 | 핵심 작업 |
| --- | --- | --- |
| 1단계 | PPT 디자인 양식 해킹하기 | 레퍼런스 이미지 → 영문 디자인 프롬프트 추출 |
| 2단계 | 대본 생성 | NotebookLM에서 원하는 슬라이드 수만큼 대본 생성 |
| 3단계 | 슬라이드 만들기 | 대본 소스 기반으로 실제 PPT 자동 생성 |

---

## 1단계 — PPT 디자인 양식 해킹하기

> **목적:** 전문 디자이너의 슬라이드 스타일을 AI가 재현할 수 있는 영문 디자인 프롬프트로 변환합니다.

### ① 레퍼런스 사이트에서 마음에 드는 PPT 양식 찾기

아래 3곳 중 한 곳에 접속해서 검색창에 `PPT`를 입력하세요.

- [Pinterest](https://kr.pinterest.com/)
- [Adobe Stock](https://stock.adobe.com/kr)
- [Freepik](https://www.freepik.com/search?format=search&last_filter=query&last_value=PPT&query=PPT)

### ② 마음에 드는 슬라이드 이미지 저장

이미지를 우클릭 복사 또는 스크린샷으로 저장합니다.

### ③ GPT 또는 Gemini에 이미지 업로드 후 아래 프롬프트 실행

```
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
```

### ④ 결과물 확인 및 저장

코드블록 형태의 **영문 디자인 시스템 프롬프트**가 생성됩니다. 이것을 복사해서 저장해 두세요.

> ⚠️ 이 결과물은 **3단계**에서 사용합니다.

---

## 2단계 — 대본 생성

> **목적:** NotebookLM 소스를 기반으로 원하는 슬라이드 수만큼 구조화된 한국어 대본을 자동 생성합니다.

### ① NotebookLM 접속 → 해당 노트북 진입

### ② 프롬프트 입력 전, 변수 5개 수정

아래 표를 참고해서 `<<<>>>` 안의 내용을 본인 상황에 맞게 교체하세요.

| 변수 | 설명 | 입력 예시 |
| --- | --- | --- |
| Target Audience | 발표 대상 청중 | 공공기관 관리자 / 스타트업 창업자 |
| Presentation Objective | 발표 목적 | 교육 / 강의 / 전략 공유 / 제안 |
| Core Outcome | 청중이 얻어야 할 1가지 결과 | AI 도구 즉시 활용 가능 |
| Tone & Style | 말투·분위기 | 담백한 존댓말 / 실용 중심 |
| Slide Count | 슬라이드 수 | 20 / 40 / 60 (최소 20, 최대 60) |

### ③ 아래 프롬프트를 변수 수정 후 입력창에 붙여넣고 실행

> ★★★ 예시를 지우고 청중, 목적, 전달하고자 하는 메시지, 톤앤매너, 슬라이드 수를 변경하세요.

```
# INPUT VARIABLES (사용자가 입력)

Target Audience: <<<예: 공공기관 관리자 / 스타트업 창업자 / 대학생 창업 동아리 / 기업 전략팀>>>
Presentation Objective: <<<예: 교육 / 전략 공유 / 강의 / 제안 / 내부 보고>>>
Core Outcome: <<<청중이 발표 후 반드시 얻어야 할 1가지 결과>>>
Tone & Style: <<<예: 담백한 존댓말 / 과장 금지 / 실용 중심>>>
Slide Count: <<<사용자 입력 숫자 (예: 20 / 40 / 60)>>>

---

# ROLE
You are a Chief Content Architect powered by the "Kkongdon Thinking Engine".
You must analyze ALL uploaded sources and synthesize them into a coherent slide master script.

CRITICAL OUTPUT RULE (MUST FOLLOW)
- STELLAR is an INTERNAL reasoning process ONLY.
- Do NOT print STELLAR sections (S / T / E / L / L / A / R), checklists, validations,
  meta reports, explanations, or process notes.
- The ONLY thing you are allowed to output is the slide content in the required slide format.
- If you are about to output anything other than slides, delete it and output slides only.

LANGUAGE RULE
- Prompt instructions are in English.
- Final output must be written in Korean.

---

# SLIDE COUNT RULE (AUTO)
1) If Slide Count < 20 → set to 20
2) If Slide Count > 60 → set to 60
3) Divide slides into 20-slide chunks
4) The last chunk may contain remaining slides

---

# CHUNK NARRATIVE STRUCTURE (INTERNAL)
Each chunk follows:
 1–4   Problem framing
 5–10  Core concepts / frameworks
11–16  Evidence / data / case studies
17–20  Summary + transition
Final chunk concludes the entire presentation.

---

# THINKING ENGINE (STELLAR) — INTERNAL ONLY
Run the STELLAR loop internally to:
- cluster themes
- define key questions
- build thesis + keywords
- extract evidence
- connect narrative
- add persuasion layers (counterarguments / risks / FAQ)
- self-check for unsupported claims and logical gaps

DO NOT OUTPUT ANY OF THE ABOVE PROCESS.

---

# OUTPUT FORMAT (STRICT) — SLIDES ONLY
Output must be Korean.
Output ONLY the following slide blocks from 1 to N (adjusted Slide Count).

슬라이드 번호: (1 ~ N)
제목: (1줄)
화면 텍스트:
  - (핵심 키워드 / 데이터 중심 3~4줄)
상세 대본: (발표자가 읽는 구어체 3~5줄, 존댓말)

OUTPUT CONSTRAINTS
- Do not include any headings other than the slide blocks.
- Do not include: Chunk headers, separators, "---", validation reports, summaries, or extra notes.
- No STELLAR labels, no "R—Reflect", no checklist, no meta commentary.
- End immediately after the final slide block.
```

### ④ 결과물 확인

**슬라이드 번호 / 제목 / 화면 텍스트 / 상세 대본** 형식의 한국어 대본이 생성됩니다.

> ⚠️ 이 결과물은 **3단계**에서 사용합니다.

---

## 3단계 — 슬라이드 만들기

> **목적:** 생성된 대본을 NotebookLM 소스로 변환 후 디자인 프롬프트를 적용해 실제 PPT를 자동 생성합니다.

### ① 대본 소스로 변환

1. 대본 생성 결과 하단의 **메모에 저장** 클릭
2. 우측 스튜디오에 추가된 메모의 점 3개(⋯) 클릭
3. **소스로 변환** 클릭
4. 왼쪽 출처 목록 하단에 대본 소스가 추가된 것 확인

### ② 소스 설정

1. 기존 소스 전체 체크박스 **해제**
2. 방금 변환된 **대본 소스만 체크**

> ⚠️ 반드시 **대본 소스 하나만** 활성화된 상태에서 진행하세요.

### ③ 아래 프롬프트에서 디자인 프롬프트 삽입 후 실행

`<<<PASTE YOUR ENGLISH DESIGN PROMPT HERE>>>` 부분을 **1단계에서 저장한 영문 디자인 프롬프트**로 교체하세요.

#### 디자인 프롬프트 예시

```
## [Global Design System]

1. Visual Identity
   Theme: hand-drawn playful editorial style on crumpled paper texture.
   BG: #F2EDE4
   Text: #111111
   Accent: #2BB3A3
   Typography: bold rounded handwritten-style titles, simple sans-serif body text.
     Titles large and centered; body text compact blocks.
   Graphics: doodle arrows, circles, underlines, speech bubbles, highlight blobs.
     Use rough shapes and sketch-style icons.

2. Dynamic Layout Rules
   Grid: 2–3 column flexible grid with wide margins.
   Spacing: large title spacing, medium section gaps, tight body text grouping.
   Visual emphasis: accent blobs behind titles, hand-drawn arrows pointing to key elements.
   Cards: paper-like blocks with soft shadow or doodle borders.

3. Execution
   Type A: oversized title centered with accent blob + small subtitle.
   Type B: title top-left, 1–2 text columns with doodle markers.
   Type C: chart or numbers centered, arrow or circle highlight.
   Type D: split layout left/right with diagram or concept flow.
```

#### 실행 프롬프트 (전체)

```
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
```

### ④ 생성 완료

- 최소 **20장**으로 생성됩니다.
- 최대 **60장**까지 생성됩니다.
- 만약 45장의 슬라이드면 **3개의 파일**이 생성됩니다.

### ⑤ 생성 시간 안내

| 슬라이드 수 | 생성되는 파일 수 | 예상 소요 시간 |
| --- | --- | --- |
| 20장 | 1개 | 약 5~10분 |
| 40장 | 2개 | 약 10~20분 |
| 60장 | 3개 | 약 10~30분 |

### ⑥ 슬라이드 수정 (필요 시)

이상하게 생성된 슬라이드가 있을 경우:
해당 슬라이드의 점 3개(⋯) → **수정** 클릭 후 세부 내용을 직접 수정합니다.

### ⑦ PPT 파일 다운로드 및 합치기

1. 각 슬라이드 파일의 점 3개(⋯) → **PowerPoint(PPTX) 다운로드** 클릭
2. 모든 파일 다운로드 완료 후 PowerPoint에서 열기
3. 두 번째 파일의 슬라이드 전체 선택 → 복사
4. 첫 번째 파일의 마지막 슬라이드 뒤에 붙여넣기
5. 파일이 3개인 경우 동일하게 반복

> ✅ **완성!** 1단계 디자인 × 2단계 대본 × 3단계 생성이 하나의 PPT로 완성됩니다.

---

*꽁돈의 Thinking Engine 기반 워크플로우*

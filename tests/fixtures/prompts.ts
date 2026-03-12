export const sourceFixtures = {
  shortReliability: `수집된 소스들이 2025년 이후의 최신 정보인지 확인해주고, 구체적인 수치나 시장 통계 포함 여부도 확인해서 표로 정리해줘.

표 항목:
- 소스명
- 출처
- 발행일
- 2025년 이후 발행 여부
- 데이터 기준 시점
- 구체적 수치 포함 여부
- 시장 통계 포함 여부
- 최신성 종합 판정
- 활용 우선순위`,
  mixedLanguageVariable: `Target Audience: <<<예: 공공기관 관리자 / 스타트업 창업자 / 대학생 창업 동아리 / 기업 전략팀>>>
Presentation Objective: <<<예: 교육 / 전략 공유 / 강의 / 제안>>>
Core Outcome: <<<청중이 발표 후 반드시 얻어야 할 1가지 결과>>>
Tone & Style: <<<예: 담백한 존댓말 / 과장 금지 / 실용 중심>>>
Slide Count: <<<20 / 40 / 60>>>`,
  longExecution: `RULES
- 20장 단위로 나누어 생성
- 마지막 청크는 전체 결론으로 마감
- 메타 설명 없이 슬라이드만 출력
- 누락 시 해당 구간만 다시 생성 가능하게 번호를 유지`
};

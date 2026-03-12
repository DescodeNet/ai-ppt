# AI PPT Lecture Website

한국어 중심 AI PPT 실습 강의 사이트입니다. 초급, 중급, 고급 트랙과 프롬프트 라이브러리, 결과 갤러리, 리소스 페이지를 포함합니다.

## Local Debug

1. `npm install`
2. VS Code에서 워크스페이스를 엽니다.
3. `F5`를 눌러 `AI PPT Local Dev`를 실행합니다.
4. 기본 로컬 주소는 `http://localhost:4321` 입니다.

포트가 이미 사용 중이면 해당 프로세스를 종료한 뒤 다시 실행하세요.

## Local Preview

- 개발 서버: `npm run dev`
- 타입 검사: `npm run typecheck`
- 빌드: `npm run build`
- E2E 테스트: `npm test`

## Docker Deploy

- 기본 포트: `7080`
- 포트 변경: `HOST_PORT=9090 docker compose up -d --build`
- 기본 실행: `docker compose up -d --build`
- 상태 확인: `docker compose ps`
- 중지: `docker compose down`

### Rollback (기본)

1. 이전 정상 커밋으로 코드 되돌림
2. `docker compose up -d --build`
3. `curl -f http://localhost:7080` 재확인

## Content Update

- 레슨: `src/content/lessons/`
- 프롬프트: `src/content/prompts/`
- 리소스: `src/content/resources/`
- 갤러리: `src/content/gallery/`

## Screenshot Update

1. `public/screenshots/` 아래에 이미지 파일을 추가합니다.
2. 해당 레슨 또는 갤러리 frontmatter의 `image` 값 **한 곳만** 변경합니다.
3. 필요하면 `status`를 `available`로 유지하거나 변경합니다.
4. `npm run build`로 배포 전 확인합니다.

## Troubleshooting

- Docker 포트 충돌 시: `HOST_PORT` 값을 다른 포트로 바꾸세요.
- 로컬 디버그 포트 충돌 시: 4321을 점유한 프로세스를 종료한 뒤 다시 실행하세요.
- 클립보드 복사가 브라우저 정책으로 제한되면 직접 프롬프트 블록을 선택해 복사하세요.
- VS Code에서 디버그가 멈추면 `Terminate Task`로 `npm: dev`를 종료 후 F5를 다시 실행하세요.

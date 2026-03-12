import { test, expect } from "@playwright/test";
import { sourceFixtures } from "./fixtures/prompts";

const normalizeNewline = (value: string) => value.replace(/\r\n/g, "\n").trimEnd();

test.beforeEach(async ({ context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
});

test("home and lesson flow render", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "한국어 중심 AI PPT 실습 강의" })).toBeVisible();
  await page.getByRole("link", { name: "강의 보기" }).click();
  await expect(page.getByRole("heading", { name: "강의 트랙" })).toBeVisible();
  await page.getByRole("link", { name: "레슨 보기" }).first().click();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "프롬프트" })).toBeVisible();
  await expect(page.getByText("출처:")).toHaveCount(0);
});

test("prompt library filter and copy work", async ({ page }) => {
  await page.goto("/prompts");
  await page.getByRole("button", { name: "초급" }).click();
  const hiddenAdvanced = page.locator('[data-prompt-item][data-level="advanced"][hidden]');
  await expect(hiddenAdvanced.first()).toBeAttached();

  const variablePrompt = page.locator(".prompt").filter({ hasText: "Target Audience:" }).first();
  const visiblePrompt = normalizeNewline((await variablePrompt.locator("pre").textContent()) ?? "");
  const copyButton = variablePrompt.getByRole("button", { name: "복사" });
  await copyButton.click();
  await expect(copyButton).toHaveText("복사 완료");

  const copiedText = normalizeNewline(await page.evaluate(() => navigator.clipboard.readText()));
  expect(copiedText).toBe(visiblePrompt);
  expect(copiedText).toContain("Target Audience:");
  expect(copiedText).toContain("Target Audience: <<<예: 공공기관 관리자 / 스타트업 창업자 / 대학생 창업 동아리");
});

test("gallery shows both placeholder and available result states", async ({ page }) => {
  await page.goto("/gallery");
  await expect(page.getByText("플레이스홀더").first()).toBeVisible();
  await expect(page.getByText("이미지 있음").first()).toBeVisible();
});

test("prompt and lesson pages do not expose source provenance", async ({ page }) => {
  await page.goto("/prompts");
  await expect(page.getByText("출처:")).toHaveCount(0);
  await expect(page.getByText("원본 레슨으로 이동")).toHaveCount(0);

  await page.goto("/lessons/advanced-source-validation");
  await expect(page.getByText("출처:")).toHaveCount(0);
  await expect(page.getByText("강의 flow")).toHaveCount(0);
});

test("advanced lesson copies exact reliability prompt", async ({ page }) => {
  await page.goto("/lessons/advanced-source-validation");
  const visiblePrompt = normalizeNewline((await page.locator(".prompt pre").first().textContent()) ?? "");
  const copyButton = page.getByRole("button", { name: "복사" }).first();
  await copyButton.click();

  const copiedText = normalizeNewline(await page.evaluate(() => navigator.clipboard.readText()));
  expect(copiedText).toBe(visiblePrompt);
  expect(copiedText).toContain(sourceFixtures.shortReliability.split("\n")[0]);
});

test("mobile view keeps navigation and prompt controls usable", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/lessons/beginner-gamma-napkin");
  await expect(page.getByRole("navigation", { name: "주요 메뉴" })).toBeVisible();
  await expect(page.getByRole("button", { name: "복사" }).first()).toBeVisible();
  await expect(page.locator(".result-placeholder")).toBeVisible();
});

test("long prompt surface keeps copy button reachable", async ({ page }) => {
  await page.goto("/lessons/intermediate-script-production");
  const promptBlock = page.locator(".prompt pre").first();
  await expect(promptBlock).toContainText("RULES");
  const copyButton = page.getByRole("button", { name: "복사" }).first();
  await expect(copyButton).toBeVisible();
  await copyButton.click();
  const visiblePrompt = normalizeNewline((await promptBlock.textContent()) ?? "");
  const copiedText = normalizeNewline(await page.evaluate(() => navigator.clipboard.readText()));
  expect(copiedText).toBe(visiblePrompt);
  expect(copiedText).toContain(sourceFixtures.longExecution.split("\n")[0]);
});

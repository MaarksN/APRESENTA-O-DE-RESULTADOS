import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = ["/", "/AtlasGR.html", "/Total%20Trac.html"];

for (const path of pages) {
  test(`${path} abre sem erros de navegação`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("body")).toBeVisible();
    await expect(page.locator("body")).not.toBeEmpty();
  });

  test(`accessibility: ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    const blocking = results.violations.filter(
      ({ impact }) => impact === "critical" || impact === "serious",
    );
    expect(blocking).toEqual([]);
  });
}

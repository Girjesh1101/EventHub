import test, { expect } from "@playwright/test";

test('mocking api', async ({page})=>{

    await  page.route(`https://demo.playwright.dev/api-mocking/api/v1/fruits`, async route =>{
            const json = [
                { name: 'One Piece', id: 21},
                { name: 'Naruto', id: 7},
            ];
            await route.fulfill({json});
        }
    )

    await page.goto(`https://demo.playwright.dev/api-mocking/`);

    await expect(page.getByText(`Naruto`)).toBeVisible();;;
})
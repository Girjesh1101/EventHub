import { test , Page, expect } from "@playwright/test"


test.beforeEach('Launching App' , async ({page})=>{

    await page.goto('https://eventhub.rahulshettyacademy.com/login');
})

test('title', async({page})=>{

    expect(await page.title()).toContain('EventHub — Discover & Book Events');
})

test('login', async ({page})=>{

    const email: string = 'prem1@yopmail.com';
    await page.getByLabel("Email").fill(email)
    await page.getByLabel("Password").fill('Automation@2026')
    await page.getByRole("button", {name: "Sign In"}).click();
    await page.waitForLoadState('networkidle');
    const emailLabel : string = await page.locator('#user-email-display').innerText();
     expect(emailLabel).toBe(email)
    await page.pause();
})
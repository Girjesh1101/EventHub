import { APIResponse, expect, Locator } from "@playwright/test";

export class Assertion {

    async verifyVisible(ele : Locator){
        await expect(ele).toBeVisible();
    }

    async verifyText(ele: Locator , txt: string){
        await expect(ele).toHaveText(txt);
    }

    async verifyValue(ele: Locator, value: string){
        await expect(ele).toHaveValue(value);
    }

    async verifyStatusCode(res: APIResponse , statusCode: number){
        expect(res.status()).toEqual(statusCode);
    }
}
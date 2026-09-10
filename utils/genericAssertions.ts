import { APIResponse, expect, Locator } from "@playwright/test";

export class Assertion {

    static async verifyVisible(ele : Locator){
        await expect(ele).toBeVisible();
    }

    static async verifyText(ele: Locator , txt: string){
        await expect(ele).toHaveText(txt);
    }

    static async verifyValue(ele: Locator, value: string){
        await expect(ele).toHaveValue(value);
    }

    static async verifyStatusCode(res: APIResponse , statusCode: number){
        expect(res.status()).toEqual(statusCode);
    }
}
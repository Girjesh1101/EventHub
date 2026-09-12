import { APIResponse, expect, Locator } from "@playwright/test";

export class Assertion {

    static async verifyVisible(ele : Locator){
        await expect(ele).toBeVisible();
    }

    static async verifyText(actual: string , expected: string){
        expect(actual).toBe(expected)
    }

    static async verifyValue(ele: Locator, value: string){
        await expect(ele).toHaveValue(value);
    }

    static async verifyStatusCode(res: APIResponse , statusCode: number){
        expect(res.status()).toEqual(statusCode);
    }
}
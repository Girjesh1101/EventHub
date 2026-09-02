import {Page , Locator} from "@playwright/test"
export class BaseUI {

    constructor(page: Page){}

    async fill(ele: Locator, value:string){
        await ele.fill(value);
    }

    async click(ele: Locator){
        await ele.click();
    }
}
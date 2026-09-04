import { Locator, Page } from "@playwright/test";

export class SearchPage {

    readonly page : Page;
    readonly eventBtnNav : Locator;
    readonly searchInput : Locator;
    readonly allCard: Locator;

    
    constructor(page: Page){
        this.page = page;
        this.eventBtnNav = page.locator("#nav-events");
        this.searchInput = page.getByPlaceholder('Search events, venues…');
        this.allCard = page.locator('div.p-4');
    }

    async navigateToEvents():Promise<void>{
        await this.eventBtnNav.click();
    }

    async waitForEventPageLoad():Promise<void>{
        await this.allCard.first().waitFor({state:'visible'});
    }

    async searchEvent(eventName:string):Promise<void>{
        await this.searchInput.fill(eventName);
    }

    async captureSeat(eventName:string):Promise<string>{
        const captureSeatsLabel = await this.allCard.filter({hasText: eventName}).locator('.text-xs').innerText();
        console.log(captureSeatsLabel.split(" ")[0]);
        return captureSeatsLabel.split(" ")[0];
    }

    async searchEventAndBook(eventName:string):Promise<string>{
        await this.navigateToEvents();
        await this.waitForEventPageLoad();
        await this.searchEvent(eventName);
        const eventSeat = await this.captureSeat(eventName);
        await this.allCard.filter({hasText: eventName}).locator("#book-now-btn").click();
        return eventSeat;
    }


}
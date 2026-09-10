import { Locator, Page } from "@playwright/test";
import { Logger } from "../utils/logger";

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
        Logger.info("Opening Events page");
        await this.eventBtnNav.click();
    }

    async waitForEventPageLoad():Promise<void>{
        Logger.info("Waiting for event page to load");
        await this.allCard.first().waitFor({state:'visible'});
    }

    async searchEvent(eventName:string):Promise<void>{
        Logger.info(`Searching event: ${eventName}`);
        await this.searchInput.fill(eventName);
    }

    async captureSeat(eventName:string):Promise<string>{
        const captureSeatsLabel = await this.allCard.filter({hasText: eventName}).locator('.text-xs').innerText();
        const seats = captureSeatsLabel.split(" ")[0];
        Logger.info(`Available seats for ${eventName}: ${seats}`);
        return seats;
    }

    async searchEventAndBook(eventName:string):Promise<string>{
        Logger.info(`Search and booking flow started for: ${eventName}`);
        await this.navigateToEvents();
        await this.waitForEventPageLoad();
        await this.searchEvent(eventName);
        const eventSeat = await this.captureSeat(eventName);
        await this.allCard.filter({hasText: eventName}).locator("#book-now-btn").click();
        Logger.info(`Clicked Book Now for: ${eventName}`);
        return eventSeat;
    }


}
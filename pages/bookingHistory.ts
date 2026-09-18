import { expect, Locator, Page } from "@playwright/test";
import { Logger } from "../utils/logger";
import { reportStep } from "../utils/allureReports";

export class BookingHistory{

    readonly page: Page;
    readonly myBookingNav : Locator;
    readonly bookingCarts : Locator;
    readonly bookingRefLabel : Locator;
    readonly cancelBookingBtn : Locator;
    readonly cancelBtnPop : Locator;
    readonly popMessage : Locator;

    constructor(page: Page){
        this.page = page;    
        this.myBookingNav = page.locator('#nav-bookings');
        this.bookingCarts = page.locator('#booking-card');
        this.bookingRefLabel = page.locator('.font-mono');
        this.cancelBookingBtn = page.locator('.mb-8 .gap-2')
        this.cancelBtnPop = page.locator('#confirm-dialog-yes');
        this.popMessage = page.locator('.leading-snug');
    }

    async navigateToMyBooking():Promise<void>{
        await reportStep('Open My Bookings page', async ()=>{
            Logger.info("Opening My Bookings page");
            await this.myBookingNav.click();
        });
    }

    async isBookingVisible(bookingRef: string):Promise<boolean>{
        return await reportStep(`Check booking visibility for ${bookingRef}`, async ()=>{
            Logger.info(`Checking booking visibility for ID: ${bookingRef}`);
            await this.bookingCarts.first().waitFor({state:'visible'});
            const isval = await this.bookingCarts.locator('.booking-ref').filter({hasText: bookingRef}).isVisible();
            Logger.info(`Booking ${bookingRef} visible: ${isval}`);
            return isval;
        });
    }

    async viewBooking(bookingRef: string){
        await reportStep(`View booking details for ${bookingRef}`, async ()=>{
            Logger.info(`Opening booking details for ref: ${bookingRef}`);
            const bookingCard = this.bookingCarts.filter({hasText: bookingRef});
            await bookingCard.waitFor({ state: 'visible' });
            await bookingCard.getByRole('button', { name: 'View Details' }).click();
        });
    }

    async cancelBooking(bookingRef: string):Promise<void>{
        await reportStep(`Cancel booking ${bookingRef}`, async ()=>{
            Logger.info('Deleting Cancel Booking');
            const bookingCard = this.bookingCarts.filter({hasText: bookingRef});
            await bookingCard.waitFor({ state: 'visible' });
            await bookingCard.getByRole('button', {name: 'Cancel Booking'}).click();
            await this.cancelBtnPop.click();
        });
    }

    async deletePopMessage():Promise<string>{
        return await reportStep('Read cancellation message', async ()=>{
            await this.popMessage.waitFor({ state: 'visible', timeout: 15000 });
            return await this.popMessage.innerText();
        });
    }
}
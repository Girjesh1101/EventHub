import { Locator, Page } from "@playwright/test";
import { Logger } from "../utils/logger";

export class BookingHistory{

    readonly page: Page;
    readonly myBookingNav : Locator;
    readonly bookingCarts : Locator;

    constructor(page: Page){
        this.page = page;    
        this.myBookingNav = page.locator('#nav-bookings');
        this.bookingCarts = page.locator('#booking-card');
    }

    async navigateToMyBooking():Promise<void>{
        Logger.info("Opening My Bookings page");
        await this.myBookingNav.click();
    }

    async isBookingVisible(bookingId: string):Promise<boolean>{
        Logger.info(`Checking booking visibility for ID: ${bookingId}`);
        await this.bookingCarts.first().waitFor({state:'visible'});
        const isval = await this.bookingCarts.locator('.booking-ref').filter({hasText: bookingId}).isVisible();
        Logger.info(`Booking ${bookingId} visible: ${isval}`);
        return isval;
    }
}
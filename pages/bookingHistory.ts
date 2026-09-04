import { Locator, Page } from "@playwright/test";

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
        await this.myBookingNav.click();
    }

    async isBookingVisible(bookingId: string):Promise<boolean>{
        await this.bookingCarts.first().waitFor({state:'visible'});
        const isval = await this.bookingCarts.locator('.booking-ref').filter({hasText: bookingId}).isVisible()
        return isval
    }
}
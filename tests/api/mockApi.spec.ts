import { expect } from "@playwright/test";
import {test} from "../../fixture/testFixture";
import { BookingHistory } from "../../pages/bookingHistory";



const emptyCartBody = {
            success: true,
            data: [],
            pagination: {
                "total": 0,
                "page": 1,
                "limit": 10,
                "totalPages": 0
            }
        }

test.skip('Mock Booking API', async ({page})=>{

    await page.route(`https://api.eventhub.rahulshettyacademy.com/api/bookings`,async route =>{
        // store token and other stuff    
        const response = await page.request.fetch(route.request());
        const body = JSON.stringify( emptyCartBody);
        await  route.fulfill({
            body
        });
             // intercepting the response -> API Response -> {playwright fakeresponse} -> browser -> render data
    });

    const booking = new BookingHistory(page);
    await booking.navigateToMyBooking();
    await page.waitForRequest('https://api.eventhub.rahulshettyacademy.com/api/bookings/*');
    await page.pause();

    await expect(page.getByRole('heading', {name: 'No bookings yet'})).toBeVisible();

})
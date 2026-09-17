import { APIResponse, expect } from "@playwright/test";
import { APIBooking, Booking } from "../module/booking";
import { Logger } from "../utils/logger";

export class BookingAssertion {

    // domain specific assertion
    static verifyBookingCreated(
        bookingID: string,
        bookingData: Booking,
        actualDetails : {
            customerName: string,
            ticket: string,
            total: string
        },
        expectedTotalPrice : number
    ){ 
        Logger.info('UI Verify booking cetails creation') 
        expect(bookingID).toBeTruthy();
        expect(actualDetails.customerName).toBe(bookingData.customerName);
        expect(Number(actualDetails.ticket)).toBe(bookingData.quantity);
        expect(Number(actualDetails.total)).toBe(expectedTotalPrice)
    }

    static async verifyAPIBookingCreated(
        response: APIResponse,
        expectedData: APIBooking
    ){

        Logger.info('API Verify booking cetails creation') 
        const body = await response.json();
        expect(body.data.eventId).toEqual(expectedData.eventId);
        expect(body.data.status).toEqual('confirmed');
        expect(body.data.customerName).toEqual(expectedData.customerName);
        expect(body.data.customerEmail).toEqual(expectedData.customerEmail);
        expect(body.data.id).toBeTruthy();
    }
}
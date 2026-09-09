import { APIResponse, expect } from "@playwright/test";
import { APIBooking, Booking } from "../module/booking";

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
        expect(bookingID).toBeTruthy();
        expect(actualDetails.customerName).toBe(bookingData.customerName);
        expect(Number(actualDetails.ticket)).toBe(bookingData.quantity);
        expect(Number(actualDetails.total)).toBe(expectedTotalPrice)
    }

    static async verifyAPIBookingCreated(
        response: APIResponse,
        expectedData: APIBooking
    ){
        // expect(response.status()).toBe(201);
        const body = await response.json();
        expect(body.data.eventId).toEqual(expectedData.eventId);
        expect(body.data.status).toEqual('confirmed');
        expect(body.data.customerName).toEqual(expectedData.customerName);
        expect(body.data.customerEmail).toEqual(expectedData.customerEmail);
        expect(body.data.id).toBeTruthy();
    }
}
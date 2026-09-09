import { expect } from "@playwright/test";
import { APIBooking } from "../../module/booking";
import { BookingFactory } from "../../constructor/Booking/Bookingfactory";
import { test } from "../../fixture/testFixture";
import { BookingAssertion } from "../../asserttions/bookingAssertions";
import { Assertion } from "../../utils/genericAssertions";



test.describe('Booking Event', ()=>{
    test.describe.configure({mode:"serial"});

    let bookingId: number;
    let bookingRef: string;
    const bookingData: APIBooking = 
        { ...BookingFactory.create('valid'),
            eventId: 1
        }
    const assert = new Assertion();    

    test('Create Booking', async({api})=>{

        
        const response = await api.bookings().createBooking(bookingData);
        assert.verifyStatusCode(response, 201);
        BookingAssertion.verifyAPIBookingCreated(response , bookingData);
        const body = await response.json();
        bookingId = body.data.id;
        bookingRef = body.data.bookingRef;
        console.log('Booking Id: ', bookingId , 'Booking Ref: ', bookingRef);
    })

    test('GET all booking', async({api})=>{

        const response = await api.bookings().getAllBookings();
        console.log(await response.json());
        const body = await response.json();
        expect(response.ok()).toBeTruthy();
        expect(body.data).toBeTruthy();
        expect(body.success).toBe(true);
    })

    test('GET Booking By bookingID', async({api})=>{

        const response = await api.bookings().getBookingById(bookingId);
        assert.verifyStatusCode(response, 200);
        BookingAssertion.verifyAPIBookingCreated(response, bookingData);
    })

    test('GET Booking By Booking Reference', async({api})=>{

        const response = await api.bookings().getBookingByRef(bookingRef);
        assert.verifyStatusCode(response, 200);
        const body = await response.json();
        expect(body.data.bookingRef).toBe(bookingRef);
    })

     test('DELETE Booking By bookingID', async({api})=>{

        const response = await api.bookings().deleteBooking(bookingId);
        assert.verifyStatusCode(response, 200);
        const body = await response.json();
        expect(body.success).toBe(true);
        expect(body.message).toBe('Booking cancelled');

        const postDeleteRes = await api.bookings().getBookingById(bookingId);
        assert.verifyStatusCode(postDeleteRes, 404);
        const postDeletebody = await postDeleteRes.json();
        expect(postDeletebody.error).toBe(`Booking with id ${bookingId} not found`);

    })
})
import { expect } from "@playwright/test";
import { test } from "../../fixture/login";
import { APIBooking } from "../../module/booking";
import { BookingFactory } from "../../constructor/Booking/Bookingfactory";



test.describe('Booking Event', ()=>{
    test.describe.configure({mode:"serial"});

    let bookingId: number;
    let bookingRef: string;
    const bookingData: APIBooking = 
        { ...BookingFactory.create('valid'),
            eventId: 1
        }

    test('Create Booking', async({api})=>{

        
        const response = await api.bookings().createBooking(bookingData);
        console.log(await response.json());
        expect(response.status()).toBe(201);
        const body = await response.json();
        expect(body.data.eventId).toBe(bookingData.eventId);
        expect(body.data.status).toBe('confirmed');
        expect(body.data.customerName).toBe(bookingData.customerName);
        expect(body.data.customerEmail).toBe(bookingData.customerEmail);
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
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.data.id).toBe(bookingId);
        expect(body.data.customerName).toBe(bookingData.customerName);
        expect(body.data.status).toBe('confirmed');
    })

    test('GET Booking By Booking Reference', async({api})=>{

        const response = await api.bookings().getBookingByRef(bookingRef);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.data.bookingRef).toBe(bookingRef);
    })

     test('DELETE Booking By bookingID', async({api})=>{

        const response = await api.bookings().deleteBooking(bookingId);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.success).toBe(true);
        expect(body.message).toBe('Booking cancelled');

        const postDeleteRes = await api.bookings().getBookingById(bookingId);
        const postDeletebody =await postDeleteRes.json();
        expect(postDeleteRes.status()).toBe(404);
        expect(postDeletebody.error).toBe(`Booking with id ${bookingId} not found`);

    })
})
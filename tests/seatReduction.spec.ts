import { expect } from "@playwright/test";
import { EventFactory } from "../constructor/events/eventFactory";
import { test } from "../fixture/testFixture";
import { APIBooking, Booking } from "../module/booking";
import { BookingFactory } from "../constructor/Booking/BookingFactory";
import { BookingHistory } from "../pages/bookingHistory";
import { EventAssertions } from "../asserttions/eventAssertions";
import { Assertion } from "../utils/genericAssertions";
import { BookingAssertion } from "../asserttions/bookingAssertions";
import { Logger } from "../utils/logger";

test('end to end flow', async ({page, api})=>{

    // create event
    const eventData = EventFactory.create('Confrence');
    const eventResponse = await api.event().createEvent(eventData);
    Assertion.verifyStatusCode(eventResponse, 201);
    EventAssertions.verifyAPIEventCreated(eventResponse, eventData);
    const body = await eventResponse.json();
    const eventId = body.data.id;


    // Booking event
    const bookingData: APIBooking = {
        ...BookingFactory.create('valid'),
        eventId: eventId
    }
    const bookingResponse = await api.bookings().createBooking(bookingData);
    Assertion.verifyStatusCode(bookingResponse, 201);
    BookingAssertion.verifyAPIBookingCreated(bookingResponse , bookingData);
    const bookingBody = await bookingResponse.json();
    const bookingRef = bookingBody.data.bookingRef;
    Logger.info(`Booking Id : ${bookingRef}`);

    //verify available seats, after booking 
    const eventDeatilsResponse = await api.event().getEventById(eventId);
    Assertion.verifyStatusCode(eventDeatilsResponse, 200);
    const eventDetails = await eventDeatilsResponse.json();
    const availableSeat = eventDetails.data.availableSeats;
    expect(availableSeat).toBe((eventData.totalSeats - bookingData.quantity ));

    // Verify Booking in Booking History
    const history = new BookingHistory(page);
    await history.navigateToMyBooking();
    const isBookingVisible = await history.isBookingVisible(bookingRef);
    expect(isBookingVisible).toBe(true);
   
})
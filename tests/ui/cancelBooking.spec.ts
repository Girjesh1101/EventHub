import { expect } from "@playwright/test";
import { EventAssertions } from "../../asserttions/eventAssertions";
import { EventFactory } from "../../constructor/events/eventFactory";
import { test } from "../../fixture/testFixture";
import { BookingPage } from "../../pages/bookingPage";
import { SearchPage } from "../../pages/searchPage";
import { BookingFactory } from "../../constructor/Booking/BookingFactory";
import { Booking } from "../../module/booking";
import { BookingAssertion } from "../../asserttions/bookingAssertions";
import { BookingHistory } from "../../pages/bookingHistory";
import { Assertion } from "../../utils/genericAssertions";

test('Cancel Booking', async ({page, api})=>{

        // Create Event
        const eventData = EventFactory.create('Sports');
        const eventResponse = await api.event().createEvent(eventData);
        const eventBody = await eventResponse.json();
        const eventId = eventBody.data.id;
        EventAssertions.verifyAPIEventCreated(eventResponse, eventData);
        
        //Search Event
        const search = new SearchPage(page);
        const totalSeatAvailable = await search.searchEventAndBook(eventData.title);
        expect(Number(totalSeatAvailable)).toBe(eventData.totalSeats);
        
        // Book Event
        const booking = new BookingPage(page);
        const eventNameLabel = await booking.captureEventName();
        expect(eventData.title).toBe(eventNameLabel);
        const eventPrice = await booking.captureEventPrice();
        expect(Number(eventPrice)).toBe(eventData.price);
        const bookingData: Booking = BookingFactory.create('valid');
        const totalPriceLabel = await booking.fillBookingDetails(bookingData);
        const totalPrice: number =  bookingData.quantity * eventData.price;
        expect(Number( totalPriceLabel)).toBe(totalPrice)
        const bookingRef = await booking.captureBookingRef();
        const bookingDetails  = await booking.captureBookingDetails();
        BookingAssertion.verifyBookingCreated(
            bookingRef,
            bookingData,
            bookingDetails,
            totalPrice
        )

        //verify available seats, after booking 
        const eventDeatilsResponse = await api.event().getEventById(eventId);
        Assertion.verifyStatusCode(eventDeatilsResponse, 200);
        const eventDetails1 = await eventDeatilsResponse.json();
        const availableSeatPostBooking = eventDetails1.data.availableSeats;
        expect(availableSeatPostBooking).toBe((eventData.totalSeats - bookingData.quantity ));
        
        // verify Booking is visible in Booking History
        const history = new BookingHistory(page);
        await history.navigateToMyBooking();
        const isBookingVisible = await history.isBookingVisible(bookingRef);
        expect(isBookingVisible).toBe(true);

        // Cancel Booking
        await history.cancelBooking(bookingRef);
        const message = await history.deletePopMessage();
        Assertion.verifyText(message,'Booking cancelled successfully');

        // Verify available seat After Cancel booking
        const eventDetails = await api.event().getEventById(eventId);
        Assertion.verifyStatusCode(eventDetails, 200);
        const eventDetailsJson = await eventDetails.json();
        const availableSeatPostDelete = eventDetailsJson.data.availableSeats;
        expect(availableSeatPostDelete).toBe((availableSeatPostBooking + bookingData.quantity ));

})
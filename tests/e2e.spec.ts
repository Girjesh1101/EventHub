import { expect } from "@playwright/test";
import { EventFactory } from "../constructor/events/eventFactory";
import { test } from "../fixture/testFixture";
import { SearchPage } from "../pages/searchPage";
import { BookingPage } from "../pages/bookingPage";
import { Booking } from "../module/booking";
import { BookingFactory } from "../constructor/Booking/BookingFactory";
import { BookingHistory } from "../pages/bookingHistory";

test('end to end flow', async ({page, api})=>{


    const eventData = EventFactory.create('Confrence');
    const eventResponse = await api.event().createEvent(eventData);
    expect(eventResponse.ok()).toBeTruthy();
    const eventResponseBody = await eventResponse.json();
    expect(eventResponseBody.data.title).toBe(eventData.title);
    expect(eventResponseBody.data.price).toBe(String(eventData.price));
    expect(eventResponseBody.data.totalSeats).toBe((eventData.totalSeats));

    const search = new SearchPage(page);
    const totalSeatAvailable = await search.searchEventAndBook(eventData.title);
    expect(Number(totalSeatAvailable)).toBe(eventData.totalSeats);

    const booking = new BookingPage(page);
    const eventNameLabel = await booking.captureEventName();
    expect(eventData.title).toBe(eventNameLabel);
    const eventPrice = await booking.captureEventPrice();
    expect(Number(eventPrice)).toBe(eventData.price);

    const bookingData: Booking = BookingFactory.create('valid');
    const totalPriceLabel = await booking.fillBookingDetails(bookingData);

    const totalPrice: number =  bookingData.quantity * eventData.price;
    expect(Number( totalPriceLabel)).toBe(totalPrice)
    const bookingId = await booking.captureBookingId();
    const {customerName,ticket ,total}  = await booking.captureBookingDetails();
    
    expect(customerName).toBe(bookingData.customerName);
    expect(Number(ticket)).toBe(bookingData.quantity);
    expect(Number(total)).toBe(totalPrice);

    const history = new BookingHistory(page);
    await history.navigateToMyBooking();
    const isBookingVisible = await history.isBookingVisible(bookingId);
    expect(isBookingVisible).toBe(true);


})
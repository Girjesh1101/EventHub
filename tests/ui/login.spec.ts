import {test , expect} from "@playwright/test";

import { Login } from "../../module/login";
import { LoginFactory } from "../../constructor/login/LoginFactory";
import { LoginPage } from "../../pages/loginPage";
import { SearchPage } from "../../pages/searchPage";
import { BookingPage } from "../../pages/bookingPage";
import { Booking } from "../../module/booking";
import { BookingHistory } from "../../pages/bookingHistory";
import { BookingFactory } from "../../constructor/Booking/Bookingfactory";
import { envConfig } from "../../config/config";
import { Assertion } from "../../utils/genericAssertions";


const eventName : string = process.env.eventName!;
test('Login Test', async({page})=>{

    const loginObj = new LoginPage(page);
    const loginData: Login = LoginFactory.create('valid');
    console.log(loginData);
    await loginObj.goto('/login');
    await loginObj.login(loginData)
    const verifiedEmail = await loginObj.verifyEmail();
    // expect(verifiedEmail).toBe(loginData.email);
    const assertion = new Assertion();
    assertion.verifyText(loginObj.email_Label, loginData.email);

    const search = new SearchPage(page);
    const totalSeatAvailable = await search.searchEventAndBook(eventName);

    const booking = new BookingPage(page);
    const eventNameLabel = await  booking.captureEventName();
    expect(eventName).toBe(eventNameLabel);
    await booking.captureEventPrice();
 
    const bookingData: Booking = BookingFactory.create('valid');
    const totalPrice = await booking.fillBookingDetails(bookingData);
    const bookingId = await booking.captureBookingId();
    const {customerName,ticket ,total}  = await booking.captureBookingDetails();

    expect(customerName).toBe(bookingData.customerName);
    expect(Number(ticket)).toBe(bookingData.quantity);
    expect(total).toBe(totalPrice);

    const history = new BookingHistory(page);
    await history.navigateToMyBooking();
    const isBookingVisible = await history.isBookingVisible(bookingId);
    expect(isBookingVisible).toBe(true);
    
})
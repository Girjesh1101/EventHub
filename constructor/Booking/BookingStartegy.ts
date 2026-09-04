import { Booking } from "../../module/booking";
import { BookingBuilder } from "./BookingBuilder";

interface BookingStrategy{
    create(): Booking;
}

export class validBooking implements BookingStrategy {

    create(): Booking {
        return new BookingBuilder()
            .withCustomerName('Test Automation')
            .withCustomerPhone('9876543210')
            .withCustomerEmail('Test@gmail.com')
            .withQuantity(2)
            .build();
    }
}

export class invalidBooking implements BookingStrategy {

    create(): Booking {
        return new BookingBuilder()
            .withCustomerName('wrong usernmae')
            .withCustomerPhone('98765432')
            .withCustomerEmail('wrong@gmail.com')
            .withQuantity(1)
            .build();
    }
}
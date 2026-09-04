import { Booking } from "../../module/booking";
import { invalidBooking, validBooking } from "./BookingStartegy";

export class BookingFactory{

    static create(bookingType:string):Booking{

        if(bookingType === "valid"){
            return new validBooking().create();
        }
        else if(bookingType === "invalid"){
            return new invalidBooking().create();
        }
        else{
            throw new Error(`Invalid login type: ${bookingType}`);
        }
    }
}
import { Booking } from "../../module/booking";

export class BookingBuilder{

    bookingDetails : Booking = {
        customerName : '',
        customerPhone : '',
        customerEmail : '',
        quantity: 1
    }

    withCustomerName(customerName: string){
        this.bookingDetails.customerName = customerName;
        return this
    }

    withCustomerPhone(cutsomerPhone: string){
        this.bookingDetails.customerPhone = cutsomerPhone
        return this
    }

    withCustomerEmail(customerEmail: string){
        this.bookingDetails.customerEmail = customerEmail
        return this
    }

    withQuantity(quatity: number){
        this.bookingDetails.quantity = quatity;
        return this
    }

    build():Booking{
        return this.bookingDetails;
    }
}
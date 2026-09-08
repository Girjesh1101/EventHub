import { APIRequestContext } from "@playwright/test";
import { EventAPI } from "./eventAPI";
import { BookingAPI } from "./bookingAPI";

export class ApiFactory{
    
    constructor(private request: APIRequestContext, private token:string){}

    event(){
        return new EventAPI(this.request, this.token);
    }

    bookings(){
        return new BookingAPI(this.request, this.token);
    }
    
}
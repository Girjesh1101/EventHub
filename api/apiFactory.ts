import { APIRequestContext } from "@playwright/test";
import { EventAPI } from "./eventAPI";
import { BookingAPI } from "./bookingAPI";

export class ApiFactory{
    
    constructor(private request: APIRequestContext, private baseUrl: string, private token:string){}

    event(){
        return new EventAPI(this.request, this.baseUrl, this.token);
    }

    bookings(){
        return new BookingAPI(this.request, this.baseUrl, this.token);
    }
    
}
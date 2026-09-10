import { APIBooking } from "../module/booking";
import { ApiClient } from "../utils/apiClient";
import { Logger } from "../utils/logger";

export class BookingAPI extends ApiClient{

    async getAllBookings(){

        Logger.info('')
        const response = await this.get(`/api/bookings`);
        Logger.info(`GET allBooking Response status : ${response.status()}`)
        if(!response.ok()){
             throw Error(`GET ALL BOOKING API Failed : ${response.status()}`,)
        }
        return response
    }

    async createBooking(payload : APIBooking){

        Logger.info(`Creating Booking for event: ${payload.eventId}`);
        Logger.info(`Booking Quantity: ${payload.quantity}`);
        const response = await this.post(`/api/bookings`, payload);
         if(!response.ok()){
            throw Error(`Create BOOKING API Failed : ${response.status()}`,)
        }
        return response
    }

    async getBookingByRef(bookingRef:string){
        const response = await this.get(`/api/bookings/ref/${bookingRef}`);
          if(!response.ok()){
            throw Error(`GET BOOKING API Failed by Ref : ${bookingRef} and status:  ${response.status()}`,)
        }
        return response
    }

    async getBookingById(bookingId: number){
        Logger.info(`Call Get Booking By ID : ${bookingId}`)
        return await this.get(`/api/bookings/${bookingId}`);  
    }

    async deleteBooking(bookingId: number){
        const response = await this.delete(`/api/bookings/${bookingId}`);
         if(!response.ok()){
            throw Error(`Delete BOOKING API Failed by ID : ${bookingId} and status:  ${response.status()}`,)
        }
        return response
    }
}
import { APIBooking } from "../module/booking";
import { ApiClient } from "../utils/apiClient";
import { Logger } from "../utils/logger";
import { reportStep } from "../utils/allureReports";

export class BookingAPI extends ApiClient{

    async getAllBookings(){
        return await reportStep('GET all bookings', async ()=>{
            Logger.info('Calling All Booking API');
            const response = await this.get(`/api/bookings`);
            Logger.info(`GET allBooking Response status : ${response.status()}`);
            if(!response.ok()){
                throw Error(`GET ALL BOOKING API Failed : ${response.status()}`);
            }
            return response;
        });
    }

    async createBooking(payload : APIBooking){
        return await reportStep(`Create booking for event ${payload.eventId}`, async ()=>{
            Logger.info(`Creating Booking for event: ${payload.eventId}`);
            Logger.info(`Booking Quantity: ${payload.quantity}`);
            const response = await this.post(`/api/bookings`, payload);
            if(!response.ok()){
                throw Error(`Create BOOKING API Failed : ${response.status()}`);
            }
            return response;
        });
    }

    async getBookingByRef(bookingRef:string){
        return await reportStep(`GET booking by reference ${bookingRef}`, async ()=>{
            const response = await this.get(`/api/bookings/ref/${bookingRef}`);
            if(!response.ok()){
                throw Error(`GET BOOKING API Failed by Ref : ${bookingRef} and status:  ${response.status()}`);
            }
            return response;
        });
    }

    async getBookingById(bookingId: number){
        return await reportStep(`GET booking by ID ${bookingId}`, async ()=>{
            Logger.info(`Call Get Booking By ID : ${bookingId}`);
            return await this.get(`/api/bookings/${bookingId}`);
        });
    }

    async deleteBooking(bookingId: number){
        return await reportStep(`DELETE booking ${bookingId}`, async ()=>{
            const response = await this.delete(`/api/bookings/${bookingId}`);
            if(!response.ok()){
                throw Error(`Delete BOOKING API Failed by ID : ${bookingId} and status:  ${response.status()}`);
            }
            return response;
        });
    }
}
import { APIBooking } from "../module/booking";
import { ApiClient } from "../utils/apiClient";
import { Logger } from "../utils/logger";
import { reportStep } from "../utils/allureReports";

export class BookingAPI extends ApiClient{

    async getAllBookings(){
        return await reportStep('GET all bookings', async ()=>{
            try {
                Logger.info('Calling All Booking API');
                const response = await this.get(`/api/bookings`);
                Logger.info(`GET allBooking Response status : ${response.status()}`);
                if(!response.ok()){
                    throw Error(`GET ALL BOOKING API Failed : ${response.status()}`);
                }
                return response;
            } catch (error) {
                Logger.error(`Create BOOKING API Failed: ${error}`);
                throw error;
            }
        });
    }

    async createBooking(payload : APIBooking){
        return await reportStep(`Create booking for event ${payload.eventId}`, async ()=>{

            try {
                Logger.info(`Creating Booking for event: ${payload.eventId}`);
                Logger.info(`Booking Quantity: ${payload.quantity}`);
                const response = await this.post(`/api/bookings`, payload);
                if(!response.ok()){
                    throw Error(`Create BOOKING API Failed : ${response.status()}`);
                }
                return response;
            } catch (error) {
                Logger.error(`Create BOOKING API Failed: ${error}`);
                throw error;
            }
        });
    }

    async getBookingByRef(bookingRef:string){
        return await reportStep(`GET booking by reference ${bookingRef}`, async ()=>{

            try {
                Logger.info(`GET Booking API by Reference Id : ${bookingRef}`);
                const response = await this.get(`/api/bookings/ref/${bookingRef}`);
                if(!response.ok()){
                    throw Error(`GET BOOKING API Failed by Ref : ${bookingRef} and status:  ${response.status()}`);
                }
                return response;
            } catch (error) {
                Logger.error(`GET BOOKING API Failed by Ref: ${error}`);
                throw error
            }
        });
    }

    async getBookingById(bookingId: number){
        return await reportStep(`GET booking by ID ${bookingId}`, async ()=>{

            try {
                Logger.info(`Call Get Booking By ID : ${bookingId}`);
                return await this.get(`/api/bookings/${bookingId}`);
            } catch (error) {
                Logger.error(`GET Booking API BY ID Failed : ${error}`);
                throw error;
            }
            
        });
    }

    async deleteBooking(bookingId: number){
        return await reportStep(`DELETE booking ${bookingId}`, async ()=>{
            try {
                Logger.info(`DELETE Booking API`)
                const response = await this.delete(`/api/bookings/${bookingId}`);
                if(!response.ok()){
                    throw Error(`Delete BOOKING API Failed by ID : ${bookingId} and status:  ${response.status()}`);
                }
            return response;
            } catch (error) {
                Logger.error(`DELETE BOOKING API FAILED : ${error}`);
                throw error;
            }
        });
    }
}
import { ApiClient } from "../utils/apiClient";

export class BookingAPI extends ApiClient{

    async getAllBookings(){
        return await this.get(`/api/bookings`);
    }

    async createBooking(payload : unknown){
        return await this.post(`/api/bookings`, payload);
    }

    async getBookingById(bookingId: number){
        return await this.get(`/api/bookings/${bookingId}`);
    }

    async getBookingByRef(bookingRef:string){
        return await this.get(`/api/bookings/ref/${bookingRef}`);
    }

    async deleteBooking(bookingId: number){
        return await this.delete(`/api/bookings/${bookingId}`);
    }
}
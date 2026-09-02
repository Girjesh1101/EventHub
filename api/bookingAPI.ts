import { ApiClient } from "../utils/apiClient";

export class BookingAPI extends ApiClient{

    async getAllBookings(){
        return await this.get(``)
    }
}
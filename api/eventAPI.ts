import { ApiClient } from "../utils/apiClient";

export class EventAPI extends ApiClient{

    async getAllEvents(){
        const response  = await this.get(`/api/events`);
        if(response.ok()){
            return response;
        }else{
            throw new Error(`API Failed ${response.status()}`)
        }
    }

    async getEventById(eventId: number){
        const response = await this.get(`/api/events/${eventId}`);
        if(response.ok()){
            return response;
        }else{
            throw new Error(`API Failed ${response.status()}`)
        }
    }

    async createEvent(payload: unknown){
        // return response is 200 otherwsie throw messsga here 
        // error handling
        const response = await this.post(`/api/events`, payload);
        if(response.ok()){
            return response;
        }else{
            throw new Error(`API Failed ${response.status()}`)
        }
    }
}
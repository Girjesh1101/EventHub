import { Event } from "../module/event";
import { ApiClient } from "../utils/apiClient";
import { Logger } from "../utils/logger";

export class EventAPI extends ApiClient{

    async getAllEvents(){
        
        const response  = await this.get(`/api/events`);
        if(!response.ok()){
            throw Error(`GET all Events API Failed : ${response.status()}`);
        }
        Logger.info(`API Response -> ${response}`)
        return response
    }

    async getEventById(eventId: number){
        const response = await this.get(`/api/events/${eventId}`);
        if(!response.ok()){
            throw Error(`GET Event By ID API Failed ID : ${eventId} and status :  ${response.status()}`);
        }
        return response
    }

    async createEvent(payload: Event){

        Logger.info(`Event Create For ${payload.category}`);
        Logger.info(`Event Price : ${payload.price}`);
        const response = await this.post(`/api/events`, payload);
        if(!response.ok()){
            throw Error(`Create Event API Failed : ${response.status()}`);
        }
        return response
    }
}
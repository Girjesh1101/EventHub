import { ApiClient } from "../utils/apiClient";

export class EventAPI extends ApiClient{

    async getAllEvents(){
        return await this.get(`/api/events`);
    }

    async getEventById(eventId: number){
        return await this.get(`/api/events/${eventId}`);
    }

    async createEvent(payload: unknown){
        return await this.post(`/api/events`, payload);
    }
}
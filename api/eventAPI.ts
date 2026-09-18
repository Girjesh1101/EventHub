import { Event } from "../module/event";
import { ApiClient } from "../utils/apiClient";
import { Logger } from "../utils/logger";
import { reportStep } from "../utils/allureReports";

export class EventAPI extends ApiClient{

    async getAllEvents(){
        return await reportStep('GET all events', async ()=>{
            try {
                Logger.info(`GET All Evenets API`)
                const response  = await this.get(`/api/events`);
                if(!response.ok()){
                    throw Error(`GET all Events API Failed : ${response.status()}`);
                }
                Logger.info(`API Response -> ${response}`);
            return response;
            } catch (error) {
                Logger.error(`GET ALl Event API Failed : ${error}`)
                throw error;
            }
        });
    }

    async getEventById(eventId: number){
        return await reportStep(`GET event by ID ${eventId}`, async ()=>{
            try {
                const response = await this.get(`/api/events/${eventId}`);
                if(!response.ok()){
                    throw Error(`GET Event By ID API Failed ID : ${eventId} and status :  ${response.status()}`);
                }
                return response;      
            } catch (error) {
                Logger.error(`GET Event By ID API Failed : ${error}`)
                throw error;
            }
        });
    }

    async createEvent(payload: Event){
        return await reportStep(`Create event ${payload.title}`, async ()=>{
            try {
                Logger.info(`Event Create For ${payload.category}`);
                Logger.info(`Event Price : ${payload.price}`);
                const response = await this.post(`/api/events`, payload);
                if(!response.ok()){
                    throw Error(`Create Event API Failed : ${response.status()}`);
                }
                return response; 
            } catch (error) {
                Logger.error(`POST CREATE Event By ID API Failed : ${error}`)
                throw error;
            }
        });
    }
}
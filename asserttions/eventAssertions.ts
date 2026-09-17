import { APIResponse, expect } from "@playwright/test";
import { Event } from "../module/event";
import { Logger } from "../utils/logger";

export class EventAssertions{

    static async verifyAPIEventCreated(
        response: APIResponse,
        expectedData : Event
    ){

        Logger.info('Verifying creating event details')
        const body = await response.json();
        expect(body.data.title).toEqual(expectedData.title);
        expect(Number(body.data.price)).toEqual(expectedData.price);
        expect(body.data.totalSeats).toEqual(expectedData.totalSeats);
       
    }
}
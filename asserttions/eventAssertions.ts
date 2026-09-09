import { APIResponse, expect } from "@playwright/test";
import { Event } from "../module/event";

export class EventAssertions{

    static async verifyAPIEventCreated(
        response: APIResponse,
        expectedData : Event
    ){

        const body = await response.json();
        expect(body.data.title).toEqual(expectedData.title);
        expect(Number(body.data.price)).toEqual(expectedData.price);
        expect(body.data.totalSeats).toEqual(expectedData.totalSeats);
       
    }
}
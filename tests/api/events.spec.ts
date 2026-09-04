import { expect } from "@playwright/test";
import { test } from "../../fixture/login";
import { EventFactory } from "../../constructor/events/eventFactory";



test.describe("Event API Tests", () => {

    test.describe.configure({mode: 'serial'})
    let eventID: number;
    const eventData = EventFactory.create('Workshop');
    
    test('Create Event', async({api})=>{

        const response = await api.event().createEvent(eventData);
        expect(response.status()).toBe(201);
        expect(response.ok()).toBeTruthy();

        const body = await response.json();
        expect(body.data.title).toBe(eventData.title);
        expect(body.data.price).toBe(String(eventData.price));
        expect(body.data.totalSeats).toBe((eventData.totalSeats));

        eventID = body.data.id; 

    })

    test("GET Event details by ID", async ({api})=>{

        const response =  await api.event().getEventById(eventID);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.data.id).toBe(eventID);
        expect(body.data.title).toBe(eventData.title);
        expect(body.data.availableSeats).toBeDefined();
        expect(body).toHaveProperty("data.price");
    })

    test("Get All Events", async ({ api }) => {
        const response = await api.event().getAllEvents();
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();
        const body = await response.json();
        expect(body.data).toBeDefined();
    });

}) 
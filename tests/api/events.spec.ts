import { expect } from "@playwright/test";
import { test } from "../../fixture/login";

let eventID: number = 110292;

test.describe("Event API Tests", () => {
    
    test('Create Event', async({api})=>{

        const payload = {
            title: "Test Automation Summit 2027",
            description: "A premier technology conference.",
            category: "Conference",
            venue: "Mumbai International Centre",
            city: "Mumbai",
            eventDate: "2026-10-15T09:00:00.000Z",
            price: 1500,
            totalSeats: 500,
            imageUrl: "https://example.com/banner.jpg"
        }

        const response = await api.event().createEvent(payload);
        expect(response.status()).toBe(201);
        expect(response.ok()).toBeTruthy();

        const body = await response.json();

        expect(body.data.title).toBe(payload.title);
        expect(body.data.price).toBe(String(payload.price));
        expect(body.data.totalSeats).toBe((payload.totalSeats));

        eventID = body.data.id; 
        console.log(eventID);
        // Store the created event ID for subsequent tests

    })

    test("GET Event details by ID", async ({api})=>{

        const response =  await api.event().getEventById(eventID);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.data.id).toBe(eventID);
        // expect(body.data.title).toBe("Dilli Diwali Mela");
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
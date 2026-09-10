import { expect } from "@playwright/test";
import { test } from "../../fixture/testFixture";
import { EventFactory } from "../../constructor/events/eventFactory";
import { EventAssertions } from "../../asserttions/eventAssertions";
import { Assertion } from "../../utils/genericAssertions";
import { Logger } from "../../utils/logger";



test.describe("Event API Tests", () => {

    test.describe.configure({mode: 'serial'})
    let eventID: number;
    const eventData = EventFactory.create('Workshop');
    const assert = new Assertion();

    
    test('Create Event', async({api})=>{
        
        const response = await api.event().createEvent(eventData);
         const body = await response.json()
        Logger.info(`API Response -> ${JSON.stringify(body)}`)
        EventAssertions.verifyAPIEventCreated(response, eventData);
        assert.verifyStatusCode(response,201);
        eventID = body.data.id; 

    })

    test("GET Event details by ID", async ({api})=>{

        const response =  await api.event().getEventById(eventID);
        const body = await response.json()
        Logger.info(`API Response -> ${JSON.stringify(body)}`)
        EventAssertions.verifyAPIEventCreated(response, eventData);
        assert.verifyStatusCode(response,200);
    })

    test("Get All Events", async ({ api }) => {
        const response = await api.event().getAllEvents();
        assert.verifyStatusCode(response,200);
        const body = await response.json();
        Logger.info(`API Response -> ${JSON.stringify(body)}`);
        expect(body.data).toBeDefined();
    });

}) 
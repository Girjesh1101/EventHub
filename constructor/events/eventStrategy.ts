import { Event } from "../../module/event";
import { getRandomFutureData } from "../../utils/utlitity";
import { EventBuilder } from "./eventBuilder";

export interface EventStrategy {
    creat(): Event;
}

export class ConferenceStrategy implements EventStrategy{

    creat(): Event {
        return new EventBuilder()
            .withTitle('Test Automation'+Math.floor(Math.random()* 100))
            .withCategory('Conference')
            .withCity('Mumbai')
            .withDescription('A premier technology conference')
            .withVenue('Mumbai International Centre')
            .withPrice(100)
            .withTotalSeat(200)
            .withEventData(getRandomFutureData())
            .build();
    }
}

export class WorkshopStrategy implements EventStrategy{

    creat(): Event {
        return new EventBuilder()
            .withTitle('Test Automation'+Math.floor(Math.random()* 100))
            .withCategory('Workshop')
            .withCity('Workshop')
            .withDescription('A premier technology conference')
            .withVenue('Mumbai International Centre')
            .withPrice(100)
            .withTotalSeat(200)
            .withEventData(getRandomFutureData())
            .build();
    }
}

export class SportStrategy implements EventStrategy{

    creat(): Event {
        return new EventBuilder()
            .withTitle('Test Automation'+Math.floor(Math.random()* 100))
            .withCategory('Sports')
            .withCity('Mumbai')
            .withDescription('A premier technology conference')
            .withVenue('Mumbai International Centre')
            .withPrice(100)
            .withTotalSeat(200)
            .withEventData(getRandomFutureData())
            .build();
    }
}

export class ConcertStrategy implements EventStrategy{

    creat(): Event {
        return new EventBuilder()
            .withTitle('Music Sang'+Math.floor(Math.random()* 100))
            .withCategory('Concert')
            .withCity('Mumbai')
            .withDescription('A premier technology conference')
            .withVenue('Mumbai International Centre')
            .withPrice(100)
            .withTotalSeat(200)
            .withEventData(getRandomFutureData())
            .build();
    }
}

export class FestivalStrategy implements EventStrategy{

    creat(): Event {
        return new EventBuilder()
            .withTitle('Test Automation'+Math.floor(Math.random()* 100))
            .withCategory('Fistival')
            .withCity('Workshop')
            .withDescription('A premier technology conference')
            .withVenue('Mumbai International Centre')
            .withPrice(100)
            .withTotalSeat(200)
            .withEventData(getRandomFutureData())
            .build();
    }
}
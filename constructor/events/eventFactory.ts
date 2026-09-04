import { Event } from "../../module/event";
import { ConcertStrategy, FestivalStrategy, WorkshopStrategy } from "./eventStrategy";

export class EventFactory {

    static create(eventType: string):Event{

        if(eventType === 'Concert'){
            return new ConcertStrategy().creat();
        
        }else if(eventType === 'Workshop'){

            return new WorkshopStrategy().creat();
        }else if(eventType === 'Confrence'){

            return new WorkshopStrategy().creat();
        }
        else if(eventType === 'Sports'){

            return new WorkshopStrategy().creat();
        }else if(eventType === 'Festival'){

            return new FestivalStrategy().creat();
        }else{
            throw new Error(`Invalid Event Type ${eventType}`);
        }
    }
}
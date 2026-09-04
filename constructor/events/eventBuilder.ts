import { Event } from "../../module/event";

export class EventBuilder {

    private eventData : Event ={
        title : '',
        description : '',
        category : '',
        city : '',
        eventDate : '',
        price : 10,
        totalSeats : 100,
        venue : '',
        imageUrl : ''
    }

    withTitle(title:string){
        this.eventData.title = title;
        return this;
    }

    withDescription(description: string){
        this.eventData.description = description;
        return this;
    }

    withCategory(category: string){
        this.eventData.category = category;
        return this;
    }

    withVenue(venue:string){
        this.eventData.venue = venue;
        return this;
    }

    withCity(city:string){
        this.eventData.city = city;
        return this;
    }

    withEventData(date: string){
        this.eventData.eventDate = date;
        return this
    }

    withPrice(price: number){
        this.eventData.price = price;
        return this;
    }

    withTotalSeat(totalSeats: number){
        this.eventData.totalSeats = totalSeats;
        return this;
    }

    withImageUrl(url: string){
        this.eventData.imageUrl = url;
        return this;
    }

    build():Event {
        return this.eventData;
    }
}
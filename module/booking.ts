export interface Booking {
    customerName: string;
    customerEmail: string
    customerPhone: string;
    quantity: number
}

export interface APIBooking extends Booking{
    eventId: number
}
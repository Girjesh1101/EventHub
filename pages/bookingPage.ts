import { Locator, Page } from "@playwright/test";
import { Booking } from "../module/booking";
import { Logger } from "../utils/logger";
import { reportStep } from "../utils/allureReports";

export class BookingPage {

    readonly page : Page;
    readonly eventNameLabel : Locator;
    readonly customerEmailInput : Locator;
    readonly customerPhoneInput : Locator;
    readonly customerNameInput : Locator;
    readonly confirmBookingBtn : Locator; 
    readonly eventPrice : Locator
    readonly totalEventPrice : Locator;
    readonly quantityBtn : Locator;

    readonly captureBookingIdLabel : Locator;
    readonly bookingDetilsLabel: Locator;


    constructor(page : Page){
        this.page = page;
        this.eventNameLabel = page.locator('h1.mb-4');
        this.customerNameInput = page.locator('#customerName');
        this.customerEmailInput = page.locator("#customer-email");
        this.customerPhoneInput = page.locator('input[name="phone"]');
        this.confirmBookingBtn = page.locator('#confirm-booking');
        this.eventPrice = page.getByRole('paragraph').filter({hasText:'$'});
        this.totalEventPrice = page.getByText('Total$');
        this.quantityBtn = page.getByRole('button', { name: '+' });
        this.captureBookingIdLabel = page.locator('.booking-ref');
        this.bookingDetilsLabel = page.locator('span.font-medium');
    }


    async captureEventName():Promise<string>{
        return await reportStep('Capture event name', async ()=>{
            await this.eventNameLabel.waitFor({state: "visible"});
            const eventName = await this.eventNameLabel.innerText();
            Logger.info(`Capture event Name : ${eventName}`);
            return eventName;
        });
    }

    async captureEventPrice():Promise<string>{
        return await reportStep('Capture event price', async ()=>{
            Logger.info('Capture Event Price');
            return (await this.eventPrice.innerText()).replace("$","").replace(",","");
        });
    }

    async enterQuantity(qty: number){
        await reportStep(`Set quantity to ${qty}`, async ()=>{
            Logger.info(`Quantity : ${qty}`);
            for(let i  = 1 ; i< qty ; i++){
                await this.quantityBtn.click();
            }
        });
    }

    async eneterCustomerEmail(customerEmail: string):Promise<void>{
        await reportStep(`Enter customer email`, async ()=>{
            Logger.info(`Ente Phone Customer Email : ${customerEmail}`);
            await this.customerEmailInput.fill(customerEmail);
        });
    }

    async enterCustomerName(customerName: string):Promise<void>{
        await reportStep(`Enter customer name`, async ()=>{
            Logger.info(`Ente Phone Customer Name : ${customerName}`);
            await this.customerNameInput.fill(customerName);
        });
    }

     async enterCustomerPhone(customerPhone: string):Promise<void>{
        await reportStep(`Enter customer phone`, async ()=>{
            Logger.info(`Ente Phone Customer Phone : ${customerPhone}`);
            await this.customerPhoneInput.fill(customerPhone);
        });
    }

    async clickConfirmBooking():Promise<void>{
        await reportStep('Confirm booking', async ()=>{
            Logger.info(`Clicking on Confirm Booking`);
            await this.confirmBookingBtn.click();
        });
    }

    async captureTotalPrice():Promise<string>{
        return await reportStep('Capture total booking price', async ()=>{
            const price = await this.totalEventPrice.innerText();
            Logger.info(`Capture Total Price :  ${price}`);
            return price.split('$')[1].replace(',','');
        });
    }

    async fillBookingDetails(bookingDetails: Booking): Promise<string>{
        return await reportStep('Fill booking form', async ()=>{
            await this.enterQuantity(bookingDetails.quantity);
            await this.enterCustomerName(bookingDetails.customerName);
            await this.eneterCustomerEmail(bookingDetails.customerEmail);
            await this.enterCustomerPhone(bookingDetails.customerPhone);
            const total_price = await this.captureTotalPrice();
            await this.clickConfirmBooking();
            return total_price;
        });
    }

    async captureBookingRef():Promise<string>{
        return await reportStep('Capture booking reference', async ()=>{
            const bookingRef = await this.captureBookingIdLabel.innerText();
            Logger.info(`Capture BookingID : ${bookingRef}`);
            return bookingRef;
        });
    }

    async captureBookingDetails(): Promise<{
        customerName: string;
        ticket: string;
        total: string;
    }>{
        const customerName = await this.bookingDetilsLabel.nth(1).innerText();
        const ticket = await this.bookingDetilsLabel.nth(2).innerText();
        const totalWithDollar  = await this.bookingDetilsLabel.nth(3).innerText();
        const total =  totalWithDollar.split("$")[1].replace(",","");

        return {
            customerName,
            ticket,
            total
        }
    }

}
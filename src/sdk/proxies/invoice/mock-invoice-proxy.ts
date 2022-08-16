import { Invoice } from "./invoice";
import { LineItem } from "../../models/lineItem";


export class MockInvoiceProxy implements Invoice
{
    private static _count = 2200;
    private readonly _lineItems: Array<LineItem> = [];
    private readonly _invoiceId: string;
    private readonly _date: number;

    
    public get lineItems(): Array<LineItem> { return this._lineItems; }
    public get invoiceId(): string { return this._invoiceId; }
    public get date(): number { return this._date; }
    public get amount(): number { return this.lineItems.reduce((acc, lineItem) => acc + lineItem.amount, 0); }
    public get tax(): number { return this.lineItems.reduce((acc, lineItem) => acc + lineItem.tax, 0); }
    public get amountWithTax(): number { return parseFloat((this.amount + this.tax).toFixed(2)); }
    
    
    public constructor()
    {
        this._invoiceId = "INV22X" + ++MockInvoiceProxy._count;
        this._date = Date.now();
    }

    public addItem(productName: string, quantity: number, mrp: number): void
    { 
        const lineItem = new LineItem(productName, quantity, mrp);
        this._lineItems.push(lineItem);
        console.log("item added");
    }

    public removeItem(lineItem: LineItem): void 
    {
        const indexOfItem = this.lineItems.findIndex((e) => e.itemId === lineItem.itemId);
        if (indexOfItem === -1)
            return;
        this.lineItems.splice(indexOfItem, 1);
    }
}

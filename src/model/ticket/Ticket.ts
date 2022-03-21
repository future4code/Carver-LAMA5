
export class Ticket {
    constructor(
        private id: string,
        private name: string,
        private quantity: number,
        private quantitySold: number,
        private showId: string
    ) { }
    
    getId() {
        return this.id
    }
    getName() {
        return this.name
    }
    getQuantity() {
        return this.quantity
    }
    getQuantitySold() {
        return this.quantitySold
    }
    getShowId() {
        return this.showId
    }
}

export type ticketInputDTO = {
    name: string,
    quantity: number,
    showId: string,
    token: string
}

export type ticketSellDataInputDTO = {
    id: string,
    quantity: number,
    quantitySold: number
}
export type ticketSellInputDTO = {
    id: string,
    quantity: number
}
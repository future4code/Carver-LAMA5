export class Band {
    constructor(
        private id: string,
        private name: string,
        private musicGenre: string,
        private responsible: string
    ) { }

    getId() {
        return this.id;
    }

    getName() {
        return this.name
    }

    getMusicGenre() {
        return this.musicGenre;
    }

    getResponsible() {
        return this.responsible;
    }
}

export type BandInputDTO = {
    name: string,
    musicGenre: string,
    responsible: string
}
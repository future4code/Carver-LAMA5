import { Band } from "../../model/band/Band";


export interface BandRepositoty { 
    create(band: Band): Promise<void>
    getBandByName(bandName: string): Promise<Band | null>
    getBandById(bandId: string): Promise<Band | null>
}
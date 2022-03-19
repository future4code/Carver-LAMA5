import { Band } from "../../model/band/Band";


export interface BandRepositoty { 
    create(band: Band): Promise<void>
    // getBandById(email: string): Promise<Band | null>
}
import { SpecieSwapi } from "../models/specie-swapi.model";

export interface SpecieSwapiResponseInterface {
    count: number;
    next: string;
    previous: null;
    results: SpecieSwapi[];
}

import { BaseRepository } from "src/common/repository/base.repository";
import { Specie } from "../models/specie.model";
import { SpecieSwapiResponseInterface } from "../interfaces/specie-swapi-response.interface";

export interface SpeciesRepository extends BaseRepository<Specie> {

    getFromSwapi(): Promise<SpecieSwapiResponseInterface>;

}
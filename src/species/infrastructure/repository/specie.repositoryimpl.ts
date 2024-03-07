import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SWAPI_BASE_URL } from "src/common/constants/external-apis.constant";
import { HttpCustomService } from "src/common/providers/http/http-custom.service";
import { SpecieSwapi } from "src/species/domain/models/specie-swapi.model";
import { Specie } from "src/species/domain/models/specie.model";
import { SpeciesRepository } from "src/species/domain/repository/species.repostory";
import { SpecieEntity } from "../entities/specie.entity";
import { DataSource, Repository } from "typeorm";
import { SpecieSwapiResponseInterface } from "src/species/domain/interfaces/specie-swapi-response.interface";

@Injectable()
export class SpeciesRepositoryImpl implements SpeciesRepository {

    private baseUrl: string;

    constructor(
        @InjectRepository(SpecieEntity)
        private speciesRepository: Repository<SpecieEntity>,
        private readonly httpService: HttpCustomService,
        private dataSource: DataSource
    ) {
        this.baseUrl = SWAPI_BASE_URL;
    }

    show(id: any): Promise<Specie> {
        throw new Error("Method not implemented.");
    }

    get(): Promise<Specie[]> {
        return this.speciesRepository.createQueryBuilder('species')
            .leftJoinAndSelect('species.personas', 'persona')
            .leftJoinAndSelect('species.peliculas', 'pelicula')
            .getMany();

    }

    async create(data: Specie): Promise<Specie> {
        try {
            const specie: SpecieEntity = this.speciesRepository.create(data)
            await this.speciesRepository.manager.save(specie);
            return specie;
        } catch (err) {
            console.log(err);
        }
    }

    update(id: any, data: Specie): Promise<Specie> {
        throw new Error("Method not implemented.");
    }

    delete(id: any): Promise<Specie> {
        throw new Error("Method not implemented.");
    }

    getFromSwapi(): Promise<SpecieSwapiResponseInterface> {
        return this.httpService.get<SpecieSwapiResponseInterface>(`${this.baseUrl}species`);
    }

}
import { InjectRepository } from "@nestjs/typeorm";
import { SpecieFilm } from "src/species/domain/models/specie-film.model";
import { SpecieFilmsRepository } from "src/species/domain/repository/specie-films.repository";
import { SpecieFilmEntity } from "../entities/specie-films.entity";
import { DataSource, Repository } from "typeorm";

export class SpecieFilmsRepositoryImpl implements SpecieFilmsRepository {

    constructor(
        @InjectRepository(SpecieFilmEntity)
        private specieFilmRepository: Repository<SpecieFilmEntity>,
        private dataSource: DataSource
    ) { }

    show(id: any): Promise<SpecieFilm> {
        throw new Error("Method not implemented.");
    }

    get(): Promise<SpecieFilm[]> {
        throw new Error("Method not implemented.");
    }

    async create(data: SpecieFilm): Promise<SpecieFilm> {
        try {
            const specieFilm: SpecieFilmEntity = this.specieFilmRepository.create(data)
            await this.specieFilmRepository.manager.save(specieFilm);
            return specieFilm;
        } catch (err) {
            console.log(err);
        }
    }

    update(id: any, data: SpecieFilm): Promise<SpecieFilm> {
        throw new Error("Method not implemented.");
    }

    delete(id: any): Promise<SpecieFilm> {
        throw new Error("Method not implemented.");
    }

}
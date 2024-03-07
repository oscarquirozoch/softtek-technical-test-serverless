import { SpecieFilmsRepository } from "src/species/domain/repository/specie-films.repository";
import { SpeciePeopleRepository } from "src/species/domain/repository/specie-people.repository";
import { SpeciesRepository } from "src/species/domain/repository/species.repostory";
import { CreateSpecieDto } from "../dto/create-specie.dto";
import { IResponse } from "src/common/interfaces/Response.interface";
import { Specie } from "src/species/domain/models/specie.model";
import { ResponseHelper } from "src/common/helpers/response.helper";
import { HttpStatus } from "@nestjs/common";

export class CreateSpecieUseCase {

    constructor(
        private readonly speciesRepository: SpeciesRepository,
        private readonly speciePeopleRepository: SpeciePeopleRepository,
        private readonly specieFilmsRepository: SpecieFilmsRepository
    ) { }

    async exec(data: CreateSpecieDto): Promise<IResponse<Specie>> {
        const response = new ResponseHelper();

        const createdSpecie = await this.speciesRepository.create({
            altura_media: data.altura_media,
            esperanza_de_vida: data.esperanza_de_vida,
            clasificacion: data.clasificacion,
            creado: new Date(),
            designacion: data.designacion,
            editado: new Date(),
            color_de_ojos: data.color_de_ojos,
            color_de_pelo: data.color_de_pelo,
            mundo_natal: data.mundo_natal,
            idioma: data.idioma,
            nombre: data.nombre,
            colores_de_piel: data.colores_de_piel,
            url: data.url
        });

        data.personas.forEach(async (item) => {
            await this.speciePeopleRepository.create({
                url: item,
                especie: createdSpecie
            });
        })

        data.peliculas.forEach(async (item) => {
            await this.specieFilmsRepository.create({
                url: item,
                especie: createdSpecie
            });
        })

        const processedSpeciesFromDB = {
            ...createdSpecie,
            personas: data.personas,
            peliculas: data.peliculas
        };

        response.result(processedSpeciesFromDB);
        return response.resolve();
    };
}

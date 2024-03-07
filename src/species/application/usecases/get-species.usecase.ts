import { ResponseHelper } from "src/common/helpers/response.helper";
import { TranslatorHelper } from "src/common/helpers/translator.helper";
import { IResponse } from "src/common/interfaces/Response.interface";
import { SpecieFilm } from "src/species/domain/models/specie-film.model";
import { SpeciePeople } from "src/species/domain/models/specie-people.model";
import { SpecieSwapi } from "src/species/domain/models/specie-swapi.model";
import { Specie } from "src/species/domain/models/specie.model";
import { SpecieFilmsRepository } from "src/species/domain/repository/specie-films.repository";
import { SpeciePeopleRepository } from "src/species/domain/repository/specie-people.repository";
import { SpeciesRepository } from "src/species/domain/repository/species.repostory";

export class GetSpeciesUseCase {

    constructor(
        private readonly speciesRepository: SpeciesRepository,
        private readonly speciePeopleRepository: SpeciePeopleRepository,
        private readonly specieFilmsRepository: SpecieFilmsRepository
    ) { }

    async exec(): Promise<IResponse<Specie[]>> {
        const response = new ResponseHelper();

        let speciesFromDB: Specie[] = [];

        speciesFromDB = await this.speciesRepository.get();

        if (speciesFromDB.length === 0) {

            const speciesFromSwapi = await this.speciesRepository.getFromSwapi();

            if (speciesFromSwapi.results.length !== 0) {
                speciesFromSwapi.results.forEach(async (item: SpecieSwapi) => {
                    const createdSpecie = await this.speciesRepository.create({
                        altura_media: item.average_height,
                        esperanza_de_vida: item.average_lifespan,
                        clasificacion: item.classification,
                        creado: item.created,
                        designacion: item.designation,
                        editado: item.edited,
                        color_de_ojos: item.eye_colors,
                        color_de_pelo: item.hair_colors,
                        mundo_natal: item.homeworld,
                        idioma: item.language,
                        nombre: item.name,
                        colores_de_piel: item.skin_colors,
                        url: item.url
                    });

                    item.people.forEach((person) => {
                        this.speciePeopleRepository.create({
                            url: person,
                            especie: createdSpecie
                        })
                    });

                    item.films.forEach((film) => {
                        this.specieFilmsRepository.create({
                            url: film,
                            especie: createdSpecie
                        })
                    })

                });

            }

            response.result(TranslatorHelper.arrayOfObjects(speciesFromSwapi.results));
            return response.resolve();
        }

        const processedSpeciesFromDB = speciesFromDB.map((specie: Specie) => {
            return {
                ...specie,
                personas: specie.personas.map((persona: SpeciePeople) => persona.url),
                peliculas: specie.peliculas.map((pelicula: SpecieFilm) => pelicula.url)
            };
        });

        response.result(processedSpeciesFromDB);
        return response.resolve();
    }

}
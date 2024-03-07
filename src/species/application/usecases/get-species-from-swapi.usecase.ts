import { ResponseHelper } from "src/common/helpers/response.helper";
import { TranslatorHelper } from "src/common/helpers/translator.helper";
import { IResponse } from "src/common/interfaces/Response.interface";
import { Specie } from "src/species/domain/models/specie.model";
import { SpeciesRepository } from "src/species/domain/repository/species.repostory";

export class GetSpeciesFromSwapiUseCase {
    constructor(
        private readonly speciesRepository: SpeciesRepository,
    ) { }

    async exec(): Promise<IResponse<Specie[]>> {
        const response = new ResponseHelper();

        const speciesFromSwapi = await this.speciesRepository.getFromSwapi();

        response.result(TranslatorHelper.arrayOfObjects(speciesFromSwapi.results));
        return response.resolve();
    }
}
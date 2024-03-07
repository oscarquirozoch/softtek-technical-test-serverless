import { Body, Controller, Get, Post } from "@nestjs/common";
import { GetSpeciesUseCase } from "src/species/application/usecases/get-species.usecase";
import { SpeciesRepositoryImpl } from "../repository/specie.repositoryimpl";
import { SpeciesPeopleRepositoryImpl } from "../repository/specie-people.repositoryimpl";
import { SpecieFilmsRepositoryImpl } from "../repository/specie-films.repositoryimpl";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Specie } from "src/species/domain/models/specie.model";
import { IResponse } from "src/common/interfaces/Response.interface";
import { CreateSpecieUseCase } from "src/species/application/usecases/create-specie.usecase";
import { CreateSpecieDto } from "src/species/application/dto/create-specie.dto";
import { GetSpeciesFromSwapiUseCase } from "src/species/application/usecases/get-species-from-swapi.usecase";

@ApiTags('species')
@Controller('species')
export class SpeciesController {

    constructor(
        private readonly speciesRepostory: SpeciesRepositoryImpl,
        private readonly speciePeopleRepository: SpeciesPeopleRepositoryImpl,
        private readonly specieFilmsRepository: SpecieFilmsRepositoryImpl
    ) { }

    @Get()
    @ApiOperation({
        summary: 'Obtener especies',
        description: `Servicio que retorna tipos de personas o personajes dentro del Universo Star Wars. 
            Si en la primera consulta no se encuentran registros en la base de datos, el servicio consultará al api de 
            swapi para obtener datos y estos se registrarán antes de su devolución.`,
    })
    @ApiResponse({ status: 200, description: 'OK', type: Specie })
    @ApiResponse({ status: 400, description: 'Bad request' })
    get(): Promise<IResponse<Specie[]>> {
        return new GetSpeciesUseCase(
            this.speciesRepostory,
            this.speciePeopleRepository,
            this.specieFilmsRepository
        ).exec();
    }

    @Get('/swapi')
    @ApiOperation({
        summary: 'Obtener especies desde API Swapi',
        description: `Servicio que retorna tipos de personas o personajes dentro del Universo Star Wars desde el api Swapi`,
    })
    @ApiResponse({ status: 200, description: 'OK', type: Specie })
    @ApiResponse({ status: 400, description: 'Bad request' })
    getFromSwapi(): Promise<IResponse<Specie[]>> {
        return new GetSpeciesFromSwapiUseCase(
            this.speciesRepostory,
        ).exec();
    }

    @Post()
    @ApiOperation({
        summary: 'Registrar especie',
        description: `Servicio para registrar una nueva especie.`,
    })
    @ApiResponse({ status: 200, description: 'OK', type: Specie })
    @ApiResponse({ status: 201, description: 'Created', type: Specie })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    create(@Body() createSpecieDto: CreateSpecieDto): Promise<IResponse<Specie>> {
        return new CreateSpecieUseCase(
            this.speciesRepostory,
            this.speciePeopleRepository,
            this.specieFilmsRepository
        ).exec(createSpecieDto);
    }

}
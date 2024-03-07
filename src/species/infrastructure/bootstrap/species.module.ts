import { Module } from "@nestjs/common";
import { SpeciesController } from "../controller/species.controller";
import { SpeciesRepositoryImpl } from "../repository/specie.repositoryimpl";
import { ProvidersModule } from "src/common/providers/providers.module";
import { HttpCustomService } from "src/common/providers/http/http-custom.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SpecieEntity } from "../entities/specie.entity";
import { SpeciePeopleEntity } from "../entities/specie-people.entity";
import { SpecieFilmEntity } from "../entities/specie-films.entity";
import { SpeciesPeopleRepositoryImpl } from "../repository/specie-people.repositoryimpl";
import { SpecieFilmsRepositoryImpl } from "../repository/specie-films.repositoryimpl";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            SpecieEntity,
            SpeciePeopleEntity,
            SpecieFilmEntity
        ]),
        ProvidersModule
    ],
    controllers: [
        SpeciesController
    ],
    providers: [
        HttpCustomService,
        SpeciesRepositoryImpl,
        SpeciesPeopleRepositoryImpl,
        SpecieFilmsRepositoryImpl
    ]
})
export class SpeciesModule { }
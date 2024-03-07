import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SpeciePeopleEntity } from "../entities/specie-people.entity";
import { SpeciePeople } from "src/species/domain/models/specie-people.model";
import { SpeciePeopleRepository } from "src/species/domain/repository/specie-people.repository";

@Injectable()
export class SpeciesPeopleRepositoryImpl implements SpeciePeopleRepository {

    constructor(
        @InjectRepository(SpeciePeopleEntity)
        private speciePeopleRepository: Repository<SpeciePeopleEntity>,
    ) { }

    show(id: any): Promise<SpeciePeople> {
        throw new Error("Method not implemented.");
    }

    get(): Promise<SpeciePeople[]> {
        return Promise.resolve([]);
    }

    async create(data: SpeciePeople): Promise<SpeciePeople> {
        try {
            const speciePeople: SpeciePeopleEntity = this.speciePeopleRepository.create(data)
            await this.speciePeopleRepository.manager.save(speciePeople);
            return speciePeople;
        } catch (err) {
            console.log(err);
        }
    }

    update(id: any, data: SpeciePeople): Promise<SpeciePeople> {
        throw new Error("Method not implemented.");
    }

    delete(id: any): Promise<SpeciePeople> {
        throw new Error("Method not implemented.");
    }
}
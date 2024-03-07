import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SpecieEntity } from "./specie.entity";

@Entity('specie_people')
export class SpeciePeopleEntity {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
        type: 'varchar'
    })
    url: string;

    @ManyToOne(() => SpecieEntity, (especie) => especie.personas)
    @JoinColumn({ name: 'especie_id' })
    especie: SpecieEntity

}
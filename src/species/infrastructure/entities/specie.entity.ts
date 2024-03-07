import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SpeciePeopleEntity } from "./specie-people.entity";
import { SpecieFilmEntity } from "./specie-films.entity";

@Entity('species')
export class SpecieEntity {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
        type: 'varchar',
        length: 150
    })
    nombre: string;

    @Column({
        type: 'varchar',
        length: 10,
    })
    altura_media: string;

    @Column({
        type: 'varchar',
        length: 10
    })
    esperanza_de_vida: string;

    @Column({
        type: 'varchar',
        length: 100
    })
    clasificacion: string;

    @Column({
        type: 'varchar',
        length: 100
    })
    designacion: string;

    @Column({
        type: 'varchar',
        length: 150
    })
    color_de_ojos: string;

    @Column({
        type: 'varchar',
        length: 150
    })
    color_de_pelo: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true
    })
    mundo_natal: string;

    @Column({
        type: 'varchar',
        length: 70,
        nullable: true
    })
    idioma: string;

    @Column({
        type: 'varchar',
        length: 150
    })
    colores_de_piel: string;

    @Column({
        type: 'varchar'
    })
    url: string;

    @Column({
        type: 'datetime'
    })
    creado: Date;

    @Column({
        type: 'datetime'
    })
    editado: Date;

    @OneToMany(type => SpeciePeopleEntity, persona => persona.especie)
    personas: SpeciePeopleEntity[];

    @OneToMany(type => SpecieFilmEntity, pelicula => pelicula.especie)
    peliculas: SpecieFilmEntity[];
}
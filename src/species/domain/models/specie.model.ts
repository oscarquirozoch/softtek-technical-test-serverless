import { ApiProperty } from "@nestjs/swagger";
import { SpecieFilm } from "./specie-film.model";
import { SpeciePeople } from "./specie-people.model";

export class Specie {

    @ApiProperty()
    id?: number;

    @ApiProperty()
    altura_media: string;

    @ApiProperty()
    esperanza_de_vida: string;

    @ApiProperty()
    clasificacion: string;

    @ApiProperty()
    creado: Date;

    @ApiProperty()
    designacion: string;

    @ApiProperty()
    editado: Date;

    @ApiProperty()
    color_de_ojos: string;

    @ApiProperty()
    color_de_pelo: string;

    @ApiProperty()
    mundo_natal: string;

    @ApiProperty()
    idioma: string;

    @ApiProperty()
    nombre: string;

    @ApiProperty()
    colores_de_piel: string;

    @ApiProperty()
    url: string;

    @ApiProperty()
    personas?: SpeciePeople[];

    @ApiProperty()
    peliculas?: SpecieFilm[];
}

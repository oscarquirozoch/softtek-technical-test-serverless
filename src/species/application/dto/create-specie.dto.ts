import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateSpecieDto {

    @ApiProperty()
    @IsString()
    @MaxLength(150)
    nombre: string;

    @ApiProperty()
    @IsString()
    @MaxLength(10)
    altura_media: string;

    @ApiProperty()
    @IsString()
    @MaxLength(10)
    esperanza_de_vida: string;

    @ApiProperty()
    @IsString()
    @MaxLength(100)
    clasificacion: string;

    @ApiProperty()
    @IsString()
    @MaxLength(100)
    designacion: string;

    @ApiProperty()
    @IsString()
    @MaxLength(150)
    color_de_ojos: string;

    @ApiProperty()
    @IsString()
    @MaxLength(150)
    color_de_pelo: string;

    @ApiProperty({ required: false })
    @IsString()
    @MaxLength(100)
    @IsOptional()
    mundo_natal: string;

    @ApiProperty({ required: false})
    @IsString()
    @MaxLength(70)
    @IsOptional()
    idioma: string;

    @ApiProperty()
    @IsString()
    @MaxLength(150)
    colores_de_piel: string;

    @ApiProperty()
    @IsString()
    url: string;

    @ApiProperty()
    @IsArray()
    readonly personas: string[];

    @ApiProperty()
    @IsArray()
    readonly peliculas: string[];
}
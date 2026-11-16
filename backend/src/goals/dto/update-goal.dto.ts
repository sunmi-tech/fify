import { IsString, IsNotEmpty, IsNumber, IsInt, Min, IsOptional } from "class-validator";

export class UpdatedGoalDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name?: string;

    @IsOptional()
    @IsNumber()
    @IsInt()
    @Min(1)
    goalAmount?: number;
}
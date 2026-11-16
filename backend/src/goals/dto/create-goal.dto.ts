import { IsString, IsNotEmpty, IsNumber, IsInt, Min } from "class-validator";
// DTO: 어떤 데이터를 허용할지 검증 규칙을 정의 

// NestJS에서 DTO를 class로 만드는 중요한 이유는
// TypeScript의 type은 JavaScript로 변환될 때 사라지지만,
// class는 실행 시점에도 존재함
export class CreateGoalDto {
    // name 값이 문자열인지 검사하는 검증 규칙
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    // 정수인지 검사하는 규칙
    @IsInt()
    @Min(1)
    goalAmount: number;
}
import { IsString, IsNotEmpty, Matches, MinLength, IsDecimal, Min } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsDecimal({ force_decimal: true, decimal_digits: '2' })
    @IsNotEmpty({ message: 'Price is required' })
    @Min(0, { message: 'Price must be greater than or equal to 0' })
    price: number;
}
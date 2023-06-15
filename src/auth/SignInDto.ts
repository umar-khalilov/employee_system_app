import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
    @IsString({ message: 'email must be a string value' })
    @IsNotEmpty({ message: 'email cannot be an empty value' })
    readonly email: string;

    @IsString({ message: 'password must be a string value' })
    @IsNotEmpty({ message: 'password cannot be an empty value' })
    readonly password: string;
}

import { IsNotEmpty } from 'class-validator';

export class LoginRequestDto {
  @IsNotEmpty({ message: 'El nombre de usuario no puede estar vacío.' })
  username: string;
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' })
  password: string;
}

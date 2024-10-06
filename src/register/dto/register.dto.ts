import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  Length,
} from 'class-validator';

export class RegisterRequestDto {
  @IsNotEmpty({ message: 'El nombre de usuario no puede estar vacío.' })
  @IsString({ message: 'El nombre de usuario debe ser una cadena de texto.' })
  @Length(1, 10, {
    message: 'El nombre de usuario debe tener entre 1 y 10 caracteres.',
  })
  username: string;

  @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' })
  @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  @Length(6, 20, {
    message: 'La contraseña debe tener entre 6 y 20 caracteres.',
  })
  password: string;

  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @Length(3, 40, { message: 'El nombre debe tener entre 3 y 40 caracteres.' })
  firstName: string;

  @IsNotEmpty({ message: 'El apellido no puede estar vacío.' })
  @IsString({ message: 'El apellido debe ser una cadena de texto.' })
  @Length(3, 40, { message: 'El apellido debe tener entre 3 y 40 caracteres.' })
  lastName: string;

  @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío.' })
  @IsEmail(
    {},
    { message: 'Por favor, introduce un correo electrónico válido.' },
  )
  @Length(1, 70, {
    message: 'El correo electrónico debe tener entre 1 y 70 caracteres.',
  })
  email: string;

  @IsNotEmpty({ message: 'El número de teléfono no puede estar vacío.' })
  @IsNumberString(
    {},
    { message: 'El número de teléfono debe contener solo dígitos.' },
  )
  @Length(10, 10, {
    message: 'El número de teléfono debe tener exactamente 10 dígitos.',
  })
  phoneNumber: string;

  @IsNotEmpty({ message: 'El número de documento no puede estar vacío.' })
  @IsNumberString(
    {},
    { message: 'El número de documento debe contener solo dígitos.' },
  )
  @Length(6, 10, {
    message: 'El número de documento debe tener entre 6 y 10 caracteres.',
  })
  documentNumber: string;
}

export class RegisterResponseDto {
  @IsNumber()
  id: number;

  @IsString()
  username: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  documentNumber: string;
}

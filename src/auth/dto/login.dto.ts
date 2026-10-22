import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    required: true,
    example: 'tutor@soldadodelacruz.edu.ni',
    description: 'Correo registrado del tutor',
  })
  email: string;

  @ApiProperty({
    required: true,
    example: 'clave123',
    description: 'Contraseña del tutor',
  })
  password: string;
}
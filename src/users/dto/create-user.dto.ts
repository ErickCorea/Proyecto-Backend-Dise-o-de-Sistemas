import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    example: 'tutor@soldadodelacruz.edu.ni',
    description: 'Correo electrónico del padre o tutor',
  })
  email: string;

  @ApiProperty({
    required: true,
    example: 'clave123',
    description: 'Contraseña de acceso',
  })
  password: string;

  @ApiProperty({
    required: false,
    example: 'Erick Corea',
    description: 'Nombre completo del usuario o tutor',
  })
  nombre?: string;
}
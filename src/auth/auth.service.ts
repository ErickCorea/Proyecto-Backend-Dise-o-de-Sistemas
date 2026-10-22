import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(data: LoginDto) {
    const user = await this.prisma.usuario.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      rol: user.rol,
    });

    return {
      access_token: token,
      usuario: {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        rol: user.rol,
      },
    };
  }
}
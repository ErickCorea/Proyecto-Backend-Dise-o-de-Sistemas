import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MatriculasService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMatriculaDto) {
    // 1. Validar aceptación de reglamento para Nuevo Ingreso (RF-04)
    if (dto.tipoMatricula === 'Nuevo ingreso' && dto.aceptoReglamento === false) {
      throw new BadRequestException(
        'Debe aceptar todas las secciones del reglamento para continuar con Nuevo Ingreso.',
      );
    }

    // 2. Validar que al menos un conjunto de datos (madre, padre o tutor) esté completo (RF-06)
    const tieneMadre = dto.nombreMadre && dto.cedulaMadre && dto.telefonoMadre;
    const tienePadre = dto.nombrePadre && dto.cedulaPadre && dto.telefonoPadre;
    const tieneTutor = dto.nombreTutor && dto.cedulaTutor && dto.telefonoTutor;

    if (!tieneMadre && !tienePadre && !tieneTutor) {
      throw new BadRequestException(
        'Debe completar al menos un conjunto de datos (madre, padre o tutor).',
      );
    }

    // 3. Generar código único de matrícula (RF-09)
    const codigoUnicoMatricula = `MAT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // 4. Guardar Parte 2 (Tutor), Parte 1 (Estudiante) y Parte 3 (Matrícula) en la BD
    const nuevaMatricula = await this.prisma.matricula.create({
      data: {
        codigoMatricula: codigoUnicoMatricula,
        tipoMatricula: dto.tipoMatricula || 'Nuevo ingreso',
        aceptoReglamento: dto.aceptoReglamento ?? true,
        fechaMatricula: dto.fechaMatricula,
        departamentoCentro: dto.departamentoCentro || dto.departamento,
        codigoUnico: dto.codigoUnico || '14432',
        codigoCentro: dto.codigoCentro || '22224',
        nombreCentro: dto.nombreCentro || 'Colegio Soldado de la Cruz',
        nivelEducativo: dto.nivelEducativo,
        modalidad: dto.modalidad,
        turno: dto.turno,
        grado: dto.grado,
        seccion: dto.seccion,
        repitente: dto.repitente,
        estadoMatricula: 'MATRICULADO',
        usuario: dto.usuarioId ? { connect: { id: Number(dto.usuarioId) } } : undefined,
        estudiante: {
          create: {
            telefono: dto.telefono,
            direccion: dto.direccion,
            nombre: dto.nombre,
            segundoNombre: dto.segundoNombre,
            apellido1: dto.apellido1,
            apellido2: dto.apellido2,
            fechaNacimiento: dto.fechaNacimiento,
            genero: dto.genero,
            peso: Number(dto.peso),
            talla: Number(dto.talla),
            nacionalidad: dto.nacionalidad,
            paisNacimiento: dto.paisNacimiento,
            departamento: dto.departamento,
            municipio: dto.municipio,
            lenguaMaterna: dto.lenguaMaterna,
            discapacidad: dto.discapacidad,
            territorioIndigena: dto.territorioIndigena,
            habitaIndigena: dto.habitaIndigena,
            tutor: {
              create: {
                nombreMadre: dto.nombreMadre,
                cedulaMadre: dto.cedulaMadre,
                telefonoMadre: dto.telefonoMadre,
                nombrePadre: dto.nombrePadre,
                cedulaPadre: dto.cedulaPadre,
                telefonoPadre: dto.telefonoPadre,
                nombreTutor: dto.nombreTutor,
                cedulaTutor: dto.cedulaTutor,
                telefonoTutor: dto.telefonoTutor,
              },
            },
          },
        },
      },
      include: {
        estudiante: {
          include: {
            tutor: true,
          },
        },
      },
    });

    return {
      mensaje: 'Matrícula procesada exitosamente',
      estado: nuevaMatricula.estadoMatricula,
      codigoMatricula: nuevaMatricula.codigoMatricula,
      datos: nuevaMatricula,
    };
  }

  findAll() {
    return this.prisma.matricula.findMany({
      include: {
        estudiante: {
          include: {
            tutor: true,
          },
        },
      },
      orderBy: { creadoEn: 'desc' },
    });
  }

  async findOne(id: number) {
    const matricula = await this.prisma.matricula.findUnique({
      where: { id },
      include: {
        estudiante: {
          include: {
            tutor: true,
          },
        },
      },
    });

    if (!matricula) {
      throw new NotFoundException(`Matrícula con ID #${id} no encontrada`);
    }
    return matricula;
  }

  // Lee el catálogo JSON creado por César Pereira en src/data/oferta-academica.json
  obtenerOfertaAcademica() {
    const filePath = path.join(process.cwd(), 'src', 'data', 'oferta-academica.json');
    if (fs.existsSync(filePath)) {
      const contenido = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(contenido);
    }
    return [];
  }

  update(id: number, updateMatriculaDto: UpdateMatriculaDto) {
    return this.prisma.matricula.update({
      where: { id },
      data: updateMatriculaDto,
    });
  }

  remove(id: number) {
    return this.prisma.matricula.delete({
      where: { id },
    });
  }
}
import { ApiProperty } from '@nestjs/swagger';

export class CreateMatriculaDto {
  // --- FLUJOGRAMA: TIPO DE MATRÍCULA Y REGLAMENTO ---
  @ApiProperty({ example: 'Nuevo ingreso', description: 'Nuevo ingreso o Reingreso' })
  tipoMatricula?: string;

  @ApiProperty({ example: true, description: 'Confirmación de lectura del reglamento' })
  aceptoReglamento?: boolean;

  @ApiProperty({ required: false, example: 1, description: 'ID del usuario autenticado (opcional)' })
  usuarioId?: number;

  // --- PARTE 1: DATOS PERSONALES DEL ESTUDIANTE ---
  @ApiProperty({ example: '88887777' })
  telefono: string;

  @ApiProperty({ example: 'Barrio Monseñor Lezcano, de la estatua 2c al sur' })
  direccion: string;

  @ApiProperty({ example: 'Carlos' })
  nombre: string;

  @ApiProperty({ required: false, example: 'Alberto' })
  segundoNombre?: string;

  @ApiProperty({ example: 'Martínez' })
  apellido1: string;

  @ApiProperty({ required: false, example: 'Rivas' })
  apellido2?: string;

  @ApiProperty({ example: '2014-05-15' })
  fechaNacimiento: string;

  @ApiProperty({ example: 'Masculino' })
  genero: string;

  @ApiProperty({ example: 42.5 })
  peso: number;

  @ApiProperty({ example: 148 })
  talla: number;

  @ApiProperty({ example: 'Nicaragüense' })
  nacionalidad: string;

  @ApiProperty({ example: 'Nicaragua' })
  paisNacimiento: string;

  @ApiProperty({ example: 'Managua' })
  departamento: string;

  @ApiProperty({ example: 'Distrito II' })
  municipio: string;

  @ApiProperty({ example: 'Español' })
  lenguaMaterna: string;

  @ApiProperty({ example: 'Ninguna' })
  discapacidad: string;

  @ApiProperty({ required: false, example: 'No' })
  territorioIndigena?: string;

  @ApiProperty({ required: false, example: 'No' })
  habitaIndigena?: string;

  // --- PARTE 2: DATOS PERSONALES DE LOS PADRES O TUTOR ---
  @ApiProperty({ required: false, example: 'María Elena Rivas' })
  nombreMadre?: string;

  @ApiProperty({ required: false, example: '001-150485-0012A' })
  cedulaMadre?: string;

  @ApiProperty({ required: false, example: '88112233' })
  telefonoMadre?: string;

  @ApiProperty({ required: false, example: 'Roberto Martínez' })
  nombrePadre?: string;

  @ApiProperty({ required: false, example: '001-200882-0045B' })
  cedulaPadre?: string;

  @ApiProperty({ required: false, example: '88445566' })
  telefonoPadre?: string;

  @ApiProperty({ required: false, example: 'María Elena Rivas' })
  nombreTutor?: string;

  @ApiProperty({ required: false, example: '001-150485-0012A' })
  cedulaTutor?: string;

  @ApiProperty({ required: false, example: '88112233' })
  telefonoTutor?: string;

  // --- PARTE 3: DATOS ACADÉMICOS DEL ESTUDIANTE ---
  @ApiProperty({ example: '2026-10-21' })
  fechaMatricula: string;

  @ApiProperty({ required: false, example: 'Managua' })
  departamentoCentro?: string;

  @ApiProperty({ required: false, example: '14432' })
  codigoUnico?: string;

  @ApiProperty({ required: false, example: '22224' })
  codigoCentro?: string;

  @ApiProperty({ required: false, example: 'Colegio Soldado de la Cruz' })
  nombreCentro?: string;

  @ApiProperty({ example: 'Educación Secundaria' })
  nivelEducativo: string;

  @ApiProperty({ example: 'Secundaria' })
  modalidad: string;

  @ApiProperty({ example: 'Matutino' })
  turno: string;

  @ApiProperty({ example: 'Séptimo grado/Primer año' })
  grado: string;

  @ApiProperty({ example: 'A' })
  seccion: string;

  @ApiProperty({ example: 'No' })
  repitente: string;
}
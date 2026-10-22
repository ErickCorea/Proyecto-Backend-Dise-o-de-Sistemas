import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MatriculasService } from './matriculas.service';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Matriculas')
@Controller('matriculas')
export class MatriculasController {
  constructor(private readonly matriculasService: MatriculasService) {}

  @Post()
  @ApiOperation({
    summary: 'Registrar formulario de matrícula completo (Partes 1, 2 y 3)',
  })
  create(@Body() createMatriculaDto: CreateMatriculaDto) {
    return this.matriculasService.create(createMatriculaDto);
  }

  @Get('oferta-academica')
  @ApiOperation({
    summary: 'Consultar catálogo de oferta académica y cupos disponibles',
  })
  obtenerOferta() {
    return this.matriculasService.obtenerOfertaAcademica();
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todas las matrículas registradas con datos de estudiante y tutor',
  })
  findAll() {
    return this.matriculasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consultar expediente de matrícula por ID (Reingreso / Recibo)' })
  findOne(@Param('id') id: string) {
    return this.matriculasService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar datos de una matrícula' })
  update(
    @Param('id') id: string,
    @Body() updateMatriculaDto: UpdateMatriculaDto,
  ) {
    return this.matriculasService.update(+id, updateMatriculaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un registro de matrícula' })
  remove(@Param('id') id: string) {
    return this.matriculasService.remove(+id);
  }
}
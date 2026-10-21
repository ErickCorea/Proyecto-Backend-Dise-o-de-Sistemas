-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nombre" TEXT,
    "rol" TEXT NOT NULL DEFAULT 'TUTOR',
    "creadoEn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Estudiante" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "telefono" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "segundoNombre" TEXT,
    "apellido1" TEXT NOT NULL,
    "apellido2" TEXT,
    "fechaNacimiento" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "peso" REAL NOT NULL,
    "talla" REAL NOT NULL,
    "nacionalidad" TEXT NOT NULL,
    "paisNacimiento" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "lenguaMaterna" TEXT NOT NULL,
    "discapacidad" TEXT NOT NULL,
    "territorioIndigena" TEXT,
    "habitaIndigena" TEXT,
    "tutorId" INTEGER NOT NULL,
    CONSTRAINT "Estudiante_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tutor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombreMadre" TEXT,
    "cedulaMadre" TEXT,
    "telefonoMadre" TEXT,
    "nombrePadre" TEXT,
    "cedulaPadre" TEXT,
    "telefonoPadre" TEXT,
    "nombreTutor" TEXT,
    "cedulaTutor" TEXT,
    "telefonoTutor" TEXT
);

-- CreateTable
CREATE TABLE "Matricula" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigoMatricula" TEXT NOT NULL,
    "tipoMatricula" TEXT NOT NULL DEFAULT 'Nuevo ingreso',
    "aceptoReglamento" BOOLEAN NOT NULL DEFAULT true,
    "fechaMatricula" TEXT NOT NULL,
    "departamentoCentro" TEXT NOT NULL,
    "codigoUnico" TEXT NOT NULL DEFAULT '14432',
    "codigoCentro" TEXT NOT NULL DEFAULT '22224',
    "nombreCentro" TEXT NOT NULL DEFAULT 'Colegio Soldado de la Cruz',
    "nivelEducativo" TEXT NOT NULL,
    "modalidad" TEXT NOT NULL,
    "turno" TEXT NOT NULL,
    "grado" TEXT NOT NULL,
    "seccion" TEXT NOT NULL,
    "repitente" TEXT NOT NULL,
    "estadoMatricula" TEXT NOT NULL DEFAULT 'MATRICULADO',
    "creadoEn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estudianteId" INTEGER NOT NULL,
    "usuarioId" INTEGER,
    CONSTRAINT "Matricula_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "Estudiante" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Matricula_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Matricula_codigoMatricula_key" ON "Matricula"("codigoMatricula");

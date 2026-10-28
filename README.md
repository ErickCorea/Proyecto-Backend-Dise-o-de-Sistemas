# Sistema Web de Matrícula - Instituto Educativo Soldado de la Cruz (Backend API)

API RESTful desarrollada para la gestión y automatización del proceso de registro de matrícula estudiantil (Nuevo Ingreso y Reingreso) del **Instituto Educativo Soldado de la Cruz**, Managua, Nicaragua.

Proyecto de curso de la asignatura **Diseño de Sistemas de Internet** - **Universidad Nacional de Ingeniería (UNI)**.

---

## Autores del Proyecto
* **Br. Erick Leonel Corea Soto** (2018-1021U) - *Arquitectura Base, Base de Datos Prisma, Autenticación JWT y Módulo de Matrículas.*
* **Br. Cesar Andrés Pereira Aguinaga** (2020-0923U) - *Catálogo de datos de Oferta Académica.*
* **Br. Julissa del Carmen López Rivas** (2016-0799I) - *Configuración de plantilla de entorno y documentación de Endpoints.*

**Docente:** Ing. Cristopher Larios

---

## Tecnologías Utilizadas
* **Entorno y Lenguaje:** Node.js + TypeScript
* **Framework Backend:** NestJS (Arquitectura Monolítica Modular en 3 Capas)
* **ORM y Base de Datos:** Prisma ORM + SQLite
* **Seguridad y Sesiones:** Passport.js, JSON Web Tokens (JWT) y Bcryptjs
* **Documentación Interactiva:** Swagger / OpenAPI

---

## Patrones de Diseño Implementados
* **MVC con Capa de Servicios (Service-Repository):** Separación entre Controladores HTTP, Servicios con lógica de negocio UWE y Modelo de datos en Prisma.
* **Data Transfer Object (DTO):** Validación y estructuración de cargas útiles para Login, Usuarios y Formulario de Matrícula en 3 partes.
* **Singleton e Inyección de Dependencias:** Instancia única de conexión a base de datos mediante `PrismaModule` y `PrismaService`.

---

## Instalación y Ejecución Local

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/ErickCorea/Proyecto-Backend-Dise-o-de-Sistemas.git](https://github.com/ErickCorea/Proyecto-Backend-Dise-o-de-Sistemas.git)
   cd Proyecto-Backend-Dise-o-de-Sistemas

---
## Ejecución con Docker (Contenedor)

Si desea levantar el servidor y la base de datos SQLite automáticamente dentro de un contenedor Docker sin instalar dependencias locales:

1. **Construir e iniciar el contenedor:**
   ```bash
   docker compose up --build -d
# 1. Usar una versión estable y ligera de Node.js 20
FROM node:20-slim

# 2. Instalar OpenSSL (requerido por el motor de Prisma ORM)
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# 3. Crear la carpeta de trabajo dentro del contenedor
WORKDIR /app

# 4. Copiar los archivos de dependencias y la carpeta prisma
COPY package*.json ./
COPY prisma ./prisma/

# 5. Instalar las librerías y generar el cliente de Prisma
RUN npm install
RUN npx prisma generate

# 6. Copiar todo el resto del código del backend
COPY . .

# 7. Compilar el proyecto NestJS a producción
RUN npm run build

# 8. Exponer el puerto 3000 del servidor
EXPOSE 3000

# 9. Crear la base de datos SQLite aplicando las migraciones y encender el servidor
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]
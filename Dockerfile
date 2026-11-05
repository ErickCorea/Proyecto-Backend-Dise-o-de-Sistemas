FROM node:20-slim

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Variables de entorno por defecto para pruebas en CI y despliegue en Render
ENV PORT=3000
ENV DATABASE_URL="file:./dev.db"
ENV JWT_SECRET="soldado-de-la-cruz-secret-key-2026"

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npx prisma db push && npm run start:prod"]
# Etapa 1: build da aplicação
FROM node:18-alpine AS builder

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos necessários
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Compila o TypeScript para JavaScript
RUN npm run build

# Etapa 2: imagem final para produção
FROM node:18-alpine

WORKDIR /app

# Copia os arquivos compilados da etapa anterior
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/dist/db ./db

RUN npm install --omit=dev

# Expõe a porta que o servidor usa
EXPOSE 3333

# Comando para rodar o servidor
CMD ["npm", "start"]


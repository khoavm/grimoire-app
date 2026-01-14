FROM node:22-alpine AS builder

WORKDIR /app

# Cache node_modules
COPY package*.json ./
RUN npm install

# Copy source và build
COPY . .
RUN npm run build

# Sau khi build xong, file sẽ nằm ở /app/dist bên trong Image này
# Imagen oficial de Node
FROM node:18

# Directorio de trabajo
WORKDIR /app

# Copiar package.json e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Exponer el puerto del backend
EXPOSE 4000

# Comando de arranque
CMD ["npm", "start"]

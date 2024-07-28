FROM node:22

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Instalar PM2 globalmente
RUN npm install pm2 -g

# Copiar el resto del código de la aplicación
COPY . .

# Copiar el archivo de variables de entorno
COPY .env .env

# Exponer el puerto en el que la aplicación va a correr
EXPOSE 3000

# Comando para iniciar la aplicación con PM2
CMD ["pm2-runtime", "start", "server.js"]

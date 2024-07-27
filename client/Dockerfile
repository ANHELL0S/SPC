# Usa una imagen base adecuada para tu aplicación frontend
FROM node:latest 

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Expone el puerto en el que se ejecuta tu aplicación (ajusta según sea necesario)
EXPOSE 5173

# Comando para ejecutar la aplicación cuando se inicie el contenedor
CMD ["npm", "run", "start"]

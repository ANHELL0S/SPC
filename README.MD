# Guía de Configuración SPC - UEB

## 1. Server Project

1. **Inicializar un nuevo proyecto de Node.js:**

   ```bash
   npm init -y
   ```

This project is a Node.js server application that uses a variety of technologies and packages to handle server-side logic, database interactions, and email notifications.

### Dependencies

- **Axios** (`axios`): A promise-based HTTP client for making requests to external APIs.
- **bcrypt** (`bcrypt`): A library for hashing and comparing passwords securely.
- **chalk** (`chalk`): A library for styling and formatting terminal strings.
- **cookie-parser** (`cookie-parser`): Middleware for parsing cookies in HTTP requests.
- **cors** (`cors`): Middleware for enabling Cross-Origin Resource Sharing (CORS).
- **dotenv** (`dotenv`): Loads environment variables from a `.env` file into `process.env`.
- **express** (`express`): A minimal and flexible Node.js web application framework.
- **jsonwebtoken** (`jsonwebtoken`): A library for working with JSON Web Tokens (JWT).
- **morgan** (`morgan`): HTTP request logger middleware for Node.js.
- **node-cron** (`node-cron`): A cron-like job scheduler for Node.js.
- **nodemailer** (`nodemailer`): A module for sending emails from Node.js applications.
- **pg** (`pg`): PostgreSQL client for Node.js.
- **pm2** (`pm2`): A process manager for Node.js applications, enabling easy process management and monitoring.
- **sequelize** (`sequelize`): A promise-based ORM (Object-Relational Mapping) for Node.js, supporting PostgreSQL, MySQL, MariaDB, SQLite, and Microsoft SQL Server.
- **zod** (`zod`): A TypeScript-first schema validation library.

### DevDependencies

- **nodemon** (`nodemon`): A tool that automatically restarts the Node.js application when file changes are detected.

## Installation

To install the necessary dependencies, run:

```bash
npm install
```

3. **Iniciar el servidor**

Para iniciar el servidor, ejecuta el siguiente comando:

```bash
npm run dev
```

## 2. Client Project

1. **Inicializar el proyecto de React:**

   ```bash
   npm create vite@latest
   ```

This project is a React application built using Vite. It features a variety of libraries and tools for state management, form handling, and UI components to provide a robust and interactive user experience.

### Dependencies

- **@emotion/react** (`@emotion/react`): A library for writing CSS styles with JavaScript.
- **@emotion/styled** (`@emotion/styled`): Provides a way to create styled components using Emotion.
- **@heroicons/react** (`@heroicons/react`): A set of free, MIT-licensed high-quality SVG icons for React.
- **@hookform/resolvers** (`@hookform/resolvers`): Validation resolvers for `react-hook-form`.
- **@reduxjs/toolkit** (`@reduxjs/toolkit`): The official, recommended way to write Redux logic.
- **avvvatars-react** (`avvvatars-react`): React components for generating avatar images.
- **axios** (`axios`): A promise-based HTTP client for making API requests.
- **chart.js** (`chart.js`): A flexible JavaScript charting library.
- **cors** (`cors`): Middleware for enabling Cross-Origin Resource Sharing (CORS).
- **dotenv** (`dotenv`): Loads environment variables from a `.env` file into `process.env`.
- **formik** (`formik`): A library for managing form state and validation in React.
- **framer-motion** (`framer-motion`): A library for animations and transitions in React.
- **js-cookie** (`js-cookie`): A simple, lightweight JavaScript API for handling cookies.
- **jsonwebtoken** (`jsonwebtoken`): A library for working with JSON Web Tokens (JWT).
- **primereact** (`primereact`): A rich set of UI components for React.
- **prop-types** (`prop-types`): Runtime type checking for React props.
- **react** (`react`): A JavaScript library for building user interfaces.
- **react-chartjs-2** (`react-chartjs-2`): React wrapper for Chart.js.
- **react-data-table-component** (`react-data-table-component`): A React component for displaying data in a table format.
- **react-dom** (`react-dom`): The entry point for DOM-related rendering in React.
- **react-hook-form** (`react-hook-form`): A library for handling form validation and state in React.
- **react-icons** (`react-icons`): A collection of popular icons as React components.
- **react-redux** (`react-redux`): React bindings for Redux state management.
- **react-router-dom** (`react-router-dom`): Declarative routing for React applications.
- **react-spring** (`react-spring`): A library for creating animations and transitions in React.
- **react-table** (`react-table`): A flexible and lightweight table library for React.
- **react-tooltip** (`react-tooltip`): A tooltip component for React.
- **sonner** (`sonner`): A React notification library.
- **xlsx** (`xlsx`): A library for parsing and writing Excel files.
- **zod** (`zod`): A TypeScript-first schema validation library.

### DevDependencies

- **@babel/core** (`@babel/core`): Babel compiler core.
- **@babel/preset-env** (`@babel/preset-env`): Babel preset for compiling ES6+ down to ES5.
- **@babel/preset-react** (`@babel/preset-react`): Babel preset for compiling React code.
- **@types/react** (`@types/react`): TypeScript definitions for React.
- **@types/react-dom** (`@types/react-dom`): TypeScript definitions for React DOM.
- **@vitejs/plugin-react** (`@vitejs/plugin-react`): Vite plugin for React.
- **autoprefixer** (`autoprefixer`): PostCSS plugin to parse CSS and add vendor prefixes.
- **babel-loader** (`babel-loader`): Webpack loader for Babel.
- **eslint** (`eslint`): A tool for identifying and fixing problems in JavaScript code.
- **eslint-plugin-react** (`eslint-plugin-react`): ESLint plugin for React.
- **eslint-plugin-react-hooks** (`eslint-plugin-react-hooks`): ESLint plugin for React hooks.
- **eslint-plugin-react-refresh** (`eslint-plugin-react-refresh`): ESLint plugin for React Fast Refresh.
- **postcss** (`postcss`): A tool for transforming CSS with JavaScript plugins.
- **tailwindcss** (`tailwindcss`): A utility-first CSS framework for creating custom designs.
- **vite** (`vite`): A fast build tool and development server.
- **webpack** (`webpack`): A module bundler for JavaScript applications.
- **webpack-cli** (`webpack-cli`): CLI tool for Webpack.

## Installation

To install the necessary dependencies, run:

```bash
npm install
```

4. **Iniciar el cliente**

   Para iniciar el cliente, ejecuta el siguiente comando:

   ```bash
   npm run dev
   ```

## 3. Configuración de PGadmin4

1. **Iniciar servicio de PostgreSQL**

   ```bash
   sudo systemctl restart postgresql.service
   ```

2. **Crear un entorno virtual para PGadmin4:**

   ```bash
   python3 -m venv pgadmin4
   ```

3. **Activar el entorno virtual:**

   ```bash
   source pgadmin4/bin/activate
   ```

4. **Iniciar PGadmin4:**

   ```bash
   pgadmin4
   ```

5. **Credenciales de PGadmin4**

   - **Usuario:** aangelogarcia2021@gmail.com
   - **Contraseña:** Shouko2021@

6. **Configuración de PostgreSQL**

   - **IP:** 0.0.0.0
   - **Usuario:** angelo
   - **Contraseña:** angelo

7. **Credenciales admin SPC**

   - **Usuario:** admin@gmail.com
   - **Contraseña:** Admin1@gmail.com

## 4. Crear una imagen con Docker

Para ejecutar el proyecto en un contenedor Docker, sigue estos pasos:

1. **Preparación del entorno:**

   Asegúrate de tener Docker instalado en tu máquina. Si no lo tienes, puedes descargarlo desde [Docker Hub](https://hub.docker.com/).

   En sistemas Arch linux:

   ```sh
   sudo pacman -Syu
   sudo pacman -S docker
   ```

   Después de instalar Docker, necesitas iniciar y habilitar el servicio Docker para que se inicie automáticamente en el arranque:

   ```sh
   sudo systemctl start docker
   sudo systemctl enable docker
   sudo usermod -aG docker $USER
   ```

   Para asegurarte de que Docker está instalado y funcionando correctamente, ejecuta:

   ```sh
   docker --version
   ```

2. **Construir la imagen Docker - MANUAL:**

   - Abre una terminal y navega hasta el directorio raíz del proyecto donde se encuentra el archivo `Dockerfile`.

   ```sh
   cd /ruta-al-proyecto
   docker build -t NOMBRE_DE_LA_IMAGEN .
   ```

3. **Ejecutar la imagen Docker - MANUAL:**

   ```sh
   docker run --env-file=./.env -p 8080:PUERTO_DEFINIDO_DOCKERFILE -d --name NOMBRE_DEL_CONTENEDOR NOMBRE_DE_LA_IMAGEN
   ```

4. **Comandos utiles de docker:**

   Listar imagenes:

   ```sh
   docker images -a
   ```

   Listar contenedores:

   ```sh
   docker ps -a
   ```

   Detener el contenedor:

   ```sh
   docker stop CONTAINER-ID
   ```

   Eliminar el contenedor:

   ```sh
   docker rm CONTAINER-ID
   ```

   Eliminar la imagen:

   ```sh
   docker rmi NOMBRE_DE_LA_IMAGEN
   ```

   Ver directorio de la imagen docker:

   ```sh
   docker inspect --format='{{.GraphDriver.Data.MergedDir}}' NOMBRE_DE_LA_IMAGEN
   ```

## 5. Despliegue Nginx con docker LOCAL - YML

1. **Primeros pasos:**

- Instalar NGINX

```sh
sudo pacman -S nginx
```

- Habilitar e iniciar el servicio de NGINX

```sh
sudo systemctl enable nginx
sudo systemctl start nginx
```

Verificar la instalación de NGINX:

```sh
curl -I http://localhost
```

O abre un navegador web y navega a **http://localhost** o **http://127.0.0.1**

2. **Configurar nginx.conf:**

```sh
sudo nano /etc/nginx/nginx.conf
```

- Configuración del grupo upstream

  upstream spc_ueb {
  least_conn;
  server localhost:3001; # Puertos internos de tu servicio spc-ueb-app1
  server localhost:3002; # Puertos internos de tu servicio spc-ueb-app2
  }

  proxy_pass http://spc_ueb;

- Despues:

```sh
sudo nginx -t
```

3. **Construir y levantar los contenedores:**

Construir los contenedores, ejecuta dentro de la ruta de /server:

```sh
docker-compose up --build
```

Leventar los contenedores, dentro de /server:

```sh
docker-compose up -d
```

3. **Ver logs con pm2 de los contenedores:**

Entrar a los contenedores:

```sh
docker exec -it NAME_CONTAINER /bin/bash
```

Listar los contenedores:

```sh
pm2 list
```

Ver los logs del contenedores:

```sh
pm2 logs
```

## 6. Despliegue en Google Cloud

- Despue de haber creado la VM, sigue estos pasos:

1. **Ingresa por SSH a al VM:**

- Actualizar el sistema operativo:

```sh
sudo apt update
sudo apt upgrade
```

2. **Configurar docker:**

- Instalar docker:

```sh
sudo apt install docker.io
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt update
sudo apt install docker-ce
```

3. **Levantar una red docker:**

- Primero, crea una red Docker:

```sh
sudo docker network create spc-network
```

4. **Descarga las imagenes de docker:**

- Descargar la imagen de docker de SPC BD:

```sh
sudo docker pull anhell0s/spc-db
```

- Descargar la imagen de docker de SPC API:

```sh
sudo docker pull anhell0s/spc-ueb-app_1
```

- Descargar la imagen de docker de SPC FRONTEND:

```sh
sudo docker pull anhell0s/spc-frontend
```

5. **Levantar los contenedores en la red creada:**

- Ejecutar instancias de la imagen api y frontend:

```sh
sudo docker run -d --name spc-db --network spc-network -e POSTGRES_DB=spc_ueb_db -e POSTGRES_USER=BlliCstsZl7jbimsNIF8S47yup0KJ6m0 -e POSTGRES_PASSWORD=BlliCstsZl7jbimsNIF8S47yup0KJ6m0 -p 5432:5432 anhell0s/spc-db:latest
sudo docker run -d --name spc-api_1 --network spc-network -p 3001:3000 anhell0s/spc-ueb-app_1:latest
sudo docker run -d --name spc-api_2 --network spc-network -p 3002:3000 anhell0s/spc-ueb-app_1:latest
sudo docker run -d --name spc-client --network spc-network -p 5173:5173 anhell0s/spc-frontend:latest
```

6. **Configurar NGINX:**

- Instalar NGINX:

```sh
sudo apt-get install nginx
```

- Iniciar el servicio NGINX:

```sh
sudo systemctl start nginx
```

- Verificar el estado del servicio NGINX:

```sh
sudo systemctl status nginx
```

- Habilitar el inicio automático (opcional):

```sh
sudo systemctl enable nginx
```

5. **Configuración para el API de SPC:**

- Crea un archivo de configuración para el API en sites-available:

```sh
sudo nano /etc/nginx/sites-available/spc-api
```

- Dentro del archivo spc-api, configura NGINX para el FRONTEND:

**URL_DOMINIO_CLIENT** = spc.devsoftec.com

```
upstream spc_frontend {
    server 172.19.0.5:5173;  # Puerto interno de tu servicio spc-ueb-app1
}

server {
    listen 80;
    listen [::]:80;
    server_name spc.devsoftec.com;

    location / {
        proxy_pass http://spc_frontend;  # Nombre del upstream definido arriba
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name spc.devsoftec.com;

    ssl_certificate /etc/letsencrypt/live/spc.devsoftec.com/fullchain.pem;       # Ruta al certificado SSL
    ssl_certificate_key /etc/letsencrypt/live/spc.devsoftec.com/privkey.pem;   # Ruta a la clave privada del certificado

    # Configuración de SSL para protocolos fuertes
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;
    ssl_ciphers "EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH";

    location / {
        proxy_pass http://spc_frontend;  # Nombre del upstream definido arriba
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass $http_upgrade;
    }
}
```

- Dentro del archivo spc-api, configura NGINX para la API:

**URL_DOMINIO_API** = spc-api.devsoftec.com

```
upstream spc_ueb {
    least_conn;
    server 172.19.0.3:3000;  # IP del contenedor spc-api_1
    server 172.19.0.4:3000;  # IP del contenedor spc-api_2
}

server {
    listen 80;
    listen [::]:80;
    server_name spc-api.devsoftec.com;

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name spc-api.devsoftec.com;

    ssl_certificate /etc/letsencrypt/live/spc-api.devsoftec.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/spc-api.devsoftec.com/privkey.pem;

    # Configuración de SSL para protocolos fuertes
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;
    ssl_ciphers "EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH";

    location / {
        proxy_pass http://spc_ueb;  # Nombre del upstream definido arriba
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass $http_upgrade;
    }
}
```

- Enlazar los archivos de configuración

```sh
sudo ln -s /etc/nginx/sites-available/spc-api /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/spc-client /etc/nginx/sites-enabled/
```

- Verificar la configuración de NGINX

```sh
sudo nginx -t
```

- Reiniciar NGINX

```sh
sudo systemctl restart nginx
```

## 7. Conectar a la VPS

- **vps:** ssh root@34.45.113.147
- **_password:_** ueb2024\*\*

neofetch

## 8. Usar PM2

- Listar:

```sh
docker exec -it <id_container> pm2 list
```

- Ver logs:

```sh
docker exec -it <id_container> pm2 logs
```

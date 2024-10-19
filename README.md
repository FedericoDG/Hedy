<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Calilegua Backend API

Este proyecto es una API para un e-commerce desarrollado con **NestJS**, como parte del curso **Calilegua Backend** de **Hedy**. Esta API permite gestionar productos, usuarios, y pedidos, y está diseñada para ser escalable y fácil de usar. A continuación se describen los aspectos clave del proyecto.

## Características

- **Framework**: NestJS
- **ORM**: TypeORM para la interacción con la base de datos
- **Base de datos**: PostgreSQL
- **Contenedores**: Docker y Docker Compose para el despliegue
- **Documentación**: Swagger para documentación de la API
- **Estructura modular**: Organización del código en módulos para mayor claridad y mantenibilidad

## Requisitos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/) (v14 o superior)
- [Docker](https://www.docker.com/get-started) y [Docker Compose](https://docs.docker.com/compose/)

## Instalación

Sigue los siguientes pasos para instalar y configurar el proyecto en tu máquina local:

1. Abre tu terminal y ejecuta el siguiente comando para clonar el repositorio:

   ```bash
   git clone https://github.com/FedericoDG/Hedy
   ```

2. Acede a la carpeta:

   ```bash
   cd hedy
   ```

3. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

4. Renombra el archivo .env.modelo a .env, y edita los valores de las variables de entorno

5. Corre el contenedor de Docker con la base de datos:

   ```bash
   docker-compose up -d
   ```

6. Corre la aplicación en modo de desarrollo:
   ```bash
   npm run start:dev
   ```

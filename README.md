# Praksisplasslista

Welcome to the code repository for the praksisplasslista project.

This project is a web platform designed and requested by Helse Møre og Romsdal to manage their internships.

## How it works

The project is a built upon Next.js with a couple extra frameworks:

- DaisyUI, Tailwind and Material for building the user interface
- Knex for migration, seeding and querying the database
- NextAuth (Old version of Auth.js) for authentication and token creations

It is completely docker containerize so it should be able to run on any operative system that has docker installed.

The project has a in-built proxy and database so you don't need to bother with setting up these things.

NB: In case you want only to build and run the image and none of the additional services we highly recommend looking trough the environment section within the web service found in [docker-compose.prod.yaml](./docker-compose.prod.yaml) file to ensure you have every environmental variable set correctly.

## Getting Started

To get started with this project you will only need to have [Docker](https://www.docker.com/) installed on your machine.

The entire project is containerized and can be run in a development environment by the following command:

```bash
# Run the development/demo environment
# Has some dummy data to test the application as well a couple pre defined environment variables
# Runs a additional container with adminer for DB administration on port 8080 as well as opening the db on port 3306
docker-compose up

# Run the production environment
# You will need to set the environment variables in the .env file to the correct values
docker-compose -f docker-compose.prod.yml up

```

This will start the project and you can access it by going to [https://localhost](https://localhost) or your custom DOMAIN environment variable in your browser.

### Environment Variables

The project uses environment variables to configure the application.
As previously mentioned, the development environment has some default values set in the docker-compose.yml as well as building some of it's own trough other enviromental variables.

The following is a list of the environment variables required of the docker-compose.prod.yaml in the project:

```bash
NEXTAUTH_SECRET # The secret used to encrypt the session token. Set to HelloWorld in Development
MYSQL_ROOT_PASSWORD # The password for the root user of the database. Set to changme in Development
DOMAIN # The domain name of the application. Default to localhost if can not be found
FEIDE_CLIENT_ID # The client id for the Feide authentication. Set to a localhost Feide clientID that will get removed after the 20 of may in Development
FEIDE_CLIENT_SECRET # The client secret for the Feide authentication. Set to a localhost only Feide clientsecret that will get removed after the 20 of may in Development
```

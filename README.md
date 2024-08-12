primeramente crear o clonar el repositorio:

git clone https://github.com/ArianneAlonso/crud-tasks-backend.git

al abrir el archivo en visual, posicionarse en dicha carpeta con ctrl + ñ donde dentro de la terminal escribimos los siguientes comandos:

cd crud-tasks-backend

cd src

npm init -y

instalar las dependecias con los siguientes comandos:

npm i cors mysql2 express morgan express-validator

en package.json agregar 

  "type": "module",

  y dentro de "scripts" agregar: 
  "dev": "node --watch app.js",
  "start": "node app.js"
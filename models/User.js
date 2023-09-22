
const fs = require('fs');

// Ruta al archivo JSON
const filePath = './src/data/usuariosdatabase.json';

// Lee el contenido del archivo JSON
const jsonData = fs.readFileSync(filePath, 'utf-8');

// Analiza el contenido JSON en un objeto JavaScript
const parsedData = JSON.parse(jsonData);

// Ahora puedes acceder a los datos dentro del objeto
console.log(parsedData);

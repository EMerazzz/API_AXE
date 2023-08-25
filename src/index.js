const express = require('express');
const app = express();


// Settings
//*Habilito el 4000, solo de manera local, cuando pase a produccion pasar a puerto 4000
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(express.json());

// Routes
// Ruta login
// app.use(require('./routes/login'));

// modulo personas
app.use(require('./routes/moduloPersonas'));
//modulo matricula
app.use(require('./routes/moduloMatricula'));
//modulo estudiantes
app.use(require('./routes/moduloPadres'));
// modulo academico
app.use(require('./routes/moduloAcademico'));
// modulo seguridad
app.use(require('./routes/moduloSeguridad'));
//modulo docentes
app.use(require('./routes/moduloDocentes'));

app.use(require('./routes/login'));

// Starting the server
// Starting the server
app.listen(app.get('port'), '0.0.0.0', () => {
  console.log(`Server listening on port ${app.get('port')}`);
});


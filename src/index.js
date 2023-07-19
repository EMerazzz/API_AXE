const express = require('express');
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());

// Routes
// modulo personas
app.use(require('./routes/moduloPersonas'));
//modulo matricula
app.use(require('./routes/moduloMatricula'));
//modulo estudiantes
app.use(require('./routes/moduloEstudiantes'));
// modulo academico
app.use(require('./routes/moduloAcademico'));
// modulo seguridad
app.use(require('./routes/moduloSeguridad'));
//modulo docentes
app.use(require('./routes/moduloDocentes'));


// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});


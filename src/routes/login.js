const express = require('express');
//const app = express();
const jwt = require('jsonwebtoken')
const router = express.Router();

const mysqlConnection = require('../database');

//const verifyToken = require('./verify');
global.secretTokenAccess = 'my_token_for_access'

// ============
router.post('/login', (req, res) => {
    const { USUARIO, CONTRASENA } = req.body;
  
    // Consulta SQL para verificar si las credenciales del usuario son correctas.
    //const query = `SELECT * FROM MS_USUARIOS WHERE USUARIO = ? AND CONTRASENA = ?`;
    //CALL MS_Autenticacion('jmtz', 123);

    //const query = `CALL MS_Autenticacion('jmtz', 123)`;
    //  mysqlConnection.query(sql, (error, results) mysqlConnection.query(query, [USUARIO, CONTRASENA], (error, results)
     mysqlConnection.query("CALL MS_Autenticacion(?, ?)",  [USUARIO, CONTRASENA], (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        respuestaBD = results[0][0];
        const cantidadPropiedades = Object.keys(respuestaBD).length;

        if (cantidadPropiedades > 1) {
          const token = jwt.sign({ USUARIO, CONTRASENA }, secretTokenAccess, {expiresIn:'1h'}, (err, token) => {
            console.log("Respuesta OKK")
            //Generación de token 
            res.json({
              token,
              USUARIO
            });
          });
          //La anterior instrucción muestra el token del usuario para poder usar las APIs.
        } else {
          res.status(400).json(respuestaBD);
        }
      }
    });
  });

  module.exports = router;
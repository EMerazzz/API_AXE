const express = require('express');
//const app = express();
const jwt = require('jsonwebtoken')
const router = express.Router();

const mysqlConnection = require('../database');

//const verifyToken = require('./verify');
global.secretTokenAccess = 'my_token_for_access'

// ============
router.post('/login', (req, res) => {
    try {
      const { USUARIO, CONTRASENA } = req.body;
  
      mysqlConnection.query("CALL MS_Autenticacion(?, ?)", [USUARIO, CONTRASENA], (error, results) => {
        if (error) {
          res.status(500).json({ error: 'Error interno del servidor' });
        } else {
          respuestaBD = results[0][0];
          const cantidadPropiedades = Object.keys(respuestaBD).length;
  
          if (cantidadPropiedades > 1) {
            const token = jwt.sign({ USUARIO, CONTRASENA }, secretTokenAccess, { expiresIn: '1h' }, (err, token) => {
              if (err) {
                throw err; // Throw error to be caught by the outer try-catch
              }
              console.log("Respuesta OKK");
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
    } catch (catchError) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  

  // ============ 
  router.post('/usuario_contrasena', (req, res) => {
    try {
      const { USUARIO } = req.body;
  
      mysqlConnection.query("CALL MS_buscarUsuario(?)", [USUARIO], (error, results) => {
        if (error) {
          res.status(500).json({ error: 'Error interno del servidor' });
        } else {
          respuestaBD = results[0][0];
          const cantidadPropiedades = Object.keys(respuestaBD).length;
  
          if (cantidadPropiedades > 1) {
            res.status(200).json(results[0]);
            //La anterior instrucción muestra el token del usuario para poder usar las APIs.
          } else {
            res.status(400).json({});
          }
        }
      });
    } catch (catchError) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  

  router.post('/cambiarContrasena', (req, res) => {
    try {
      const { USUARIO, CONTRASENA } = req.body;
  
      mysqlConnection.query("CALL MS_cambiarContrasena(?,?)", [USUARIO, CONTRASENA], (error, results) => {
        if (error) {
          res.status(500).json({ error: 'Error interno del servidor' });
        } else {
          //Capturamos el mensaje que nos responde la BD
          respuestaBD = results[0][0];
  
          //Respondemos el mensaje que nos responde la BD
          res.status(200).json(respuestaBD);
        }
      });
    } catch (catchError) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  
  // Verificamos si es la primera vez que hace login
  router.post('/primera_vez', (req, res) => {
    try {
      const { USUARIO } = req.body;
  
      mysqlConnection.query("CALL MS_PRIMER_INGRESO(?)", [USUARIO], (error, results) => {
        if (error) {
          res.status(500).json({ error: 'Error interno del servidor' });
        } else {
       
          respuestaBD = results[0][0];
          const cantidadPropiedades = Object.keys(respuestaBD).length;

          if (cantidadPropiedades > 1) {
            res.status(200).json(results[0]);
            //La anterior instrucción muestra el token del usuario para poder usar las APIs.
          } else {
            res.status(200).json({});
          }
        }
      });
    } catch (catchError) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });


  // Verificamos si es la primera vez que hace login
  router.post('/acceso_permitido', (req, res) => {
    try {
      const { USUARIO } = req.body;
  
      mysqlConnection.query("CALL MS_ACCESO_PERMITIDO(?)", [USUARIO], (error, results) => {
        if (error) {
          res.status(500).json({ error: 'Error interno del servidor' });
        } else {
       
          respuestaBD = results[0][0]['PERMITIDO'];
          console.log(respuestaBD);
          res.status(200).json(respuestaBD);
         // const cantidadPropiedades = Object.keys(respuestaBD).length;

          /*
          if (cantidadPropiedades > 1) {
            res.status(200).json(respuestaBD);
            //La anterior instrucción muestra el token del usuario para poder usar las APIs.
          } else {
            res.status(200).json({});
          }
          */
        }
      });
    } catch (catchError) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });


  module.exports = router;
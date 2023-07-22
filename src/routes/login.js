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
    const query = `SELECT * FROM MS_USUARIOS WHERE USUARIO = ? AND CONTRASENA = ?`;
    //const query = `CALL SP_moduloseguridad('MS_USUARIOS', 'SO', '${USUARIO}', 1, 1, 1, 1, 1,  '1','1', '1')`;
  
    mysqlConnection.query(query, [USUARIO, CONTRASENA], (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        if (results.length > 0) {
  
          const token = jwt.sign({ USUARIO, CONTRASENA }, secretTokenAccess, {expiresIn:'1h'}, (err, token) => {
            //Generación de token 
            res.json({
              token,
              USUARIO
            });
          });
          //La anterior instrucción muestra el token del usuario para poder usar las APIs.
        } else {
          res.status(401).json({ error: 'Credenciales inválidas' });
        }
      }
    });
  });

  module.exports = router;
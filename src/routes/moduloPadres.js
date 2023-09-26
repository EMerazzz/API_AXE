const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

const jwt = require('jsonwebtoken')
const verifyToken = require('./verify');

//MOTRAR DATOS DE LA TABLA 

router.get('/estudiantes', verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    mysqlConnection.query(`Call SP_moduloEstudiantes('ME_ESTUDIANTES','SA','1','1','1','null','null','null','null','null')`, (err, rows) => {
      if (!err) {
        res.status(200).json(rows[0]);
      } else {
        console.log('Se ha producido un error');
        res.sendStatus(500);
      }
    });
  });
  

//GET por codigo
router.get("/estudiantes/:COD_ESTUDIANTE", verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      const { COD_ESTUDIANTE } = req.params;
      const sql = `Call SP_moduloEstudiantes('ME_ESTUDIANTES','SO','${COD_ESTUDIANTE}','1','1','null','null','null','null')`;
      mysqlConnection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
          res.status(200).json(results[0]);
        } else {
          res.send(error);
        }
      });
    } catch (error) {
      res.send(error);
    }
  });
  

//Agregando un estudiante nuevo
router.post("/estudiantes", verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      const { COD_PERSONA, COD_PADRE_TUTOR,COD_NIVEL_ACADEMICO, NOMBRE_ESTUDIANTE, APELLIDO_ESTUDIANTE,JORNADA_ESTUDIANTE } = req.body;
      const sql = `Call SP_moduloEstudiantes('ME_ESTUDIANTES','I','1','${COD_PERSONA}','${COD_PADRE_TUTOR}','${COD_NIVEL_ACADEMICO}','${NOMBRE_ESTUDIANTE}','${APELLIDO_ESTUDIANTE}','${JORNADA_ESTUDIANTE}')`;
      mysqlConnection.query(sql, (error) => {
        if (!error) {
          res.json({
            Status: "Estudiante Registrado"
          });
        } else {
          console.log(error);
          res.sendStatus(500);
        }
      });
    } catch (error) {
      res.send(error);
    }
  });
  
   //Metodo put
   router.put("/estudiantes/:COD_ESTUDIANTE", /*verifyToken,*/ (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      const { COD_ESTUDIANTE } = req.params;
      const { COD_PERSONA, COD_PADRE_TUTOR,COD_NIVEL_ACADEMICO, NOMBRE_ESTUDIANTE, APELLIDO_ESTUDIANTE,JORNADA_ESTUDIANTE } = req.body;
      const sql = `Call SP_moduloEstudiantes('ME_ESTUDIANTES','U',${COD_ESTUDIANTE},'${COD_PERSONA}','${COD_PADRE_TUTOR}','${COD_NIVEL_ACADEMICO}','${NOMBRE_ESTUDIANTE}','${APELLIDO_ESTUDIANTE}','${JORNADA_ESTUDIANTE}')`;
      mysqlConnection.query(sql, (error) => {
        if (!error) {
          res.json({
            Status: "Estudiante Modificado"
          });
        } else {
          console.log(error);
          res.sendStatus(500);
        }
      });
    } catch (error) {
      res.send(error);
    }
  });
  
/****************************TABLA PADRES TUTORES *********************** */
   //MOTRAR DATOS DE LA TABLA 
router.get('/padres_tutores', verifyToken,(req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    mysqlConnection.query(`call axe.SP_moduloEstudiantes('ME_PADRES_TUTORES', 'SA', 1, 1, '1', '1', '1', '1', '1');`, (err, rows) => {
      if (!err) {
        res.status(200).json(rows[0]);
      } else {
        console.log('Se ha producido un error');
        res.sendStatus(500);
      }
    });
  
  });
  

//GET por codigo
router.get("/padres_tutores/:COD_PADRE_TUTOR",verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      const { COD_PADRE_TUTOR } = req.params;
      const sql = `Call axe.SP_moduloEstudiantes('ME_PADRES_TUTORES','SO','${COD_PADRE_TUTOR}','1','null','null','null','null','null')`;
      mysqlConnection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
          res.status(200).json(results[0]);
        } else {
          res.send(error);
        }
      });
    } catch (error) {
      res.send(error);
    }
  });
  

//insert
router.post("/padres_tutores", verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      
      const {
        COD_PERSONA,
        NOMBRE_PADRE_TUTOR,
        APELLIDO_PADRE_TUTOR,
        OCUPACION_PADRE_TUTOR,
        RELACION_PADRE_ESTUDIANTE,
        USUARIO_MODIFICADOR
      } = req.body;
  
      const sql = `Call axe.SP_moduloEstudiantes('ME_PADRES_TUTORES','I',1,'${COD_PERSONA}','${NOMBRE_PADRE_TUTOR}','${APELLIDO_PADRE_TUTOR}','${OCUPACION_PADRE_TUTOR}','${RELACION_PADRE_ESTUDIANTE}','${USUARIO_MODIFICADOR}')`;
      mysqlConnection.query(sql, (error) => {
        if (!error) {
          res.json({
            Status: "Padre Tutor Registrado"
          });
        } else {
          console.log(error);
          res.sendStatus(500);
        }
      });
    } catch (error) {
      res.send(error);
    }
  });
  
 //Metodo put
router.put("/padres_tutores/:COD_PADRE_TUTOR", /*verifyToken, */(req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      const { COD_PADRE_TUTOR } = req.params;
      const {
        COD_PERSONA,
        NOMBRE_PADRE_TUTOR,
        APELLIDO_PADRE_TUTOR,
        OCUPACION_PADRE_TUTOR,
        RELACION_PADRE_ESTUDIANTE,
        USUARIO_MODIFICADOR
      } = req.body;
  
      const sql = `call axe.SP_moduloEstudiantes('ME_PADRES_TUTORES', 'UP', ${COD_PADRE_TUTOR}, 1, '1', '1', '${OCUPACION_PADRE_TUTOR}', '${RELACION_PADRE_ESTUDIANTE}','${USUARIO_MODIFICADOR}');`;
      mysqlConnection.query(sql, (error) => {
        if (!error) {
          res.json({
            Status: "Padre Tutor Modificado"
          });
        } else {
          console.log(error);
          res.sendStatus(500);
        }
      });
    } catch (error) {
      res.send(error);
    }
  });
  
module.exports = router;
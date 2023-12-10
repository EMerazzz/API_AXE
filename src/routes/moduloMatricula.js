const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

const jwt = require('jsonwebtoken')
const verifyToken = require('./verify');
/*************************TABLA PERSONAS ****************************/
//MOTRAR DATOS DE LA TABLA DE matricula
/*
router.get('/matricula', verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    mysqlConnection.query(`CALL SP_ESTUDIANTES();`, (err, rows) => {
      if (!err) {
        res.status(200).json(rows[0]);
      } else {
        console.log('Se ha producido un error');
        res.sendStatus(500);
      }
    });
  });
*/
  router.get('/verEstudiante', verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    mysqlConnection.query(`CALL SP_ESTUDIANTES();`, (err, rows) => {
      if (!err) {
        res.status(200).json(rows[0]);
      } else {
        console.log('Se ha producido un error');
        res.sendStatus(500);
      }
    });
  });
//GET por codigo
router.put("/del_matricula/:COD_MATRICULA", verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      const { COD_MATRICULA } = req.params;
      const sql = `CALL SP_MODULOMATRICULA('MM_MATRICULA', 'DE',${COD_MATRICULA}, 0, 0, 0, '0', '0', '0',0,'0','0');`;
      mysqlConnection.query(sql, (error, results) => {
        if (!error) {
          res.json({
            Status: "Matricula Eliminado"
          });
        } else {
          console.log(error);
          res.status(500).json({ message: "Error al Eliminar Matricula" });
        }
      });
    } catch (error) {
      res.send(error);
    }
  });

router.post("/matricula", verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      const { COD_ESTUDIANTE, COD_PADRE_TUTOR, COD_NIVEL_ACADEMICO, COD_ANIO_ACADEMICO, COD_SECCIONES, JORNADA, USUARIO_MODIFICADOR, Estado_registro} = req.body;
      // call axe.SP_MODULOMATRICUlA      ('NOMBRETABLA', 'FUNCION', PARAMETROBI,     PARAMETROINT1,      PARAMETROINT2,       PARAMETROINT3,           PARAMETROINT4,          PARAMETROINT5,       'PARAMETROV1',   'PARAMETROV2',     'PARAMETROV3',  'PV_USUARIO',                 PARAMETROINT6);
      const sql = `CALL SP_MODULOMATRICULA('MM_MATRICULA', 'I',          0,         ${COD_ESTUDIANTE},   ${COD_PADRE_TUTOR} ,${COD_NIVEL_ACADEMICO},   ${COD_ANIO_ACADEMICO},    ${COD_SECCIONES},   '${JORNADA}',    'PARAMETROV2',     'PARAMETROV3', '${USUARIO_MODIFICADOR}',    ${Estado_registro});`;
      mysqlConnection.query(sql, error => {
        if (!error) {
          res.json({
            Status: "Matricula Registrada"
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
  
// update
router.put("/matricula/:COD_MATRICULA", verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      const { COD_MATRICULA } = req.params;
      const { COD_ESTUDIANTE, COD_PADRE_TUTOR, COD_NIVEL_ACADEMICO, COD_ANIO_ACADEMICO, COD_SECCIONES, JORNADA, USUARIO_MODIFICADOR, Estado_registro} = req.body;
      const sql = `CALL SP_MODULOMATRICULA('MM_MATRICULA', 'U',  ${COD_MATRICULA},         ${COD_ESTUDIANTE},   ${COD_PADRE_TUTOR} ,${COD_NIVEL_ACADEMICO},   ${COD_ANIO_ACADEMICO},    ${COD_SECCIONES},   '${JORNADA}',    'PARAMETROV2',     'PARAMETROV3', '${USUARIO_MODIFICADOR}',    ${Estado_registro});`;
      mysqlConnection.query(sql, error => {
        if (!error) {
          res.json({
            Status: "Matricula modificada"
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
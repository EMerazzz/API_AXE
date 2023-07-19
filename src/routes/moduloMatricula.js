const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');
/*************************TABLA PERSONAS ************************** */
//MOTRAR DATOS DE LA TABLA DE ASIGNATURAS
router.get('/matricula', (req, res) => { 

    mysqlConnection.query(`CALL SP_MODULOMATRICUlA('MM_MATRICULA', 'SA', 0, 0, 0, 0, '0', '0', '0');`, (err, rows) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log('Se ha producido un error');
        }
    });

});
//GET por codigo
router.get("/matricula/:COD_MATRICULA", (req, res) => {
    try {
      const { COD_MATRICULA } = req.params;
      const sql = `CALL SP_MODULOMATRICUlA('MM_MATRICULA', 'SO',${COD_MATRICULA}, 0, 0, 0, '0', '0', '0');`;
     mysqlConnection.query(sql, (error, results) => {
         if (error) throw error;
         if (results.length > 0) {
             res.status(200).json(results[0]);
         } else {
             res.send(error)
         }
     })
    } catch (error) {
     res.send(error)
    }
  });

  router.post("/nueva_matricula", (req, res) => {
    try {
       const {COD_ESTUDIANTE,COD_NIVEL_ACADEMICO, COD_ANIO_ACADEMICO,ESTADO_MATRICULA,JORNADA,SECCION} = req.body;
       const sql = `CALL SP_MODULOMATRICUlA('MM_MATRICULA', 'I', 0, ${COD_ESTUDIANTE}, ${COD_NIVEL_ACADEMICO}, ${COD_ANIO_ACADEMICO}, '${ESTADO_MATRICULA}', '${JORNADA}', '${SECCION}');`;
       mysqlConnection.query(sql, error => {
           if (!error) {
               res.json({
                   Status: "Matricula Registrada"
               });
           } else {
               console.log(error);
           }
       });
     } catch (error) {
       res.send(error);
     }
   });
// update
   router.put("/modificar_matricula", (req, res) => {
    try {
       const {COD_MATRICULA,COD_ESTUDIANTE,COD_NIVEL_ACADEMICO, COD_ANIO_ACADEMICO,ESTADO_MATRICULA,JORNADA,SECCION} = req.body;
       const sql = `CALL SP_MODULOMATRICUlA('MM_MATRICULA', 'U', ${COD_MATRICULA}, ${COD_ESTUDIANTE}, ${COD_NIVEL_ACADEMICO}, ${COD_ANIO_ACADEMICO}, '${ESTADO_MATRICULA}', '${JORNADA}', '${SECCION}');`;
       mysqlConnection.query(sql, error => {
           if (!error) {
               res.json({
                   Status: "Matricula modificada"
               });
           } else {
               console.log(error);
           }
       });
     } catch (error) {
       res.send(error);
     }
   });
module.exports = router;
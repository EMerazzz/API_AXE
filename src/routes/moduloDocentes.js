const express = require('express');
const router = express.Router();


const jwt = require('jsonwebtoken')
const verifyToken = require('./verify');
const mysqlConnection = require('../database');
/******************************* TABLA DOCENTES *****************************/
/*
         COD_DOCENTE = parametroBI,
         COD_PERSONA = parametroBI1,
         NOMBRE_DOCENTE = parametroV1,
         ESPECIALIDAD   = parametroV2,
         GRADO_ENSENIANZA = parametroV3
         
        

*/

//MOTRAR DATOS DE LA TABLA DE MD_DOCENTES
// Ruta para mostrar datos de la tabla de MD_DOCENTES
router.get('/docentes', verifyToken, (req, res) => {
  // Verificación de JWT ya realizada por el middleware verifyToken

  const query = `CALL SP_modulodocentes('MD_DOCENTES', 'SA', 0, 0, 0, 0, '0', '0', '0', '0', 0);;`;

  mysqlConnection.query(query, (err, results) => {
    if (err) {
      console.error('Error al consultar la tabla MD_DOCENTES:', err.message);
      return res.status(500).json({ message: 'Error al consultar la tabla MD_DOCENTES' });
    }

    // La consulta fue exitosa, pero los resultados están en results[0]
    const rows = results[0];
    res.json(rows);
  });
});



//MOSTRAR DATOS DE LA TABLA SEGUN COD_DOCENTE
router.put('/del_docentes/:COD_DOCENTE',  verifyToken, (req, res) => {
  // Verificación de JWT ya realizada por el middleware verifyToken
  const { COD_DOCENTE } = req.params;
  const query = `
      CALL AXE.SP_modulodocentes('MD_DOCENTES', 'DE',?,0,0,0,'0','0','0','1');
  `;

  mysqlConnection.query(query, [COD_DOCENTE], (err, rows, fields) => {
      if (!err) {
          res.json({
              Status: "Docente Eliminado"
          });
      } else {
          console.log(err);
          res.status(500).json({ message: "Error al Eliminar Docente" });
      }
  });
});

// INSERTAR DATOS EN LA TABLA DE MD_DOCENTES
router.post('/docentes', /*verifyToken,*/ (req, res) => {
  // Verificación de JWT ya realizada por el middleware verifyToken
  const { COD_PERSONA, CARGO_ACTUAL, USUARIO_MODIFICADOR, Estado_registro, HORAS_SEMANALES } = req.body;

  const query = `
    CALL SP_modulodocentes('MD_DOCENTES', 'I', 0,${COD_PERSONA}, 0, ${HORAS_SEMANALES}, '${CARGO_ACTUAL}','1','1', '${USUARIO_MODIFICADOR}', ${Estado_registro});
  `;

  mysqlConnection.query(query, (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'DOCENTE Ingresado' });
    } else {
      console.log(err);
      res.status(500).json({ error: 'Error al insertar en MD_DOCENTES' });
    }
  });
});




  //UPDATE DE LA TABLA  MD_DOCENTES
  router.put('/docentes/:COD_DOCENTE',  verifyToken, (req, res) => {
           // Verificación de JWT ya realizada por el middleware verifyToken 
      const { COD_DOCENTE } = req.params;
    const {COD_PERSONA,CARGO_ACTUAL, HORAS_SEMANALES, USUARIO_MODIFICADOR, Estado_registro} = req.body;
    console.log(HORAS_SEMANALES);
    const query = `
    CALL SP_modulodocentes('MD_DOCENTES',       'U',    ${COD_DOCENTE} ,${COD_PERSONA},  ${HORAS_SEMANALES},  0, '${CARGO_ACTUAL}','1','1', '${USUARIO_MODIFICADOR}', ${Estado_registro});
    `;
    mysqlConnection.query(query, (err, rows, fields) => {
        if(!err) {
          res.json({status: 'DOCENTE Actualizado'});
        } else {
          console.log(err);
        }
    });

  });//fin put de actualizar en la tabla md_docentes
  
/*****************************DOCENTES ASIGNATURA ************************ */
/*
         COD_DOCENTE_ASIGNATURA = parametroBI,
         COD_ASIGNATURA= parametroBI1,
         HORAS_SEMANALES =parametroINT
        
        

*/

//MOTRAR DATOS DE LA TABLA DE MDA_DOCENTES_ASIGNATURAS
router.get('/docentes_asignaturas', verifyToken,  (req, res) => { 
          // Verificación de JWT ya realizada por el middleware verifyToken

    // console.log(id, name, salary);
    const query = `
    
    CALL SP_modulodocentes('MDA_DOCENTES_ASIGNATURAS', 'SA',0,0,0,0,'0','0','0','1');
    `;
        mysqlConnection.query(query, (err, rows, fields) => {
            if (!err) {
                res.json(rows[0]);
            } else {
                console.log('Error al consultar la tabla MDA_DOCENTES_ASIGNATURAS');
                
            }
        });
    
    });
    
   
  //MOSTRAR DATOS DE LA TABLA SEGUN COD_DOCENTE_ASIGNATURA
  router.put('/del_docentes_asignaturas/:COD_DOCENTE_ASIGNATURA',  verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
    const { COD_DOCENTE_ASIGNATURA } = req.params;
    const query = `
        CALL SP_modulodocentes('MDA_DOCENTES_ASIGNATURAS', 'DE',?, 0,0,0,'0','0','0','1');
    `;

    mysqlConnection.query(query, [COD_DOCENTE_ASIGNATURA], (err, rows, fields) => {
        if (!err) {
            res.json({
                Status: "Asignatura Docente Eliminada"
            });
        } else {
            console.log(err);
            res.status(500).json({ message: "Error al Eliminar Asignatura Docente" });
        }
    });
});

   
 
  //INSERTAR DATOS EN LA TABLA DE MDA_DOCENTES_ASIGNATURAS
  router.post('/docentes_asignaturas',  verifyToken, (req, res) => {
            // Verificación de JWT ya realizada por el middleware verifyToken
    const {COD_DOCENTE,COD_ASIGNATURA,HORAS_SEMANALES,USUARIO_MODIFICADOR,Estado_registro} = req.body;
   
    const query = `
      SET @COD_DOCENTE = ?;
      SET @COD_ASIGNATURA = ?;
      SET @HORAS_SEMANALES = ?;
      SET @USUARIO_MODIFICADOR = ?;

      
      CALL SP_modulodocentes('MDA_DOCENTES_ASIGNATURAS', 'I',0, @COD_DOCENTE,@COD_ASIGNATURA ,@HORAS_SEMANALES,'0','0','0',@USUARIO_MODIFICADOR);
    `;
    mysqlConnection.query(query, [COD_DOCENTE,COD_ASIGNATURA,HORAS_SEMANALES,USUARIO_MODIFICADOR,Estado_registro], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'DOCENTE_ASIGNATURAS Ingresado'});
      } else {
        console.log(err);
      }
    });
  
  });//FIN DEL POST PARA INSERTAR EN MD_DOCENTES_ASIGNATURAS
  
   //Metodo put
router.put("/docentes_asignaturas/:COD_DOCENTE_ASIGNATURA", verifyToken, (req, res) => {
  // Verificación de JWT ya realizada por el middleware verifyToken

  try {
    const { COD_DOCENTE_ASIGNATURA } = req.params;
    const {
    COD_ASIGNATURA,HORAS_SEMANALES,USUARIO_MODIFICADOR,Estado_registro
    } = req.body;

    const sql = `call axe.SP_modulodocentes('MDA_DOCENTES_ASIGNATURAS', 'U','${COD_DOCENTE_ASIGNATURA}','${COD_ASIGNATURA}',1,'${HORAS_SEMANALES}', '1', '1', '1','${USUARIO_MODIFICADOR}')`;
    mysqlConnection.query(sql, (error) => {
      if (!error) {
        res.json({
          Status: " Modificado"
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

//Tabla relacion Docentes y asignaturas
router.get('/rel_docentes_asig', verifyToken, (req, res) => {
  // Verificación de JWT ya realizada por el middleware verifyToken

  const query = `CALL SP_modulodocentes('MA_REL_DOCENTES_ASIGNATURAS', 'SA', 0, 0, 0, 0, '0', '0', '0', '0', 0);;`;

  mysqlConnection.query(query, (err, results) => {
    if (err) {
      console.error('Error al consultar la tabla MA_REL_DOCENTES_ASIGNATURAS:', err.message);
      return res.status(500).json({ message: 'Error al consultar la tabla MD_DOCENTES' });
    }

    // La consulta fue exitosa, pero los resultados están en results[0]
    const rows = results[0];
    res.json(rows);
  });
});

router.post('/rel_docentes_asig', /*verifyToken,*/ (req, res) => {
  // Verificación de JWT ya realizada por el middleware verifyToken
  const {COD_ASIGNATURA,COD_DOCENTE ,Estado_registro } = req.body;

  const query = `
    CALL SP_modulodocentes('MA_REL_DOCENTES_ASIGNATURAS', 'I', 0, '${COD_ASIGNATURA}', '${COD_DOCENTE}', 0, '1','1','1', '1', ${Estado_registro});
  `;

  mysqlConnection.query(query, (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'Dato Ingresado Correctamente' });
    } else {
      console.log(err);
      res.status(500).json({ error: 'Error al insertar la relación' });
    }
  });
});

router.put("/rel_docentes_asig/:COD_DOCEN_ASIG", verifyToken, (req, res) => {
  try {
      jwt.verify(req.token, global.secretTokenAccess, (err) => {
          if (err) {
              res.sendStatus(403);
          } else {
              const { COD_DOCEN_ASIG } = req.params;
              const { COD_ASIGNATURA,COD_DOCENTE,Estado_registro } = req.body;
              const sql = `CALL SP_modulodocentes('MA_REL_DOCENTES_ASIGNATURAS', 'U', '${COD_DOCEN_ASIG}', '${COD_ASIGNATURA}', '${COD_DOCENTE}', 0, '1','1','1', '1', ${Estado_registro});`;
              mysqlConnection.query(sql, error => {
                  if (!error) {
                      res.json({
                          Status: "Modificado Correctamente"
                      });
                  } else {
                      console.log(error);
                      res.sendStatus(500); // Devolver un error interno del servidor si ocurre algún problema
                  }
              });
          }
      });
  } catch (error) {
      res.send(error);
  }
});


module.exports = router;

  




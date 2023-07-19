const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');
//const mysqlConnection = require('../database');

//********************* TABLA MS_ESTADO_USUARIO*******************************
//MOTRAR DATOS DE LA TABLA 
router.get('/estado_usuario', (req, res) => { 
    try {
        const consulta = `CALL SP_moduloseguridad('MS_ESTADO_USUARIO', 'SA', 1, 1, 1, 1, 1, 1,  '1','1', '1')`;
       mysqlConnection.query(consulta, (error, results) => {
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

//Mostrar datos de un rol por codigo
router.get("/estado_usuario/:COD_ESTADO_USUARIO", (req, res) => {
    try {
      const { COD_ESTADO_USUARIO } = req.params;
      const consulta = `CALL SP_moduloseguridad('MS_ESTADO_USUARIO', 'SO', '${COD_ESTADO_USUARIO}', 1, 1, 1, 1, 1,  '1','1', '1')`;
     mysqlConnection.query(consulta, (error, results) => {
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
  });// fin


  router.post('/nuevo_estado_usuario', (req, res) => {
    const {DESCRIPCION} = req.body;
    const query = `
      SET @DESCRIPCION = ?;
      CALL SP_moduloseguridad('MS_ESTADO_USUARIO', 'I', 1, 1, 1, 1, 1, 1,  @DESCRIPCION,'1', '1')
    `;
    mysqlConnection.query(query, [DESCRIPCION], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Estado de usuario Ingresada'});
      } else {
        console.log(err);
      }
    });
  
  });//FIN DEL POST DE INSERTAR EN LA ESTADOS


  //Actualizar registro
  router.put('/modificar_estado_usuario/:COD_ESTADO_USUARIO', (req, res) => {
    const { DESCRIPCION } = req.body;
    const { COD_ESTADO_USUARIO } = req.params;
    
    mysqlConnection.query(
        "CALL SP_moduloseguridad('MS_ESTADO_USUARIO', 'U', ?, 1, 1, 1, 1, 1,  ?, '1' , '1')",
        [COD_ESTADO_USUARIO, DESCRIPCION],
        (err, rows, fields) => {
            if (!err) {
                //retornar lo actualizado
                res.status(200).json(req.body);
            } else {
                console.log(err);
            }

        });
});

 //*************************** TABLA MS_PERMISOS *********************************/
 //MOTRAR DATOS DE LA TABLA
router.get('/permisos', (req, res) => { 
    try {
        const consulta = `CALL SP_moduloseguridad('MS_PERMISOS', 'SA', 1, 1, 1, 1, 1, 1,  '1','1', '1')`;
       mysqlConnection.query(consulta, (error, results) => {
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

//Mostrar datos de un rol por codigo
router.get("/permisos/:COD_PERMISO", (req, res) => {
    try {
      const { COD_PERMISO } = req.params;
      const consulta = `CALL SP_moduloseguridad('MS_PERMISOS', 'SO', '${COD_PERMISO}', 1, 1, 1, 1, 1,  '1','1', '1')`;
     mysqlConnection.query(consulta, (error, results) => {
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
  });// fin


  //Actualizar registro
  router.put('/permisos/:COD_PERMISO', (req, res) => {
    const { PERMISO_INSERCION, PERMISO_ELIMINACION, PERMISO_ACTUALIZACION, PERMISO_CONSULTAR, MODIFICADO_POR} = req.body;
    const { COD_PERMISO } = req.params;
    
    mysqlConnection.query(
        "CALL SP_moduloseguridad('MS_PERMISOS', 'U', ?, 1, ?, ?, ?, ?,  ?, '1' , '1')",
        [COD_PERMISO, PERMISO_INSERCION, PERMISO_ELIMINACION, PERMISO_ACTUALIZACION, PERMISO_CONSULTAR, MODIFICADO_POR],
        (err, rows, fields) => {
            if (!err) {
                //retornar lo actualizado
                res.status(200).json(req.body);
            } else {
                console.log(err);
            }

        });
});

 /*********************************** TABLA MS_PREGUNTAS_CONTRASENA ***************************** */
 //MOTRAR DATOS DE LA TABLA DE PERSONA
router.get('/pregunta_contrasenia', (req, res) => { 
    try {
        const consulta = `CALL SP_moduloseguridad('MS_PREGUNTAS_CONTRASENA', 'SA', 1, 1, 1, 1, 1, 1,  '1','1', '1')`;
       mysqlConnection.query(consulta, (error, results) => {
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

//Mostrar datos de un rol por codigo
router.get("/pregunta_contrasenia/:COD_PREGUNTA", (req, res) => {
    try {
      const { COD_PREGUNTA } = req.params;
      const consulta = `CALL SP_moduloseguridad('MS_PREGUNTAS_CONTRASENA', 'SO', '${COD_PREGUNTA}', 1, 1, 1, 1, 1,  '1','1', '1')`;
     mysqlConnection.query(consulta, (error, results) => {
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
  });// fin


  //Actualizar registro
  router.put('/pregunta_contrasenia/:COD_PREGUNTA', (req, res) => {
    const {PREGUNTA, RESPUESTA} = req.body;
    const { COD_PREGUNTA } = req.params;
    
    mysqlConnection.query(
        "CALL SP_moduloseguridad('MS_PREGUNTAS_CONTRASENA', 'U', ?, 1, 1, 1, 1, 1,  ?, ? , '1')",
        [COD_PREGUNTA,  PREGUNTA, RESPUESTA],
        (err, rows, fields) => {
            if (!err) {
                //retornar lo actualizado
                res.status(200).json(req.body);
            } else {
                console.log(err);
            }

        });
});

/*********************************** TABLA MS_ROLES ***************************** */
//MOTRAR DATOS DE LA TABLA
router.get('/roles', (req, res) => { 
    try {
        const consulta = `CALL SP_moduloseguridad('ms_roles', 'SA', 
                                                   1, 1, 1, 1, 1, 1,  
                                                   '1','1', '1')`;
       mysqlConnection.query(consulta, (error, results) => {
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

//Mostrar datos de un rol por codigo
router.get("/roles/:COD_ROL", (req, res) => {
    try {
      const { COD_ROL } = req.params;
      const consulta = `CALL SP_moduloseguridad('ms_roles', 'SO', '${COD_ROL}', 1, 1, 1, 1, 1,  '1','1', '1')`;
     mysqlConnection.query(consulta, (error, results) => {
         if (error) throw error;
         if (results.length > 0) {
            console.log(COD_ROL);
             res.status(200).json(results[0]);
         } else {
             res.send(error)
         }
     })
    } catch (error) {
     res.send(error)
    }
  });// fin

  router.post('/nuevo_roles', (req, res) => {
    const {DESCRIPCION, MODIFICADO_POR} = req.body;
    const query = `
      SET @DESCRIPCION = ?;
      SET @MODIFICADO_POR = ?;
      CALL SP_moduloseguridad('ms_roles', 'I', 1, 1, 1, 1, 1, 1,  @DESCRIPCION, @MODIFICADO_POR, '1')
    `;
    mysqlConnection.query(query, [DESCRIPCION, MODIFICADO_POR], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Estado de rol ingresado'});
      } else {
        console.log(err);
      }
    });
  
  });//FIN DEL POST DE INSERTAR EN LA ESTADOS

  //Actualizar registro
  router.put('/modificar_roles/:COD_ROL', (req, res) => {
    const {DESCRIPCION, MODIFICADO_POR} = req.body;
    const { COD_ROL } = req.params;
    
    mysqlConnection.query(
        "CALL SP_moduloseguridad('ms_roles', 'U', ?, 1, 1, 1, 1, 1,  ?, ? , '1')",
        [COD_ROL,  DESCRIPCION, MODIFICADO_POR],
        (err, rows, fields) => {
            //CALL SP_moduloseguridad('ms_roles', 'U', 2, 1, 1, 1, 1, 1,  'Usuario Normal','John Wick', '1')
            if (!err) {
                //retornar lo actualizado
                res.status(200).json(req.body);
            } else {
                console.log(err);
            }

        });
});
/*********************************** TABLA MS_USUARIOS ***************************** */
//MOTRAR DATOS DE LA TABLA
router.get('/usuarios', (req, res) => { 
    try {
        const consulta = `CALL SP_moduloseguridad('MS_USUARIOS', 'SA', 1, 1, 1, 1, 1, 1,  '1','1', '1')`;
       mysqlConnection.query(consulta, (error, results) => {
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

//Mostrar datos de un rol por codigo
router.get("/usuarios/:COD_USUARIO", (req, res) => {
    try {
      const { COD_USUARIO } = req.params;
      const consulta = `CALL SP_moduloseguridad('MS_USUARIOS', 'SO', '${COD_USUARIO}', 1, 1, 1, 1, 1,  '1','1', '1')`;
     mysqlConnection.query(consulta, (error, results) => {
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
  });// fin


  //Actualizar registro
  router.put('/modificar_usuarios/:COD_USUARIO', (req, res) => {
    const { USUARIO, CONTRASENA, PRIMER_INGRESO, MODIFICADO_POR, COD_PERSONA, COD_ESTADO_USUARIO} = req.body;
    const { COD_USUARIO } = req.params;
    
    mysqlConnection.query(
        "CALL SP_moduloseguridad('MS_USUARIOS', 'U', ?, 1, ?, ?, ?, 1, ?, ? , ?)",
        [COD_USUARIO, PRIMER_INGRESO , COD_PERSONA, COD_ESTADO_USUARIO, USUARIO, CONTRASENA, MODIFICADO_POR],
        (err, rows, fields) => {
            if (!err) {
                //retornar lo actualizado
                res.status(200).json(req.body);
            } else {
                console.log(err);
            }

        });
});

module.exports = router;
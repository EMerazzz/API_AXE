const express = require('express');
const router = express.Router();

//Referencia necesarias para usar JWT en el modulo
const jwt = require('jsonwebtoken')
const verifyToken = require('./verify');

const mysqlConnection = require('../database');
//const mysqlConnection = require('../database');

//********************* TABLA MS_ESTADO_USUARIO*******************************
//MOTRAR DATOS DE LA TABLA 
router.get('/estado_usuario', verifyToken, (req, res) => {
    try {
        jwt.verify(req.token, global.secretTokenAccess, (err) => {
            if (err) {
                res.sendStatus(403);
            } else {
                // Resto del código que realiza la consulta
                const consulta = `CALL SP_moduloseguridad('MS_ESTADO_USUARIO', 'SA', 1, 1, 1, 1, 1, 1,  '1','1', '1')`;
                mysqlConnection.query(consulta, (error, results) => {
                    if (error) throw error;
                    if (results.length > 0) {
                        res.status(200).json(results[0]);
                    } else {
                        res.send(error);
                    }
                });
            }
        });
    } catch (error) {
        res.send(error);
    }
});


//Mostrar datos de un rol por codigo
router.put("/del_estado_usuario/:COD_ESTADO_USUARIO", verifyToken, (req, res) => {
    try {
        jwt.verify(req.token, global.secretTokenAccess, (err) => {
            if (err) {
                res.sendStatus(403);
            } else {
                // Resto del código que realiza la consulta
                const { COD_ESTADO_USUARIO } = req.params;
                const consulta = `CALL SP_moduloseguridad('MS_ESTADO_USUARIO', 'DE', '${COD_ESTADO_USUARIO}', 1, 1, 1, 1, 1,  '1','1', '1','1')`;
                mysqlConnection.query(consulta, (error, results) => {
                    if (!error) {
                        res.json({
                            Status: "Estado Eliminado"
                        });
                    } else {
                        console.log(error);
                        res.status(500).json({ message: "Error al Eliminar Estado" });
                    }
                });
            }
        });
    } catch (error) {
        res.send(error);
    }
});


//Agregar un nuevo estado usuario
router.post('/estado_usuario', verifyToken, (req, res) => {
    try {
        jwt.verify(req.token, global.secretTokenAccess, (err) => {
            if (err) {
                res.sendStatus(403);
            } else {
                // Resto del código que realiza la inserción del nuevo estado de usuario
                const { DESCRIPCION } = req.body;
                const query = `
            SET @DESCRIPCION = ?;
            CALL SP_moduloseguridad('MS_ESTADO_USUARIO', 'I', 1, 1, 1, 1, 1, 1,  @DESCRIPCION,'1', '1')
          `;
                mysqlConnection.query(query, [DESCRIPCION], (err, rows, fields) => {
                    if (!err) {
                        res.json({ status: 'Estado de usuario ingresado' });
                    } else {
                        console.log(err);
                    }
                });
            }
        });
    } catch (error) {
        res.send(error);
    }
});

//Actualizar registro
router.put('/estado_usuario/:COD_ESTADO_USUARIO', verifyToken, (req, res) => {
    try {
        jwt.verify(req.token, global.secretTokenAccess, (err) => {
            if (err) {
                res.sendStatus(403);
            } else {
                // Resto del código que realiza la actualización del estado de usuario
                const { DESCRIPCION,Estado_registro} = req.body;
                const { COD_ESTADO_USUARIO } = req.params;

                mysqlConnection.query(
                    "CALL SP_moduloseguridad('MS_ESTADO_USUARIO', 'U', ?, 1, 1, 1, 1, 1,  ?, '1' , '1')",
                    [COD_ESTADO_USUARIO, DESCRIPCION,Estado_registro],
                    (err, rows, fields) => {
                        if (!err) {
                            // Retornar lo actualizado
                            res.status(200).json(req.body);
                        } else {
                            console.log(err);
                        }
                    }
                );
            }
        });
    } catch (error) {
        res.send(error);
    }
});


//*************************** TABLA MS_PERMISOS *********************************/
//MOTRAR DATOS DE LA TABLA
router.get('/permisos', verifyToken, (req, res) => {
    try {
        jwt.verify(req.token, global.secretTokenAccess, (err) => {
            if (err) {
                res.sendStatus(403);
            } else {
                // Resto del código que realiza la consulta
                const consulta = `CALL SP_moduloseguridad('MS_PERMISOS', 'SA', 1, 1, 1, 1, 1, 1, '1','1', '1')`;
                mysqlConnection.query(consulta, (error, results) => {
                    if (error) throw error;
                    if (results.length > 0) {
                        res.status(200).json(results[0]);
                    } else {
                        res.send(error);
                    }
                });
            }
        });
    } catch (error) {
        res.send(error);
    }
});


//Mostrar datos de un permiso por codigo
router.put("/del_permisos/:COD_PERMISO", verifyToken, (req, res) => {
    try {
        jwt.verify(req.token, global.secretTokenAccess, (err) => {
            if (err) {
                res.sendStatus(403);
            } else {
                // Resto del código que realiza la consulta
                const { COD_PERMISO } = req.params;
                const consulta = `CALL SP_moduloseguridad('MS_PERMISOS', 'DE', '${COD_PERMISO}', 1, 1, 1, 1, 1,  '1','1', '1')`;
                mysqlConnection.query(consulta, (error, results) => {
                    if (!error) {
                        res.json({
                            Status: "Permiso Eliminado"
                        });
                    } else {
                        console.log(error);
                        res.status(500).json({ message: "Error al Eliminar Permiso" });
                    }
                });
            }
        });
    } catch (error) {
        res.send(error);
    }
});


// Insertar un permiso
router.post('/permisos', verifyToken, (req, res) => {
    try {
        jwt.verify(req.token, global.secretTokenAccess, (err) => {
            if (err) {
                res.sendStatus(403);
            } else {
                // Resto del código que realiza la inserción
                const { PERMISO_INSERCION, PERMISO_ELIMINACION, PERMISO_ACTUALIZACION, PERMISO_CONSULTAR, MODIFICADO_POR, COD_ROL,Estado_registro} = req.body;
                const query = `
            SET @PERMISO_INSERCION = ?;
            SET @PERMISO_ELIMINACION = ?;
            SET @PERMISO_ACTUALIZACION = ?;
            SET @PERMISO_CONSULTAR = ?;
            SET @MODIFICADO_POR = ?;
            SET @COD_ROL = ?;
  
            CALL SP_moduloseguridad('MS_PERMISOS', 'I', 1, @COD_ROL, @PERMISO_INSERCION, @PERMISO_ELIMINACION,  @PERMISO_ACTUALIZACION, @PERMISO_CONSULTAR,  @MODIFICADO_POR, '1', '1')
          `;
                mysqlConnection.query(query, [PERMISO_INSERCION, PERMISO_ELIMINACION, PERMISO_ACTUALIZACION, PERMISO_CONSULTAR, MODIFICADO_POR, COD_ROL], (err, rows, fields) => {
                    if (!err) {
                        res.json({ status: 'Estado de permiso ingresado' });
                    } else {
                        console.log(err);
                    }
                });
            }
        });
    } catch (error) {
        res.send(error);
    }
});

/*********************************** TABLA MS_PREGUNTAS_CONTRASENA ***************************** */
//MOTRAR DATOS DE LA TABLA

router.get('/pregunta_usuario', verifyToken, (req, res) => {
    try {
        jwt.verify(req.token, global.secretTokenAccess, (err) => {
            if (err) {
                res.sendStatus(403);
            } else {
                // Resto del código que realiza la consulta a la tabla de preguntas de contraseña
                const consulta = `CALL SP_moduloseguridad('MS_PREGUNTA_USUARIO', 'SA', 0, 1, 0, 0, 0, 0, '¿Equipo Favortito?', 'Real Madrid', '')`;
                mysqlConnection.query(consulta, (error, results) => {
                    if (error) throw error;
                    if (results.length > 0) {
                        res.status(200).json(results[0]);
                    } else {
                        res.send(error);
                    }
                });
            }
        });
    } catch (error) {
        res.send(error);
    }
});


//Mostrar datos por codigo
router.post("/preguntas_usuario", /*verifyToken,*/ (req, res) => {
    try {
        /*
        jwt.verify(req.token, global.secretTokenAccess, (err) => {
            if (err) {
                res.sendStatus(403);
            } else {*/
                // Resto del código que realiza la consulta a la tabla de preguntas de contraseña
                const { USUARIO } = req.body;
                const consulta = `call axe.SP_MS_PREGUNTAS_SEG_USUARIO('${USUARIO}');`;
                mysqlConnection.query(consulta, (error, results) => {
                    if (error) throw error;
                    if (results.length > 0) {
                        res.status(200).json(results[0]);
                    } /*else {
                        res.send(error);
                    }
                });
            }*/
        });
    } catch (error) {
        res.send(error);
    }
});

//Insertar un registro

router.post('/pregunta_usuario', /*verifyToken,*/ (req, res) => {
    try {
        //jwt.verify(req.token, global.secretTokenAccess, (err) => {
          //  if (err) {
             //   res.sendStatus(403);
            //} else {
                // Resto del código que realiza la inserción de la pregunta de contraseña
                const { PREGUNTA, RESPUESTA, COD_USUARIO } = req.body;
                const query = `
            SET @PREGUNTA = ?;
            SET @RESPUESTA = ?;
            SET @COD_USUARIO = ?;
                
            CALL SP_moduloseguridad('MS_PREGUNTA_USUARIO', 'I', 1, @COD_USUARIO, 0, 0, 0, 0, @PREGUNTA, @RESPUESTA, '')
          `;
                mysqlConnection.query(query, [PREGUNTA, RESPUESTA, COD_USUARIO], (err, rows, fields) => {
                    if (!err) {
                        res.json({ status: 'Pregunta de usuario/contraseña ingresada' });
                    } else {
                        console.log(err);
                    }
                });
          //  }
      //  });
    } catch (error) {
        res.send(error);
    }
});


// Esta quedara al final, eliminar la de arriba
router.post('/usuario_pregunta', /*verifyToken,*/ (req, res) => {
    try {
        //jwt.verify(req.token, global.secretTokenAccess, (err) => {
          //  if (err) {
             //   res.sendStatus(403);
            //} else {
                // Resto del código que realiza la inserción de la pregunta de contraseña
                // CALL SP_INSERT_MS_PREGUNTAS_SEGURIDAD(16, 8, 'Administrador de base de datos')
                const { COD_PREGUNTA, COD_USUARIO,RESPUESTA } = req.body;
                const query = `
            SET @COD_PREGUNTA = ?;
            SET @RESPUESTA = ?;
            SET @COD_USUARIO = ?;
                
            CALL SP_INSERT_MS_PREGUNTAS_SEGURIDAD(@COD_USUARIO, @COD_PREGUNTA, @RESPUESTA);
          `;
                mysqlConnection.query(query, [COD_PREGUNTA, RESPUESTA,  COD_USUARIO], (err, rows, fields) => {
                    if (!err) {
                        res.json({ status: 'Pregunta de usuario/contraseña ingresada' });
                    } else {
                        console.log(err);
                    }
                });
          //  }
      //  });
    } catch (error) {
        res.send(error);
    }
});

router.post('/dame_cod_usuario', /*verifyToken,*/ (req, res) => {
    try {
        //jwt.verify(req.token, global.secretTokenAccess, (err) => {
          //  if (err) {
             //   res.sendStatus(403);
            //} else {
                // Resto del código que realiza la inserción de la pregunta de contraseña
                const { USUARIO } = req.body;
                const query = `
            SET @USUARIO = ?;
                
            CALL MS_CODIGO_USUARIO(@USUARIO)
          `;
                mysqlConnection.query(query, [USUARIO], (err, results) => {
                    if (!err) {
                        res.status(200).json(results[1]);
                    } else {
                        console.log(err);
                    }
                });
          //  }
      //  });
    } catch (error) {
        res.send(error);
    }
});

//Obtiene el numero de preguntas que tiene un usuario
router.post('/cuenta_preguntas', /*verifyToken,*/ (req, res) => {
    try {
        //jwt.verify(req.token, global.secretTokenAccess, (err) => {
          //  if (err) {
             //   res.sendStatus(403);
            //} else {
                // Resto del código que realiza la inserción de la pregunta de contraseña
                const { COD_USUARIO, USUARIO } = req.body;
                const query = `                
            CALL MS_CUENTA_PREGUNTAS(?, ?);
          `;
                mysqlConnection.query(query, [USUARIO, COD_USUARIO], (err, results) => {
                    if (!err) {
                        res.status(200).json(results[0][0]);
                    } else {
                        console.log(err);
                    }
                });
          //  }
      //  });
    } catch (error) {
        res.send(error);
    }
});



//Actualizar registro
router.put('/pregunta_usuario/:COD_PREGUNTA', verifyToken, (req, res) => {
    try {
      jwt.verify(req.token, global.secretTokenAccess, (err) => {
        if (err) {
          res.sendStatus(403);
        } else {
          // Resto del código que realiza la actualización de la pregunta de contraseña
          const { PREGUNTA, RESPUESTA } = req.body;
          const { COD_PREGUNTA } = req.params;
  
          mysqlConnection.query(
              "CALL SP_moduloseguridad('MS_PREGUNTA_USUARIO', 'U', ?, 0, 0, 0, 0, 0, ?, ?, '1')",
              [COD_PREGUNTA, PREGUNTA, RESPUESTA],
              (err, rows, fields) => {
                  if (!err) {
                      //retornar lo actualizado
                      res.status(200).json(req.body);
                  } else {
                      console.log(err);
                  }
              }
          );
        }
      });
    } catch (error) {
      res.send(error);
    }
  });
  
/*********************************** TABLA MS_ROLES ***************************** */
//MOTRAR DATOS DE LA TABLA
router.get('/roles', verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
 //  jwt.verify(req.token, global.secretTokenAccess, (err) => {
        //   if (err) {
         //      res.sendStatus(403);
          //  } else {
    mysqlConnection.query(`call axe.SP_moduloseguridad('MS_ROLES', 'SA', 1, 1, 1, 1, 1, 1, '1', '1', '1');`, (err, rows) => {
      if (!err) {
        res.status(200).json(rows[0]);
      } else {
        console.log('Se ha producido un error');
        res.sendStatus(500);
      }
    //});
    // }
       });
  });
  

//Mostrar datos por codigo
router.put("/del_roles/:COD_ROL", verifyToken, (req, res) => {
    try {
        const { COD_ROL } = req.params;
        jwt.verify(req.token, global.secretTokenAccess, (err) => {
            if (err) {
                res.sendStatus(403); // Token inválido o expirado
            } else {
                const consulta = `CALL SP_moduloseguridad('ms_roles', 'DE', '${COD_ROL}', 1, 1, 1, 1, 1, '1','1', '1')`;
                mysqlConnection.query(consulta, (error, results) => {
                    if (!error) {
                        res.json({
                            Status: "Rol Eliminado"
                        });
                    } else {
                        console.log(error);
                        res.status(500).json({ message: "Error al Eliminar Rol" });
                    }
                });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error inesperado" });
    }
});

// fin

//Insertando un registro
router.post('/roles', verifyToken, (req, res) => {
    const { DESCRIPCION, MODIFICADO_POR,Estado_registro} = req.body;
    const query = `
      SET @DESCRIPCION = ?;
      SET @MODIFICADO_POR = ?;
      CALL SP_moduloseguridad('ms_roles', 'I', 1, 1, 1, 1, 1, 1,  @DESCRIPCION, @MODIFICADO_POR, '1')
    `;
    mysqlConnection.query(query, [DESCRIPCION, MODIFICADO_POR,Estado_registro], (err, rows, fields) => {
      if (!err) {
        res.json({ status: 'Estado de rol ingresado' });
      } else {
        res.sendStatus(500); // Devolver un error interno del servidor si ocurre algún problema
      }
    });
  });

//Actualizar registro
router.put('/roles/:COD_ROL', verifyToken, (req, res) => {
    const { DESCRIPCION, MODIFICADO_POR, Estado_registro} = req.body;
    const { COD_ROL } = req.params;
  
    mysqlConnection.query(
      "CALL SP_moduloseguridad('ms_roles', 'U', ?, 1, 1, 1, 1, 1,  ?, ? , '1')",
      [COD_ROL, DESCRIPCION, MODIFICADO_POR, Estado_registro],
      (err, rows, fields) => {
        //CALL SP_moduloseguridad('ms_roles', 'U', 2, 1, 1, 1, 1, 1,  'Usuario Normal','John Wick', '1')
        if (!err) {
          //retornar lo actualizado
          res.status(200).json(req.body);
        } else {
          console.log(err);
          res.sendStatus(500); // Devolver un error interno del servidor si ocurre algún problema
        }
      });
  });
  
/*********************************** TABLA MS_USUARIOS ***************************** */
//MOTRAR DATOS DE LA TABLA

router.get('/usuarios', verifyToken, (req, res) => {
    try {
        jwt.verify(req.token, global.secretTokenAccess, (err) => {
            //SI hubo problema
            if (err) {
                //  console.log(err.message);
                res.sendStatus(403)
            } else {
                const consulta = `CALL SP_moduloseguridad('MS_USUARIOS', 'SA', 1, 1, 1, 1, 1, 1,  '1','1', '1')`;
                mysqlConnection.query(consulta, (error, results) => {
                    //if (error) throw error;
                    if (results.length > 0) {
                        res.status(200).json(results[0]);
                    } else {
                        res.send(error)

                    }
                })
            }

        })

    } catch (error) {
        res.send(error)
    }
});


//Mostrar datos de un rol por codigo
router.put("/del_usuarios/:COD_USUARIO", verifyToken, (req, res) => {
    try {
        jwt.verify(req.token, global.secretTokenAccess, (err) => {
            // Si hubo un problema con la verificación del token
            if (err) {
                res.sendStatus(403);
            } else {
                const { COD_USUARIO } = req.params;
                const consulta = `CALL SP_moduloseguridad('MS_USUARIOS', 'DE', '${COD_USUARIO}', 1, 1, 1, 1, 1,  '1','1', '1')`;
                mysqlConnection.query(consulta, (error, results) => {
                if (!error) {
                    res.json({
                      Status: "Usuario Eliminado"
                    });
                  } else {
                    console.log(error);
                    res.status(500).json({ message: "Error al Eliminar Usuario" });
                  }
                });
            }
        });
    } catch (error) {
        res.send(error);
    }
});

//Insertar Usuario
router.post('/usuarios', verifyToken, (req, res) => {
    try {
        jwt.verify(req.token, global.secretTokenAccess, (err) => {
            if (err) {
                res.sendStatus(403);
            } else {
                // Resto del código que actualiza el registro
                const { USUARIO, CONTRASENA, MODIFICADO_POR, COD_PERSONA, COD_ESTADO_USUARIO,COD_ROL } = req.body;
                //const { COD_USUARIO } = req.params;

                mysqlConnection.query(
                    "call axe.SP_moduloseguridad('MS_USUARIOS', 'I', 1, ?, ?, ?, 1, 1, ?, ?, ?);",
                    [COD_ROL,COD_PERSONA, COD_ESTADO_USUARIO, USUARIO, CONTRASENA, MODIFICADO_POR],
                    (err, rows, fields) => {
                        if (!err) {
                            // Retornar lo actualizado
                            res.status(200).json("exito");
                        } else {
                            console.log(err);
                        }
                    }
                );
            }
        });
    } catch (error) {
        res.send(error);
    }
});


//Actualizar registro
router.put('/usuarios/:COD_USUARIO', verifyToken, (req, res) => {
    try {
        jwt.verify(req.token, global.secretTokenAccess, (err) => {
            if (err) {
                res.sendStatus(403);
            } else {
                // Resto del código que actualiza el registro
                const { USUARIO, CONTRASENA, PRIMER_INGRESO, MODIFICADO_POR, COD_PERSONA, COD_ESTADO_USUARIO,Estado_registro } = req.body;
                const { COD_USUARIO } = req.params;

                mysqlConnection.query(
                    "CALL SP_moduloseguridad('MS_USUARIOS', 'U', ?, 1, ?, ?, ?, 1, ?, ? , ?)",
                    [COD_USUARIO, PRIMER_INGRESO, COD_PERSONA, COD_ESTADO_USUARIO, USUARIO, CONTRASENA, MODIFICADO_POR],
                    (err, rows, fields) => {
                        if (!err) {
                            // Retornar lo actualizado
                            res.status(200).json(req.body);
                        } else {
                            console.log(err);
                        }
                    }
                );
            }
        });
    } catch (error) {
        res.send(error);
    }
});
//mostrar bitacora
router.get('/bitacora', verifyToken, (req, res) => {
    try {
       jwt.verify(req.token, global.secretTokenAccess, (err) => {
            if (err) {
                res.sendStatus(403);
            } else {
                // Resto del código que realiza la consulta a la tabla de preguntas de contraseña
                const consulta = `call axe.SP_MostrarBitacora('SA', 1);`;
                mysqlConnection.query(consulta, (error, results) => {
                    if (error) throw error;
                    if (results.length > 0) {
                        res.status(200).json(results[0]);
                    } else {
                        res.send(error);
                    }
                });
           }
        });
    } catch (error) {
        res.send(error);
    }
});

// CALL SP_MS_PREGUNTAS_SEGURIDAD('GERMAN');

// ******************* Preguntas de seguridad
//Mostrar datos por codigo
router.post("/preguntaUsuario", /*verifyToken,*/ (req, res) => {
    try {
                const { USUARIO } = req.body;
                console.log(USUARIO);
                const consulta = `CALL SP_MS_PREGUNTAS_SEGURIDAD('${USUARIO}')`;
                //const consulta = `CALL SP_moduloseguridad('MS_PREGUNTA_USUARIO', 'SO', '1', 1, 0, 0, 0, 0, '${USUARIO}', '', '')`;
                mysqlConnection.query(consulta, (error, results) => {
                    if (error) throw error;
                    if (results.length > 0) {
                        res.status(200).json(results[0]);
                    } 
        });
    } catch (error) {
        res.send(error);
    }
});

// ******************* Preguntas de seguridad Milton
//Mostrar todos los datos
router.get('/preguntas', verifyToken, (req, res) => {
    try {
        jwt.verify(req.token, global.secretTokenAccess, (err) => {
            if (err) {
                res.sendStatus(403);
            } else {
                // Resto del código que realiza la consulta a la tabla de preguntas de contraseña
                const consulta = `CALL SP_MS_PREGUNTAS('mostrar','1','1');`;
                mysqlConnection.query(consulta, (error, results) => {
                    if (error) throw error;
                    if (results.length > 0) {
                        res.status(200).json(results[0]);
                    } else {
                        res.send(error);
                    }
                });
            }
        });
    } catch (error) {
        res.send(error);
    }
});

//

router.post("/permisos_usuario", /*verifyToken,*/ (req, res) => {
    try {
                const { USUARIO, OBJETO } = req.body;
                // CALL SP_MS_PERMISOS_USUARIOS('S0','JOSUE', 'BITACORA')
               // const consulta = `CALL SP_MS_PREGUNTAS_SEGURIDAD('${USUARIO}')`;
                const consulta = `CALL SP_MS_PERMISOS_USUARIOS('SO','${USUARIO}', '${OBJETO}')`;
                mysqlConnection.query(consulta, (error, results) => {
                    if (error) throw error;
                    if (results.length > 0) {
                        res.status(200).json(results[0]);
                    } 
        });
    } catch (error) {
        res.send(error);
    }
});

// ROLES - OBJETOS
router.get('/roles_objetos', (req, res) => {
    try {
      mysqlConnection.query(`CALL SP_MS_ROLES_PERMISOS('SA', 1, 1, 1, 1, 1, 1, 1);`, (error, results) => {
        if (error) {
          res.status(500).json({ error: 'Error interno del servidor' });
        }else{
            res.status(200).json(results[0]);
        }
      });
    } catch (catchError) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

// Insertar objetos
  router.post('/roles_objetos', (req, res) => {
    try {
        const { COD_ROL, COD_OBJETO, PERMISO_INSERCION, PERMISO_ELIMINACION, PERMISO_ACTUALIZACION, PERMISO_CONSULTAR } = req.body;
        
        const consulta = `CALL SP_MS_ROLES_PERMISOS('I', 1,${COD_ROL}, ${COD_OBJETO},${PERMISO_INSERCION}, ${PERMISO_ELIMINACION}, ${PERMISO_ACTUALIZACION}, ${PERMISO_CONSULTAR})`;
        mysqlConnection.query(consulta, (error, results) => {
            if (error) throw error;
            res.status(200).json("Actualizado");
});
    } catch (catchError) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

  // Modificar objetos
  router.put('/roles_objetos/:COD_ROL_OBJETO', (req, res) => {
    try {
        const { COD_ROL_OBJETO } = req.params;
        const { COD_ROL, COD_OBJETO, PERMISO_INSERCION, PERMISO_ELIMINACION, PERMISO_ACTUALIZACION, PERMISO_CONSULTAR } = req.body;
        //call axe.SP_MS_ROLES_PERMISOS('U', 11, 4, 12, 0, 0, 0, 0);
        const consulta = `CALL SP_MS_ROLES_PERMISOS('U', ${COD_ROL_OBJETO}, ${COD_ROL}, ${COD_OBJETO},${PERMISO_INSERCION}, ${PERMISO_ELIMINACION}, ${PERMISO_ACTUALIZACION}, ${PERMISO_CONSULTAR})`;
        mysqlConnection.query(consulta, (error, results) => {
            if (error) throw error;
            res.status(200).json("exito");
});
    } catch (catchError) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

  // Eliminar roles
  router.put('/del_roles_objetos/:COD_ROL_OBJETO', (req, res) => {
    try {
        const { COD_ROL_OBJETO } = req.params;
        //call axe.SP_MS_ROLES_PERMISOS('U', 11, 4, 12, 0, 0, 0, 0);
        const consulta = `CALL SP_MS_ROLES_PERMISOS('DE', ${COD_ROL_OBJETO}, 1, 1, 1, 1, 1, 1)`;
        mysqlConnection.query(consulta, (error, results) => {
            if (error) throw error;
            res.status(200).json("exito");
});
    } catch (catchError) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });


// Insertar datos
router.post('/preguntas', verifyToken, (req, res) => {
    const {PREGUNTA } = req.body;
    const query = `
      SET @PREGUNTA = ?;
      CALL SP_MS_PREGUNTAS('I','1', @PREGUNTA)
    `
    ;
    mysqlConnection.query(query, [PREGUNTA], (err, rows, fields) => {
      if (!err) {
        res.json({ status: 'Nueva Pregunta ingresada exitosamente' });
      } else {
        res.sendStatus(500); // Devolver un error interno del servidor si ocurre algún problema
      }
    });
  });

  //Actualizar un Registro
  router.put('/preguntas/:COD_PREGUNTA', verifyToken, (req, res) => {
    const {COD_PREGUNTA} = req.params;
    const {PREGUNTA } = req.body;
    const query = `
      SET @PREGUNTA = ?;
      CALL SP_MS_PREGUNTAS('U',@COD_PREGUNTA, @PREGUNTA)
          `
    ;
    mysqlConnection.query(query, [COD_PREGUNTA], [PREGUNTA],(err, rows, fields) => {
      if (!err) {
        res.json({ status: 'Pregunta modificada exitosamente' });
      } else {
        res.sendStatus(500); // Devolver un error interno del servidor si ocurre algún problema
      }
    });
  });


   router.put("/del_preguntas/:COD_PREGUNTA",verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      const { COD_PREGUNTA } = req.params;
      const sql = `CALL SP_MS_PREGUNTAS('DE',${COD_PREGUNTA}, '1')`;
      mysqlConnection.query(sql, (error, results) => {
        if (!error) {
          res.json({
            Status: "Pregunta Eliminada"
          });
        } else {
          console.log(error);
          res.status(500).json({ message: "Error al Eliminar " });
        }
      });
    } catch (error) {
      res.send(error);
    }
  });


  /* router.put("/preguntas/:COD_PREGUNTA", verifyToken, (req, res) => {
     //Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      const { COD_PREGUNTA } = req.params;
      const {PREGUNTA} = req.body;
      const sql = `CALL SP_MS_PREGUNTAS('U', ${COD_PREGUNTA},${PREGUNTA})`;
      mysqlConnection.query(sql, error => {
        if (!error) {
          res.json({
            Status: "Pregunta modificada exitosamente"
          });
        } else {
          console.log(error);
          res.sendStatus(500);
        }
      });
    } catch (error) {
      res.send(error);
    }
  }); */


// ******************* Preguntas de seguridad Milton (OBJETOS)
//Mostrar todos los datos
router.get('/objetos', verifyToken, (req, res) => {
    try {
        jwt.verify(req.token, global.secretTokenAccess, (err) => {
            if (err) {
                res.sendStatus(403);
            } else {
                // Resto del código que realiza la consulta a la tabla de preguntas de contraseña
                const consulta = `CALL SP_MS_OBJETOS('1','1','1','1','SA');`;
                mysqlConnection.query(consulta, (error, results) => {
                    if (error) throw error;
                    if (results.length > 0) {
                        res.status(200).json(results[0]);
                    } else {
                        res.send(error);
                    }
                });
            }
        });
    } catch (error) {
        res.send(error);
    }
});

//Mostrar datos por codigo 
router.put("/del_objetos/:COD_OBJETO", verifyToken, (req, res) => {
    try {
        const { COD_OBJETO } = req.params;
        jwt.verify(req.token, global.secretTokenAccess, (err) => {
          if (err) {
            res.sendStatus(403); // Token inválido o expirado
          } else {
            const consulta = `CALL SP_MS_OBJETOS('${COD_OBJETO}', '1', '1', '1', 'DE');`;
            mysqlConnection.query(consulta, (error, results) => {
                if (!error) {
                    res.json({
                      Status: "Objeto Eliminado"
                    });
                  } else {
                    console.log(error);
                    res.status(500).json({ message: "Error al Eliminar Objeto" });
                  }
            });
          }
        });
    } catch (error) {
        res.send(error);
    }
});
//Insertar
router.post('/objetos', verifyToken, (req, res) => {
    const { OBJETO, DESCRIPCION, TIPO_OBJETO } = req.body;
    const query = `
      SET @OBJETO = ?;
      SET @DESCRIPCION = ?;
      SET @TIPO_OBJETO = ?;  -- Corregido: el nombre del parámetro estaba mal escrito
      CALL SP_MS_OBJETOS('1', @OBJETO, @DESCRIPCION, @TIPO_OBJETO, 'I');  -- Corregido: eliminado el signo de interrogación antes de @OBJETO
    `;
    mysqlConnection.query(query, [OBJETO, DESCRIPCION, TIPO_OBJETO], (err, rows, fields) => {
      if (!err) {
        res.json({ status: 'Nuevo Objeto ingresado exitosamente' });
      } else {
        console.error(err);  // Imprimir el error en la consola para ayudar en la depuración
        res.sendStatus(500); // Devolver un error interno del servidor si ocurre algún problema
      }
    });
  });
  
  router.put("/objetos/:COD_OBJETO", verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      const { COD_OBJETO } = req.params;
      const { OBJETO, DESCRIPCION, TIPO_OBJETO } = req.body;
      
      // Corrección en la construcción de la consulta SQL
      const sql = `CALL SP_MS_OBJETOS('${COD_OBJETO}','${OBJETO}','${DESCRIPCION}','${TIPO_OBJETO}','U')`;
    
      mysqlConnection.query(sql, (error) => {
        if (!error) {
          res.json({
            Status: "Objeto modificado exitosamente",
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

  

// MS PARAMETROS
//Mostrar todos los datos
router.get('/parametros', verifyToken, (req, res) => {
    try {
        jwt.verify(req.token, global.secretTokenAccess, (err) => {
            if (err) {
                res.sendStatus(403);
            } else {
                // Resto del código que realiza la consulta a la tabla de preguntas de contraseña
                const consulta = `CALL SP_MS_PARAMETROS1('SA','1','1','1','1');`;
                mysqlConnection.query(consulta, (error, results) => {
                    if (error) throw error;
                    if (results.length > 0) {
                        res.status(200).json(results[0]);
                    } else {
                        res.send(error);
                    }
                });
            }
        });
    } catch (error) {
        res.send(error);
    }
});

// INSERTAR
router.post('/parametros', verifyToken, (req, res) => {
    const { PARAMETRO, VALOR, USUARIO } = req.body;
    const query = `
      SET @PARAMETRO = ?;
      SET @VALOR = ?;
      SET @USUARIO = ?;
      CALL SP_MS_PARAMETROS1('I','1',@PARAMETRO,@VALOR,@USUARIO);
    `;
  
    mysqlConnection.query(query, [PARAMETRO, VALOR, USUARIO], (err, rows, fields) => {
      if (!err) {
        res.json({ status: 'Nuevo parámetro ingresado exitosamente' });
      } else {
        console.error(err);
        res.sendStatus(500); // Devolver un error interno del servidor si ocurre algún problema
      }
    });
  });
  

  //ACTUALIZAR LOS DATOS
 // Modificar datos
 router.put("/parametros/:COD_PARAMETRO", verifyToken, (req, res) => {
    try {
      const { COD_PARAMETRO } = req.params;
      const { PARAMETRO, USUARIO, VALOR } = req.body;
  
      // Utilizar consultas preparadas para evitar inyecciones de SQL
      const sql = "CALL SP_MS_PARAMETROS1(?, ?, ?, ?, ?)";
  
      // Utilizar un array para los valores de los parámetros
      const values = ['U', COD_PARAMETRO, PARAMETRO, VALOR, USUARIO];
  
      mysqlConnection.query(sql, values, (error) => {
        if (!error) {
          res.json({
            Status: "Parámetro modificado exitosamente"
          });
        } else {
          console.error(error);
          res.sendStatus(500);
        }
      });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }); 
  
  module.exports = router;
  


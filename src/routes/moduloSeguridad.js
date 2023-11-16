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
                const consulta = `CALL SP_moduloseguridad('MS_ESTADO_USUARIO', 'SA', 1, 1, 1, 1, 1, 1,  '1','1', '1','1')`;
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
router.get("/estado_usuario/:COD_ESTADO_USUARIO", verifyToken, (req, res) => {
    try {
        jwt.verify(req.token, global.secretTokenAccess, (err) => {
            if (err) {
                res.sendStatus(403);
            } else {
                // Resto del código que realiza la consulta
                const { COD_ESTADO_USUARIO } = req.params;
                const consulta = `CALL SP_moduloseguridad('MS_ESTADO_USUARIO', 'SO', '${COD_ESTADO_USUARIO}', 1, 1, 1, 1, 1,  '1','1', '1','1')`;
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
            CALL SP_moduloseguridad('MS_ESTADO_USUARIO', 'I', 1, 1, 1, 1, 1, 1,  @DESCRIPCION,'1', '1','1')
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
                    "CALL SP_moduloseguridad('MS_ESTADO_USUARIO', 'U', ?, 1, 1, 1, 1, 1,  ?, '1' , '1','1')",
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
                const consulta = `CALL SP_moduloseguridad('MS_PERMISOS', 'SA', 1, 1, 1, 1, 1, 1, '1','1', '1','1')`;
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
router.get("/permisos/:COD_PERMISO", verifyToken, (req, res) => {
    try {
        jwt.verify(req.token, global.secretTokenAccess, (err) => {
            if (err) {
                res.sendStatus(403);
            } else {
                // Resto del código que realiza la consulta
                const { COD_PERMISO } = req.params;
                const consulta = `CALL SP_moduloseguridad('MS_PERMISOS', 'SO', '${COD_PERMISO}', 1, 1, 1, 1, 1,  '1','1', '1','1')`;
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
            SET @Estado_registro = ?;
  
            CALL SP_moduloseguridad('MS_PERMISOS', 'I', 1, @COD_ROL, @PERMISO_INSERCION, @PERMISO_ELIMINACION,  @PERMISO_ACTUALIZACION, @PERMISO_CONSULTAR,  @MODIFICADO_POR, '1', '1',@Estado_registro)
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
                const consulta = `CALL SP_moduloseguridad('MS_PREGUNTA_USUARIO', 'SA', 0, 1, 0, 0, 0, 0, '¿Equipo Favortito?', 'Real Madrid', '','1')`;
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
router.post("/pregunta_usuario/:COD_USUARIO", /*verifyToken,*/ (req, res) => {
    try {
        /*
        jwt.verify(req.token, global.secretTokenAccess, (err) => {
            if (err) {
                res.sendStatus(403);
            } else {*/
                // Resto del código que realiza la consulta a la tabla de preguntas de contraseña
                const { USUARIO } = req.body;
                console.log(USUARIO);
                const consulta = `CALL SP_moduloseguridad('MS_PREGUNTA_USUARIO', 'SO', '1', 1, 0, 0, 0, 0, '${USUARIO}', '', '','1')`;
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
            SET @Estado_registro= ?;
                
            CALL SP_moduloseguridad('MS_PREGUNTA_USUARIO', 'I', 1, @COD_USUARIO, 0, 0, 0, 0, @PREGUNTA, @RESPUESTA, '',@Estado_registro)
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
            SET @Estado_registro= ?;
                
            CALL SP_INSERT_MS_PREGUNTAS_SEGURIDAD(@COD_USUARIO, @COD_PREGUNTA, @RESPUESTA,@Estado_registro);
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
              "CALL SP_moduloseguridad('MS_PREGUNTA_USUARIO', 'U', ?, 0, 0, 0, 0, 0, ?, ?, '1','1')",
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
    mysqlConnection.query(`call axe.SP_moduloseguridad('MS_ROLES', 'SA', 1, 1, 1, 1, 1, 1, '1', '1', '1','1');`, (err, rows) => {
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
router.get("/roles/:COD_ROL", verifyToken, (req, res) => {
    try {
        const { COD_ROL } = req.params;
        jwt.verify(req.token, global.secretTokenAccess, (err) => {
          if (err) {
            res.sendStatus(403); // Token inválido o expirado
          } else {
            const consulta = `CALL SP_moduloseguridad('ms_roles', 'SO', '${COD_ROL}', 1, 1, 1, 1, 1, '1','1', '1','1')`;
            mysqlConnection.query(consulta, (error, results) => {
                if (error) throw error;
                if (results.length > 0) {
                    console.log(COD_ROL);
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
// fin

//Insertando un registro
router.post('/roles', verifyToken, (req, res) => {
    const { DESCRIPCION, MODIFICADO_POR,Estado_registro} = req.body;
    const query = `
      SET @DESCRIPCION = ?;
      SET @MODIFICADO_POR = ?;
      SET @Estado_registro = ?;
      CALL SP_moduloseguridad('ms_roles', 'I', 1, 1, 1, 1, 1, 1,  @DESCRIPCION, @MODIFICADO_POR, '1',@Estado_registro)
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
      "CALL SP_moduloseguridad('ms_roles', 'U', ?, 1, 1, 1, 1, 1,  ?, ? , '1','1')",
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
                const consulta = `CALL SP_moduloseguridad('MS_USUARIOS', 'SA', 1, 1, 1, 1, 1, 1,  '1','1', '1','1')`;
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
router.get("/usuarios/:COD_USUARIO", verifyToken, (req, res) => {
    try {
        jwt.verify(req.token, global.secretTokenAccess, (err) => {
            // Si hubo un problema con la verificación del token
            if (err) {
                res.sendStatus(403);
            } else {
                const { COD_USUARIO } = req.params;
                const consulta = `CALL SP_moduloseguridad('MS_USUARIOS', 'SO', '${COD_USUARIO}', 1, 1, 1, 1, 1,  '1','1', '1','1')`;
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

//Insertar Usuario
router.post('/usuarios', verifyToken, (req, res) => {
    try {
        jwt.verify(req.token, global.secretTokenAccess, (err) => {
            if (err) {
                res.sendStatus(403);
            } else {
                // Resto del código que actualiza el registro
                const { USUARIO, CONTRASENA, MODIFICADO_POR, COD_PERSONA, COD_ESTADO_USUARIO,Estado_registro } = req.body;
                //const { COD_USUARIO } = req.params;

                mysqlConnection.query(
                    "CALL SP_moduloseguridad('MS_USUARIOS', 'I', 1, 0, ?, ?, 1, 1, ?, ? , ?,1)",
                    [COD_PERSONA, COD_ESTADO_USUARIO, USUARIO, CONTRASENA, MODIFICADO_POR,Estado_registro],
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
                    "CALL SP_moduloseguridad('MS_USUARIOS', 'U', ?, 1, ?, ?, ?, 1, ?, ? , ?,1)",
                    [COD_USUARIO, PRIMER_INGRESO, COD_PERSONA, COD_ESTADO_USUARIO, USUARIO, CONTRASENA, MODIFICADO_POR,Estado_registro],
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
                const consulta = `CALL SP_MS_PREGUNTAS('mostrar','null','null')`;
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

// Insertar datos
router.post('/preguntas', verifyToken, (req, res) => {
    const {NUEVA_PREGUNTA } = req.body;
    const query = `
      SET @DNUEVA_PREGUNTA = ?;
      CALL SP_MS_PREGUNTAS('I','NULL' ,@NUEVA_PREGUNTA)
    `;
    mysqlConnection.query(query, [NUEVA_PREGUNTA], (err, rows, fields) => {
      if (!err) {
        res.json({ status: 'Nueva Pregunta ingresada exitosamente' });
      } else {
        res.sendStatus(500); // Devolver un error interno del servidor si ocurre algún problema
      }
    });
  });

  //Actualizar un Registro
  router.put("/preguntas/:COD_PREGUNTA", verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      const { COD_PREGUNTA } = req.params;
      const {NUEVA_PREGUNTA} = req.body;
      const sql = `CALL SP_MS_PREGUNTAS('U', ${COD_PREGUNTA},${NUEVA_PREGUNTA});`;
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
  });

module.exports = router;
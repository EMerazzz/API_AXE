const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken')
const verifyToken = require('./verify');

const mysqlConnection = require('../database');
/******************** ASIGNATURAS **************************/
//MOTRAR DATOS DE LA TABLA DE ASIGNATURAS
router.get('/asignaturas', verifyToken, (req, res) => { 

    mysqlConnection.query(`Call SP_moduloAcademico('MA_ASIGNATURAS','SA','1','1','1','null','null','null','null',null)`, (err, rows) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log('Se ha producido un error');
            res.sendStatus(500); // Devolver un error interno del servidor si ocurre algún problema
        }
    });

});

//GET por codigo
router.put("/del_asignaturas/:COD_ASIGNATURA", verifyToken, (req, res) => {
    try {
        const { COD_ASIGNATURA } = req.params;
        const sql = `Call SP_moduloAcademico('MA_ASIGNATURAS','DE','${COD_ASIGNATURA}','1','1','null','null','null','null',null)`;
        mysqlConnection.query(sql, (error, results) => {
            if (!error) {
                res.json({
                  Status: "Asignatura Eliminada"
                });
              } else {
                console.log(error);
                res.status(500).json({ message: "Error al Eliminar Asignatura" });
              }
        });
    } catch (error) {
        res.send(error);
    }
});



//Metodo Post
router.post("/asignaturas", verifyToken, (req, res) => {
    try {
        const { NOMBRE_ASIGNATURA, Estado_registro} = req.body;
        //            call axe.SP_moduloAcademico('NOMBRETABLA', 'FUNCION', PARAMETROBI, PARAMETROINT1, PARAMETROINT2, 'PARAMETROV1',  'PARAMETROV2', 'PARAMETROV3', 'PARAMETROV4');
        const sql = `Call SP_moduloAcademico('MA_ASIGNATURAS',    'I',     '1',          ${Estado_registro},          '1',       '${NOMBRE_ASIGNATURA}','null',       'null',         'null',  'null')`;
        mysqlConnection.query(sql, error => {
            if (!error) {
                res.json({
                    Status: "Asignatura Registrada"
                });
            } else {
                console.log(error);
                res.sendStatus(500); // Devolver un error interno del servidor si ocurre algún problema
            }
        });
    } catch (error) {
        res.send(error);
    }
});
   //Metodo put
router.put("/asignaturas/:COD_ASIGNATURA", verifyToken,(req, res) => {
    try {
        const { COD_ASIGNATURA } = req.params;
        const { NOMBRE_ASIGNATURA, Estado_registro} = req.body;
        console.log(COD_ASIGNATURA);
         //            call axe.SP_moduloAcademico('NOMBRETABLA', 'FUNCION',   PARAMETROBI,          PARAMETROINT1,        PARAMETROINT2,    'PARAMETROV1',         'PARAMETROV2',  'PARAMETROV3', 'PARAMETROV4');
        const sql = `call axe.SP_moduloAcademico('MA_ASIGNATURAS',   'U',   ${COD_ASIGNATURA},   ${Estado_registro},          '1',       '${NOMBRE_ASIGNATURA}',  'null',          'null',       'null', 'null')`;
        mysqlConnection.query(sql, error => {
            if (!error) {
                res.json({
                    Status: "Asignatura Modificada"
                });
            } else {
                console.log(error);
                res.sendStatus(500); // Devolver un error interno del servidor si ocurre algún problema
            }
        });
    } catch (error) {
        res.send(error);
    }
});


   /******************** JORNADAS *************************/
//MOTRAR DATOS DE LA TABLA JORNADAS
router.get('/jornadas', verifyToken, (req, res) => { 
    mysqlConnection.query(`Call SP_moduloAcademico('MA_JORNADA','SA','1','1','1','null','null','null','null')`, (err, rows) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log('Se ha producido un error');
            res.sendStatus(500); // Devolver un error interno del servidor si ocurre algún problema
        }
    });
});

//GET por codigo
router.put("/del_jornadas/:COD_JORNADA", verifyToken, (req, res) => {
    try {
        const { COD_JORNADA } = req.params;
        const sql = `Call SP_moduloAcademico('MA_JORNADA','DE','${COD_JORNADA}','1','1','null','null','null','null')`;
        mysqlConnection.query(sql, (error, results) => {
            if (!error) {
                res.json({
                  Status: "Jornada Eliminada"
                });
              } else {
                console.log(error);
                res.status(500).json({ message: "Error al Eliminar Jornada" });
              }
        });
    } catch (error) {
        res.send(error);
    }
});

  //Metodo Post
router.post("/jornadas", verifyToken, (req, res) => {
    try {
        const { DESCRIPCION_JOR,Estado_registro } = req.body;
        const sql = `Call SP_moduloAcademico('MA_JORNADA','I','1','1','1','${DESCRIPCION_JOR}','null','null','null')`;
        mysqlConnection.query(sql, error => {
            if (!error) {
                res.json({
                    Status: "Jornada Registrada"
                });
            } else {
                console.log(error);
                res.sendStatus(500); // Devolver un error interno del servidor si ocurre algún problema
            }
        });
    } catch (error) {
        res.send(error);
    }

});

   //Metodo put 
   router.put("/jornadas/:COD_JORNADA", verifyToken, (req, res) => {
    try {
        const { COD_JORNADA } = req.params;
        const { DESCRIPCION_JOR,Estado_registro } = req.body;
        const sql = `Call SP_moduloAcademico('MA_JORNADA','U','${COD_JORNADA}','1','1','${DESCRIPCION_JOR}','null','null','null')`;
        mysqlConnection.query(sql, error => {
            if (!error) {
                res.json({
                    Status: "Jornada Modificada"
                });
            } else {
                console.log(error);
                res.sendStatus(500); // Devolver un error interno del servidor si ocurre algún problema
            }
        });
    } catch (error) {
        res.send(error);
    }

});


   /******************** MA_ANIO ACADEMICO *************************/
//MOTRAR DATOS DE LA TABLA ANIO ACADEMICO
router.get('/anio_academico', verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
    mysqlConnection.query(`Call SP_moduloAcademico('MA_ANIO_ACADEMICO','SA','1','1','1','null','null','null','null',null)`, (err, rows) => {
      if (!err) {
        res.status(200).json(rows[0]);
      } else {
        console.log('Se ha producido un error');
        res.sendStatus(500);
      }
    });
  });
  
  
//GET por codigo
router.put('/del_anio_academico/:COD_ANIO_ACADEMICO', verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
    const { COD_ANIO_ACADEMICO } = req.params;
    const query = `
        Call SP_moduloAcademico('MA_ANIO_ACADEMICO','DE',?,'1','1','null','null','null','null');
    `;

    mysqlConnection.query(query, [COD_ANIO_ACADEMICO], (err, rows) => {
        if (!err) {
            res.json({
                Status: "Año Academico Eliminado"
            });
        } else {
            console.log(err);
            res.status(500).json({ message: "Error al Eliminar Año Academico" });
        }
    });
});


  //Metodo Post
router.post("/anio_academico", verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      const { descripcion,Estado_registro } = req.body;
      const sql = `Call SP_moduloAcademico('MA_ANIO_ACADEMICO','I','1','1','1','${descripcion}','null','null','null',${Estado_registro})`;
      mysqlConnection.query(sql, (error) => {
        if (!error) {
          res.json({
            Status: "Anio Academico Registrado",
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
   /*
   
   router.put("/UPDanio", (req, res) => {
    try {
       const {COD_ANIO_ACADEMICO,descripcion,Estado_registro} = req.body;
       const sql = `Call SP_moduloAcademico('MA_ANIO_ACADEMICO','U','${COD_ANIO_ACADEMICO}','1','1','${descripcion}'),'${Estado_registro}'`;
       mysqlConnection.query(sql, error => {
           if (!error) {
               res.json({
                   Status: "Anio Academico Modificado"
               });
           } else {
               console.log(error);
           }
       });
     } catch (error) {
       res.send(error);
     }
   });
*/
   //Metodo put
   router.put("/anio_academico/:COD_ANIO_ACADEMICO", verifyToken, (req, res) => {
    try {
        jwt.verify(req.token, global.secretTokenAccess, (err) => {
            if (err) {
                res.sendStatus(403);
            } else {
                const { COD_ANIO_ACADEMICO } = req.params;
                const { descripcion,Estado_registro } = req.body;
                const sql = `Call SP_moduloAcademico('MA_ANIO_ACADEMICO','U','${COD_ANIO_ACADEMICO}','1','1','${descripcion}','null','null','null',${Estado_registro})`;
                mysqlConnection.query(sql, error => {
                    if (!error) {
                        res.json({
                            Status: "Año Academico Modificado"
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
/* router.put("/anio_academico", verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      const { COD_ANIO_ACADEMICO, descripcion } = req.body;
      const sql = `Call SP_moduloAcademico('MA_ANIO_ACADEMICO','U','${COD_ANIO_ACADEMICO}','1','1','${descripcion}')`;
      mysqlConnection.query(sql, (error) => {
        if (!error) {
          res.json({
            Status: "Anio Academico Modificado",
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
  
   /******************** NIVEL ACADEMICO *************************/
//MOTRAR DATOS DE LA TABLA NIVEL ACADEMICO
router.get('/nivel_academico', verifyToken, (req, res) => {
    try {
      //  jwt.verify(req.token, global.secretTokenAccess, (err) => {
           // if (err) {
            //    res.sendStatus(403);
            //} else {
                mysqlConnection.query(`Call SP_moduloAcademico('MA_NIVEL_ACADEMICO','SA','1','1','1','null','null','null','null',null)`, (error, rows) => {
                    if (!error) {
                        res.status(200).json(rows[0]);
                    } else {
                        console.log('Se ha producido un error');
                        res.sendStatus(500); // Devolver un error interno del servidor si ocurre algún problema
                    }
                });
         //   }
       // })
    } catch (error) {
        res.send(error);
    }
});




//GET por codigo
router.put("/del_nivel_academico/:COD_NIVEL_ACADEMICO", verifyToken, (req, res) => {
    try {
        jwt.verify(req.token, global.secretTokenAccess, (err) => {
            if (err) {
                res.sendStatus(403);
            } else {
                const { COD_NIVEL_ACADEMICO } = req.params;
                const sql = `Call SP_moduloAcademico('MA_NIVEL_ACADEMICO','DE','${COD_NIVEL_ACADEMICO}','1','1','null','null','null','null')`;
                mysqlConnection.query(sql, (error, results) => {
                    if (!error) {
                        res.json({
                          Status: "Nivel Academico Eliminado"
                        });
                      } else {
                        console.log(error);
                        res.status(500).json({ message: "Error al Eliminar Nivel Academico" });
                      }
                });
            }
        });
    } catch (error) {
        res.send(error);
    }
});

//Metodo post
router.post("/nivel_academico", verifyToken, (req, res) => {
    try {
        jwt.verify(req.token, global.secretTokenAccess, (err) => {
            if (err) {
                res.sendStatus(403);
            } else {
                const {DESCRIPCION,Estado_registro } = req.body;
                const sql = `Call SP_moduloAcademico('MA_NIVEL_ACADEMICO','I','1','1','1','${DESCRIPCION}','null','null','null',${Estado_registro})`;
                mysqlConnection.query(sql, error => {
                    if (!error) {
                        res.json({
                            Status: "Nivel Academico Registrado"
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

//Metodo put
   router.put("/nivel_academico/:COD_NIVEL_ACADEMICO", verifyToken, (req, res) => {
    try {
        jwt.verify(req.token, global.secretTokenAccess, (err) => {
            if (err) {
                res.sendStatus(403);
            } else {
                const { COD_NIVEL_ACADEMICO } = req.params;
                const { DESCRIPCION,Estado_registro} = req.body;
                const sql = `Call SP_moduloAcademico('MA_NIVEL_ACADEMICO','U','${COD_NIVEL_ACADEMICO}','1','1','${DESCRIPCION}','null','null','null',${Estado_registro})`;
                mysqlConnection.query(sql, error => {
                    if (!error) {
                        res.json({
                            Status: "Nivel Academico Modificado"
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


   /******************** SECCIONES *************************/
   //MOTRAR DATOS DE LA TABLA SECCIONES
router.get('/Secciones', verifyToken, (req, res) => {
    try {
      //  jwt.verify(req.token, global.secretTokenAccess, (err) => {
          //  if (err) {
          //      res.sendStatus(403);
           // } else {
                mysqlConnection.query(`Call SP_moduloAcademico('MA_SECCIONES','SA','1','1','1','null','null','null','null','1')`, (err, rows) => {
                    if (!err) {
                        res.status(200).json(rows[0]);
                    } else {
                        console.log('Se ha producido un error');
                        res.sendStatus(500); // Devolver un error interno del servidor si ocurre algún problema
                    }
                });
           // }
       // });
    } catch (error) {
        res.send(error);
    }
});

//GET por codigo
router.put("/del_Secciones/:COD_SECCIONES", verifyToken, (req, res) => {
    try {
        jwt.verify(req.token, global.secretTokenAccess, (err) => {
            if (err) {
                res.sendStatus(403);
            } else {
                const { COD_SECCIONES } = req.params;
                const sql = `Call SP_moduloAcademico('MA_SECCIONES','DE','${COD_SECCIONES}','1','1','null','null','null','null','null')`;
                mysqlConnection.query(sql, (error, results) => {
                    if (!error) {
                        res.json({
                          Status: "Sección Eliminada"
                        });
                      } else {
                        console.log(error);
                        res.status(500).json({ message: "Error al Eliminar Sección" });
                      }
                });
            }
        });
    } catch (error) {
        res.send(error);
    }
});

   //Metodo Post/INSERTAR
router.post("/Secciones", verifyToken, (req, res) => {
    try {
        jwt.verify(req.token, global.secretTokenAccess, (err) => {
            if (err) {
                res.sendStatus(403);
            } else {
                const { DESCRIPCION_SECCIONES,Estado_registro } = req.body;
                const sql = `Call SP_moduloAcademico('MA_SECCIONES','I','1','1','1','${DESCRIPCION_SECCIONES}','null','null','null','${Estado_registro}')`;
                mysqlConnection.query(sql, error => {
                    if (!error) {
                        res.json({
                            Status: "Seccion Academica Registrada"
                        });
                    } else {
                        console.log(error);
                    }
                });
            }
        });
    } catch (error) {
        res.send(error);
    }
});


   //Metodo put o Modificar
router.put("/Secciones/:COD_SECCIONES", verifyToken, (req, res) => {
    try {
        jwt.verify(req.token, global.secretTokenAccess, (err) => {
            if (err) {
                res.sendStatus(403);
            } else {
                const { COD_SECCIONES } = req.params;
                const { DESCRIPCION_SECCIONES,Estado_registro } = req.body;
                const sql = `Call SP_moduloAcademico('MA_SECCIONES','U','${COD_SECCIONES}','1','1','${DESCRIPCION_SECCIONES}','null','null','null','${Estado_registro}')`;
                mysqlConnection.query(sql, error => {
                    if (!error) {
                        res.json({
                            Status: "Seccion Academica Modificada"
                        });
                    } else {
                        console.log(error);
                    }
                });
            }
        });
    } catch (error) {
        res.send(error);
    }
});



 /******************** REL_NIVACAD_ANIOACAD *************************/
 router.get('/rel_nivel_anio', verifyToken, (req, res) => {
    try {
      //  jwt.verify(req.token, global.secretTokenAccess, (err) => {
          //  if (err) {
          //      res.sendStatus(403);
           // } else {
                mysqlConnection.query(`Call SP_moduloAcademico('REL_NIVACAD_ANIOACAD','SA','1','1','1','null','null','null','null',null)`, (err, rows) => {
                    if (!err) {
                        res.status(200).json(rows[0]);
                    } else {
                        console.log('Se ha producido un error');
                        res.sendStatus(500); // Devolver un error interno del servidor si ocurre algún problema
                    }
                });
           // }
       // });
    } catch (error) {
        res.send(error);
    }
});

   //Metodo Post/INSERTAR
   router.post("/rel_nivel_anio", verifyToken, (req, res) => {
    try {
        jwt.verify(req.token, global.secretTokenAccess, (err) => {
            if (err) {
                res.sendStatus(403);
            } else {
                const { COD_NIVEL_ACADEMICO, COD_ANIO_ACADEMICO, Estado_registro } = req.body;
                const sql = `Call SP_moduloAcademico('REL_NIVACAD_ANIOACAD','I',1,${COD_NIVEL_ACADEMICO}, ${COD_ANIO_ACADEMICO},'null','null','null','null', '${Estado_registro}')`;
                mysqlConnection.query(sql, error => {
                    if (!error) {
                        res.json({
                            Status: "Insertado"
                        });
                    } else {
                        console.log(error);
                    }
                });
            }
        });
    } catch (error) {
        res.send(error);
    }
});



  //Metodo put o Modificar
  router.put("/rel_nivel_anio/:COD_NIVACAD_ANIOACAD", verifyToken, (req, res) => {
    try {
        jwt.verify(req.token, global.secretTokenAccess, (err) => {
            if (err) {
                res.sendStatus(403);
            } else {
                const { COD_NIVACAD_ANIOACAD } = req.params;
                const { COD_NIVEL_ACADEMICO, COD_ANIO_ACADEMICO, Estado_registro  } = req.body;
                const sql = `Call SP_moduloAcademico('REL_NIVACAD_ANIOACAD','U',${COD_NIVACAD_ANIOACAD},${COD_NIVEL_ACADEMICO},${COD_ANIO_ACADEMICO},'null','null','null','null',${Estado_registro})`;
                mysqlConnection.query(sql, error => {
                    if (!error) {
                        res.json({
                            Status: "Modificado"
                        });
                    } else {
                        console.log(error);
                    }
                });
            }
        });
    } catch (error) {
        res.send(error);
    }
});



 /******************** MA_REL_ASIGNATURAS *************************/
 router.get('/rel_asignaturas', verifyToken, (req, res) => {
    try {
      //  jwt.verify(req.token, global.secretTokenAccess, (err) => {
          //  if (err) {
          //      res.sendStatus(403);
           // } else {
                mysqlConnection.query(`Call SP_moduloAcademico('MA_REL_ASIGNATURAS','SA','1','1','1','null','null','null','null',null)`, (err, rows) => {
                    if (!err) {
                        res.status(200).json(rows[0]);
                    } else {
                        console.log('Se ha producido un error');
                        res.sendStatus(500); // Devolver un error interno del servidor si ocurre algún problema
                    }
                });
           // }
       // });
    } catch (error) {
        res.send(error);
    }
});

  //Metodo Post/INSERTAR
  router.post("/rel_asignaturas", verifyToken, (req, res) => {
    try {
        jwt.verify(req.token, global.secretTokenAccess, (err) => {
            if (err) {
                res.sendStatus(403);
            } else {
                const { COD_ASIGNATURA, COD_NIVACAD_ANIOACAD, Estado_registro } = req.body;
                const sql = `Call SP_moduloAcademico('MA_REL_ASIGNATURAS','I',1,${COD_ASIGNATURA}, ${COD_NIVACAD_ANIOACAD},'null','null','null','null', '${Estado_registro}')`;
                mysqlConnection.query(sql, error => {
                    if (!error) {
                        res.json({
                            Status: "Insertado"
                        });
                    } else {
                        console.log(error);
                    }
                });
            }
        });
    } catch (error) {
        res.send(error);
    }
});


  //Metodo put o Modificar
  router.put("/rel_asignaturas/:COD_REL_ASIG", verifyToken, (req, res) => {
    try {
        jwt.verify(req.token, global.secretTokenAccess, (err) => {
            if (err) {
                res.sendStatus(403);
            } else {
                const { COD_REL_ASIG } = req.params;
                const { COD_ASIGNATURA, COD_NIVACAD_ANIOACAD, Estado_registro  } = req.body;
                const sql = `Call SP_moduloAcademico('MA_REL_ASIGNATURAS','U',${COD_REL_ASIG},${COD_ASIGNATURA},${COD_NIVACAD_ANIOACAD},'null','null','null','null',${Estado_registro})`;
                mysqlConnection.query(sql, error => {
                    if (!error) {
                        res.json({
                            Status: "Modificado"
                        });
                    } else {
                        console.log(error);
                    }
                });
            }
        });
    } catch (error) {
        res.send(error);
    }
});


module.exports = router;
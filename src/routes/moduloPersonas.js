const express = require('express');
const router = express.Router();


const jwt = require('jsonwebtoken')
const verifyToken = require('./verify');

const mysqlConnection = require('../database');

/*************************TABLA PERSONAS ************************** */
//MOTRAR DATOS DE LA TABLA DE ASIGNATURAS
router.get('/personas', verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
 //  jwt.verify(req.token, global.secretTokenAccess, (err) => {
        //   if (err) {
         //      res.sendStatus(403);
          //  } else {
    mysqlConnection.query(`CALL SP_MP_PERSONAS('MP_PERSONAS', 'SA', NULL, NULL, '0', '0', '0', '0', '0', 0,'1990-01-01','0')`, (err, rows) => {
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
  
//GET por codigo
  router.get("/personas/:COD_PERSONA", verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    const { COD_PERSONA } = req.params;
    const sql = `Call SP_MP_PERSONAS('MP_PERSONAS', 'SO',${COD_PERSONA}, NULL, 'JoQQQhn', 'Doe', '1277AA3456789', 'M', 'Cliente', 30, '1990-01-01','Cliente')`;
  
    mysqlConnection.query(sql, (error, results) => {
      if (error) {
        res.status(500).json({ message: "Error al consultar la base de datos" });
      } else {
        if (results.length > 0) {
          res.status(200).json(results[0]);
        } else {
          res.status(404).json({ message: "Persona no encontrada" });
        }
      }
    });
  });

// Ruta para crear una nueva persona
router.post("/personas", verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      
      const { NOMBRE, APELLIDO, IDENTIDAD, GENERO, TIPO_PERSONA, EDAD, FECHA_NACIMIENTO, FECHA_SALIDA,USUARIO_MODIFICADOR } = req.body;
      const sql = `Call SP_MP_PERSONAS('MP_PERSONAS','I',0,'0','${NOMBRE}','${APELLIDO}','${IDENTIDAD}','${GENERO}','${TIPO_PERSONA}','${EDAD}','${FECHA_NACIMIENTO}','${USUARIO_MODIFICADOR}')`;
      mysqlConnection.query(sql, error => {
        if (!error) {
          res.json({
            Status: "Persona Registrada"
          });
        } else {
          console.log(error);
          res.status(500).json({ message: "Error al registrar la persona" });
        }
      });
    } catch (error) {
      res.send(error);
    }
  });
  
  // Ruta para modificar una persona existente
  router.put("/personas/:COD_PERSONA", verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      const { COD_PERSONA } = req.params;
      const {  NOMBRE, APELLIDO, IDENTIDAD, GENERO, TIPO_PERSONA, EDAD, FECHA_NACIMIENTO, FECHA_SALIDA ,USUARIO_MODIFICADOR} = req.body;
      const sql = `Call SP_MP_PERSONAS('MP_PERSONAS','U','${COD_PERSONA}','1','${NOMBRE}','${APELLIDO}','${IDENTIDAD}','${GENERO}','${TIPO_PERSONA}','${EDAD}','${FECHA_NACIMIENTO}','${USUARIO_MODIFICADOR}')`;
      mysqlConnection.query(sql, error => {
        if (!error) {
          res.json({
            Status: "Persona Modificada"
          });
        } else {
          console.log(error);
          res.status(500).json({ message: "Error al modificar la persona" });
        }
      });
    } catch (error) {
      res.send(error);
    }
  });
  

/*************************TABLA MP_CORREOS ************************** */
// Ruta para mostrar datos de la tabla de correos
router.get('/correos', verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    mysqlConnection.query(`Call SP_MP_PERSONAS('MP_CORREOS','SA','1','1','null','null','null','null','null','1','2015-5-14','null')`, (err, rows) => {
      if (!err) {
        res.status(200).json(rows[0]);
      } else {
        console.log('Se ha producido un error');
      }
    });
  
  });
  
  // Ruta para mostrar datos de un correo por código
  router.get("/correos/:COD_CORREO", verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      const { COD_CORREO } = req.params;
      const sql = `Call SP_MP_PERSONAS('MP_CORREOS','SO','${COD_CORREO}','1','null','null','null','null','null','null','1','2015-5-14','null','null')`;
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
  
  // Ruta para agregar un nuevo correo
  router.post("/correos", verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      const { COD_PERSONA, CORREO_ELECTRONICO ,USUARIO_MODIFICADOR} = req.body;
      const sql = `Call SP_MP_PERSONAS('MP_CORREOS','I','${COD_PERSONA}','1','${CORREO_ELECTRONICO}','NULL','NULL','NULL','NULL','NULL','10','2010-5-10','${USUARIO_MODIFICADOR}')`;
      mysqlConnection.query(sql, error => {
        if (!error) {
          res.json({
            Status: "Correo Registrado"
          });
        } else {
          console.log(error);
          res.status(500).json({ message: "Error al registrar el correo" });
        }
      });
    } catch (error) {
      res.send(error);
    }
  });
  
  // Ruta para modificar un correo existente
  router.put("/correos/:COD_CORREO", verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      const { COD_CORREO } = req.params;
      const {  CORREO_ELECTRONICO ,USUARIO_MODIFICADOR} = req.body;
      const sql = `Call SP_MP_PERSONAS('MP_CORREOS','U','${COD_CORREO}','1','${CORREO_ELECTRONICO}','null','null','null','null','10','2015-5-14','${USUARIO_MODIFICADOR}')`;
      mysqlConnection.query(sql, error => {
        if (!error) {
          res.json({
            Status: "Correo Modificado"
          });
        } else {
          console.log(error);
          res.status(500).json({ message: "Error al modificar el correo" });
        }
      });
    } catch (error) {
      res.send(error);
    }
  });
  
/************************* TABLA telefonos ***************************/
// Ruta para mostrar datos de la tabla de telefonos
router.get('/telefonos', verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    mysqlConnection.query(`Call SP_MP_PERSONAS('MP_TELEFONOS','SA','1','1','null','null','null','null','null','1','2015-5-14','null')`, (err, rows) => {
      if (!err) {
        res.status(200).json(rows[0]);
      } else {
        console.log('Se ha producido un error');
      }
    });
  
  });
  
  // Ruta para mostrar datos de un telefono por código
  router.get("/telefonos/:COD_TELEFONO", verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      const { COD_TELEFONO } = req.params;
      const sql = `Call SP_MP_PERSONAS('MP_TELEFONOS','SO','${COD_TELEFONO}','1','null','null','null','null','null','1','2015-5-14','null')`;
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
  
  // Ruta para agregar un nuevo telefono
  router.post("/telefonos", verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      const { COD_PERSONA, TELEFONO, TIPO_TELEFONO,USUARIO_MODIFICADOR} = req.body;
      const sql = `Call SP_MP_PERSONAS('MP_TELEFONOS','I','${COD_PERSONA}',1,'${TELEFONO}','${TIPO_TELEFONO}','NULL','NULL','NULL','10','2010-5-10','${USUARIO_MODIFICADOR}')`;
      mysqlConnection.query(sql, error => {
        if (!error) {
          res.json({
            Status: "Telefono Registrado"
          });
        } else {
          console.log(error);
          res.status(500).json({ message: "Error al registrar el telefono" });
        }
      });
    } catch (error) {
      res.send(error);
    }
  });
  
  // Ruta para modificar un telefono existente
  router.put("/telefonos/:COD_TELEFONO", verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      const { COD_TELEFONO,USUARIO_MODIFICADOR } = req.params;
      const { TELEFONO, TIPO_TELEFONO } = req.body;
      const sql = `Call SP_MP_PERSONAS('MP_TELEFONOS','U','${COD_TELEFONO}','4','${TELEFONO}','${TIPO_TELEFONO}','null','null','null','10','2015-5-14','${USUARIO_MODIFICADOR}')`;
      mysqlConnection.query(sql, error => {
        if (!error) {
          res.json({
            Status: "Telefono Modificado"
          });
        } else {
          console.log(error);
          res.status(500).json({ message: "Error al modificar el telefono" });
        }
      });
    } catch (error) {
      res.send(error);
    }
  });
  
/*************************TABLA CONTACTOS EMERGENCIA ************************** */
// Ruta para mostrar datos de la tabla de contactos de emergencia
router.get('/contacto_emergencia', verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    mysqlConnection.query(`Call SP_MP_PERSONAS('MP_CONTACTOS_EMERGENCIA','SA','1','1','null','null','null','null','null','1','2015-5-14','null')`, (err, rows) => {
      if (!err) {
        res.status(200).json(rows[0]);
      } else {
        console.log('Se ha producido un error');
      }
    });
  
  });
  
  // Ruta para mostrar datos de un contacto de emergencia por código
  router.get("/contacto_emergencia/:COD_CONTACTO_EMERGENCIA",/*verifyToken,*/ (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      const { COD_CONTACTO_EMERGENCIA } = req.params;
      const sql = `Call SP_MP_PERSONAS('MP_CONTACTOS_EMERGENCIA','SO','${COD_CONTACTO_EMERGENCIA}','1','null','null','null','null','null','1','2015-5-14','null')`;
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
  
  // Ruta para agregar un nuevo contacto de emergencia
  router.post("/contacto_emergencia", verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      const { COD_PERSONA, NOMBRE_CONTACTO, APELLIDO_CONTACTO, TELEFONO, RELACION,USUARIO_MODIFICADOR } = req.body;
      const sql = `Call SP_MP_PERSONAS('MP_CONTACTOS_EMERGENCIA','I','${COD_PERSONA}','1','${NOMBRE_CONTACTO}','${APELLIDO_CONTACTO}','${TELEFONO}','${RELACION}','NULL','10','2010-5-10',,'${USUARIO_MODIFICADOR}')`;
      mysqlConnection.query(sql, error => {
        if (!error) {
          res.json({
            Status: "Contacto Emergencia Registrado"
          });
        } else {
          console.log(error);
          res.status(500).json({ message: "Error al registrar el contacto de emergencia" });
        }
      });
    } catch (error) {
      res.send(error);
    }
  });
  
  // Ruta para modificar un contacto de emergencia existente
  router.put("/contacto_emergencia/:COD_CONTACTO_EMERGENCIA", verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      const { COD_CONTACTO_EMERGENCIA } = req.params;
      const { NOMBRE_CONTACTO, APELLIDO_CONTACTO, TELEFONO, RELACION,USUARIO_MODIFICADOR } = req.body;
      const sql = `Call SP_MP_PERSONAS('MP_CONTACTOS_EMERGENCIA','U','${COD_CONTACTO_EMERGENCIA}','1','${NOMBRE_CONTACTO}','${APELLIDO_CONTACTO}','${TELEFONO}','${RELACION}','null','10','2015-5-14','${USUARIO_MODIFICADOR}')`;
      mysqlConnection.query(sql, error => {
        if (!error) {
          res.json({
            Status: "Contacto Emergencia Modificado"
          });
        } else {
          console.log(error);
          res.status(500).json({ message: "Error al modificar el contacto de emergencia" });
        }
      });
    } catch (error) {
      res.send(error);
    }
  });
  
//MOTRAR DATOS DE LA TABLA

/*************************TABLA DIRECCIONES ************************** */
// Ruta para mostrar datos de la tabla de direcciones
router.get('/direcciones', verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    mysqlConnection.query(`Call SP_MP_PERSONAS('MP_DIRECCIONES','SA','1','1','null','null','null','null','null','1','2015-5-14','null')`, (err, rows) => {
      if (!err) {
        res.status(200).json(rows[0]);
      } else {
        console.log('Se ha producido un error');
      }
    });
  
  });
  
  // Ruta para mostrar datos de una dirección por código
  router.get("/direcciones/:COD_DIRECCION", verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      const { COD_DIRECCION } = req.params;
      const sql = `Call SP_MP_PERSONAS('MP_DIRECCIONES','SO','${COD_DIRECCION}','1',null,'null','null','null','null','1','2015-5-14','null')`;
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
  
  // Ruta para agregar una nueva dirección
  router.post("/direcciones", verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      const { COD_PERSONA, DIRECCION, DEPARTAMENTO, CIUDAD, PAIS,USUARIO_MODIFICADOR } = req.body;
      const sql = `Call SP_MP_PERSONAS('MP_DIRECCIONES','I',${COD_PERSONA},'1','${DIRECCION}','${DEPARTAMENTO}','${CIUDAD}','${PAIS}','NULL','10','2010-5-10','${USUARIO_MODIFICADOR}')`;
      mysqlConnection.query(sql, error => {
        if (!error) {
          res.json({
            Status: "Direccion Registrada"
          });
        } else {
          console.log(error);
          res.status(500).json({ message: "Error al registrar la dirección" });
        }
      });
    } catch (error) {
      res.send(error);
    }
  });
  
  // Ruta para modificar una dirección existente
  router.put("/direcciones/:COD_DIRECCION", verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      const { COD_DIRECCION } = req.params;
      const { COD_PERSONA, DIRECCION, DEPARTAMENTO, CIUDAD, PAIS ,USUARIO_MODIFICADOR} = req.body;
      const sql = `Call SP_MP_PERSONAS('MP_DIRECCIONES','U','${COD_DIRECCION}','1','${DIRECCION}','${DEPARTAMENTO}','${CIUDAD}','${PAIS}','null','10','2015-5-14','${USUARIO_MODIFICADOR}')`;
      mysqlConnection.query(sql, error => {
        if (!error) {
          res.json({
            Status: "Direccion Modificada"
          });
        } else {
          console.log(error);
          res.status(500).json({ message: "Error al modificar la dirección" });
        }
      });
    } catch (error) {
      res.send(error);
    }
  });
module.exports = router;
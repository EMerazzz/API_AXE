const express = require('express');
const router = express.Router();


const jwt = require('jsonwebtoken')
const verifyToken = require('./verify');

const mysqlConnection = require('../database');
// Ruta para crear una nueva persona

router.post("/INSpersonas", verifyToken, (req, res) => {
  // Verificación de JWT ya realizada por el middleware verifyToken

  try {
    
    const {USUARIO_MODIFICADOR, NOMBRE, APELLIDO, IDENTIDAD, GENERO, TIPO_PERSONA, EDAD, FECHA_NACIMIENTO, FECHA_SALIDA,TELEFONO,TIPO_TELEFONO, DIRECCION, DEPARTAMENTO, CIUDAD, PAIS,NOMBRE_CONTACTO, APELLIDO_CONTACTO, TELEFONO_CONTACTO,RELACION,CORREO_ELECTRONICO,Estado_registro } = req.body;
    const sql = `call axe.personas_lic('I','${USUARIO_MODIFICADOR}','1','${NOMBRE}', '${APELLIDO}', '${IDENTIDAD}', '${GENERO}', '${TIPO_PERSONA}', ${EDAD}, '${FECHA_NACIMIENTO}', '${TELEFONO}', '${TIPO_TELEFONO}', '${DIRECCION}', '${DEPARTAMENTO}', '${CIUDAD}', '${PAIS}', '${NOMBRE_CONTACTO}', '${APELLIDO_CONTACTO}', '${TELEFONO_CONTACTO}', '${RELACION}','${CORREO_ELECTRONICO}');`;
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

/*************************TABLA PERSONAS ************************** */

router.get('/GETpersonas', verifyToken, (req, res) => {
  
           // mysqlConnection.query(`CALL SP_MP_PERSONAS('MP_PERSONAS', 'SA', NULL, NULL, '0', '0', '0', '0', '0', 0,'1990-01-01','0')`, (err, rows) => {
    mysqlConnection.query(`call axe.personas_lic('SA', '1','1','1', '1', '1', '1', '1', 1, '2012-07-23', '1', '1', '11', '1', '', '1', '1', '1', '1', '1', '1');`, (err, rows) => {
      if (!err) {
        res.status(200).json(rows[0]);
      } else {
        console.log('Se ha producido un error');
        res.sendStatus(500);
      }
  
       });
  });
  router.get('/personas', verifyToken, (req, res) => {
  
           // mysqlConnection.query(`CALL SP_MP_PERSONAS('MP_PERSONAS', 'SA', NULL, NULL, '0', '0', '0', '0', '0', 0,'1990-01-01','0')`, (err, rows) => {
            mysqlConnection.query(`CALL SP_MP_PERSONAS('MP_PERSONAS', 'SA', NULL, NULL, '0', '0', '0', '0', '0', 0,'1990-01-01','0')`, (err, rows) => {
      if (!err) {
        res.status(200).json(rows[0]);
      } else {
        console.log('Se ha producido un error');
        res.sendStatus(500);
      }
    
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
// Eliminar persona por código
router.put("/del_personas/:COD_PERSONA", verifyToken, (req, res) => {
  // Verificación de JWT ya realizada por el middleware verifyToken
  
  const { COD_PERSONA } = req.params;

  // Usar parámetros seguros con marcadores de posición
  const sql = `CALL SP_MP_PERSONAS('MP_PERSONAS', 'DE', ?, NULL, 'JoQQQhn', 'Doe', '1277AA3456789', 'M', 'Cliente', 30, '1990-01-01','Cliente')`;

  // Pasar los valores como un array en el segundo argumento
  mysqlConnection.query(sql, [COD_PERSONA], (error, results) => {
    if (!error) {
      res.json({
        status: "Persona Eliminada"
      });
    } else {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar la persona" });
    }
  });
});

// Ruta para crear una nueva persona
router.post("/personas", verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      
      const { NOMBRE, APELLIDO, IDENTIDAD, GENERO, TIPO_PERSONA, EDAD, FECHA_NACIMIENTO, FECHA_SALIDA,USUARIO_MODIFICADOR, Estado_registro } = req.body;
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
      const {USUARIO_MODIFICADOR, NOMBRE, APELLIDO, IDENTIDAD, GENERO, TIPO_PERSONA, EDAD, FECHA_NACIMIENTO, FECHA_SALIDA,TELEFONO,TIPO_TELEFONO, DIRECCION, DEPARTAMENTO, CIUDAD, PAIS,NOMBRE_CONTACTO, APELLIDO_CONTACTO, TELEFONO_CONTACTO,RELACION,CORREO_ELECTRONICO,Estado_registro } = req.body;
      const sql = `call axe.personas_lic('U','${USUARIO_MODIFICADOR}','${COD_PERSONA}','${NOMBRE}', '${APELLIDO}', '${IDENTIDAD}', '${GENERO}', '${TIPO_PERSONA}', ${EDAD}, '${FECHA_NACIMIENTO}', '${TELEFONO}', '${TIPO_TELEFONO}', '${DIRECCION}', '${DEPARTAMENTO}', '${CIUDAD}', '${PAIS}', '${NOMBRE_CONTACTO}', '${APELLIDO_CONTACTO}', '${TELEFONO_CONTACTO}', '${RELACION}','${CORREO_ELECTRONICO}');`;
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
  router.put("/del_correos/:COD_CORREO", verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      const { COD_CORREO } = req.params;
      const sql = `Call SP_MP_PERSONAS('MP_CORREOS','DE','${COD_CORREO}','1','null','null','null','null','null','1','2015-5-14','null')`;
      mysqlConnection.query(sql, (error, results) => {
        if (!error) {
          res.json({
            Status: "Correo Eliminado"
          });
        } else {
          console.log(error);
          res.status(500).json({ message: "Error al Eliminar Correo" });
        }
      });
    } catch (error) {
      res.send(error)
    }
  });
  
  // Ruta para agregar un nuevo correo
  router.post("/correos", verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      const { COD_PERSONA, CORREO_ELECTRONICO ,USUARIO_MODIFICADOR, Estado_registro} = req.body;
      const sql = `Call SP_MP_PERSONAS('MP_CORREOS','I','${COD_PERSONA}','1','${CORREO_ELECTRONICO}','1','1','1','10','1','2010-5-10','${USUARIO_MODIFICADOR}')`;
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
      const { COD_PERSONA, CORREO_ELECTRONICO ,USUARIO_MODIFICADOR, Estado_registro} = req.body;
      const sql = `Call SP_MP_PERSONAS('MP_CORREOS','U','${COD_CORREO}','${COD_PERSONA}','${CORREO_ELECTRONICO}','null','null','null','null','10','2015-5-14','${USUARIO_MODIFICADOR}')`;
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
  router.put("/del_telefonos/:COD_TELEFONO", verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      const { COD_TELEFONO } = req.params;
      const sql = `Call SP_MP_PERSONAS('MP_TELEFONOS','DE','${COD_TELEFONO}','1','null','null','null','null','null','1','2015-5-14','null')`;
      mysqlConnection.query(sql, (error, results) => {
        if (!error) {
          res.json({
            Status: "Télefono Eliminado"
          });
        } else {
          console.log(error);
          res.status(500).json({ message: "Error al Eliminar Télefono" });
        }
      });
    } catch (error) {
      res.send(error)
    }
  });
  
  // Ruta para agregar un nuevo telefono
  router.post("/telefonos", verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      const { COD_PERSONA, TELEFONO, TIPO_TELEFONO,USUARIO_MODIFICADOR, Estado_registro} = req.body;
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
      const { COD_TELEFONO} = req.params;
      const { COD_PERSONA,TELEFONO, TIPO_TELEFONO,USUARIO_MODIFICADOR,Estado_registro } = req.body;
      const sql = `Call SP_MP_PERSONAS('MP_TELEFONOS','U','${COD_TELEFONO}','${COD_PERSONA}','${TELEFONO}','${TIPO_TELEFONO}','NULL','NULL','NULL','10','2010-5-10','${USUARIO_MODIFICADOR}')`;
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
  router.put("/del_contactoemergencia/:COD_CONTACTO_EMERGENCIA",/*verifyToken,*/ (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      const { COD_CONTACTO_EMERGENCIA } = req.params;
      const sql = `Call SP_MP_PERSONAS('MP_CONTACTOS_EMERGENCIA','DE','${COD_CONTACTO_EMERGENCIA}','1','null','null','null','null','null','1','2015-5-14','null')`;
      mysqlConnection.query(sql, (error, results) => {
        if (!error) {
          res.json({
            Status: "Contacto Emergencia Eliminado"
          });
        } else {
          console.log(error);
          res.status(500).json({ message: "Error al Eliminar Contacto Emergencia" });
        }
      });
    } catch (error) {
      res.send(error)
    }
  });
  
  // Ruta para agregar un nuevo contacto de emergencia
  router.post("/contacto_emergencia", verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      const { COD_PERSONA, NOMBRE_CONTACTO, APELLIDO_CONTACTO, TELEFONO, RELACION,USUARIO_MODIFICADOR,Estado_registro} = req.body;
      const sql = `Call SP_MP_PERSONAS('MP_CONTACTOS_EMERGENCIA','I','${COD_PERSONA}','1','${NOMBRE_CONTACTO}','${APELLIDO_CONTACTO}','${TELEFONO}','${RELACION}','NULL','10','2010-5-10','${USUARIO_MODIFICADOR}')`;
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
      const { COD_PERSONA, NOMBRE_CONTACTO, APELLIDO_CONTACTO, TELEFONO, RELACION,USUARIO_MODIFICADOR,Estado_registro} = req.body;
      const sql = `Call SP_MP_PERSONAS('MP_CONTACTOS_EMERGENCIA','U','${COD_CONTACTO_EMERGENCIA}','${COD_PERSONA}','${NOMBRE_CONTACTO}','${APELLIDO_CONTACTO}','${TELEFONO}','${RELACION}','null','10','2015-5-14','${USUARIO_MODIFICADOR}')`;
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

/*************************TABLA DIRECCIONES ****************************/
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
  router.put("/del_direcciones/:COD_DIRECCION", verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      const { COD_DIRECCION } = req.params;
      const sql = `Call SP_MP_PERSONAS('MP_DIRECCIONES','DE','${COD_DIRECCION}','1',null,'null','null','null','null','1','2015-5-14','null')`;
      mysqlConnection.query(sql, (error, results) => {
        if (!error) {
          res.json({
            Status: "Dirección Eliminada"
          });
        } else {
          console.log(error);
          res.status(500).json({ message: "Error al Eliminar Dirección" });
        }
      });
    } catch (error) {
      res.send(error)
    }
  });
  
  // Ruta para agregar una nueva dirección
  router.post("/direcciones", verifyToken, (req, res) => {
    // Verificación de JWT ya realizada por el middleware verifyToken
  
    try {
      const { COD_PERSONA, DIRECCION, DEPARTAMENTO, CIUDAD, PAIS,USUARIO_MODIFICADOR,Estado_registro} = req.body;
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
      const { COD_PERSONA, DIRECCION, DEPARTAMENTO, CIUDAD, PAIS ,USUARIO_MODIFICADOR,Estado_registro} = req.body;
      const sql = `Call SP_MP_PERSONAS('MP_DIRECCIONES','U','${COD_DIRECCION}','${COD_PERSONA}','${DIRECCION}','${DEPARTAMENTO}','${CIUDAD}','${PAIS}','null','10','2015-5-14','${USUARIO_MODIFICADOR}')`;
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
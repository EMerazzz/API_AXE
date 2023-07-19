const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

//MOTRAR DATOS DE LA TABLA DE ASIGNATURAS
router.get('/estudiantes', (req, res) => { 

    mysqlConnection.query(`Call SP_moduloEstudiantes('ME_ESTUDIANTES','SA','1','1','1','null','null','null','null','null','null')`, (err, rows) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log('Se ha producido un error');
        }
    });

});

//GET por codigo
router.get("/estudiantes/:COD_Estudiante", (req, res) => {
    try {
      const {COD_ESTUDIANTE} = req.params;
      const sql = `Call SP_moduloEstudiantes('ME_ESTUDIANTES','SO','${COD_ESTUDIANTE}','1','1','null','null','null','null','null','null')`;
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

  router.post("/nuevo_estudiante", (req, res) => {
    try {
       const {COD_PERSONA,COD_NIVACAD_ANIOACAD,NOMBRE_ESTUDIANTE,APELLIDO_ESTUDIANTE,
        TELEFONO_ESTUDIANTE,CORREO_ELECTRONICO_ESTUDIANTE,JORNADA_ESTUDIANTE} = req.body;
       const sql = `Call SP_moduloEstudiantes('ME_ESTUDIANTES','I','1','${COD_PERSONA}','${COD_NIVACAD_ANIOACAD}','${NOMBRE_ESTUDIANTE}','${APELLIDO_ESTUDIANTE}','${TELEFONO_ESTUDIANTE}','${CORREO_ELECTRONICO_ESTUDIANTE}','${JORNADA_ESTUDIANTE}','null')`;
       mysqlConnection.query(sql, error => {
           if (!error) {
               res.json({
                   Status: "Estudiante Registrado"
               });
           } else {
               console.log(error);
           }
       });
     } catch (error) {
       res.send(error);
     }
   });

   //Metodo put
   router.put("/modificar_estudiante", (req, res) => {
    try {
        const {COD_ESTUDIANTE,COD_PERSONA,COD_NIVACAD_ANIOACAD,NOMBRE_ESTUDIANTE,APELLIDO_ESTUDIANTE,TELEFONO_ESTUDIANTE,
        CORREO_ELECTRONICO_ESTUDIANTE,JORNADA_ESTUDIANTE} = req.body;
        const sql = `Call SP_moduloEstudiantes('ME_ESTUDIANTES','U','${COD_ESTUDIANTE}','${COD_PERSONA}','${COD_NIVACAD_ANIOACAD}','${NOMBRE_ESTUDIANTE}}','${APELLIDO_ESTUDIANTE}','${TELEFONO_ESTUDIANTE}','${CORREO_ELECTRONICO_ESTUDIANTE}','${JORNADA_ESTUDIANTE}','null')`;
       mysqlConnection.query(sql, error => {
           if (!error) {
               res.json({
                   Status: "Estudiante Modificado"
               });
           } else {
               console.log(error);
           }
       });
     } catch (error) {
       res.send(error);
     }
   });
/****************************TABLA PADRES TUTORES *********************** */
   //MOTRAR DATOS DE LA TABLA 
router.get('/padres_tutores', (req, res) => { 

  mysqlConnection.query(`Call SP_moduloEstudiantes('ME_PADRES_TUTORES','SA','1','1','1','null','null','null','null','null','null')`, (err, rows) => {
      if (!err) {
          res.status(200).json(rows[0]);
      } else {
          console.log('Se ha producido un error');
      }
  });

});

//GET por codigo
router.get("/padres_tutores/:COD_PADRE_TUTOR", (req, res) => {
  try {
    const {COD_PADRE_TUTOR} = req.params;
    const sql = `Call SP_moduloEstudiantes('ME_PADRES_TUTORES','SO','${COD_PADRE_TUTOR}','1','1','null','null','null','null','null','null')`;
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
//insert
router.post("/nuevo_padre_tutor", (req, res) => {
  try {
     const {COD_ESTUDIANTE, COD_PERSONA, NOMBRE_PADRE_TUTOR, APELLIDO_PADRE_TUTOR, TELEFONO_PADRE_TUTOR,
      CORREO_ELECTRONICO_PADRE_TUTOR, OCUPACION_PADRE_TUTOR,RELACION_PADRE_ESTUDIANTE} = req.body;

     const sql = `Call SP_moduloEstudiantes('ME_PADRES_TUTORES','I','1','${COD_ESTUDIANTE}','${COD_PERSONA}','${NOMBRE_PADRE_TUTOR}','${APELLIDO_PADRE_TUTOR}',
     '${TELEFONO_PADRE_TUTOR}','${CORREO_ELECTRONICO_PADRE_TUTOR}','${OCUPACION_PADRE_TUTOR}','${RELACION_PADRE_ESTUDIANTE}')`;
     mysqlConnection.query(sql, error => {
         if (!error) {
             res.json({
                 Status: "Padre Tutor Registrado"
             });
         } else {
             console.log(error);
         }
     });
   } catch (error) {
     res.send(error);
   }
 });

 //Metodo put
 router.put("/modificar_padre_tutor", (req, res) => {
  try {
      const {COD_PADRE_TUTOR,COD_ESTUDIANTE, COD_PERSONA, NOMBRE_PADRE_TUTOR, APELLIDO_PADRE_TUTOR, TELEFONO_PADRE_TUTOR,
          CORREO_ELECTRONICO_PADRE_TUTOR, OCUPACION_PADRE_TUTOR,RELACION_PADRE_ESTUDIANTE} = req.body;
          const sql = `Call SP_moduloEstudiantes('ME_PADRES_TUTORES','U','${COD_PADRE_TUTOR}','${COD_ESTUDIANTE}','${COD_PERSONA}','${NOMBRE_PADRE_TUTOR}','${APELLIDO_PADRE_TUTOR}',
          '${TELEFONO_PADRE_TUTOR}','${CORREO_ELECTRONICO_PADRE_TUTOR}','${OCUPACION_PADRE_TUTOR}','${RELACION_PADRE_ESTUDIANTE}')`;
     mysqlConnection.query(sql, error => {
         if (!error) {
             res.json({
                 Status: "Padre Tutor Modificado"
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
const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');
/*
         COD_MATRICULA = parametroBI1,
        COD_ESTUDIANTE = parametroBI2,
        COD_NIVACAD_ANIOACAD parametroBI3,
        PERIODO_ACADEMICO = parametroV1

*/
//MOTRAR DATOS DE LA TABLA MM_MATRICULA
router.get('/SELmatricula', (req, res) => { 

    // console.log(id, name, salary);
     const query = `

       CALL AXE.SP_modulomatricula('MM_MATRICULA', 'SA', 0,0,0,'0');
     `;
     mysqlConnection.query(query, (err, rows, fields) => {
       if(!err) {
        res.json(rows[0]);
       } else {
        console.log('Error de consola a BD MATRICULAS');
       }
    });

}); 

//MOTRAR DATOS DE TABLA MATRICULA SEGUN ID
router.get('/SELmatriculaid/:COD_MATRICULA', (req, res) => { 

  const {COD_MATRICULA } = req.params;
  const query = `

  CALL AXE.SP_modulomatricula('MM_MATRICULA', 'SO',?,0,0,'0');
`;

  mysqlConnection.query(query, [COD_MATRICULA], (err, rows) => {
     if(!err) {
      res.json(rows[0]);
     } else {
       console.log(err);
     }
  });

});

// INSERT EN LA TABLA MM_MATRICULA
router.post('/INSmatricula', (req, res) => { 

  const {COD_ESTUDIANTE,COD_NIVACAD_ANIOACAD, PERIODO_ACADEMICO} = req.body;
   const query = `
     SET @COD_ESTUDIANTE = ?;
     SET @COD_NIVACAD_ANIOACAD =?;
     SET @PERIODO_ACADEMICO = ?;

     CALL AXE.SP_modulomatricula('MM_MATRICULA', 'I', '0',@COD_ESTUDIANTE,@COD_NIVACAD_ANIOACAD,@PERIODO_ACADEMICO);
   `;
   mysqlConnection.query(query, [COD_ESTUDIANTE,COD_NIVACAD_ANIOACAD, PERIODO_ACADEMICO], (err, rows, fields) => {
     if(!err) {
      res.json({status: 'MATRICULA Ingresada'});
     } else {
       console.log(err);
     }
  });

});


//UPDATE DE DATOS DE LA MM_MATRICULA
router.put('/UPDmatricula/:COD_MATRICULA', (req, res) => {
  const {COD_ESTUDIANTE,COD_NIVACAD_ANIOACAD, PERIODO_ACADEMICO} = req.body;
  const {COD_MATRICULA} = req.params;
  const query = `

  CALL AXE.SP_modulomatricula('MM_MATRICULA', 'U',?,?,?,?);
`;

  mysqlConnection.query(query, [COD_MATRICULA,COD_ESTUDIANTE,COD_NIVACAD_ANIOACAD, PERIODO_ACADEMICO], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'MATRICULA ACTUALIZADA'});
      } else {
        console.log(err);
      }
  });

});//fin put


module.exports = router;
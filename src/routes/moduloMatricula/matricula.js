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
router.get('/SELmatriculaid/:parametroBI1', (req, res) => { 

  const { parametroBI1 } = req.params;
  const query = `

  CALL AXE.SP_modulomatricula('MM_MATRICULA', 'SO',?,0,0,'0');
`;

  mysqlConnection.query(query, [parametroBI1], (err, rows) => {
     if(!err) {
      res.json(rows[0]);
     } else {
       console.log(err);
     }
  });

});

// INSERT EN LA TABLA MM_MATRICULA
router.post('/INSmatricula', (req, res) => { 

  const {parametroBI2,parametroBI3, parametroV1} = req.body;
   const query = `
     SET @parametroBI2 = ?;
     SET @parametroBI3 =?;
     SET @parametroV1 = ?;

     CALL AXE.SP_modulomatricula('MM_MATRICULA', 'I', '0', @parametroBI2,@parametroBI3, @parametroV1);
   `;
   mysqlConnection.query(query, [parametroBI2,parametroBI3, parametroV1], (err, rows, fields) => {
     if(!err) {
      res.json({status: 'MATRICULA Ingresada'});
     } else {
       console.log(err);
     }
  });

});


//UPDATE DE DATOS DE LA MM_MATRICULA
router.put('/UPDmatricula/:parametroBI1', (req, res) => {
  const {parametroBI2,parametroBI3, parametroV1} = req.body;
  const {parametroBI1} = req.params;
  const query = `

  CALL AXE.SP_modulomatricula('MM_MATRICULA', 'U',?,?,?,?);
`;

  mysqlConnection.query(query, [parametroBI1,parametroBI2,parametroBI3, parametroV1], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'MATRICULA ACTUALIZADA'});
      } else {
        console.log(err);
      }
  });

});//fin put


module.exports = router;
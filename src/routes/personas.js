const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

//MOTRAR DATOS DE LA TABLA DE PERSONA
router.get('/selpersonas', (req, res) => { 

    mysqlConnection.query('CALL bd_beautyhn.SEL_PERSONAS()', (err, rows) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log('Error de consola a BD compras');
            
        }
    });

});

//MOSTRAR DATOS DE LA TABLA SEGUN COD_PERSONAS
router.get('/selpersonas/:COD_PERSONAS', (req, res) => {
    const { COD_PERSONAS } = req.params;
    //console.log(COD_PERSONAS); 
  mysqlConnection.query('SELECT * FROM PR_PERSONAS WHERE COD_PERSONAS = ?', [COD_PERSONAS], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

//INSERTAR DATOS EN LA TABLA DE PERSONAS
router.post('/inspersonas', (req, res) => {
    const {id, name, dircorreo, sex, eda, tipperson, indperson, numtel, tiptel, user} = req.body;
   // console.log(id, name, salary);
    const query = `
      SET @id = ?;
      SET @name = ?;
      SET @dircorreo = ?;
      SET @sex = ?;
      SET @eda = ?;
      SET @tipperson = ?;
      SET @indperson = ?;
      SET @numtel = ?;
      SET @tiptel = ?;
      SET @user = ?;
      CALL INS_PERSONAS(@id, @name,@dircorreo, @sex,@eda,@tipperson,@indperson,@numtel,@tiptel,@user);
    `;
    mysqlConnection.query(query, [id, name, dircorreo, sex, eda, tipperson, indperson, numtel, tiptel, user], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Persona Ingresada'});
      } else {
        console.log(err);
      }
    });
  
  });//FIN DEL POST DE INSERTAR EN LA PERSONAS

  //UPDATE DE LA TABLA  PERSONAS
  router.put('/updpersonas/:COD_PERSONAS', (req, res) => {
    const {id, name, dircorreo, sex, eda, tipperson, indperson, numtel, tiptel, user} = req.body;
    const {COD_PERSONAS} = req.params;
    const query = 'CALL UPD_PERSONAS(?,?, ?,?, ?,?,?,?,?,?,?)' 

    mysqlConnection.query(query, [COD_PERSONAS,id, name, dircorreo, sex, eda, tipperson, indperson, numtel, tiptel, user], (err, rows, fields) => {
        if(!err) {
          res.json({status: 'Persona ACTUALIZADA'});
        } else {
          console.log(err);
        }
    });

  });//fin put de actualizar de la tabla persona

//DELETE DE LA TABLA PERSONAS
router.delete('/delpersonas/:COD_PERSONAS', (req, res) => {
    const {COD_PERSONAS} = req.params;
    mysqlConnection.query('DELETE FROM PR_PERSONAS WHERE COD_PERSONAS=?', [COD_PERSONAS], (err, rows, fields) => {
        if(!err) {
            res.json({status: 'Persona ELIMINADA'});
          } else {
            console.log(err);
          }
    });
});//fin delete de la tabla personas

module.exports = router;
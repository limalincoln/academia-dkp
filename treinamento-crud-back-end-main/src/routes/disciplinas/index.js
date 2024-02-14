const { Router } = require("express");
const mysql = require('mysql2');

const router = Router();

const conn = mysql.createConnection({
    host: 'localhost',
    database: 'novo_banco_de_teste',
    user: 'root',
    password: 'root'
});

router.get('/listar', function (req, res) {
   
    try {
         
        conn.execute('SELECT * FROM disciplinas;', function (err, response, fields) {

            if (err) throw err;
    
            res.status(200).json({
                msg: 'Sucesso na listagem de disciplinas!',
                data: response
            });
        });
        
    } catch (error) {
        
        res.status(500).json({
            msg: 'Erro ao listar funcionários!',
            data: error
        });
    }
});

router.get('/:id', function (req, res) {

    try {

        conn.execute(
            `SELECT * FROM disciplinas WHERE id = ?;`, [req.params.id], function (err, response, fields) {
    
            if (err) throw err;

            res.status(200).json({
                msg: 'Sucesso na consulta da disciplina!',
                data: response[0]
            });
        });
        
    } catch (error) {
        
        res.status(200).json({
            msg: 'Erro ao consultar funcionário!',
            data: error
        });
    }
});


router.post('/cadastrar', function (req, res) {
   
    try {

        conn.execute('INSERT INTO disciplinas (nome, codigo, descricao) VALUES (?,?,?);', [req.body.nome, req.body.codigo, req.body.descricao], function (err, response, fields) {

            if (err) throw err;
    
            res.status(200).json({
                msg: 'Disciplina cadastrada com sucesso!',
                data: response
            });
        });
        
    } catch (error) {
        
        res.status(500).json({
            msg: 'Erro ao cadastrar funcionário!',
            data: error
        });
    }
});

router.patch('/alterar/:id', function (req, res) {
    try {

        conn.execute('UPDATE disciplinas SET nome = ?, codigo = ?, descricao = ?  WHERE id = ?', [req.body.nome, req.body.codigo, req.body.descricao, req.params.id], function (err, response, fields) {

            if (err) throw err;
    
            res.status(200).json({
                msg: 'Disciplina alterada com sucesso!',
                data: response
            });
        });
        
    } catch (error) {
        
        res.status(500).json({
            msg: 'Erro ao atualizar funcionário!',
            data: error
        });
    }
});

router.delete('/excluir/:id', function (req, res) {
    try {
            
        conn.execute('DELETE FROM disciplinas WHERE id = ?;', [req.params.id], function (err, response, fields) {

            if (err) throw err;
    
            res.status(200).json({
                msg: 'Disciplina excluída com sucesso!',
                data: response
            });
        });
        
    } catch (error) {
        
        res.status(500).json({
            msg: 'Erro ao excluir funcionário!',
            data: error
        });
    }
});


module.exports = router;
const { Router } = require("express");
const mysql = require('mysql2');

const router = Router();

const conn = mysql.createConnection({
    host: 'localhost',
    database: 'novo_banco_de_teste',
    user: 'root',
    password: 'root'
});

  conn.connect(function(err) {
    if(err){
        console.log(`Erro ao conectar ao banco de dados: ${err}`)
        return;
    }
    console.log('Conexão bem-sucedida')
  })



router.get('/listar', function (req, res) {
    try {
        conn.execute(
            `SELECT 
                 a.id,
                 a.nome AS nome,
                 d.nome "disciplina",
                 d.descricao,
                 d.codigo
            FROM
                alunos AS a
            LEFT JOIN
            disciplinas AS d ON d.id = a.disciplina_id;`, function (err, response, fields) {
    
            if (err) throw err;

            res.status(200).json({
                msg: 'Sucesso na listagem de alunos!',
                data: response
            });
        });

        console.log('query', conn.execute);
        
    } catch (error) {
        
        res.status(200).json({
            msg: 'Erro ao listar alunos!',
            data: error
        });
    }
});

router.get('/:id', function (req, res) {

    try {
        conn.execute(
            `SELECT
                a.id,
                a.nome AS nome,
                a.sobrenome,
                a.data_nascimento,
                a.email,
                d.nome "disciplina",
                d.descricao,
                d.codigo
            FROM 
                alunos AS a 
            LEFT JOIN
            disciplinas AS d ON d.id = a.disciplina_id
            WHERE a.id = ?;`, [req.params.id], function (err, response, fields) {
                if (err) throw err;

                res.status(200).json({
                    msg: 'Sucesso na consulta de aluno!',
                    data: response [0]
                });
             });
    } catch (error) {
        
        res.status(200).json({
            msg: 'Erro ao consultar aluno!',
            data: error
        });
    }
});

router.post('/cadastrar', function (req, res) {
    try {
        conn.execute('INSERT INTO alunos (disciplina_id, nome, sobrenome, data_nascimento, email) VALUES (?,?,?,?,?)', [req.body.disciplina_id, req.body.nome, req.body.sobrenome, req.body.data_nascimento, req.body.email], function (err, response, fields) {

            if (err) throw err;
    
            res.status(200).json({
                msg: 'Aluno cadastrado com sucesso!',
                data: response
            });
        });
        
    } catch (error) {
        
        res.status(500).json({
            msg: 'Erro ao cadastrar aluno!',
            data: error
        });
    }
});

router.patch('/alterar/:id', function (req, res) {

    try {

        conn.execute('UPDATE alunos SET disciplina_id = ?, nome = ?, sobrenome = ?, data_nascimento = ?, email = ? WHERE id = ?;', [req.body.disciplina_id, req.body.nome, req.body.sobrenome, req.body.data_nascimento, req.body.email, req.params.id], function (err, response, fields) {

            if (err) throw err;
    
            res.status(200).json({
                msg: 'Aluno atualizado com sucesso!',
                data: response
            });
        });
        
    } catch (error) {
        
        res.status(500).json({
            msg: 'Erro ao atualizar o Aluno',
            data: error
        });
    }
});

router.delete('/excluir/:id', function (req, res) {

    try {

        conn.execute('DELETE FROM alunos WHERE id = ?;', [req.params.id], function (err, response, fields) {

            if (err) throw err;
    
            res.status(200).json({
                msg: 'Aluno excluído com sucesso!',
                data: response
            });
        });
        
    } catch (error) {
        
        res.status(500).json({
            msg: 'Erro ao excluir o aluno!',
            data: error
        });
    }
});

module.exports = router;
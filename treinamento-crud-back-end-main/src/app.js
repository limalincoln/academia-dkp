const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors({origin: "*"}));

const disciplinas = require('./routes/disciplinas');
app.use('/routes/disciplinas', disciplinas);

const alunos = require('./routes/alunos');
app.use('/routes/alunos', alunos);

module.exports = app;

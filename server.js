const express = require("express");
const app = express();
app.use(express.json());


let alunos = [
  { id: 1, nome: "Ana" },
  { id: 2, nome: "Carlos" }
];


app.get("/alunos", (req, res) => {
  const id = req.query.id;
  
  if (id) {
    const aluno = alunos.find(a => a.id == id);
    if (!aluno) return res.status(404).json({ erro: "Aluno não encontrado" });
    return res.json(aluno);
  }

  res.json(alunos);
});


app.post("/alunos", (req, res) => {
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ erro: "Nome é obrigatório" });
  }

  const novoAluno = {
    id: alunos.length + 1,
    nome
  };

  alunos.push(novoAluno);
  res.status(201).json(novoAluno);
});


app.delete("/alunos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = alunos.findIndex(a => a.id === id);
  if (index === -1) {
    return res.status(404).json({ erro: "Aluno não encontrado" });
  }

  alunos.splice(index, 1);
  res.json({ mensagem: "Aluno removido com sucesso" });
});


app.listen(3000, () => console.log("API rodando na porta 3000"));

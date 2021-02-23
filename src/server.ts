import express from 'express';

const app = express();

app.get('/', (req, res) => {
  return res.json({ msg: 'Hello World NLW #4' });
});

app.post('/', (req, res) => {
  return res.json({ msg: 'Dados salvos com sucesso' });
});

app.listen(3333, () => console.log('Server is running!'));

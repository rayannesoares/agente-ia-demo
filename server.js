const express = require('express');

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.post('/api/chat', (req, res) => {
  try {
    const { messages = [] } = req.body;
    const userMessagesCount = messages.filter((m) => m.role === 'user').length;

    let reply =
      'Olá! Na Clínica Bella Estética temos Limpeza de Pele (R$ 150), Botox (a partir de R$ 890) e Drenagem Linfática (R$ 120). Qual dia e turno preferes para uma avaliação gratuita?';

    if (userMessagesCount >= 2) {
      reply +=
        '\n\n[Demonstração]: Viu como eu atendo em segundos e conduzo para o agendamento? Eu posso rodar direto no WhatsApp da sua empresa em 48h. Clica no botão verde acima para falar com a minha criadora!';
    }

    res.json({ reply });
  } catch (error) {
    console.error('Erro no servidor:', error);
    res.status(500).json({ reply: 'Ops, tive uma instabilidade rápida. Podes repetir?' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor a correr na porta ${PORT}`));
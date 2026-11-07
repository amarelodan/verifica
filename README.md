# VERIFICA

Aplicação de apoio à checagem de informações e combate à desinformação.

## Configuração
1. Configure `OPENAI_API_KEY` como variável secreta na Vercel.
2. Execute `npm install`.
3. Execute `npm run dev`.

## API
`POST /api/analyze` recebe `{ "content": "afirmação ou link", "mode": "texto" }`.
A rota usa a Responses API com a ferramenta `web_search`. A chave fica exclusivamente no servidor.

## Limitações e próximos passos
- Conteúdo limitado a 5.000 caracteres.
- Ainda é necessário adicionar rate limiting, proteção contra abuso e monitoramento de custos antes de abrir ao público.
- A análise é assistida por IA e não substitui checagem humana especializada.

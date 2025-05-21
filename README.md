# 📦 Sistema de Pedidos – NestJS, Kafka, Elasticsearch, Prometheus, Grafana

Este projeto é uma API de pedidos construída com o framework [NestJS](https://nestjs.com/), integrando diversas ferramentas modernas para observabilidade, mensageria e busca avançada.

## 🚀 Tecnologias Utilizadas

- **NestJS** – Framework Node.js
- **PostgreSQL** – Banco de dados relacional
- **Kafka** – Mensageria distribuída
- **Elasticsearch** – Armazenamento e busca de logs
- **Logstash + Kibana** – Visualização de logs
- **Prometheus + Grafana** – Monitoramento e métricas
- **TypeORM** – ORM para PostgreSQL
- **Swagger** – Documentação interativa da API
- **Winston** – Logger estruturado
- **Docker + Docker Compose** – Containerização

---

## 📁 Estrutura do Projeto

starsoft-backend-challenge/
├── dist/ # Arquivos compilados
├── logs/ # Logs gerados (combined.log, error.log)
├── logstash/ # Configurações para envio de logs
├── node_modules/
├── prometheus/ # Configurações do Prometheus
├── src/ # Código-fonte da aplicação
├── test/ # Testes automatizados
├── .env # Variáveis de ambiente
├── .eslintrc.js # Config ESLint
├── .prettierrc # Config Prettier
├── eslint.config.mjs # Config adicional do ESLint
├── jest.config.ts # Configuração dos testes
├── nest-cli.json # Configuração do NestJS CLI
├── tsconfig.json # Configuração TypeScript
├── tsconfig.build.json # Config TypeScript para build
├── Dockerfile # Dockerfile da aplicação
├── docker-compose.yml # Orquestração dos serviços
├── package.json
├── package-lock.json
├── README.md # Este arquivo


---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz com o seguinte conteúdo:

```envexemplo
POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=ecommerce

KAFKA_BROKER=kafka:9092
ELASTICSEARCH_NODE=http://elasticsearch:9200

PORT=3002


🐳 Subindo o Ambiente com Docker
docker-compose up --build
| Serviço       | URL                                                              |
| ------------- | ---------------------------------------------------------------- |
| API           | [http://localhost:3002](http://localhost:3002)                   |
| Swagger       | [http://localhost:3002/api-docs](http://localhost:3002/api-docs) |
| PostgreSQL    | localhost:5432                                                   |
| Kafka         | localhost:9092                                                   |
| Elasticsearch | [http://localhost:9200](http://localhost:9200)                   |
| Kibana        | [http://localhost:5601](http://localhost:5601)                   |
| Prometheus    | [http://localhost:9090](http://localhost:9090)                   |
| Grafana       | [http://localhost:3000](http://localhost:3000) (admin/admin)     |
📘 Documentação da API
Acesse via Swagger:

👉 http://localhost:3002/api-docs

🧰 Scripts
npm run start         # Produção
npm run start:dev     # Desenvolvimento com hot reload
npm run test          # Testes unitários
npm run lint          # Verifica estilo do código
npm run format        # Formata com Prettier

📈 Monitoramento & Logs
Logs: logs/combined.log e logs/error.log via Winston

Logstash + Elasticsearch: Envio e armazenamento dos logs

Kibana: Visualização dos logs em dashboards

Prometheus: Coleta de métricas

Grafana: Visualização das métricas de forma amigável

🧪 Testes
Execute os testes com:
npm run test

🧑‍💻 Autor
Desenvolvido por [Augusto Santana] como parte do Desafio Backend StarSoft.

---

Se quiser, posso gerar esse arquivo automaticamente no local correto ou até criar um script para isso. Deseja que eu crie esse arquivo pra você?

# 🔄 Retrospectiva da Sprint 1

## ✅ O que deu certo?
- Criação do servidor
- Organização dos arquivos
- Padrões bem definidos para o resto do projeto
- Validações back do login funcionando
- Criação dos testes da página de cadastro e de login

## 🚫 O que não deu certo?
- Comunicação entre os membros
- Compromisso do time
- Organização de tarefas

## 🛠️ O que podemos melhorar para a próxima sprint?
- Comunicação entre os membros
- Compromisso do time

## 🧠 Aprendizados da sprint
- Utilizar jest para fazer testes com DOM

## 🙋 Avaliação individual 
- Nome: Matheus Andrade
- Contribuições principais: Reformulação da função de cadastro e criação dos testes da mesma
- Dificuldade enfrentada: Realizar os testes com DOM
- Nota para meu desempenho (0 a 10): 8

## 🙋 Avaliação individual
- Nome: Marcelo Vaz
- Contribuições principais: Construção da API e testes do cadastro
- Dificuldade enfrentada: Difiuldade para atualizar o banco de dados através do login
- Nota para meu desempenho (0 a 10): 8

## 🙋 Avaliação individual 
- Nome: Ian Meirelles
- Contribuições principais: Reformulação da função de login e criação de seus testes
- Dificuldade enfrentada: Muitas faltas
- Nota para meu desempenho (0 a 10): 5

## 🙋 Avaliação individual 
- Nome: Luiz Felipe
- Contribuições principais: Criação de testes para o cadastro
- Dificuldade enfrentada: Comunicação
- Nota para meu desempenho (0 a 10): 6

# 🔄 Retrospectiva da Sprint 2

## ✅ O que deu certo?
- **Configuração do Docker**  
  - Marcelo e Luiz conseguiram criar o ambiente Docker para o back-end e front-end, padronizando os containers de desenvolvimento.  
- **Finalização da API**  
  - Ian finalizou os endpoints principais (CRUD de usuários e autenticação) e integrou corretamente com o banco JSON.  
- **Desenvolvimento Full Stack**  
  - Matheus integrou a interface web com a API, validando chamadas com Insomnia e garantindo que o front-end exibisse dados dinâmicos.  
- **Testes automatizados**  
  - Foi mantida a cobertura de testes Jest em 80% das funcionalidades novas (rotas de login, registro e endpoints de CRUD).  
- **Organização de Código**  
  - Todos os arquivos foram organizados em pastas claras (`src/api`, `src/frontend`, `src/config`) e o código seguiu os padrões definidos na Sprint 1.

## 🚫 O que não deu certo?
- **Sincronização das rotas no container**  
  - Na montagem do Docker, houve dificuldade inicial em expor corretamente as portas do Express, fazendo com que testes automatizados só passassem localmente, mas falhassem dentro do container.  
- **Atraso na entrega de parte da API**  
  - O endpoint de atualização de perfil demorou mais do que o planejado, fazendo com que algumas validações fossem adiadas para uma correção emergencial no final da sprint.  
- **Problemas de compatibilidade front-end/back-end**  
  - Alguns endpoints retornavam campos com nomes divergentes (ex.: `userId` vs `idUsuario`), o que gerou bugs na exibição das informações na tela antes de ajustarmos o mapeamento no código de Matheus.  
- **Testes incompletos para erros de Dockerização**  
  - Não foi possível escrever testes que validassem a inicialização do container, ficando pendente para a Sprint 3.

## 🛠️ O que podemos melhorar para a próxima sprint?
- **Planejamento de Docker e Rede**  
  - Definir com antecedência o diagrama de rede entre containers (front-end, back-end e eventual banco) para evitar retrabalho na configuração de portas e volumes.  
- **Definição clara de contratos de API**  
  - Antes de começar a codificar, criar um documento (ou Swagger/OpenAPI) com os nomes exatos de rotas, payloads e formatos de resposta, de modo a manter front e back alinhados desde o início.  
- **Divisão de tarefas em subitens menores**  
  - Para o endpoint de atualização de perfil, por exemplo, quebrar a tarefa em:  
    1. Estruturar rota e middleware de autenticação.  
    2. Validar payload no back-end.  
    3. Escrever testes unitários.  
    4. Conectar front-end e fazer testes de integração.  
- **Revisão de testes em ambiente de container**  
  - Criar uma rotina mínima de CI local (pode ser um script `npm test:docker`) para executar testes dentro do container, identificando erros de configuração cedo.  
- **Comunicação sobre bloqueios**  
  - Sempre que alguém ficar “travado” em um problema de infraestrutura (Docker, CORS, rewrite de rota), avisar imediatamente no canal de comunicação destacado, pedindo ajuda antes de acumular horas de retrabalho.

## 🧠 Aprendizados da sprint
- **Uso prático de Docker em ambiente Full Stack**  
  - Entendemos como criar `Dockerfile` para back-end e front-end, além de usar `docker-compose` para orquestrar serviços.  
- **Gerenciamento de variáveis de ambiente**  
  - Aprendemos a definir `ENV` no Docker para segredos (JWT_SECRET, portas, caminhos de DB) e a referenciá-las no código JavaScript/TypeScript.  
- **Integração contínua local**  
  - Percebemos a importância de rodar testes automatizados dentro do ambiente containerizado para evitar “funciona na minha máquina” e falhas em produção.  
- **Documentação de contrato de API**  
  - A falta de um token único de nomenclatura para as respostas da API reforçou a necessidade de um documento unificado (Swagger/OpenAPI) para facilitar o desenvolvimento conjunto.

## 🙋 Avaliação individual

### Matheus Andrade
- **Contribuições principais**:  
  - Desenvolvimento da camada full stack, consumo de endpoints via `fetch`/`axios` no front-end e validação de dados no formulário de cadastro.  
  - Ajuste dos mapeamentos de campos divergentes entre front e back.  
- **Dificuldade enfrentada**:  
  - Integração de formulários com o novo ambiente Docker, pois a aplicação front não conseguia acessar o host do back.  
- **Nota para desempenho (0 a 10)**: 7  
  - **Comentário**: Fez um bom trabalho em unificar front e back, mas pode melhorar na preparação de testes de integração local antes de validar funcionalidades completas.

### Marcelo Vaz
- **Contribuições principais**:  
  - Criação do `Dockerfile` para o back-end, configuração de volumes e mapeamento de portas.  
  - Ajuste do `docker-compose.yml` para orquestrar API e banco (JSON).  
- **Dificuldade enfrentada**:  
  - Configurar o compartilhamento de volumes entre host e container, causando discrepância de versões de dependências (npm install dentro do container).  
- **Nota para desempenho (0 a 10)**: 8  
  - **Comentário**: Demonstrou boa capacidade de aprender Docker rapidamente e aplicá-lo ao projeto, mas deve revisar a documentação de volumes para evitar problemas de cache em próximos sprints.

### Luiz Felipe
- **Contribuições principais**:  
  - Apoio na configuração do Docker (especificamente no container do front-end) e testes de build de imagem.  
  - Ajudou a documentar o passo a passo para subir os containers em README.  
- **Dificuldade enfrentada**:  
  - Entender diferenças de rede interna do Docker (bridge) vs host local, o que gerou erros de CORS inicialmente.  
- **Nota para desempenho (0 a 10)**: 7  
  - **Comentário**: Colaborou bem na parte de documentação e build de front, mas precisa se aprofundar em conceitos de redes Docker para minimizar retrabalho.

### Ian Meirelles
- **Contribuições principais**:  
  - Finalização dos endpoints da API (GET/POST/PUT/DELETE de usuários) e implementação da rota de atualização de perfil.  
  - Escrita de testes Jest para todos os novos endpoints e ajustes de cobertura.  
- **Dificuldade enfrentada**:  
  - Tratamento de erros no fluxo assíncrono (`async/await`) e garantia de escrita correta no JSON (db).  
- **Nota para desempenho (0 a 10)**: 6  
  - **Comentário**: Concluiu a parte de API, mas atrasos no endpoint de profile impactaram o cronograma. Pode melhorar a estimativa de tempo ao lidar com leituras/escritas de arquivos.


---

## Resumo Rápido
- **Pontos fortes**:  
  - Docker em funcionamento para back-end e front-end, endpoints principais da API finalizados e testes automatizados mantidos em boa cobertura.  
- **Pontos a melhorar**:  
  - Planejamento prévio de contratos de API, rota de atualização de perfil bem definida e testes dentro do container.  
  - Comunicação sobre bloqueios de infraestrutura de forma imediata.  
- **Próximos passos para Sprint 3**:  
  1. Criar documentação Swagger/OpenAPI para toda a API.  
  2. Implementar testes dentro do container (CI local).  
  3. Ajustar endpoint de profile e padronizar nomes de campos.  
  4. Refatorar scripts Docker para produção (reduzir imagem e otimizar build).

---

Com essas correções e aprendizados, a equipe estará mais preparada para a Sprint 3, alinhando melhor front-end, back-end e processos de containerização. Vamos em frente!

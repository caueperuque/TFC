<h1>Projeto TFC</h1>

No projeto TFC (The Football Center), desenvolvi um sistema completo dedicado a fornecer informações atualizadas sobre partidas e classificações de futebol. Este sistema abrange várias partes cruciais, incluindo o banco de dados, o back-end e a integração com Docker para facilitar a execução. Abaixo, descrevo o que foi desenvolvido em cada uma dessas áreas:

##

1. Banco de Dados:

Configurei um container Docker MySQL no docker-compose, denominado 'db', que fornece o armazenamento de dados para o projeto.
Utilizei o Sequelize, uma biblioteca do Node.js, para realizar a modelagem de dados e acessar o banco de dados de forma eficiente.
O banco de dados foi acessado via porta 3306 do localhost, e as credenciais de acesso foram configuradas no docker-compose.

##

2. Back-End:

Implementei o back-end em Node.js usando o framework Express.
O servidor do back-end foi inicializado a partir do arquivo 'server.ts' localizado em 'app/backend/src'.
Garanti que o Express estivesse configurado para ouvir a porta 3001, pois o front-end faz solicitações para essa porta por padrão.
Gerenciei as dependências do projeto, como Joi, Boom, express-async-errors, e outras, que foram listadas em 'app/backend/packages.npm'.
Desenvolvi regras de negócios para manipular os dados no banco de dados e fornecer as informações necessárias para o front-end.

##

3. Docker:

Configurei o docker-compose para unir todos os serviços conteinerizados, incluindo o backend, e o banco de dados.
Usei Dockerfiles nas raízes do front-end e back-end para garantir que as aplicações pudessem ser inicializadas de forma eficaz com o comando 'npm run compose:up'.
Nesse projeto, adotei as melhores práticas de desenvolvimento, incluindo o uso de TypeScript para um código mais seguro e legível, bem como o método TDD (Desenvolvimento Orientado por Testes) para garantir a confiabilidade do back-end. Com o sistema em funcionamento, os usuários podem acessar o site, obter informações atualizadas sobre partidas de futebol e classificações, e desfrutar de uma experiência de usuário de alta qualidade.

##

<h1>Conclusão</h1>

Em resumo, o projeto TFC representa um exemplo de desenvolvimento completo, cobrindo o desenvolvimento de um back-end dockerizado, modelagem de dados com Sequelize, uso de TypeScript, Express, Node.js e integração eficiente com um banco de dados MySQL para fornecer informações atualizadas sobre futebol de maneira eficaz.

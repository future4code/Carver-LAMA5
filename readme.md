# Begin Donation Books System

## Primeiros Passos

* Clonar este repositório
* Executar `npm install` para adicionar as dependências
* Criar um arquivo .env na raiz do projeto e preencher as chaves a seguir com os valores apropriados:
   ```
    DB_HOST = 
    DB_USER = 
    DB_PASSWORD = 
    DB_DATABASE_NAME = 

    JWT_KEY = 
    ACCESS_TOKEN_EXPIRES_IN = 

    BCRYPT_COST = 
   ```

* Executar `npm run migrations` para adicionar as tabelas ao banco de dados (em caso de sucesso, o servidor já estará pronto para receber requisições)

## Sobre o projeto

API que representa o sistema de doação de livros.

Possui 4 entidades importantes:

Usuário

Banda

Show

Ingresso

As funcionalidades são:

→ Criar usuário;

→ Criar banda;

→ Adicionar show a um dia;

→ Criar ingresso;

→ Login de usuário;

→ Visualizar detalhes da banda;

→ Visualizar todos os shows de um dia;

→ Comprar ingrsso;


📋 Documentação: https://documenter.getpostman.com/view/18385426/UVsPR5tx


🛠️ Tecnologias utilizadas:

→ MySql;

→ Express;

→ Knex;

→ Node.js:

→ Typescript;

→ Dotenv;

→ Cors;

→ BCRYPT;

→ UUID;

→ JWToken;

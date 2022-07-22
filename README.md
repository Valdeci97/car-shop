## <div align="center">Car Shop</div>

Esse projeto implementa uma api [REST](https://www.redhat.com/pt-br/topics/api/what-is-a-rest-api) de automóveis e motocicletas com Typescript e MongoDB.

Usando dos princípios [SOLID](https://medium.com/desenvolvendo-com-paixao/o-que-%C3%A9-solid-o-guia-completo-para-voc%C3%AA-entender-os-5-princ%C3%ADpios-da-poo-2b937b3fc530) para reutilização, legibilidade e manutenção do código em POO você pode criar, excluir, listar e atualizar os dados no banco de dados.

## <div align="center">Tecnologias</div>

<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="50px"  margin-left="5px"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg" width="50px" margin-left"5px" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original-wordmark.svg" width="50px" margin-left="5px" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mocha/mocha-plain.svg" width="50px" margin-left="5px" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" width="50px" margin-left="5px" />
</div>

##

## <div align="center">Como usar</div>

Você vai precisar do [Nodejs 16.16 ou maior](https://nodejs.org/en/) instalado na sua máquina.
Também precisa ter o [Git](https://git-scm.com/downloads) instalado em sua máquina.

<details>
  <summary>Caso queira ver o funcionamento do banco de dados</summary>
  
  - Você precisará do [MongoDB 4.4.15 ou maior](https://www.mongodb.com/try/download/community) e sugiro usar uma interface gráfica para acompanhar as mudanças das aplicação [MongoDB compass](https://www.mongodb.com/try/download/compass);
  - Ou ainda do [Docker](https://docs.docker.com/engine/install/) e [docker compose 1.29 ou maior](https://docs.docker.com/compose/install/).
  - Também vai precisar de uma aplicação que gerencie requisições HTTP sugiro [Insonmia](https://insomnia.rest/download) ou [Postman](https://www.postman.com/downloads/);
</details>

<details>
  <summary>Como subir o banco de dados com docker</summary>

  - Baixe a imagem do mongo:
  ```
  $docker pull mongo
  ```
  
  - Suba o container mongo:
  ```
  $docker run --name <nome-do-container> -p 27017:27017 -d mongo
  ```
  PS: substitua nome-do-container por qual nome você preferir
  
  - Veja se o container está rodando:
  ```
  $docker ps
  ```
  
  - Ao finalizar derrube o conatiner:
  ```
  $docker stop <nome-do-conatiner>
  ```
</details>

```
Clone esse repositório

$git clone git@github.com:Valdeci97/car-shop.git

Mude para a pasta do projeto

$cd car-shop

Instale as dependências caso hajam

$npm i

Para ver os testes

$npm test
  
Para ver a cobertura

$npm run test:coverage
```

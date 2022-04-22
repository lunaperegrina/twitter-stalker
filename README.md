
<center>
    <img src="icon-twitter-stalker.svg" width=300>
</center>

<center>
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white">
</center>
<br>
<center>
    <h1>Twitter Stalker</h1>
</center>
<center>
    <h2>Este software faz o monitoramento de contas do Twitter com apoio da Twitter API V2.</h2>
</center>

<br>

## Instalação:

Estou assumindo que você possui [Git](https://git-scm.com/) e [NodeJS](https://nodejs.org/en/) em seu sistema.

Usei yarn neste projeto, então digite: (caso não tenha instalado)

    npm install -g yarn

Download do código:

    git clone https://github.com/pedroperegrinaa/twitter-stalker.git

Download dos módulos:

    yarn install

(aviso: as dependências pesam cerca de **428MB**)

## .env

Crie um arquivo .env e preencha com os seguintes valores:

    BEARER_TOKEN=
    EMAIL_ADDRESS=
    EMAIL_PASSWORD=
    USER_STALKED=

**BEARER_TOKEN:** É o seu token de autorização para utilizar a Twitter API V2. Você pode conseguir mais informações sobre aqui: [Bearer token Twitter](https://developer.twitter.com/en/docs/authentication/oauth-2-0/bearer-tokens). Existe um limite de 500 mil requisições de tweets por mês. Essa informação é importante.

**EMAIL_ADDRESS:** Seu gmail por onde você enviará os emails para si mesmo. Você precisa permitir a utilização de "apps menos seguros". Mais informações aqui: [Aplicações menos seguras do Google](https://support.google.com/a/answer/6260879?hl=pt-BR). Obs.: Este código foi feito pensando na utilização com gmail e, caso queira usar outro serviço, você precisará modificar algo no arquivo `email.js`.

**EMAIL_PASSWORD:** Sim, a senha do seu email.

**USER_STALKED:** Você precisa definir o ID da conta que deseja stalkear. Para conseguir o ID do usuario, use este site: https://tweeterid.com/ 

## Iniciando

    node index.js

Isso iniciará o monitoramento. Ao final do arquivo `index.js` temos a seguinte função:

    setInterval(getTweets, 60000);

O segundo parâmetro é o tempo entre cada verificação de ultimo tweet feito e está em milissegundos. O valor padrão é 1 minuto. Sinta-se a vontade para mudar isso, mas tenha em consideração o limite de 500 mil requisições de tweets por mês. A cada minuto são retornado 5 tweets (é o valor mínimo do endpoint `2/users/${user}/tweets/?max_results=5`). Tenha isso em mente caso queira modificar este valor.

## Possiveis bugs:

Esse código foi desenvolvido no Ubuntu 20.04.4 LTS, **dentro do WSL2** no Windows 10 64 bits. Tive problemas com o Chromium (dependência do `puppeteer`) e consegui a solução aqui:

https://github.com/puppeteer/puppeteer/issues/1837

a issue me levou para este site e resolveu o meu problema no Ubuntu: 

https://scottspence.com/posts/use-chrome-in-ubuntu-wsl

(tive o mesmo problema no Arch e infelizmente não consegui resolver. Caso tente instalar e consiga, por favor me diga como para que eu possa melhorar essa documentação.)



Caso tenha algum problema, envie uma mensagem no [meu Twitter](https://twitter.com/pedroperegrinaa)! 
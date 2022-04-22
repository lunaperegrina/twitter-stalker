import axios from 'axios';
import fs from 'fs';
import {remetente, enviarTweetsParaEmail} from './email.js';
import {screenshot} from './screenshot.js';
import dotenv from 'dotenv';
dotenv.config();

const dir = "./screenshots";
const dir_tweets = "./tweets.json";

//Verifica se não existe
if (!fs.existsSync(dir)){
    //Efetua a criação do diretório ./screenshots
    fs.mkdirSync(dir);
}

if (!fs.existsSync(dir_tweets)){
    //Efetua a criação do diretório ./tweets.json
    fs.writeFile(dir_tweets, JSON.stringify([{"id":"id","text":"text"}]), (err) => {
        if (err) throw err;
      console.log('O arquivo foi criado!');
    });
}

let token = process.env.BEARER_TOKEN;
let contar = 0;

let user = process.env.USER_STALKED;

let armazenados = [];

console.log("O código foi iniciado");
console.log(user);

async function getTweets(){
    try {

        const tweets = await axios.get(
            `https://api.twitter.com/2/users/${user}/tweets/?max_results=5`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        ).then((json) => {
            return json.data.data;
        });

        let data = fs.readFileSync("tweets.json");
        data = JSON.parse(data);
        console.log("DADOS: \n ===========================================");
        console.log(data);

        console.info("tweet anterior adicionado: \n", data[data.length - 1].text);
        console.info("ultimo tweet: \n", tweets[0].text);

        console.warn("São iguais? \n", data[data.length - 1].text == tweets[0].text);

        if (data[data.length - 1].text !== tweets[0].text) {

            console.log("Tweet a ser adicionado: \n", tweets[0]);

            console.log("armazenados ANTES: \n", armazenados);
            armazenados.push(tweets[0]);
            console.log("armazenados DEPOIS: \n", armazenados);

            fs.writeFile( "tweets.json", JSON.stringify(armazenados), () => {
                console.warn("ESCREVEU");
            })

            screenshot(user, tweets[0].id, armazenados);

        }
        console.log(armazenados);

        contar++;
        console.log(contar);

    } catch (error) {
        console.log(error);
    }
}


setInterval(getTweets, 5000);

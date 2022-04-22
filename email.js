import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

export var remetente = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 465,
    secure: true,
    auth:{
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD },
    tls: {
        ciphers:'SSLv3'
    }
    });

export async function enviarTweetsParaEmail(remetente, armazenados, id){
    var emailASerEnviado = {
        from:  process.env.EMAIL_ADDRESS,
        to: process.env.EMAIL_ADDRESS,
            subject: `Enviando Email com Twitter Stalker. Tweets de ${id}`,
            text: JSON.stringify(armazenados),
            attachments: [{
                filename: `${id}.png`,
                path: `./screenshots/${id}.png`,
           }]
            };
        
            console.log('vai mandar');
    
    await remetente.sendMail(emailASerEnviado, function(error){
        if (error) {
        console.log(error);
        } else {
        console.log("Email enviado com sucesso.");
        }
        });
}
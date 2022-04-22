import puppeteer from 'puppeteer';
import {remetente, enviarTweetsParaEmail} from './email.js';


export async function screenshot(user, id, armazenados) {
    console.warn('Entrou em screenshot');

    const browser = await puppeteer.launch({
        headless: true,
        executablePath: 'google-chrome-stable',
        args: ['--disable-gpu', '--no-sandbox'],
      });

    const page = await browser.newPage(); 

    await page.setViewport({
      width: 700,
      height: 1200,
    });

    await page.goto(`https://twitter.com/${user}/status/${id}`);

    await page.waitForTimeout(5000);

    await page.screenshot({path: `screenshots/${id}.png`});
    await browser.close();

    enviarTweetsParaEmail(remetente, armazenados, id);
}
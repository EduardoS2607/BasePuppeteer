const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');

async function robo() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const moedaBase = readlineSync.question("Escolha a moeda base: ") || 'real';
    const moedaFinal = readlineSync.question("Escolha a moeda final: ") || 'dolar';
    const conversorUrl = `https://www.google.com/search?q=${moedaBase}+para+${moedaFinal}&oq=${moedaBase}+para+${moedaFinal}&aqs=chrome..69i57j0i10l5j0i10i457j0i10l3.4496j1j7&sourceid=chrome&ie=UTF-8`;
    await page.goto(conversorUrl);
    
    const resultadoConversao = await page.evaluate(() => {
        return {
            valorFinal: document.querySelector('.a61j6.vk_gy.vk_sh.Hg3mWc').value,
            horarioPesquisa: document.querySelector(".hqAUc > *").textContent
        };
    });

    await browser.close();
    console.log(`O valor de ${moedaBase} para ${moedaFinal} é: ${resultadoConversao.valorFinal}`);
    console.log(`Pesquisa realizada na data: ${resultadoConversao.horarioPesquisa}`);
}

robo();
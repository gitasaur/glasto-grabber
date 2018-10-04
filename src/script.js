document.getElementById('refreshButton').style.display = 'none';

const puppeteer = require('puppeteer');

const GLASTO_URL = 'https://glastonbury.seetickets.com/';
let pages = [];

function servePages () {
    let urlToGoTo = document.getElementById("urlToGoTo").value;
    let browsersNumber = document.getElementById("noOfBrowsers").value;
    
    if (+browsersNumber) {
        for(let i=0; i < +browsersNumber; i++) {
            (async () => {
                const browser = await puppeteer.launch({
                        defaultViewport: null,
                        headless: false
                    });
        
                const page = await browser.newPage();
                await page.goto(urlToGoTo || GLASTO_URL);
                pages.push(page);
            })();
        }

        document.getElementById('noOfBrowsersForm').style.display = 'none';
        document.getElementById('refreshButton').style.display = 'block';
    }
}

function refreshPages () {
    pages.forEach(page => {
        page.reload();
    });
}

var shell = require('electron').shell;
//open links externally by default

function openLink (link) {
    shell.openExternal(link);
}
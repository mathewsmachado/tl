#!/usr/bin/env node

const puppeteer = require('puppeteer-core');

const {
  BROWSER_PATH,
  RESULT_COLOR,
  MAX_WAITING_TIME_IN_MS,
  LANGUAGES,
} = require('./constants');
const { log } = require('./logger');

(async () => {
  const [translationLanguage, words] = argsHandler(process.argv);
  const url = urlBuilder(translationLanguage, words);
  const translation = await translationFetcher(url);

  log.success(translation, RESULT_COLOR);
})();

/**
 * @param {string[]} argv
 * @returns {[string, string[]]}
 */
function argsHandler(argv) {
  const USEFUL_ARGS_INDEX = 2;
  const [translationLanguage, ...words] = argv.slice(USEFUL_ARGS_INDEX);

  if (!translationLanguage && words.length === 0) {
    log.error('You must inform a language and a text to translate.');
  }

  if (translationLanguage?.length !== 2) {
    log.error('Invalid acronym length.');
  }

  if (!LANGUAGES.includes(translationLanguage)) {
    log.error('No language was found with the given acronym.');
  }

  if (words.length === 0) {
    log.error('No text to translate was given.');
  }

  return [translationLanguage, words];
}

/**
 * @param {string} translationLanguage
 * @param {string[]} words
 * @returns {string}
 */
function urlBuilder(translationLanguage, words) {
  const GOOGLE_TRANSLATOR_QUERY_PARAMS_SPACEBAR = '%20';
  const text = words.join(GOOGLE_TRANSLATOR_QUERY_PARAMS_SPACEBAR);

  return `https://translate.google.com.br/?sl=auto&tl=${translationLanguage}&text=${text}&op=translate`;
}

/**
 * @param {string} url
 * @returns {Promise<string>}
 */
async function translationFetcher(url) {
  let result;
  const start = new Date();

  const browser = await puppeteer
    .launch({ executablePath: BROWSER_PATH })
    .catch((_) =>
      log.error(
        'Unable to open the browser. Verify "BROWSER_PATH" on "constant.js" file.'
      )
    );

  const page = await browser
    .newPage()
    .catch((_) =>
      log.error(
        'Unable to open a new page on the browser. Please, try again later.'
      )
    );

  await page
    .goto(url)
    .catch((_) =>
      log.error(`Unable to open the url "${url}". Please, try again later.`)
    );

  while (!result) {
    if (new Date() - start >= MAX_WAITING_TIME_IN_MS) {
      log.error('Maximum time exceeded. Please, try again later.');
    }

    // it gives error when I try to put '[jsname="W297wb"]' into a constant
    result = await page
      .evaluate(() => document.querySelector('[jsname="W297wb"]')?.innerText)
      .catch((_) =>
        log.error('Unable to get the translation. Please, try again later.')
      );
  }

  await browser
    .close()
    .catch((_) =>
      log.error('Unable to close the browser. Please, try again later.')
    );

  return result;
}

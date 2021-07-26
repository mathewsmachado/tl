# tl

<div align="center">
  <img alt="CLI working" src="https://github.com/MathewsMachado/tl/blob/main/docs/gif.gif" />
</div>

</br>

Being a non-native speaker of English and having to deal with the language every day, especially in coding, I sometimes have to resort to [google translate](https://translate.google.com/). Doing this many times a day makes it a repetitive task and, to reduce the time I spend doing it, I wanted to create a command-line translator.

## Features

- [Translate from any language to multiple languages](##)
- [Customizable](##)

## Getting Started

### Pre-requisites

To make this work, you will need to have [git](https://git-scm.com/) to clone this project, [npm](https://npmjs.com/) to install it, [Node.js](https://nodejs.org/en/) and a browser installed to run this app.

### Downloading the Project

```sh
git clone https://github.com/MathewsMachado/tl; \
cd tl
```

### Setting up the Environment Variables

In order for this to work, you'll have to configure the ["BROWSER_PATH"](##) constant into the ["constants"](##) file before installing it.

### Installation

```sh
yarn; \ # or "npm install"
yarn install:global # or "npm run install:global"
```

## Usage

After installing it globally, you can call it as in:

```sh
tl {{ language to translate }} {{ text to translate }}
```

### Parameters

[{{ language to translate }}](##): The language the text is going to be translated into.

{{ text to translate }}: The text to be translated.

## Examples

```sh
tl pt how to write a good \"README\" file
```

```sh
tl en como escrever um bom \"README\"
```

## Customization

This CLI is customizable and all the customizable options are inside the ["constants"](##) file, the only one you need to modify.

- **BROWSER_PATH**: The path to your browser executable. In Linux, the path is under the "bin" folder.

- **MAX_WAITING_TIME_IN_MS**: The maximum amount of time you want to wait for the translation result. It accepts any integer value.

- **LANGUAGES**: The supported languages are "en", "pt", "es" and "ja".

- **RESULT_COLOR**: The supported colors are "black", "red", "green", "yellow", "blue", "magenta", "cyan" and "white".

## Observations and Technical Informations

As I haven't found a way to make requests to the same endpoint of [google-translator](https://translate.google.com/) and the [API that Google offers](https://cloud.google.com/translate) needs an account, an API key etc, I decided to make the translation through [web-scrapping](https://www.google.com/search?q=web+scraping&gl=us&hl=en&pws=0), so it could be as easy as possible for everyone to use.

To reduce the size of this CLI, as everyone has a browser nowadays, ["puppeteer-core"](https://github.com/puppeteer/puppeteer#puppeteer-core) was chosen instead of ["puppeteer"](https://github.com/puppeteer/puppeteer). [The main difference between the two](https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#puppeteer-vs-puppeteer-core) is that ["puppeteer-core"](https://github.com/puppeteer/puppeteer#puppeteer-core) doesn't come with [chromium](https://www.chromium.org/) — reducing the package size —, making it mandatory for the user to specify their own browser path.

## To-do

1. Increase the number of languages text can be translated into.

## Contribution

This project is accepting contributions, the aim is to clean the [to-do](https://github.com/MathewsMachado/tl/#to-do) list.

Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/MathewsMachado/tl/blob/master/LICENSE) file for details.

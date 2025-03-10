# Sprite Sheet Parser

The app is deployed here: <https://agusmgarcia.github.io/next-spritesheet-parser/>

[![Deploy application](https://github.com/agusmgarcia/next-spritesheet-parser/actions/workflows/deploy-app.yml/badge.svg)](https://github.com/agusmgarcia/next-spritesheet-parser/actions/workflows/deploy-app.yml)

This is a personal web site to show the technologies I have worked for and the technologies I use

## Getting started

Clone the repository in your local machine

```bash
git clone https://github.com/agusmgarcia/spritesheet-parser.git
```

Install dependencies

```bash
cd spritesheet-parser
npm i
```

> Make sure to have exported an environment variable called `NODE_AUTH_TOKEN`. Its value should be your GitHub PAT.

Start the project

```bash
npm start
```

## Deployments

Every time a new tag is created with the pattern **v**_x.x.x_, the code will be built and deployed to the firebase app service automatically.

Create and deploy a new tag using the following commands:

```bash
npm run deploy
```

Some of the technologies used to build this project were:

- [NextJS](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind](https://tailwindcss.com)

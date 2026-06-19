# Jayant Kumar — Portfolio

Personal portfolio website of Jayant Kumar, Software Engineer Trainee specializing in Full-Stack Development, Blockchain, Data Analytics, and Machine Learning.

**Live:** [jayant-portfolio-two.vercel.app](https://jayant-portfolio-two.vercel.app)

## Overview

A server-rendered portfolio built with Express and EJS, featuring sections for About, DSA, Skills, Experience, Projects, Analytics, and Contact, with an animated 3D background on the hero section. Content is managed centrally in `data/portfolio.js` and rendered through `views/index.ejs`.

## Tech Stack

- Node.js, Express, EJS
- Client-side 3D canvas animation
- Deployed on Vercel

## Project Structure

```
├── app.js              # Server entry point
├── data/portfolio.js   # Site content
├── views/index.ejs     # Page template
└── public/              # CSS, JS, images
```

## Getting Started

```bash
git clone https://github.com/withjayant/jayant-portfolio.git
cd jayant-portfolio
npm install
npm run dev      # development (auto-reload)
npm start        # production
```

Runs on `http://localhost:3000` (override with `PORT` env variable).

## Deployment

Deployed on **Vercel**, auto-redeploying on every push to `main`.

To deploy a fork: import the repo at [vercel.com](https://vercel.com), keep default settings, and deploy. (Requires `vercel.json` and an `app.js` that exports the Express app — already configured in this repo.)

## License

MIT

## Author

**Jayant Kumar**

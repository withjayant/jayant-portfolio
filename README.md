# Jayant Kumar — Portfolio

A personal portfolio website built with **Node.js**, **Express**, and **EJS**, showcasing my work, skills, and experience as a Software Engineer.

## 🧠 About This Project

This is a server-rendered portfolio site. Instead of hardcoding content into HTML, all portfolio data (profile info, skills, projects, experience, etc.) lives in a single data file (`data/portfolio.js`) and is passed into an EJS template (`views/index.ejs`) for rendering. This makes the site easy to update — change the data file, and the page updates automatically, no HTML editing required.

**Why this approach:**
- Clean separation between content (data) and presentation (views)
- Easy to maintain and extend with new sections (projects, blog, testimonials, etc.)
- Lightweight — no frontend framework or build step needed
- Fast to deploy on any Node-friendly host

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (≥ 18.0.0) |
| Server | Express 4 |
| Templating | EJS 3 |
| Static assets | Express `static` middleware (`/public`) |
| Dev tooling | Nodemon (auto-restart on changes) |

## 📁 Project Structure

```
jayant-kumar-portfolio/
├── app.js                 # Main server entry point
├── package.json           # Project metadata & dependencies
├── data/
│   └── portfolio.js       # All portfolio content (name, skills, projects, etc.)
├── views/
│   └── index.ejs          # Main EJS template that renders the data
└── public/                 # Static assets
    ├── css/                # Stylesheets
    ├── js/                 # Client-side scripts
    └── images/             # Images, profile photo, project screenshots
```

> **Note:** `data/portfolio.js`, `views/index.ejs`, and the contents of `public/` weren't part of the files shared with me — the structure above reflects how `app.js` references them. Adjust this section if your folder layout differs.

## ⚙️ How It Works

1. `app.js` boots an Express server and sets EJS as the view engine.
2. Static files (CSS, JS, images) are served from the `public/` folder.
3. On the root route (`/`), the server reads structured content from `data/portfolio.js` and renders it through `views/index.ejs`.
4. The rendered HTML page is sent to the browser — a single-page portfolio with all sections (about, skills, projects, contact, etc.) populated from your data file.

## 🚀 Getting Started (Local Development)

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/jayant-kumar-portfolio.git
cd jayant-kumar-portfolio

# Install dependencies
npm install
```

### Run in development mode (auto-restarts on file changes)

```bash
npm run dev
```

### Run in production mode

```bash
npm start
```

The app will be available at:
```
http://localhost:3000
```

You can change the port by setting the `PORT` environment variable:

```bash
PORT=4000 npm start
```

## 🌐 Deployment

Below are a few solid, beginner-friendly options for deploying a Node/Express app like this one. Pick whichever fits your needs best.

### Option 1: Render (recommended — free tier, very simple)

1. Push your project to a GitHub repository.
2. Go to [render.com](https://render.com) and sign in with GitHub.
3. Click **New → Web Service**, then select your repo.
4. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
5. Render automatically sets a `PORT` environment variable — your app already reads `process.env.PORT`, so no code changes are needed.
6. Click **Create Web Service**. Render will build and deploy automatically on every push to your main branch.

### Option 2: Railway

1. Push your project to GitHub.
2. Go to [railway.app](https://railway.app) → **New Project → Deploy from GitHub repo**.
3. Railway auto-detects Node.js, runs `npm install`, and uses `npm start` to launch the app.
4. Railway provides a public URL automatically once deployed.

### Option 3: Vercel (with a small adjustment)

Vercel works best with serverless functions rather than a long-running Express server. To deploy there:
1. Add a `vercel.json` file routing all requests to `app.js`.
2. Export the Express `app` instead of calling `app.listen()` directly when running on Vercel (you can conditionally call `.listen()` only when not in a serverless environment).
This requires a bit more setup, so Render or Railway are simpler choices if you want to avoid code changes.

### Option 4: A VPS (DigitalOcean, AWS EC2, Linode, etc.)

1. SSH into your server and install Node.js (v18+) and npm.
2. Clone your repository and run `npm install`.
3. Use a process manager like **PM2** to keep the app running:
   ```bash
   npm install -g pm2
   pm2 start app.js --name portfolio
   pm2 save
   pm2 startup
   ```
4. Set up **Nginx** as a reverse proxy to forward port 80/443 traffic to your app's port (default 3000).
5. Optionally add a free SSL certificate with **Certbot** for HTTPS.

### Option 5: Heroku

1. Install the Heroku CLI and log in: `heroku login`
2. From your project folder:
   ```bash
   heroku create your-app-name
   git push heroku main
   ```
3. Heroku automatically detects Node.js, installs dependencies, and runs `npm start`.
4. Heroku also sets `PORT` automatically, which your app already supports.

## 📝 Environment Variables

| Variable | Description | Default |
|---|---|---|
| `PORT` | Port the server listens on | `3000` |

## 📄 License

This project is licensed under the **MIT License** — see the `package.json` for details.

## 👤 Author

**Jayant Kumar** — Software Engineer

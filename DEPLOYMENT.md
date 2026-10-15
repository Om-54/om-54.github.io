# Publishing & Continuous Deployment Guide
**Omprakash Rahangdale — Social Media Strategist Portfolio**

This guide provides step-by-step instructions on how to publish your portfolio online for free, and how to make future updates that automatically deploy to your live website.

---

## OPTION 1: GitHub Pages (Recommended — 100% Free Forever)

Your project is already initialized with a local Git repository and a clean production commit on the `main` branch.

### Step 1: Create a New Repository on GitHub
1. Go to [github.com/new](https://github.com/new) in your browser.
2. Sign in to your account (`Om-54`).
3. Set **Repository name**:
   - **For direct domain `https://om-54.github.io`**: Name the repository exactly **`om-54.github.io`**.
   - **Or for a subpath `https://om-54.github.io/portfolio`**: Name the repository **`portfolio`**.
4. Set visibility to **Public**.
5. Leave "Add a README file", ".gitignore", and license **UNCHECKED** (we already created them locally).
6. Click **Create repository**.

### Step 2: Push Your Portfolio from Terminal
Open your terminal inside this folder (`/Users/omprakash/Downloads/Placement Acts/Portpholio for Social media Strategist`) and run:

```bash
# If you named the repository om-54.github.io:
git remote add origin https://github.com/Om-54/om-54.github.io.git
git push -u origin main

# OR if you named it portfolio:
git remote add origin https://github.com/Om-54/portfolio.git
git push -u origin main
```

*(If prompted, sign in with your GitHub Personal Access Token or GitHub CLI `gh auth login`.)*

### Step 3: Enable GitHub Pages (If not using username.github.io)
If you named your repo `portfolio`:
1. On GitHub, go to your repository **Settings** → **Pages** (in the left sidebar).
2. Under **Build and deployment** > **Branch**:
   - Select **`main`** branch and **`/ (root)`** folder.
3. Click **Save**.
4. Your website will be live in ~60 seconds at:
   👉 **`https://om-54.github.io/portfolio/`**

---

## HOW TO MAKE CHANGES & AUTOMATICALLY UPDATE THE LIVE SITE

Whenever you want to add a new project, update your resume, change text, or add new videos:

1. **Make your changes** in `index.html`, `css/style.css`, or drop new files in `assets/`.
2. **Open Terminal** in this folder and run these 3 simple commands:
   ```bash
   git add .
   git commit -m "Update portfolio: added new project"
   git push
   ```
3. **Done!** GitHub automatically detects the new commit and updates your live website in ~30 seconds. You never have to manually re-upload files or configure hosting again!

---

## OPTION 2: Vercel (Instant Deploy with Custom Domain & Analytics)

If you prefer Vercel:
1. Go to [vercel.com](https://vercel.com) and click **Sign Up / Log In with GitHub**.
2. Click **Add New...** → **Project**.
3. Import your GitHub repository (`Om-54/om-54.github.io` or `Om-54/portfolio`).
4. Keep the default settings and click **Deploy**.
5. Your portfolio is live with a free `.vercel.app` URL and automatic HTTPS.
6. Every time you run `git push`, Vercel deploys your changes automatically.

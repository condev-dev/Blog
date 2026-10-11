# 📝 Bibag — Persian Programming Blog

**Bibag** – A complete, fully responsive Persian blog about front-end, web3, databases and AI tooling, built with **HTML, CSS and vanilla JavaScript**.
Designed with **a token-based design system, hand-drawn SVG icons, real RTL typography and a full technical SEO layer** — no framework, no build step.

> ⚡ **Portfolio-Level Project** – Showcasing senior front-end work in **RTL design systems, component architecture, responsive layout and technical SEO**.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Site-a84f00?style=for-the-badge&logo=vercel&logoColor=white)](https://blog.condev.ir/)

---

## 🛠 Tech Stack

![HTML5](https://img.shields.io/badge/HTML5-%23E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-%231572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JS-%23F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Design Tokens](https://img.shields.io/badge/Design_Tokens-oklch-a84f00?style=for-the-badge)
![RTL](https://img.shields.io/badge/RTL-%2300AEEF?style=for-the-badge)
![Responsive](https://img.shields.io/badge/Responsive-%2300AEEF?style=for-the-badge)
![SEO](https://img.shields.io/badge/SEO_Ready-2ea44f?style=for-the-badge)
![No Build Step](https://img.shields.io/badge/No_Build_Step-181717?style=for-the-badge)

---

## ✨ Key Features

- 🏠 **Home** – Hero with live search and shortcut chips, article counts, featured article of the week, category grid, latest articles and suggested learning paths
- 🔎 **Instant Search** – Typing filters the article list as you type and shows a friendly empty state when nothing matches
- 📄 **Article Page** – Table of contents, sticky sidebar, code blocks that scroll on their own and a related-articles rail
- 🗂 **Categories & Archive** – Eight category tiles plus an archive page with post cards, tags and an empty state
- ✉️ **Newsletter Card** – Client-side email validation, an error state on the field itself and a toast confirmation
- 🧩 **Shared Component Layer** – Buttons, chips, fields, badges, toasts and section rhythm live once in `components.css`, so every page renders them identically
- 🎨 **Design Tokens** – oklch colour palette, fluid type scale and spacing scale defined once in `:root`
- 🔤 **Persian First** – Full RTL layout with Vazirmatn for text, Lalezar for headings and Source Code Pro for code
- 🖼 **Inline SVG Sprite** – 36 hand-drawn icons embedded in every page: no icon font, no extra request, no flash of missing icons
- 📱 **Fully Responsive** – Verified zero horizontal overflow on all seven pages, down to a 390px viewport
- 🔍 **Technical SEO** – Canonical URLs, Open Graph and Twitter cards with a 1200×630 cover, JSON-LD, `sitemap.xml`, `robots.txt` and a complete icon set
- ⚡ **No Build Step** – Self-hosted fonts and icons, plain files served straight from the repository

---

## 📸 Visual Preview

<div align="center">

### 🏠 Home

*Hero with live search, article counts, featured article and the latest posts.*

![Home](https://raw.githubusercontent.com/condev-dev/Blog/main/assets/img/Home-Demo.png)

---

### 📄 Article

*Table of contents, readable measure, code blocks and related articles.*

![Article](https://raw.githubusercontent.com/condev-dev/Blog/main/assets/img/Blog-Demo.png)

---

### 🗂 Categories

*Eight category tiles and a "where to start" path for new readers.*

![Categories](https://raw.githubusercontent.com/condev-dev/Blog/main/assets/img/Categories-Demo.png)

---

### 🔖 Single Category

*Archive view for one topic, with post cards and a custom CTA.*

![Category](https://raw.githubusercontent.com/condev-dev/Blog/main/assets/img/Category-Demo.png)

---

### 👤 About

*The story behind the blog, with a FAQ block.*

![About](https://raw.githubusercontent.com/condev-dev/Blog/main/assets/img/AboutUs-Demo.png)

---

### ✉️ Contact

*A working contact form next to the social links.*

![Contact](https://raw.githubusercontent.com/condev-dev/Blog/main/assets/img/ContactUs-Demo.png)

---

### ⚠ 404

*Custom not-found page with quick links back into the archive.*

![404](https://raw.githubusercontent.com/condev-dev/Blog/main/assets/img/404-Demo.png)

---

### ✉️ Newsletter Card

*The subscribe card used across the site — validation, error state and toast feedback.*

![Newsletter](https://raw.githubusercontent.com/condev-dev/Blog/main/assets/img/Newsletter-Demo.png)

---

### 📱 Mobile

*The same pages down to a 390px viewport: off-canvas navigation and stacked cards.*

<img src="https://raw.githubusercontent.com/condev-dev/Blog/main/assets/img/Mobile-Demo.png" width="320" alt="Mobile home">
<img src="https://raw.githubusercontent.com/condev-dev/Blog/main/assets/img/Mobile-Post-Demo.png" width="320" alt="Mobile article">

---

### 🔗 Live Demo

**[blog.condev.ir](https://blog.condev.ir/)**

</div>

---

## 🗂 Pages

| Page | What it does |
| --- | --- |
| `index.html` | Home: hero search, featured article, categories, latest articles, suggested paths |
| `categories.html` | All categories, "where to start" and the full article list |
| `category.html` | Archive for a single category with post cards |
| `Blog.html` | Single article: table of contents, prose content, code blocks, related posts |
| `aboutUs.html` | The story behind the blog plus a FAQ block |
| `contactUs.html` | Contact form, social links and the newsletter card |
| `404Page.html` | Custom not-found page with quick links |

## 🧩 Project Structure

| Path | Description |
| --- | --- |
| `assets/css/base.css` | Design tokens, reset, typography and layout primitives |
| `assets/css/components.css` | Shared components: buttons, chips, fields, badges, toasts, sections, newsletter |
| `assets/css/header.css` | Masthead, navigation drawer and search button |
| `assets/css/footer.css` | Footer layout and social row |
| `assets/css/all.css` | Loads base, header, footer and components into every page |
| `assets/css/*.css` | One page stylesheet per page (home, article, categories, …) |
| `assets/js/header.js` | Navigation drawer, toast system, header behaviour |
| `assets/js/*.js` | One page script per page: search, filters, validation, reveal animations |
| `assets/icon/icons.svg` | The 36-icon sprite that gets inlined into every page |
| `assets/img` | Article artwork, social images and the readme screenshots |
| `robots.txt` · `sitemap.xml` · `site.webmanifest` | Crawling, indexing and install metadata |
| `favicon.ico` · `favicon.svg` · `*-icon.png` | The icon set used by browsers, iOS and Google |

---

## ⚙️ How It Works

1. **Tokens first** – colours, radii, spacing and the fluid type scale live in `:root` inside `base.css`
2. **Components second** – `components.css` styles the shared pieces once and `all.css` pulls it into every page
3. **Page styles last** – each page loads its own stylesheet, so a page only carries what is unique to it
4. **Scripts stay tiny** – `header.js` owns the drawer and the toast system, then each page script handles its own search, filters and validation
5. **Icons are inline** – the sprite is embedded in the markup, so icons paint with the first frame and work offline

---

## 🚀 Setup

```bash
git clone https://github.com/condev-dev/Blog.git
cd Blog
# then simply open index.html in a browser
```

No install, no build, no dependencies. The pages also work straight from the file system.

---

## 📄 License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

**© ConDev** – All rights reserved.

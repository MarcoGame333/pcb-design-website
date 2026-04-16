# CircuitCraft PCB Design Website

A static single-page marketing website for **CircuitCraft PCB Design Services**.

## Project Structure

```
pcb-design-website/
├── index.html        # Semantic HTML — SEO meta tags, Open Graph, JSON-LD structured data
├── css/
│   └── style.css     # All styles — CSS custom properties, responsive layout, accessibility
├── js/
│   └── main.js       # Interactivity — mobile menu, scroll effects, quote calculator, form handling
└── README.md
```

## Features

- **Responsive design** — mobile-first layout with animated hamburger navigation
- **SEO optimised** — meta description, Open Graph tags, Twitter Card, JSON-LD structured data
- **Accessible** — skip-to-content link, labelled form controls, ARIA attributes, visible focus rings, alt text on all images
- **Trust signals** — stats strip, testimonials section, process timeline, tech-stack badges
- **Contact form** — powered by [Formspree](https://formspree.io) with async JS submission and inline feedback
- **Quote calculator** — ballpark pricing with layer count, complexity, and urgency inputs; outputs a cost range
- **Performance** — `loading="lazy"` on portfolio images, `preconnect` for the image CDN, `clamp()` fluid font sizes

## Local Development

No build step required — open `index.html` directly in a browser:

```bash
# Option A — open directly
open index.html

# Option B — local dev server (recommended; avoids any CORS quirks)
npx serve .
# or
python3 -m http.server 8080
```

## Deployment

Drop the three files (`index.html`, `css/style.css`, `js/main.js`) into any static host:

| Platform          | How to deploy                                                          |
|-------------------|------------------------------------------------------------------------|
| GitHub Pages      | Push to `main`, enable Pages in **Settings → Pages**                  |
| Netlify           | Drag-and-drop the folder at app.netlify.com                            |
| Vercel            | `vercel --prod` in the project directory                               |
| Cloudflare Pages  | Connect GitHub repo; build command: *(none)*, output directory: `/`   |

## Contact Form Setup

The form submits to [Formspree](https://formspree.io). To use your own endpoint:

1. Sign up at formspree.io and create a new form.
2. Replace the `action` URL in the `<form>` tag inside `index.html`:

```html
<form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" ...>
```

## Customisation

All colours are defined as CSS custom properties at the top of `css/style.css`:

```css
:root {
    --primary:      #00ff88;   /* accent / CTA green   */
    --primary-dark: #00cc6a;   /* hover state          */
    --dark:         #121212;   /* page background      */
    --gray:         #1e1e1e;   /* alternate sections   */
    --text:         #ffffff;
    --text-muted:   #a0a0a0;
}
```

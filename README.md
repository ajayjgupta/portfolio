# Ajay Gupta Portfolio

A responsive, accessible, and interactive personal portfolio website built with HTML, CSS, and JavaScript.

This portfolio represents Ajay Gupta, Vice President in the Software Engineering Division at Kotak Mahindra Bank.

## Live Overview
This project presents:
- A professional hero section and navigation
- About section tailored to engineering leadership in banking
- Projects section highlighting digital transformation and platform reliability initiatives
- Skills section focused on leadership, architecture, and delivery excellence
- Contact form with real-time validation feedback
- Resume integration with direct in-page access (`Ajay_Gupta_Resume.pdf`)

## Tech Stack
- HTML5
- CSS3
- JavaScript (Vanilla)

## Features
- Responsive layout for desktop, tablet, and mobile
- Mobile navigation with hamburger menu toggle
- Smooth scrolling between page sections
- Active navigation link highlighting based on scroll position
- Project filtering by category (`all`, `web`, `analytics`)
- Lightbox modal for project image preview
- Contact form validation:
  - Required field checks
  - Email format validation
  - Message length validation
  - Inline error messaging and status feedback
- Dynamic footer year update
- Accessibility-focused labels, ARIA attributes, and keyboard support

## Project Structure

```text
Portfolio/
|- index.html
|- styles.css
|- script.js
|- Ajay_Gupta_Resume.pdf
|- project1.svg
|- project2.svg
|- README.md
```

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/ajayjgupta/portfolio.git
cd portfolio
```

### 2. Run locally
Since this is a static site, you can open `index.html` directly in a browser.

Optional (recommended): run a local server for best behavior:
```bash
python3 -m http.server 8000
```
Then open: `http://localhost:8000`

## Customization Guide

### Personal details
Update the following in `index.html`:
- Name and title in header
- About Me text
- Project titles/descriptions
- Contact details (if added)

### Resume
The portfolio links to:
- `Ajay_Gupta_Resume.pdf`

To replace with a newer version, keep the same filename or update the links in `index.html`.

### Projects
In `index.html`, each project card uses:
- `data-category` for filtering
- `.lightbox-trigger` image for modal preview

Example:
```html
<article class="project-card" data-category="web">
```

### Styling
Modify `styles.css`:
- Colors and design tokens in `:root`
- Typography (`--font-heading`, `--font-body`)
- Layout spacing, shadows, and section/card styles

### Interactivity
Update behavior in `script.js`:
- `toggleMenu()` for mobile menu
- `filterProjects(category)` for project filters
- Lightbox open/close logic
- Form validation rules in `validateField(field)`

## Accessibility Notes
- Semantic sectioning (`header`, `main`, `section`, `footer`)
- Form labels correctly associated with inputs
- Keyboard support for menu toggle and lightbox image triggers
- ARIA attributes for nav toggle, modal, and live validation messages

## Browser Compatibility
The site is tested with standards-compliant modern browsers and includes compatibility-conscious CSS (including selected vendor-prefixed properties).

Recommended checks before production:
- Chrome
- Firefox
- Edge
- Safari

## Deployment
You can deploy this static portfolio using:
- GitHub Pages
- Netlify
- Vercel (static deployment)

### GitHub Pages quick steps
1. Push your latest code to `main`/`master`.
2. In GitHub repo settings, open **Pages**.
3. Set source to your default branch and root folder.
4. Save and use the published URL.

## Future Improvements
- Add anonymized case studies with measurable outcomes
- Add resume download button and LinkedIn profile link
- Add leadership philosophy and engineering principles section
- Integrate backend/email service for contact form submissions

## Author
Ajay Gupta

# Portfolio Website

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://rivka14.github.io/portfolio/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A responsive portfolio website showcasing software development projects, technical skills, and professional experience. Built with vanilla HTML, CSS, and JavaScript for optimal performance and maintainability.

## Live Demo

Visit the live site: [https://rivka14.github.io/portfolio/](https://rivka14.github.io/portfolio/)

## Key Features

- **Responsive Design** - Mobile-first approach supporting all device sizes
- **Theme Toggle** - Dark/light mode with localStorage persistence
- **GitHub API Integration** - Dynamic project data and contribution statistics
- **Performance Optimized** - GPU-accelerated animations, minimal dependencies
- **Accessible** - Semantic HTML5 markup and WCAG compliance
- **Modern UI/UX** - Interactive animations and smooth transitions

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **APIs**: GitHub REST API
- **Deployment**: GitHub Pages
- **Performance**: Intersection Observer API, CSS GPU acceleration

## Quick Start

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/rivka14/portfolio.git
cd portfolio

# Open with a local server (recommended)
python3 -m http.server 8000
# OR
npx serve

# Visit http://localhost:8000
```

Alternatively, open `index.html` directly in your browser.

## Project Structure

```
portfolio/
├── index.html          # Main HTML structure
├── style.css           # Styles and animations
├── script.js           # Interactive features and GitHub API integration
└── README.md           # Documentation
```

## Configuration

### Personalizing Content

Update the following files to customize:

- **index.html** - Personal information, projects, and skills
- **script.js** - GitHub username (line 130)
- **style.css** - Color scheme using CSS custom properties

### Theme Customization

Modify CSS variables in `style.css`:

```css
:root {
    --bg-primary: #ffffff;
    --text-primary: #1a1a2e;
    --accent-primary: #4361ee;
}

[data-theme="dark"] {
    --bg-primary: #0f0f1a;
    --text-primary: #e8e8e8;
    --accent-primary: #4cc9f0;
}
```

## Performance

Performance optimizations include:

- GPU-accelerated animations using CSS transforms
- Intersection Observer for efficient scroll animations
- Minimal external dependencies
- Optimized asset loading
- Single-page architecture

## Browser Compatibility

Tested and supported on:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

### GitHub Pages

```bash
# Push to main branch
git push origin main

# Enable GitHub Pages in repository settings
# Site will be available at https://rivka14.github.io/portfolio/
```

### Other Platforms

Compatible with Netlify, Vercel, and other static hosting services. No build process required.

## Known Limitations

- GitHub API rate limit: 60 requests/hour (unauthenticated)
- Consider implementing caching or authentication for production use

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contact

**Rivka Weiss**

- Email: rivka.weiss9@gmail.com
- GitHub: [@rivka14](https://github.com/rivka14)
- LinkedIn: [rivka-weiss](https://www.linkedin.com/in/rivka-weiss)

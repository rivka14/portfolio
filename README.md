# Rivka Weiss - Portfolio Website

A modern, responsive portfolio website showcasing my software development projects, skills, and experience. Built with clean HTML, CSS, and JavaScript for optimal performance.

## Features

### Design & User Experience
- **Clean, Modern Design** - Professional and minimalist interface
- **Dark/Light Theme Toggle** - Seamless theme switching with localStorage persistence
- **Fully Responsive** - Optimized for mobile, tablet, and desktop devices
- **Smooth Animations** - GPU-accelerated animations for buttery-smooth performance
- **Interactive Background** - Animated particles floating in the hero section

### Sections

#### 🏠 Hero Section
- Eye-catching introduction with animated background
- Gradient text effects
- Social links (GitHub, LinkedIn, Email)
- Call-to-action buttons

#### 👨‍💻 About Section
- Professional summary
- Work experience at AppsFlyer
- Education and certifications
- Skills organized by category:
  - Programming Languages
  - Frontend Technologies
  - Backend Technologies
  - Databases
  - DevOps & Tools
  - AI Development Tools

#### 🚀 Projects Section
- **Featured Projects** - 4 curated flagship projects:
  - RAG Agent (AI/Python/GCP)
  - Recipe Sharing Website (Full-stack MERN)
  - Inventory Management System (C#/.NET)
  - ADK Drive Agent (AI/Google Workspace)
- **Most Active Repository** - Dynamically fetched from GitHub
- **Open Source Contributions** - Repos I've contributed to

#### 📧 Contact Section
- Contact form with validation
- Direct contact information
- Social links

### Technical Features
- **GitHub API Integration** - Real-time repository data
- **GPU Acceleration** - Hardware-accelerated animations using `will-change` and `translateZ(0)`
- **Intersection Observer** - Efficient scroll-based animations
- **Theme Persistence** - User preference saved in localStorage
- **Optimized Performance** - Minimal dependencies, fast load times
- **Semantic HTML5** - Accessible and SEO-friendly markup

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties, flexbox, and grid
- **Vanilla JavaScript** - No frameworks, pure performance
- **GitHub API** - Dynamic content fetching
- **Google Fonts** - Poppins font family

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Optional: A local web server for development

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rivka14/protfolio.git
cd protfolio
```

2. Open in browser:
   - **Option 1**: Simply open `index.html` in your browser
   - **Option 2**: Use a local server (recommended):
   ```bash
   # Using Python
   python3 -m http.server 8000

   # Using Node.js
   npx serve

   # Using PHP
   php -S localhost:8000
   ```

3. Navigate to `http://localhost:8000` (if using a server)

## Project Structure

```
protfolio/
├── index.html          # Main HTML file
├── style.css           # All styles and animations
├── script.js           # Interactive features and API calls
└── README.md           # This file
```

## Customization

### Changing Colors
Edit the CSS variables in `style.css`:

```css
:root {
    --bg-primary: #ffffff;
    --text-primary: #1a1a2e;
    --accent-primary: #4361ee;
    /* ... more variables */
}

[data-theme="dark"] {
    --bg-primary: #0f0f1a;
    --text-primary: #e8e8e8;
    --accent-primary: #4cc9f0;
    /* ... more variables */
}
```

### Updating Content
1. **Personal Information**: Edit the HTML in `index.html`
2. **Projects**: Update the featured projects section in `index.html`
3. **Skills**: Modify the skills tags in the About section
4. **GitHub Username**: Change `rivka14` to your username in `script.js`

### Animation Speed
Adjust animation durations in `style.css` and `script.js`:
- Gradient rotation: `gradientShift` animation (currently 6s)
- Floating orb: `float` animation (currently 9s)
- Particles: Duration in `script.js` (currently 3-6s)

## Performance Optimization

This portfolio is optimized for performance:

- **GPU Acceleration**: All animations use `transform` and `opacity` for hardware acceleration
- **Reduced Particles**: Limited to 15 initial particles for optimal performance
- **Efficient Animations**: CSS animations instead of JavaScript where possible
- **No Heavy Dependencies**: Pure vanilla JavaScript, no frameworks
- **Lazy Loading**: Images and content load efficiently
- **Minimal HTTP Requests**: Single-file architecture reduces network overhead

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

### GitHub Pages
1. Push to GitHub
2. Go to repository Settings
3. Navigate to Pages
4. Select main branch as source
5. Your site will be live at `https://rivka14.github.io/protfolio/`

### Netlify
1. Connect your GitHub repository
2. Build command: (none needed)
3. Publish directory: `/`
4. Deploy!

### Vercel
```bash
vercel
```

## API Rate Limits

The GitHub API has rate limits:
- **Unauthenticated**: 60 requests per hour
- **Authenticated**: 5,000 requests per hour

For production, consider implementing:
- GitHub token authentication
- Caching API responses
- Fallback for rate limit errors

## Contributing

This is a personal portfolio, but feel free to:
- Fork for your own use
- Submit bug reports
- Suggest improvements

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

**Rivka Weiss**
- Email: rivka.weiss9@gmail.com
- GitHub: [@rivka14](https://github.com/rivka14)
- LinkedIn: [rivka-weiss](https://www.linkedin.com/in/rivka-weiss)

## Acknowledgments

- Built with ❤️ using vanilla HTML, CSS, and JavaScript
- Animated particles inspired by modern web design trends
- Theme toggle pattern from various open-source projects
- GitHub API for dynamic content

---

**Last Updated**: January 2026

Made with 🚀 by Rivka Weiss

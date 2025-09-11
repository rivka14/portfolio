# Portfolio

A modern single-page portfolio website built with Next.js, TypeScript, Tailwind CSS, and styled-components.

## Features

- 🎨 Modern and clean design
- 📱 Fully responsive layout
- ⚡ Built with Next.js 15 and TypeScript
- 🎯 Smooth scrolling navigation
- 🌙 Dark/light mode ready styling
- ✨ Animated skill progress bars
- 📧 Contact form integration
- 🚀 Optimized for performance
- 💅 Styled-components integration

## Sections

- **Hero** - Introduction with call-to-action buttons
- **About** - Personal introduction and key traits
- **Skills** - Technical skills with progress indicators
- **Projects** - Featured project showcase
- **Experience** - Professional timeline
- **Contact** - Multiple contact methods and CTA

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS + styled-components
- **Deployment:** Vercel-ready

## Styling Options

This project supports both styling approaches:

### Tailwind CSS (default)
Most components use Tailwind CSS for utility-first styling:
```tsx
<div className="bg-blue-500 text-white p-4 rounded-lg">
  Content
</div>
```

### styled-components
For component-scoped styling with a theme system:
```tsx
import styled from 'styled-components';

const StyledDiv = styled.div`
  background-color: ${props => props.theme.colors.primary.blue};
  color: ${props => props.theme.colors.text.white};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.lg};
`;
```

The `HeroStyled` component demonstrates styled-components usage with:
- Theme-based design tokens
- Responsive breakpoints
- CSS-in-JS animations
- TypeScript integration

## Customization

Update the content in the component files:
- `src/components/Hero.tsx` - Tailwind CSS version (original)
- `src/components/HeroStyled.tsx` - styled-components version (example)
- `src/components/About.tsx` - About section content
- `src/components/Skills.tsx` - Skills and proficiency levels
- `src/components/Projects.tsx` - Project showcase
- `src/components/Experience.tsx` - Work experience timeline
- `src/components/Contact.tsx` - Contact information

### Theme Customization
Modify the theme in `src/lib/theme.ts` to customize colors, spacing, typography, and breakpoints for styled-components.

Built with ❤️ using Next.js, Tailwind CSS, and styled-components.
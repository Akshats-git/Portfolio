# Modern Portfolio Website

A clean, classy, and modern portfolio website built with Next.js, Tailwind CSS, Shadcn UI, and Framer Motion.

## 🎨 Features

- **Modern Design**: Clean and minimalist design with smooth animations
- **Responsive**: Fully responsive layout that works on all devices
- **Dark Mode**: Beautiful dark theme with gradient accents
- **Smooth Animations**: Framer Motion animations throughout
- **Fast Performance**: Optimized with Next.js for maximum speed
- **SEO Friendly**: Built with best practices for search engine optimization

## 📦 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Font**: [Inter](https://fonts.google.com/specimen/Inter)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📂 Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/
│   ├── Navbar.tsx       # Navigation bar
│   ├── Hero.tsx         # Hero section
│   ├── About.tsx        # About section
│   ├── Projects.tsx     # Projects showcase
│   ├── Skills.tsx       # Skills section
│   ├── Contact.tsx      # Contact form
│   └── Footer.tsx       # Footer
```

## 🎯 Sections

### Navbar
- Fixed navigation with smooth scroll links
- Mobile-responsive hamburger menu
- Animated brand logo

### Hero
- Eye-catching introduction
- Call-to-action buttons
- Floating code snippet
- Scroll indicator animation

### About
- Introduction and biography
- Key statistics with animations
- Core competencies list

### Projects
- 6 featured projects showcase
- Hover effects and animations
- Technology tags
- Project links

### Skills
- 4 skill categories
- Proficiency bars with animations
- Interactive skill tags

### Contact
- Contact form with validation
- Multiple contact methods (email, phone, location)
- Success feedback
- Fully functional form

### Footer
- Quick navigation links
- Social media links
- Copyright information
- Built with information

## 🎨 Customization

### Update Your Information
Edit the following files to personalize the portfolio:

1. **[src/app/layout.tsx](src/app/layout.tsx)** - Update metadata (title, description)
2. **[src/components/Navbar.tsx](src/components/Navbar.tsx)** - Update navigation items
3. **[src/components/Hero.tsx](src/components/Hero.tsx)** - Update hero content
4. **[src/components/About.tsx](src/components/About.tsx)** - Update bio and stats
5. **[src/components/Projects.tsx](src/components/Projects.tsx)** - Update project information
6. **[src/components/Skills.tsx](src/components/Skills.tsx)** - Update skills list
7. **[src/components/Contact.tsx](src/components/Contact.tsx)** - Update contact form
8. **[src/components/Footer.tsx](src/components/Footer.tsx)** - Update social links

### Customize Colors
Edit [tailwind.config.ts](tailwind.config.ts) to customize the color scheme.

### Add New Sections
Create new components in `src/components/` and import them in [src/app/page.tsx](src/app/page.tsx).

## 🌐 Deployment

### Deploy on Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Deploy with one click

### Other Options
- Netlify
- GitHub Pages
- AWS Amplify
- Firebase Hosting

## 🔧 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📧 Contact

For any questions or feedback, please reach out to contact@example.com

---

Made with ♥ using Next.js, Tailwind CSS, and Framer Motion

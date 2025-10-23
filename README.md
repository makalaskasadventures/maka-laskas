# Maka-Laskas Adventures Website

A modern, responsive travel website for Maka-Laskas Adventures, showcasing transformative travel experiences across East Africa. Built with Next.js, TypeScript, and Tailwind CSS.

## 🌍 About

Maka-Laskas Adventures is a travel company specializing in Ubuntu-inspired adventures across East Africa. Our tagline "I Am Because You Are, Together We Explore" reflects our philosophy of interconnectedness and community-focused travel.

### Featured Destinations
- **Uganda** - Gorilla trekking and pristine lakes
- **Tanzania** - Serengeti migration and Mount Kilimanjaro
- **Rwanda** - Volcanoes and cultural heritage
- **Kenya** - Maasai Mara safaris and beaches
- **Burundi** - Coffee culture and traditions
- **DRC** - Rainforests and mighty rivers

## 🚀 Features

### Homepage Components
- **Hero Carousel** - Timed card-opening carousel with Framer Motion animations
- **About Section** - Company introduction with Ubuntu philosophy
- **Featured Adventures** - Showcase of signature travel experiences
- **Testimonials** - Customer reviews and ratings
- **Responsive Design** - Optimized for desktop, tablet, and mobile

### Technical Features
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **Responsive Design** with mobile-first approach

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd maka-laskas
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── HeroCarousel.tsx    # Hero section with country carousel
│   ├── AboutSection.tsx    # Company introduction
│   ├── FeaturedAdventures.tsx # Adventure showcase
│   ├── Testimonials.tsx    # Customer reviews
│   └── Footer.tsx          # Site footer
```

## 🎨 Design System

### Colors
- **Primary**: Orange (#ea580c) - Warm, inviting, represents adventure
- **Secondary**: Gray scale for text and backgrounds
- **Accent**: Gradient from orange to red for highlights

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, large scale
- **Body**: Clean, readable text

### Components
- **Buttons**: Primary (orange) and Secondary (outline) styles
- **Cards**: Rounded corners, shadows, hover effects
- **Animations**: Smooth transitions and Framer Motion effects

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 🔧 Customization

### Adding New Countries
Edit the `countries` array in `HeroCarousel.tsx`:
```typescript
const countries: Country[] = [
  {
    id: 7,
    name: 'New Country',
    description: 'Description here',
    image: 'image-url',
    highlights: ['Highlight 1', 'Highlight 2']
  }
];
```

### Adding New Adventures
Edit the `adventures` array in `FeaturedAdventures.tsx`:
```typescript
const adventures: Adventure[] = [
  {
    id: 5,
    title: 'New Adventure',
    description: 'Description here',
    image: 'image-url',
    duration: 'X Days',
    groupSize: 'Max X',
    price: '$X,XXX',
    rating: 4.X,
    location: 'Location',
    category: 'Category'
  }
];
```

## 📄 Pages Structure (Planned)

Based on the website structure document, the following pages are planned:

1. **Home** ✅ - Current implementation
2. **About Us** - Company story and philosophy
3. **Mission, Vision & Values** - Core principles
4. **Our Commitments** - Sustainability and ethics
5. **Our Adventures** - All travel experiences
6. **Global Partnerships** - Partnership opportunities
7. **Governance & Ethics** - Policies and compliance
8. **Impact** - Social and environmental impact
9. **Media & Insights** - Blog and news
10. **Join the Movement** - Careers and volunteering
11. **Contact Us** - Contact information and forms

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Contact

For questions about the website or Maka-Laskas Adventures:
- **Company**: Maka-Laskas Adventures Company Ltd
- **Location**: Uganda (Headquarters)
- **Tagline**: "I Am Because You Are, Together We Explore"

## 📄 License

This project is proprietary to Maka-Laskas Adventures Company Ltd.

---

Built with ❤️ for transformative travel experiences across East Africa.

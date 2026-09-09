# Siyamthanda Mafuta — Personal Portfolio & Engineering Showcase

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Online-brightgreen?style=for-the-badge&logo=google-chrome)](https://ais-pre-2bwr6mjpsf7abi2kfwcsi5-724108554600.europe-west2.run.app)
[![GitHub](https://img.shields.io/badge/GitHub-Siyamthanda101-181717?style=for-the-badge&logo=github)](https://github.com/Siyamthanda101)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Siyamthanda%20Mafuta-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/siyamthanda-mafuta-0454b51ba/)
[![CV Download](https://img.shields.io/badge/Curriculum%20Vitae-PDF%20Available-blue?style=for-the-badge&logo=adobe-acrobat-reader)](https://ais-pre-2bwr6mjpsf7abi2kfwcsi5-724108554600.europe-west2.run.app/documents/Siyamthanda_Mafuta_CV.pdf)

> **Computer Engineering Graduate | Software, Networks & Intelligent Systems**  
> Cape Town, Western Cape, South Africa • [mafuta.s101@gmail.com](mailto:mafuta.s101@gmail.com) • [GitHub: @Siyamthanda101](https://github.com/Siyamthanda101)

A responsive, accessible personal portfolio website built with **React**, **TypeScript**, **Tailwind CSS**, and **Vite**. Showcases hands-on academic research, collaborative software projects completed during the **CAPACITI Demand Academy**, industry-recognized AI/ML certifications, and a verified 2-page Curriculum Vitae.

---

## 🌟 Key Highlights & Included Sections

1. **Professional Identity & About Me**:
   - Academic background: BEng Tech in Computer Engineering (Currently completing) & Diploma in Computer Engineering from Cape Peninsula University of Technology (CPUT).
   - Core specializations across software engineering, networks, databases, embedded systems, and artificial intelligence.

2. **CAPACITI Demand Academy Journey**:
   - Timeline and highlights of intensive technology training covering AI fundamentals, generative AI, Python for data science, prompt engineering, and collaborative software delivery.

3. **Featured Projects Showcase**:
   - Detailed project cards with category badges, role declarations, tech stack tags, interactive modals, GitHub repositories, and live demo links.

4. **Curriculum Vitae (CV)**:
   - Interactive on-page structured curriculum vitae.
   - Built-in embedded PDF document reader with fallback support.
   - One-click PDF download (`/documents/Siyamthanda_Mafuta_CV.pdf`) and print optimization.

5. **Certifications & Accreditations**:
   - Filterable view of professional credentials from Google, DeepLearning.AI, Stanford Online, IBM, and AWS.

6. **Accessibility & User Experience**:
   - **Theme Engine**: Accessible Dark / Light mode toggle with `aria-pressed`, contrast compliance, and persistent preferences.
   - **Reduced Motion Support**: Full compliance with `prefers-reduced-motion: reduce` (WCAG 2.2.2 / 2.3.3) for smooth navigation or instant rendering.
   - Responsive design tailored for mobile, tablet, and desktop viewports.

---

## 🛠️ Projects Overview

| Project | Type / Context | Role | Technologies | Links |
| :--- | :--- | :--- | :--- | :--- |
| **RoadReady Traffic Services** | CAPACITI Demand Academy Project | Developer & Team Member | JavaScript, Node.js, REST APIs, HTML/CSS | [GitHub Repo](https://github.com/Siyamthanda101/RoadReady-Traffic-Services) |
| **RoadReady Insights** | CAPACITI Demand Academy Project | Developer & Team Member | React, TypeScript, Tailwind CSS | [Live Application](https://road-ready-pulse.lovable.app/) |
| **CSI-Heart** | University Research Project | Developer & Team Member | ESP32, Python, Wi-Fi CSI, Signal Processing, ML | In Portfolio |
| **InfraTrack System** | University Academic Group Project | Developer & Team Member | Java, Spring Boot, MySQL, REST API | [GitHub Repo](https://github.com/allen-vandieman/InfraTrack-System) |
| **Duplicate File Finder** | Personal Software Project | Individual Developer | Java, File I/O, Algorithms | In Portfolio |

---

## 📜 Professional Certifications

- **Google AI Essentials Specialization** — *Google*
- **Supervised Machine Learning: Regression and Classification** — *DeepLearning.AI • Stanford Online*
- **Unsupervised Learning, Recommenders, Reinforcement Learning** — *DeepLearning.AI • Stanford Online*
- **Generative AI with Large Language Models** — *DeepLearning.AI • AWS*
- **Python for Data Science, AI & Development** — *IBM*
- **Introduction to Artificial Intelligence (AI)** — *IBM*
- **Introduction to Generative AI** — *Google Cloud*
- **Generative AI: Prompt Engineering Basics** — *IBM*
- **AI For Everyone** — *DeepLearning.AI*
- **Stay Ahead of the AI Curve** — *Google*

---

## 💻 Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, CSS Variables
- **Icons**: Lucide React
- **Document Generation**: pdf-lib
- **Build Tool**: Vite 6
- **Language & Runtime**: Node.js, TypeScript Compiler (`tsc`)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.x or higher recommended)
- [npm](https://www.npmjs.com/) (bundled with Node.js)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Siyamthanda101/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Type-checking and Linting**:
   ```bash
   npm run lint
   ```

5. **Build for Production**:
   ```bash
   npm run build
   ```
   The production-ready static assets will be compiled into the `dist/` directory.

6. **Preview the Production Build**:
   ```bash
   npm run preview
   ```

---

## 📁 Project Structure

```
├── public/
│   ├── documents/
│   │   └── Siyamthanda_Mafuta_CV.pdf   # 2-Page CV PDF
│   ├── images/                         # Project screenshots & assets
│   └── professional_image.png          # Profile portrait
├── scripts/
│   └── generate_cv_pdf.js              # Script to build high-fidelity CV PDF
├── src/
│   ├── components/
│   │   ├── About.tsx                   # Background & bio section
│   │   ├── CapacitiJourney.tsx         # CAPACITI Demand Academy timeline
│   │   ├── Certifications.tsx          # Credentials & certificates gallery
│   │   ├── Contact.tsx                 # Contact form, direct phone & email
│   │   ├── CurriculumVitae.tsx         # Dual-tab CV view & PDF embedded reader
│   │   ├── Education.tsx               # Academic history & degrees
│   │   ├── Footer.tsx                  # Footer & quick links
│   │   ├── Hero.tsx                    # Top introduction & primary CTAs
│   │   ├── Navbar.tsx                  # Navigation bar & mobile menu
│   │   ├── NetworkBackground.tsx       # Particle/node canvas background
│   │   ├── Projects.tsx                # Filterable project cards & modal views
│   │   ├── Skills.tsx                  # Technical skill domain matrix
│   │   └── ThemeToggle.tsx             # Accessible Dark/Light mode button
│   ├── data/
│   │   └── portfolioData.ts            # Centralized portfolio data store
│   ├── hooks/
│   │   └── useScrollReveal.ts          # Scroll-based intersection observer hook
│   ├── App.tsx                         # Main app layout
│   ├── main.tsx                        # React application entry point
│   ├── types.ts                        # Shared TypeScript interfaces
│   └── index.css                       # Global styles & accessibility rules
├── index.html                          # HTML template with SEO meta tags
├── metadata.json                       # AI Studio project metadata
├── package.json                        # Project scripts and dependencies
├── tsconfig.json                       # TypeScript configuration
└── vite.config.ts                      # Vite build configuration
```

---

## 📬 Contact & Connect

- **Name**: Siyamthanda Mafuta
- **Location**: Cape Town, Western Cape, South Africa
- **Mobile**: [+27 73 066 0155](tel:0730660155) / `073 066 0155`
- **Email**: [mafuta.s101@gmail.com](mailto:mafuta.s101@gmail.com)
- **LinkedIn**: [linkedin.com/in/siyamthanda-mafuta-0454b51ba](https://www.linkedin.com/in/siyamthanda-mafuta-0454b51ba/)
- **GitHub**: [github.com/Siyamthanda101](https://github.com/Siyamthanda101)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

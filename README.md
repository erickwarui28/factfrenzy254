# 🧠 Fact Frenzy

A fast-paced trivia challenge where Redditors race against the clock to answer fascinating trivia questions in 20 seconds! Built for the Reddit & Kiro Virtual Hackathon 2025 with a modern, soft UI design that makes learning fun and engaging.

## 🎮 What is Fact Frenzy?

Fact Frenzy is an Interactive Post game built on Reddit's Developer Platform using Devvit Web. It's a knowledge-testing trivia game where players compete in exactly 5 rounds of rapid-fire questions, racing against both time and other community members to achieve the highest score.

**The game transforms learning into an exciting, competitive experience** where every second counts and every answer matters. Players face a diverse range of trivia questions spanning multiple categories including science, history, geography, animals, and general knowledge. The game features a beautiful modern UI with soft shadows, gradient backgrounds, smooth animations, and neumorphic design elements that create an engaging visual experience.

### 🎯 Core Game Mechanics

- **5-Round Structure**: Each game consists of exactly 5 randomly selected trivia questions for consistent gameplay
- **20-Second Timer**: Players have precisely 20 seconds to answer each question with visual countdown
- **Multiple Choice**: Four answer options (A, B, C, D) for each question
- **Speed-Based Scoring**: Faster correct answers earn more points (100pts ≤10s, 50pts ≤20s, 1pt participation)
- **Instant Feedback**: Immediate answer validation with detailed explanations after each question
- **Auto-Progression**: Smooth transitions between questions and game states with 3-second reveal delays
- **Persistent Leaderboards**: Community rankings stored using Reddit's Redis integration
- **Random Question Pool**: 25+ curated questions across multiple categories and difficulty levels

## ✨ What Makes This Game Innovative & Unique

### 🎨 Modern Soft UI Design
- **Neumorphism-inspired interface** with subtle shadows, gentle gradients, and tactile button effects that create a premium, touchable feel
- **Smooth entrance animations** including bounce effects, fade-ins, scale transitions, and staggered reveals that bring the interface to life
- **Gradient backgrounds with texture overlays** creating visual depth and modern aesthetics with sunset-inspired color palettes
- **Card-based layout system** with floating elements and soft shadows for a premium feel that elevates the gaming experience
- **Dynamic timer visualization** with color-coded progress bars (green→orange→red) and smooth transitions that build tension
- **Celebratory animations** with confetti particles and sparkle effects for correct answers that make success feel rewarding
- **Responsive design** optimized for both mobile and desktop Reddit users with 44px+ touch-friendly targets
- **Accessibility-first approach** with WCAG 2.1 AA compliance, proper focus states, and reduced motion support for all users

### ⚡ Real-Time Competitive Elements
- **Precision timing system** with 0.1-second accuracy countdown for fair scoring that rewards quick thinking
- **Dynamic point calculation** with speed-based rewards: 100 points for answers ≤10 seconds, 50 points ≤20 seconds, 1 participation point for wrong answers
- **Live leaderboard integration** showing community rankings after each game with medal icons and achievement styling
- **Instant visual feedback** with animated answer selection, pressed states, and result reveals
- **Auto-progression system** that smoothly transitions between game states with 3-second reveal delays
- **Achievement-style scoring** with performance badges (Perfect 🏆, Excellent 🥇, Great 🥈, Good 🥉, Keep Trying 💪)

### 🧠 Smart Game Mechanics & Content
- **Structured 5-round format** ensuring consistent game length and pacing (approximately 3-4 minutes per game)
- **20-second question timer** creating urgency while allowing thoughtful consideration
- **Comprehensive explanations** that turn every question into a learning opportunity with fascinating facts
- **No-penalty exploration** - even wrong answers earn 1 point to encourage participation and learning
- **Automatic answer submission** when time expires to keep games moving smoothly
- **Diverse question categories**: Animals (octopus hearts, koala sleep), Science (chemical symbols, space facts), Geography (countries, natural features), History (ancient wonders, world events), and General Knowledge
- **Difficulty scaling** with easy, medium, and hard questions mixed throughout for balanced challenge
- **Random question selection** from a pool of 25+ professionally crafted questions ensures unique gameplay each time
- **Educational value** with detailed explanations that teach interesting facts (e.g., "Giant squid eyes are the size of basketballs!")

### 🏆 Community-Driven Competition
- **Persistent leaderboards** that track the best performers in each subreddit using Reddit's Redis integration
- **Real-time ranking system** showing your position among all players with live updates
- **Score persistence** across game sessions with reliable data storage
- **Social sharing integration** built into Reddit's ecosystem for community engagement
- **Personalized experience** with Reddit username integration and custom greetings ("Hey [username]! 👋")
- **Top 5 leaderboard display** with medal icons (🥇🥈🥉🏅) and special highlighting for your entry
- **Session-based gameplay** with unique question sets for each playthrough preventing memorization
- **Cross-subreddit compatibility** - works seamlessly across different Reddit communities

### 🎯 Reddit-Native Experience
- **Seamless integration** with Reddit's webview environment and automatic user authentication
- **No external dependencies** - everything runs within Reddit's secure ecosystem
- **Instant play** - no downloads, registrations, or external accounts required
- **Community-specific leaderboards** - compete with users in your favorite subreddits
- **Moderator-friendly** - easy installation and management through Reddit's developer tools
- **Mobile-optimized** - works perfectly on Reddit's mobile app and mobile web with touch-friendly interactions

## 🛠️ Tech Stack

- [Devvit](https://developers.reddit.com/): Reddit's developer platform for Interactive Posts
- [React](https://react.dev/): Frontend UI framework with hooks for state management
- [TypeScript](https://www.typescriptlang.org/): Type safety and development experience
- [Tailwind CSS](https://tailwindcss.com/): Styling and responsive design with custom design system
- [Express](https://expressjs.com/): Server-side HTTP framework for API endpoints
- [Redis](https://redis.io/): Data persistence layer via Devvit for leaderboards and game state
- [Kiro](https://kiro.ai/): AI integration for content generation and testing
- [Vite](https://vite.dev/): Build tool and development server

### 🏗️ Architecture Overview

**Client-Side (`src/client/`)**
- `App.tsx`: Main React component with game state management
- `hooks/useGameState.ts`: Custom hook managing game logic, API calls, and state transitions
- `components/`: Reusable UI components (LoadingSpinner, PageTransition, PerformanceMonitor)
- `styles/`: Modern design system with CSS custom properties and Tailwind extensions
- `utils/`: Accessibility utilities, performance monitoring, and optimization tools

**Server-Side (`src/server/`)**
- `index.ts`: Express server with RESTful API endpoints (`/api/init`, `/api/start-game`, etc.)
- `data/questions.ts`: Curated trivia question pool with 25+ questions across multiple categories
- `core/post.ts`: Reddit post creation and management functionality

**Shared (`src/shared/`)**
- `types/api.ts`: TypeScript interfaces for API requests/responses and game data structures

**Game Flow**
1. **Initialization**: Client calls `/api/init` to get user context and game readiness
2. **Game Start**: `/api/start-game` creates session and returns first random question
3. **Answer Submission**: `/api/submit-answer` processes responses and calculates points
4. **Question Progression**: `/api/next-question` advances through 5 rounds or ends game
5. **Score Saving**: `/api/save-score` persists final score and updates leaderboards

## 🎯 How to Play Fact Frenzy

### Step 1: Launch the Game
1. **Find a Fact Frenzy post** in your favorite subreddit
2. **Click the "Launch App" button** to open the game in full-screen mode
3. **See the modern welcome screen** featuring Reddit's Snoo mascot with a bouncing animation on a beautiful gradient background with texture overlay
4. **Enjoy the personalized greeting** - if you're logged in, you'll see "Hey [username]! 👋"
5. **Click "Start Game"** to begin your trivia challenge with smooth entrance animations and staggered content reveals

### Step 2: Answer Questions (5 Rounds Total)
1. **View the elegant header card** showing your current round (1-5) and running score with modern typography
2. **Watch the dynamic timer progress bar** - you have exactly 20 seconds per question with neumorphic styling
   - **Green gradient with shimmer effect** when you have plenty of time (>50% remaining)
   - **Orange gradient** when time is running low (25-50% remaining)  
   - **Red gradient with pulsing animation** when urgent (<25% remaining)
3. **Read the trivia question** displayed in a prominent elevated card with soft shadows and modern typography
4. **Select your answer** by clicking one of four neumorphic answer buttons (A, B, C, or D) with tactile feedback
5. **See immediate visual feedback** - your selected answer transforms with Reddit orange styling, white text, and pressed state
6. **Experience smooth animations** - buttons have hover effects, scale transitions, disabled states, and entrance animations

### Step 3: Learn from Each Answer
1. **Experience the reveal animation** with floating Snoo mascot and celebration effects for correct answers
2. **See confetti particles and sparkle effects** if you answered correctly, creating a joyful moment
3. **View your result status** with large emoji feedback (🎉 for correct, 😔 for incorrect) and color-coded messaging
4. **See your points earned** in a styled badge with clear visual feedback:
   - **100 points** for correct answers within 10 seconds (lightning fast!)
   - **50 points** for correct answers within 20 seconds (still good!)
   - **1 point** for incorrect answers (participation credit)
   - **0 points** if time runs out with no answer
5. **Read the detailed explanation** in a soft card that provides interesting context about the correct answer
6. **View the correct answer** highlighted in a primary-colored card with letter badge and clear formatting
7. **Automatically advance** to the next question after 3 seconds with smooth state transitions

### Step 4: View Your Final Results
1. **Experience the results celebration** with floating Snoo mascot and achievement-style presentation
2. **See your achievement badge** based on performance level:
   - **Perfect 🏆** (450+ points) - Nearly flawless performance
   - **Excellent 🥇** (350+ points) - Outstanding knowledge and speed
   - **Great 🥈** (250+ points) - Solid performance with good accuracy
   - **Good 🥉** (150+ points) - Decent showing, room for improvement
   - **Keep Trying 💪** (<150 points) - Practice makes perfect!
3. **View your total score** in a gradient card with detailed breakdown showing accuracy percentage and average per round
4. **Check your leaderboard rank** with medal icon and position indicator among all subreddit players
5. **Browse the top 5 players** in beautifully designed leaderboard cards with rank icons and highlighting for your entry
6. **Click "🎮 Play Again"** to start a new game with completely different randomized questions from the pool
7. **Access helpful links** in the footer (Docs, r/Devvit, Discord) with hover effects and focus states

### 🎮 Pro Tips for High Scores
- **Read quickly but carefully** - speed matters, but accuracy matters more for maximum points
- **Don't panic when the timer turns red and starts pulsing** - you still have time to think and select
- **Learn from explanations** - they provide valuable context that might help with future questions
- **Play multiple rounds** - each game has completely different randomized questions from 25+ available
- **Compete with friends** by sharing your scores and challenging them to beat your leaderboard position
- **Take advantage of the modern UI** - hover effects, animations, and visual feedback help you navigate quickly
- **Use the visual timer cues** - green means plenty of time, orange means hurry up, red means urgent
- **Don't overthink** - your first instinct is often correct, especially under time pressure

### 🏆 Scoring System Explained
The game rewards both **speed and accuracy** with a fair point system:
- **Perfect Speed Round (≤10 seconds)**: 100 points
- **Good Speed Round (≤20 seconds)**: 50 points  
- **Participation (wrong answer)**: 1 point
- **No Answer (timeout)**: 0 points

**Maximum possible score**: 500 points (100 × 5 rounds)
**Typical good score**: 200-300 points
**Excellent score**: 400+ points

### 📚 Question Categories & Examples
The game features diverse trivia across multiple categories with 25+ professionally crafted questions:

**🔬 Science**: Chemical symbols, space facts, human anatomy, physics concepts
- *"What is the chemical symbol for gold?" (Answer: Au - from Latin "aurum")*
- *"Which gas makes up most of Earth's atmosphere?" (Answer: Nitrogen - 78%)*
- *"What is the smallest bone in the human body?" (Answer: Stapes in the ear)*

**🌍 Geography**: Countries, capitals, natural features, world records
- *"Which country has the most natural lakes?" (Answer: Canada - over 2 million)*
- *"What is the capital of Australia?" (Answer: Canberra - compromise between Sydney/Melbourne)*
- *"What is the largest desert in the world?" (Answer: Antarctica - technically a desert)*

**🦁 Animals**: Wildlife facts, biology, animal behavior, record holders
- *"How many hearts does an octopus have?" (Answer: 3 hearts)*
- *"Which animal has the largest eyes relative to body size?" (Answer: Giant squid - basketball-sized)*
- *"Which animal can sleep for up to 22 hours a day?" (Answer: Koala)*

**📜 History**: World events, ancient civilizations, historical figures, dates
- *"Which ancient wonder of the world still exists today?" (Answer: Great Pyramid of Giza)*
- *"Which year did World War II end?" (Answer: 1945)*
- *"Who painted the Mona Lisa?" (Answer: Leonardo da Vinci)*

**🧠 General Knowledge**: Mixed topics, fun facts, common knowledge, trivia
- *"How many minutes are in a day?" (Answer: 1,440 minutes)*
- *"What percentage of a watermelon is water?" (Answer: 92%)*
- *"Which country has the most time zones?" (Answer: Russia - 11 time zones)*

### 🎨 Visual Experience Features
- **Soft UI design** with neumorphic buttons, cards, and tactile feedback effects
- **Gradient backgrounds** with subtle texture overlays and noise patterns for depth
- **Smooth animations** including fade-ins, slide-ups, scale effects, bounce-ins, and celebration animations
- **Staggered entrance animations** that reveal content progressively with timing delays
- **Dynamic color coding** for timer states, answer feedback, and achievement levels
- **Confetti and sparkle effects** for correct answers with particle animations
- **Floating and wiggle animations** for mascot and celebration elements
- **Responsive design** that works beautifully on mobile and desktop with touch-friendly targets (44px+ touch zones)
- **Accessibility support** with proper focus states, reduced motion options, and WCAG 2.1 AA compliance

## 🛠️ Technical Implementation

### Modern React Architecture
- **TypeScript-first development** with strict type checking across client, server, and shared modules
- **React Hooks-based state management** with custom `useGameState` hook for centralized game logic
- **Real-time timer system** with 0.1-second precision using `setInterval` and automatic cleanup
- **Smooth page transitions** with custom `usePageTransition` and `useStaggeredAnimation` hooks
- **Error boundary handling** with graceful fallbacks and user-friendly error messages

### Advanced UI/UX Features
- **Multiple loading states** with spinner, dots, pulse, and skeleton components for different contexts
- **Staggered entrance animations** that reveal content progressively with configurable delays
- **Parallax background elements** with different movement speeds for visual depth
- **Responsive touch targets** with minimum 44px sizing for mobile accessibility
- **Reduced motion support** with `prefers-reduced-motion` media query compliance
- **Focus management** with proper keyboard navigation and screen reader support

### Backend Integration
- **Express.js API endpoints** with `/api/` prefix for client-server communication
- **Redis persistence** for game sessions, leaderboards, and user data
- **Session management** with unique game IDs and user authentication via Reddit
- **Random question selection** from curated pool with no repeats within sessions
- **Real-time scoring calculation** based on accuracy and response time
- **Leaderboard ranking system** with automatic position calculation and updates

### Performance Optimizations & Monitoring
- **Efficient re-rendering** with React.memo and optimized state updates
- **CSS custom properties** for dynamic theming and consistent design tokens
- **Tailwind CSS utility classes** with custom design system extensions
- **Lazy loading** of non-critical visual enhancements
- **Bundle optimization** with Vite build system and tree-shaking
- **Real-time performance monitoring** with FPS tracking and animation performance analysis
- **Performance budgets** with automated testing for bundle size, load times, and accessibility compliance
- **Hardware acceleration** for animations using CSS transforms and will-change properties
- **60fps animation targets** with optimized rendering and reduced jank

## 🤖 Kiro Integration

This project leverages Kiro AI to enhance both development and gameplay:

### Content Generation
- **Curated Question Pool**: 25+ professionally crafted trivia questions across multiple categories
- **Smart Explanations**: Detailed, educational explanations that turn every question into a learning opportunity
- **Balanced Difficulty**: Mix of easy, medium, and hard questions for engaging gameplay

### Development Enhancement
- **AI-Assisted Testing**: Comprehensive testing of game mechanics, scoring logic, and edge cases
- **Performance Optimization**: AI-guided analysis of animation performance and bundle size
- **Accessibility Compliance**: Automated checking for WCAG 2.1 AA standards and mobile usability

### Creative Solutions
- **Modern Design System**: AI-powered creation of cohesive visual language with neumorphic elements
- **Animation Choreography**: Sophisticated timing and sequencing of entrance and celebration effects
- **Responsive Design**: Mobile-first approach with touch-friendly interactions and adaptive layouts

## 🏆 Hackathon Submission

This project is built for the **Reddit & Kiro Virtual Hackathon 2025** with the following focus:

### Community Play Category
- Massively multiplayer trivia experience
- Asynchronous gameplay with synchronous competition elements
- Community-driven content and leaderboards
- Subreddit-specific editions for targeted communities

### Best Kiro Developer Experience
- Comprehensive AI integration throughout development workflow
- Automated content generation and testing
- Smart analytics and difficulty adjustment
- Open source repository with full `.kiro` directory

## 🚀 Getting Started

> Make sure you have Node 22 downloaded on your machine before running!

1. Clone this repository
2. Run `npm install` to install dependencies
3. Set up your Reddit developer account and Devvit CLI
4. Configure Kiro integration (see `.kiro` directory)
5. Run `npm run dev` to start development server

## 📋 Development Commands

- `npm run dev`: Starts a development server where you can develop your application live on Reddit
- `npm run build`: Builds your client and server projects
- `npm run deploy`: Uploads a new version of your app
- `npm run launch`: Publishes your app for review
- `npm run login`: Logs your CLI into Reddit
- `npm run check`: Type checks, lints, and prettifies your app

## 🎨 Design Philosophy

Fact Frenzy emphasizes **modern polish and accessibility** through its comprehensive design system:

- **Soft UI (Neumorphism)**: Subtle shadows, gentle gradients, and tactile button effects create depth and interactivity
- **Modern typography**: Inter font with carefully crafted hierarchy, spacing, and semantic text styles
- **Gradient backgrounds**: Beautiful sunset gradients with subtle texture overlays and noise patterns
- **Card-based layouts**: Floating elements with soft shadows and elevated styling for premium feel
- **Smooth animations**: Entrance effects, hover states, state transitions, celebration effects, and micro-interactions
- **Responsive design**: Mobile-first approach with touch-friendly targets that works seamlessly across devices
- **Accessibility-first**: Proper focus states, reduced motion support, WCAG compliance, and clear visual feedback
- **Reddit integration**: Maintains brand consistency with Reddit orange while establishing unique visual identity
- **Design tokens**: Comprehensive design system with CSS custom properties for consistent theming

## 🔮 Future Expansion Ideas

- **Power-Ups**: Earn hints like "50/50" or "Add 5 seconds"
- **Daily Streaks**: Maintain daily playing streaks for bonus points
- **Community Packs**: Subreddit-submitted trivia packs (mod-approved)
- **Achievements**: "Answered 100 facts!", "5x Perfect Rounds!"
- **Tournament Mode**: Weekly community competitions

## 📄 License

This project is open source and available under an approved OSI Open Source License. The repository includes the complete `.kiro` directory for hackathon judging.

## 🤝 Contributing

This is a hackathon submission project. For questions or feedback, please reach out through the Reddit Developer Discord or create an issue in this repository.

---

**Built with ❤️ for the Reddit & Kiro Virtual Hackathon 2025**

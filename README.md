# Quiz Master - Interactive Multiple Choice Quiz Game

A modern, responsive web-based quiz application featuring multiple question types, real-time scoring, and detailed performance analytics.

## 🎯 Features

### Question Types
- **Single Select** - Choose one correct answer from multiple options
- **Multi Select** - Select multiple correct answers from a list
- **Fill in the Blank** - Type answers with intelligent validation

### Core Functionality
- **Real-time Progress Tracking** - Visual progress bar and question counter
- **Instant Feedback** - Immediate visual feedback for correct/incorrect answers
- **Score Calculation** - Points-based scoring system with weighted questions
- **Detailed Results** - Comprehensive performance review with question-by-question analysis

### User Experience
- **Modern Design** - Clean, professional interface with smooth animations
- **Responsive Layout** - Optimized for desktop, tablet, and mobile devices
- **Keyboard Navigation** - Support for keyboard shortcuts (Enter to submit, number keys for options)
- **Toast Notifications** - Non-intrusive feedback messages

### Visual Features
- **Gradient Backgrounds** - Beautiful blue gradient theme
- **Smooth Animations** - Slide-in effects, hover states, and micro-interactions
- **Color-coded Feedback** - Visual indicators for correct (green) and incorrect (red) answers
- **Professional Footer** - Social media links and copyright information

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. Start playing the quiz!

### Quick Start
```bash
# Simply open the index.html file in your browser
open index.html
```

## 📁 Project Structure

```
TASK-3/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling with animations
├── quiz.js             # Quiz data and state management
├── app.js              # Main application logic
└── README.md           # This documentation file
```

## 🎨 Design System

### Color Palette
- **Primary**: Steel Blue (#4682B4)
- **Primary Dark**: Dodger Blue (#1E90FF)
- **Primary Light**: Sky Blue (#87CEEB)
- **Secondary**: Deep Sky Blue (#00BFFF)
- **Background**: Light Sky Blue to Dodger Blue gradient

### Typography
- **Font Family**: Inter (with system font fallbacks)
- **Weights**: 300, 400, 500, 600, 700
- **Sizes**: Responsive scaling from 0.75rem to 2.5rem

### Components
- **Buttons**: Gradient backgrounds with hover effects
- **Cards**: Rounded corners with subtle shadows
- **Progress Bar**: Animated fill indicator
- **Toast Notifications**: Slide-in feedback messages

## 🎮 How to Play

1. **Start Quiz**: Click the "Start Quiz" button on the welcome screen
2. **Answer Questions**: 
   - Single Select: Click one option
   - Multi Select: Click multiple options
   - Fill in Blank: Type your answer
3. **Navigate**: Use "Next Question" button or press Enter
4. **View Results**: See your score, accuracy, and detailed question review
5. **Review Answers**: Compare your answers with correct solutions
6. **Play Again**: Click "Play Again" to restart

## 📊 Scoring System

- **Points per Question**: Varies by difficulty (10-15 points)
- **Total Possible Score**: Sum of all question points
- **Accuracy Calculation**: (Correct Answers ÷ Total Questions) × 100
- **Performance Messages**: 
  - 90%+: Outstanding! You're a quiz master!
  - 70-89%: Great job! You really know your stuff!
  - 50-69%: Good effort! Keep practicing!
  - 30-49%: Nice try! Room for improvement!
  - Below 30%: Keep learning! Practice makes perfect!

## 🔧 Technical Implementation

### Frontend Technologies
- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with animations and transitions
- **Vanilla JavaScript**: No frameworks required

### Key Features
- **State Management**: QuizManager class handles game state
- **DOM Manipulation**: Utility functions for element handling
- **Event Handling**: Comprehensive user interaction management
- **Responsive Design**: Mobile-first approach with media queries

### Code Architecture
- **Modular Structure**: Separated concerns across multiple files
- **Class-based Components**: Object-oriented programming approach
- **Event-driven**: User actions trigger appropriate responses
- **Data Validation**: Input sanitization and answer verification

## 🎯 Question Categories

The quiz includes questions from various domains:
- Geography (capitals, oceans, continents)
- Science (planets, elements, physics)
- Art (famous paintings, artists)
- Technology (programming languages, web technologies)

## 🌟 Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Android Chrome)

## 📱 Responsive Features

- **Mobile Optimized**: Touch-friendly interface
- **Flexible Layout**: Adapts to all screen sizes
- **Readable Text**: Scalable typography
- **Accessible**: Semantic HTML and ARIA support

## 🎨 Customization

### Adding New Questions
Edit `quiz.js` and add new question objects to the `quizData` array:

```javascript
{
    id: 11,
    type: 'single', // or 'multi', 'fill'
    question: 'Your question here?',
    options: ['Option 1', 'Option 2', 'Option 3'],
    correct: 1, // index of correct answer
    points: 10
}
```

### Changing Colors
Modify CSS variables in `styles.css`:

```css
:root {
    --primary-color: #your-color;
    --primary-dark: #your-dark-color;
    --primary-light: #your-light-color;
}
```

### Customizing Animations
Adjust timing functions and durations in the CSS:

```css
.quiz-container {
    animation: slideIn 0.5s ease-out;
}
```

## 🐛 Troubleshooting

### Common Issues
- **Quiz not starting**: Ensure all JavaScript files are loaded
- **Styling issues**: Check CSS file linkage
- **Score not updating**: Verify quiz data structure

### Performance Tips
- Use modern browsers for best performance
- Ensure stable internet connection for external resources
- Clear browser cache if experiencing issues

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Amey Patbage**
- LinkedIn: [amey-patbage-ab8387380](https://www.linkedin.com/in/amey-patbage-ab8387380/)
- GitHub: [@AmeyPat07](https://github.com/AmeyPat07)

## 🙏 Acknowledgments

- Font Awesome for social media icons
- Google Fonts for Inter font family
- Modern CSS techniques for animations and transitions

---

**Quiz Master** - Test your knowledge, track your progress, and learn with every question! 🎓✨

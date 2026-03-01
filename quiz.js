
const quizData = [
    {
        id: 1,
        type: 'single',
        question: 'According to ______ and ______ stratification existsin every known human society ',
        options: ['Talcott and Parson', 'Fisher and Eugene', 'kingsley Davis and Moore', 'None of these'],
        correct: 2,
        points: 10
    },
    {
        id: 2,
        type: 'single',
        question: 'In most parts of the Western world many modern cities emerged with _____',
        options: ['Communism', 'Capitalism', 'Colonialism', 'Industrialisation'],
        correct: 3,
        points: 15
    },
    {
        id: 3,
        type: 'fill',
        question: 'The largest planet in our solar system is ____.',
        correct: 'Jupiter',
        points: 10,
        caseSensitive: false
    },
    {
        id: 4,
        type: 'single',
        question: 'Who painted the Mona Lisa?',
        options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Michelangelo'],
        correct: 1,
        points: 10
    },
    {
        id: 5,
        type: 'multi',
        question: 'Which of these are continents?',
        options: ['Atlantic', 'Africa', 'Asia', 'Pacific', 'Europe'],
        correct: [1, 2, 4],
        points: 15
    },
    {
        id: 6,
        type: 'fill',
        question: 'The chemical symbol for gold is ___.',
        correct: 'Au',
        points: 10,
        caseSensitive: true
    },
    {
        id: 7,
        type: 'single',
        question: 'What is the largest ocean on Earth?',
        options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
        correct: 3,
        points: 10
    },
    {
        id: 8,
        type: 'multi',
        question: 'Which of these are primary colors?',
        options: ['Red', 'Green', 'Blue', 'Yellow', 'Purple'],
        correct: [0, 2, 3],
        points: 15
    },
    {
        id: 9,
        type: 'fill',
        question: 'The speed of light is approximately ___ km/s.',
        correct: '300000',
        points: 15,
        caseSensitive: false,
        allowNumeric: true
    },
    {
        id: 10,
        type: 'single',
        question: 'Which element has the atomic number 1?',
        options: ['Helium', 'Hydrogen', 'Carbon', 'Oxygen'],
        correct: 1,
        points: 10
    }
];

class QuizManager {
    constructor() {
        this.questions = [...quizData];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.answers = [];
        this.isQuizActive = false;
        this.maxScore = this.calculateMaxScore();
    }

    calculateMaxScore() {
        return this.questions.reduce((total, question) => total + question.points, 0);
    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    getTotalQuestions() {
        return this.questions.length;
    }

    getProgress() {
        return ((this.currentQuestionIndex + 1) / this.getTotalQuestions()) * 100;
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.getTotalQuestions() - 1) {
            this.currentQuestionIndex++;
            return true;
        }
        return false;
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            return true;
        }
        return false;
    }

    submitAnswer(answer) {
        const question = this.getCurrentQuestion();
        const isCorrect = this.validateAnswer(question, answer);
        
        this.answers.push({
            questionId: question.id,
            answer: answer,
            isCorrect: isCorrect,
            points: isCorrect ? question.points : 0
        });

        if (isCorrect) {
            this.score += question.points;
        }

        return isCorrect;
    }

    validateAnswer(question, answer) {
        switch (question.type) {
            case 'single':
                return answer === question.correct;
            
            case 'multi':
                if (!Array.isArray(answer)) return false;
                if (answer.length !== question.correct.length) return false;
                
                const sortedAnswer = [...answer].sort((a, b) => a - b);
                const sortedCorrect = [...question.correct].sort((a, b) => a - b);
                
                return sortedAnswer.every((val, index) => val === sortedCorrect[index]);
            
            case 'fill':
                const userAnswer = question.caseSensitive ? answer : answer.toLowerCase();
                const correctAnswer = question.caseSensitive ? question.correct : question.correct.toLowerCase();
                
                if (question.allowNumeric) {
                    const userNum = parseFloat(userAnswer);
                    const correctNum = parseFloat(correctAnswer);
                    return !isNaN(userNum) && !isNaN(correctNum) && 
                           Math.abs(userNum - correctNum) < (correctNum * 0.01); // 1% tolerance
                }
                
                return userAnswer === correctAnswer;
            
            default:
                return false;
        }
    }

    getResults() {
        const correctAnswers = this.answers.filter(a => a.isCorrect).length;
        const accuracy = Math.round((correctAnswers / this.getTotalQuestions()) * 100);
        
        return {
            score: this.score,
            maxScore: this.maxScore,
            correctAnswers: correctAnswers,
            totalQuestions: this.getTotalQuestions(),
            accuracy: accuracy,
            answers: this.answers
        };
    }

    reset() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.answers = [];
        this.isQuizActive = false;
    }

    start() {
        this.reset();
        this.isQuizActive = true;
    }

    isLastQuestion() {
        return this.currentQuestionIndex === this.getTotalQuestions() - 1;
    }
}


const DOM = {
    element: (id) => document.getElementById(id),
    
    show: (element) => {
        if (typeof element === 'string') element = DOM.element(element);
        if (element) element.classList.add('active');
    },
    
    hide: (element) => {
        if (typeof element === 'string') element = DOM.element(element);
        if (element) element.classList.remove('active');
    },
    
    setText: (element, text) => {
        if (typeof element === 'string') element = DOM.element(element);
        if (element) element.textContent = text;
    },
    
    setHTML: (element, html) => {
        if (typeof element === 'string') element = DOM.element(element);
        if (element) element.innerHTML = html;
    },
    
    addClass: (element, className) => {
        if (typeof element === 'string') element = DOM.element(element);
        if (element) element.classList.add(className);
    },
    
    removeClass: (element, className) => {
        if (typeof element === 'string') element = DOM.element(element);
        if (element) element.classList.remove(className);
    },
    
    toggleClass: (element, className) => {
        if (typeof element === 'string') element = DOM.element(element);
        if (element) element.classList.toggle(className);
    }
};


class Toast {
    constructor() {
        this.element = DOM.element('toast');
        this.timeout = null;
    }

    show(message, type = 'success', duration = 3000) {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        this.element.textContent = message;
        this.element.className = `toast ${type}`;
        this.element.classList.add('show');

        this.timeout = setTimeout(() => {
            this.hide();
        }, duration);
    }

    hide() {
        this.element.classList.remove('show');
    }
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = { QuizManager, DOM, Toast };
}

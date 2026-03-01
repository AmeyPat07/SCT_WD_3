// Main application logic
class QuizApp {
    constructor() {
        this.quizManager = new QuizManager();
        this.toast = new Toast();
        this.currentAnswer = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateStats();
    }

    bindEvents() {
        // Start button
        DOM.element('startBtn').addEventListener('click', () => this.startQuiz());
        
        // Next button
        DOM.element('nextBtn').addEventListener('click', () => this.handleNext());
        
        // Submit button
        DOM.element('submitBtn').addEventListener('click', () => this.submitQuiz());
        
        // Restart button
        DOM.element('restartBtn').addEventListener('click', () => this.restartQuiz());
    }

    startQuiz() {
        this.quizManager.start();
        this.showScreen('questionScreen');
        this.displayQuestion();
        this.updateStats();
        this.toast.show('Quiz started! Good luck!', 'success');
    }

    displayQuestion() {
        const question = this.quizManager.getCurrentQuestion();
        
        
        const typeText = this.getQuestionTypeText(question.type);
        DOM.setText('questionType', typeText);
        
        
        DOM.setText('questionText', question.question);
        
        
        this.currentAnswer = null;
        DOM.setHTML('answerContainer', '');
        
        
        this.displayAnswerOptions(question);
        
        
        this.updateButtons();
        
        
        this.updateProgress();
    }

    getQuestionTypeText(type) {
        const types = {
            'single': 'Single Select',
            'multi': 'Multi Select',
            'fill': 'Fill in the Blank'
        };
        return types[type] || 'Question';
    }

    displayAnswerOptions(question) {
        const container = DOM.element('answerContainer');
        
        switch (question.type) {
            case 'single':
                this.displaySingleSelect(container, question);
                break;
            case 'multi':
                this.displayMultiSelect(container, question);
                break;
            case 'fill':
                this.displayFillBlank(container, question);
                break;
        }
    }

    displaySingleSelect(container, question) {
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'answer-option';
            optionElement.innerHTML = `
                <label>
                    <input type="radio" name="answer" value="${index}">
                    <span>${option}</span>
                </label>
            `;
            
            optionElement.addEventListener('click', () => {
                this.selectSingleOption(index, optionElement);
            });
            
            container.appendChild(optionElement);
        });
    }

    displayMultiSelect(container, question) {
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'answer-option';
            optionElement.innerHTML = `
                <label>
                    <input type="checkbox" name="answer" value="${index}">
                    <span>${option}</span>
                </label>
            `;
            
            optionElement.addEventListener('click', () => {
                this.toggleMultiOption(index, optionElement);
            });
            
            container.appendChild(optionElement);
        });
    }

    displayFillBlank(container, question) {
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.className = 'fill-blank-input';
        inputElement.placeholder = 'Type your answer here...';
        
        inputElement.addEventListener('input', (e) => {
            this.currentAnswer = e.target.value;
            this.updateButtons();
        });
        
        container.appendChild(inputElement);
        
        
        setTimeout(() => inputElement.focus(), 100);
    }

    selectSingleOption(index, element) {
        
        document.querySelectorAll('.answer-option').forEach(opt => {
            opt.classList.remove('selected');
            const radio = opt.querySelector('input[type="radio"]');
            if (radio) radio.checked = false;
        });
        
        
        element.classList.add('selected');
        const radio = element.querySelector('input[type="radio"]');
        if (radio) {
            radio.checked = true;
            this.currentAnswer = index;
        }
        
        this.updateButtons();
    }

    toggleMultiOption(index, element) {
        const checkbox = element.querySelector('input[type="checkbox"]');
        checkbox.checked = !checkbox.checked;
        
        if (checkbox.checked) {
            element.classList.add('selected');
            if (!this.currentAnswer) this.currentAnswer = [];
            if (!this.currentAnswer.includes(index)) {
                this.currentAnswer.push(index);
            }
        } else {
            element.classList.remove('selected');
            if (this.currentAnswer && this.currentAnswer.includes(index)) {
                this.currentAnswer = this.currentAnswer.filter(i => i !== index);
            }
        }
        
        this.updateButtons();
    }

    updateButtons() {
        const nextBtn = DOM.element('nextBtn');
        const submitBtn = DOM.element('submitBtn');
        
        const hasAnswer = this.hasValidAnswer();
        
        if (this.quizManager.isLastQuestion()) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
            submitBtn.disabled = !hasAnswer;
        } else {
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
            nextBtn.disabled = !hasAnswer;
        }
    }

    hasValidAnswer() {
        if (this.currentAnswer === null || this.currentAnswer === undefined) {
            return false;
        }
        
        if (Array.isArray(this.currentAnswer)) {
            return this.currentAnswer.length > 0;
        }
        
        if (typeof this.currentAnswer === 'string') {
            return this.currentAnswer.trim().length > 0;
        }
        
        return true;
    }

    handleNext() {
        if (!this.hasValidAnswer()) {
            this.toast.show('Please select an answer', 'error');
            return;
        }
        
        this.submitCurrentAnswer();
        
        if (this.quizManager.nextQuestion()) {
            this.displayQuestion();
            this.updateStats();
        } else {
            this.showResults();
        }
    }

    submitQuiz() {
        if (!this.hasValidAnswer()) {
            this.toast.show('Please provide an answer', 'error');
            return;
        }
        
        this.submitCurrentAnswer();
        this.showResults();
    }

    submitCurrentAnswer() {
        const isCorrect = this.quizManager.submitAnswer(this.currentAnswer);
        
        
        this.showAnswerFeedback(isCorrect);
        
        
        this.updateStats();
    }

    showAnswerFeedback(isCorrect) {
        const options = document.querySelectorAll('.answer-option');
        
        if (isCorrect) {
            this.toast.show('Correct! 🎉', 'success');
            if (options.length > 0) {
                options.forEach(opt => {
                    if (opt.classList.contains('selected')) {
                        opt.classList.add('correct');
                    }
                });
            }
        } else {
            this.toast.show('Incorrect. Try the next one!', 'error');
            if (options.length > 0) {
                options.forEach(opt => {
                    if (opt.classList.contains('selected')) {
                        opt.classList.add('incorrect');
                    }
                });
            }
        }
        
        
        setTimeout(() => {
            options.forEach(opt => {
                opt.classList.remove('correct', 'incorrect');
            });
        }, 1500);
    }

    showResults() {
        const results = this.quizManager.getResults();
        
        
        DOM.setText('finalScore', results.score);
        DOM.setText('maxScore', results.maxScore);
        DOM.setText('correctAnswers', results.correctAnswers);
        DOM.setText('totalQuestionsResult', results.totalQuestions);
        DOM.setText('accuracy', results.accuracy + '%');
        
        
        const message = this.getResultMessage(results.accuracy);
        DOM.setText('resultMessage', message);
        
        
        this.displayQuestionReview();
        
        
        this.showScreen('resultsScreen');
        
        
        this.toast.show('Quiz completed! Check your results below.', 'success');
    }

    getResultMessage(accuracy) {
        if (accuracy >= 90) {
            return '🏆 Outstanding! You\'re a quiz master!';
        } else if (accuracy >= 70) {
            return '🌟 Great job! You really know your stuff!';
        } else if (accuracy >= 50) {
            return '👍 Good effort! Keep practicing!';
        } else if (accuracy >= 30) {
            return '📚 Nice try! Room for improvement!';
        } else {
            return '💪 Keep learning! Practice makes perfect!';
        }
    }

    restartQuiz() {
        this.quizManager.reset();
        this.currentAnswer = null;
        this.showScreen('startScreen');
        this.updateStats();
        this.toast.show('Quiz reset. Ready to try again?', 'success');
    }

    showScreen(screenId) {
        
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        
        DOM.show(screenId);
    }

    updateStats() {
        DOM.setText('currentQuestion', this.quizManager.currentQuestionIndex + 1);
        DOM.setText('totalQuestions', this.quizManager.getTotalQuestions());
        DOM.setText('currentScore', this.quizManager.score);
    }

    updateProgress() {
        const progress = this.quizManager.getProgress();
        DOM.element('progressFill').style.width = progress + '%';
    }

    displayQuestionReview() {
        const container = DOM.element('questionReviewContainer');
        container.innerHTML = '';
        
        const answers = this.quizManager.answers;
        
        answers.forEach((answerData, index) => {
            const question = this.quizManager.questions.find(q => q.id === answerData.questionId);
            if (!question) return;
            
            const reviewCard = this.createQuestionReviewCard(question, answerData, index + 1);
            container.appendChild(reviewCard);
        });
    }

    createQuestionReviewCard(question, answerData, questionNumber) {
        const card = document.createElement('div');
        card.className = `question-review-card ${answerData.isCorrect ? 'correct' : 'incorrect'}`;
        
        const typeText = this.getQuestionTypeText(question.type);
        const userAnswerText = this.formatAnswer(question, answerData.answer);
        const correctAnswerText = this.formatCorrectAnswer(question);
        const statusIcon = answerData.isCorrect ? '✓' : '✗';
        const pointsClass = answerData.isCorrect ? 'earned' : 'lost';
        
        card.innerHTML = `
            <div class="review-question-header">
                <span class="review-question-number">Question ${questionNumber}</span>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <span class="review-question-type">${typeText}</span>
                    <span class="review-status-icon ${answerData.isCorrect ? 'correct' : 'incorrect'}">${statusIcon}</span>
                </div>
            </div>
            <div class="review-question-text">${question.question}</div>
            
            <div class="review-answer-section">
                <div class="review-answer-label">Your Answer</div>
                <div class="review-answer-content user-answer">${userAnswerText}</div>
            </div>
            
            <div class="review-answer-section">
                <div class="review-answer-label">Correct Answer</div>
                <div class="review-answer-content correct">${correctAnswerText}</div>
            </div>
            
            <div class="review-points ${pointsClass}">
                ${answerData.isCorrect ? '+' : ''}${answerData.points} / ${question.points} points
            </div>
        `;
        
        return card;
    }

    formatAnswer(question, answer) {
        switch (question.type) {
            case 'single':
                if (answer === null || answer === undefined) return 'No answer selected';
                return question.options[answer] || 'Invalid option';
            
            case 'multi':
                if (!Array.isArray(answer) || answer.length === 0) return 'No answers selected';
                return answer.map(index => question.options[index]).filter(Boolean).join(', ');
            
            case 'fill':
                return answer || 'No answer provided';
            
            default:
                return 'Invalid answer';
        }
    }

    formatCorrectAnswer(question) {
        switch (question.type) {
            case 'single':
                return question.options[question.correct];
            
            case 'multi':
                return question.correct.map(index => question.options[index]).join(', ');
            
            case 'fill':
                return question.correct;
            
            default:
                return 'Invalid correct answer';
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});


document.addEventListener('keydown', (e) => {
    const app = window.quizApp;
    if (!app || !app.quizManager.isQuizActive) return;
    
    
    if (e.key === 'Enter') {
        const nextBtn = DOM.element('nextBtn');
        const submitBtn = DOM.element('submitBtn');
        
        if (nextBtn.style.display !== 'none' && !nextBtn.disabled) {
            nextBtn.click();
        } else if (submitBtn.style.display !== 'none' && !submitBtn.disabled) {
            submitBtn.click();
        }
    }
    
    
    if (e.key >= '1' && e.key <= '9') {
        const question = app.quizManager.getCurrentQuestion();
        if (question.type === 'single') {
            const index = parseInt(e.key) - 1;
            if (index < question.options.length) {
                const options = document.querySelectorAll('.answer-option');
                if (options[index]) {
                    options[index].click();
                }
            }
        }
    }
});

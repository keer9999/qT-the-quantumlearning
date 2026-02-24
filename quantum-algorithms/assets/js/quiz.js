/**
 * Quiz Component
 * Interactive quiz functionality with scoring and feedback
 */

class Quiz {
    constructor(quizData, containerId) {
        this.data = quizData;
        this.container = document.getElementById(containerId);
        this.currentQuestion = 0;
        this.score = 0;
        this.userAnswers = [];
        this.isAnswered = false;

        this.init();
    }

    init() {
        this.render();
        this.attachEventListeners();
    }

    render() {
        const question = this.data.questions[this.currentQuestion];
        const progress = ((this.currentQuestion) / this.data.questions.length) * 100;

        this.container.innerHTML = `
            <div class="quiz-container">
                <div class="quiz-header">
                    <h2 class="quiz-title">${this.data.algorithmName} Quiz</h2>
                    <div class="quiz-progress-indicator">
                        Question ${this.currentQuestion + 1} of ${this.data.questions.length}
                    </div>
                </div>
                
                <div class="quiz-progress-bar">
                    <div class="quiz-progress-fill" style="width: ${progress}%"></div>
                </div>
                
                <div class="quiz-card">
                    <div class="quiz-question">${question.question}</div>
                    
                    <div class="quiz-options">
                        ${question.options.map((option, index) => `
                            <div class="quiz-option" data-index="${index}">
                                <div class="option-letter">${String.fromCharCode(65 + index)}</div>
                                <div class="option-text">${option}</div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="quiz-explanation" id="explanation">
                        <div class="quiz-explanation-title">Explanation</div>
                        <div class="quiz-explanation-text">${question.explanation}</div>
                    </div>
                </div>
                
                <div class="quiz-controls">
                    <button class="quiz-btn quiz-btn-secondary" id="prevBtn" 
                            ${this.currentQuestion === 0 ? 'disabled' : ''}>
                        ← Previous
                    </button>
                    <button class="quiz-btn quiz-btn-primary" id="submitBtn" disabled>
                        Submit Answer
                    </button>
                    <button class="quiz-btn quiz-btn-secondary" id="nextBtn" 
                            style="display: none;">
                        Next →
                    </button>
                </div>
                
                <div class="quiz-results" id="quizResults"></div>
            </div>
        `;

        this.restorePreviousAnswer();
        this.attachEventListeners();
    }

    attachEventListeners() {
        // Option selection
        const options = this.container.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.addEventListener('click', () => {
                if (!this.isAnswered) {
                    this.selectOption(option);
                }
            });
        });

        // Submit button
        const submitBtn = this.container.querySelector('#submitBtn');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.submitAnswer());
        }

        // Previous button
        const prevBtn = this.container.querySelector('#prevBtn');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousQuestion());
        }

        // Next button
        const nextBtn = this.container.querySelector('#nextBtn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextQuestion());
        }
    }

    selectOption(optionElement) {
        // Remove previous selection
        const options = this.container.querySelectorAll('.quiz-option');
        options.forEach(opt => opt.classList.remove('selected'));

        // Add selection to clicked option
        optionElement.classList.add('selected');

        // Enable submit button
        const submitBtn = this.container.querySelector('#submitBtn');
        submitBtn.disabled = false;
    }

    submitAnswer() {
        const selectedOption = this.container.querySelector('.quiz-option.selected');
        if (!selectedOption) return;

        this.isAnswered = true;
        const selectedIndex = parseInt(selectedOption.dataset.index);
        const question = this.data.questions[this.currentQuestion];
        const isCorrect = selectedIndex === question.correct;

        // Store answer
        this.userAnswers[this.currentQuestion] = {
            selected: selectedIndex,
            correct: isCorrect
        };

        // Update score
        if (isCorrect) {
            this.score++;
        }

        // Show correct/incorrect styling
        const options = this.container.querySelectorAll('.quiz-option');
        options.forEach((opt, index) => {
            opt.classList.add('disabled');
            if (index === question.correct) {
                opt.classList.add('correct');
            } else if (index === selectedIndex && !isCorrect) {
                opt.classList.add('incorrect');
            }
        });

        // Show explanation
        const explanation = this.container.querySelector('#explanation');
        explanation.classList.add('show');

        // Update buttons
        const submitBtn = this.container.querySelector('#submitBtn');
        const nextBtn = this.container.querySelector('#nextBtn');
        submitBtn.style.display = 'none';
        nextBtn.style.display = 'inline-flex';

        // If last question, show results instead
        if (this.currentQuestion === this.data.questions.length - 1) {
            nextBtn.textContent = 'View Results';
        }
    }

    nextQuestion() {
        if (this.currentQuestion < this.data.questions.length - 1) {
            this.currentQuestion++;
            this.isAnswered = false;
            this.render();
        } else {
            this.showResults();
        }
    }

    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.isAnswered = this.userAnswers[this.currentQuestion] !== undefined;
            this.render();
        }
    }

    restorePreviousAnswer() {
        const previousAnswer = this.userAnswers[this.currentQuestion];
        if (previousAnswer) {
            this.isAnswered = true;
            const options = this.container.querySelectorAll('.quiz-option');
            const question = this.data.questions[this.currentQuestion];

            options.forEach((opt, index) => {
                opt.classList.add('disabled');
                if (index === question.correct) {
                    opt.classList.add('correct');
                }
                if (index === previousAnswer.selected) {
                    opt.classList.add('selected');
                    if (!previousAnswer.correct) {
                        opt.classList.add('incorrect');
                    }
                }
            });

            // Show explanation
            const explanation = this.container.querySelector('#explanation');
            explanation.classList.add('show');

            // Update buttons
            const submitBtn = this.container.querySelector('#submitBtn');
            const nextBtn = this.container.querySelector('#nextBtn');
            submitBtn.style.display = 'none';
            nextBtn.style.display = 'inline-flex';
        }
    }

    showResults() {
        const percentage = Math.round((this.score / this.data.questions.length) * 100);
        let feedback = '';

        if (percentage >= 90) {
            feedback = '🎉 Outstanding! You have excellent understanding of this algorithm!';
        } else if (percentage >= 70) {
            feedback = '👍 Great job! You have a solid grasp of the concepts.';
        } else if (percentage >= 50) {
            feedback = '👌 Good effort! Review the material to strengthen your understanding.';
        } else {
            feedback = '📚 Keep learning! Review the algorithm explanation and try again.';
        }

        this.container.innerHTML = `
            <div class="quiz-container">
                <div class="quiz-card">
                    <h2 class="quiz-title text-center">${this.data.algorithmName} Quiz Complete!</h2>
                </div>
                
                <div class="quiz-results show">
                    <div class="quiz-score">${percentage}%</div>
                    <div class="quiz-score-text">Your Score</div>
                    <div class="quiz-score-correct">
                        ${this.score} out of ${this.data.questions.length} correct
                    </div>
                    <div class="quiz-feedback">${feedback}</div>
                    <div class="quiz-controls">
                        <button class="quiz-btn quiz-btn-secondary" onclick="location.reload()">
                            Try Again
                        </button>
                        <button class="quiz-btn quiz-btn-primary" onclick="window.location.href='index.html'">
                            Back to Algorithms
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Quiz;
}

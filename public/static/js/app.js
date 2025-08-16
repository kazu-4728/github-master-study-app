// ===== GitHub Master - Main Application =====

class GitHubMasterApp {
    constructor() {
        this.currentSection = 'home';
        this.currentUser = this.generateUserId();
        this.userProgress = {};
        this.startTime = Date.now();
        this.studyTimer = null;
        
        this.init();
    }

    generateUserId() {
        // Generate a simple user ID for demo purposes
        let userId = localStorage.getItem('github_master_user_id');
        if (!userId) {
            userId = 'user_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('github_master_user_id', userId);
        }
        return userId;
    }

    async init() {
        try {
            // Initialize user in database
            await this.initializeUser();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Load initial data
            await this.loadUserProgress();
            
            // Update UI
            this.updateProgressDisplay();
            this.updateStats();
            
            // Start study timer
            this.startStudyTimer();
            
            // Show initial section
            this.showSection('home');
            
            console.log('🎓 GitHub Master が起動しました！');
        } catch (error) {
            console.error('App initialization error:', error);
        }
    }

    async initializeUser() {
        try {
            const response = await fetch('/api/user/init', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: this.currentUser
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to initialize user');
            }
            
            const result = await response.json();
            console.log('User initialized:', result);
        } catch (error) {
            console.error('Error initializing user:', error);
        }
    }

    setupEventListeners() {
        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                this.showSection(section);
                this.updateActiveNavLink(link);
            });
        });

        // Learning path items
        document.querySelectorAll('.path-item').forEach(item => {
            item.addEventListener('click', () => {
                const level = item.dataset.level;
                this.showSection('learn');
                this.selectCourse(level);
            });
        });

        // Course tabs
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', () => {
                const course = button.dataset.course;
                this.selectCourse(course);
                this.updateActiveTab(button);
            });
        });

        // Lesson cards
        document.querySelectorAll('.lesson-card').forEach(card => {
            card.addEventListener('click', () => {
                const lessonId = card.dataset.lesson;
                this.openLesson(lessonId);
            });
        });

        // Quiz cards
        document.querySelectorAll('.quiz-card').forEach(card => {
            card.addEventListener('click', () => {
                const quizType = card.dataset.quiz;
                this.startQuiz(quizType);
            });
        });

        // Practice cards
        document.querySelectorAll('.practice-card').forEach(card => {
            const practiceType = card.className.includes('command') ? 'command' :
                               card.className.includes('branch') ? 'branch' : 'pullrequest';
            card.addEventListener('click', () => {
                this.startPractice(practiceType);
            });
        });

        // Dropdown toggle
        document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const dropdown = toggle.closest('.dropdown');
                dropdown.classList.toggle('active');
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', () => {
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        });

        // Modal close
        document.querySelectorAll('.close, .modal').forEach(element => {
            element.addEventListener('click', (e) => {
                if (e.target === element) {
                    this.closeModal();
                }
            });
        });

        // Global keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    showSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(`${sectionName}-section`);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionName;
        }

        // Special handling for different sections
        switch (sectionName) {
            case 'learn':
                this.loadLessons();
                break;
            case 'quiz':
                this.loadQuizOptions();
                break;
            case 'practice':
                this.loadPracticeOptions();
                break;
            case 'manual':
                this.loadManual();
                break;
        }
    }

    updateActiveNavLink(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    selectCourse(courseType) {
        // Hide all course panels
        document.querySelectorAll('.course-panel').forEach(panel => {
            panel.classList.remove('active');
        });

        // Show target course panel
        const targetPanel = document.getElementById(`${courseType}-course`);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
    }

    updateActiveTab(activeTab) {
        document.querySelectorAll('.tab-button').forEach(tab => {
            tab.classList.remove('active');
        });
        activeTab.classList.add('active');
    }

    async loadUserProgress() {
        try {
            const response = await fetch(`/api/user/${this.currentUser}/summary`);
            if (response.ok) {
                const result = await response.json();
                this.userProgress = result.data;
            }
        } catch (error) {
            console.error('Error loading user progress:', error);
        }
    }

    updateProgressDisplay() {
        const overallProgress = this.userProgress?.overall_progress || 0;
        const progressText = document.getElementById('overall-progress');
        const progressFill = document.getElementById('progress-fill');
        
        if (progressText) progressText.textContent = overallProgress;
        if (progressFill) progressFill.style.width = `${overallProgress}%`;
    }

    updateStats() {
        const stats = this.userProgress || {};
        
        // Update hero stats
        const lessonsCompleted = document.getElementById('lessons-completed');
        const quizScore = document.getElementById('quiz-score');
        const studyTime = document.getElementById('study-time');
        
        if (lessonsCompleted) {
            lessonsCompleted.textContent = stats.lessons_completed || 0;
        }
        
        if (quizScore) {
            const avgScore = Math.round(
                (stats.quiz_scores?.basic + stats.quiz_scores?.commands + stats.quiz_scores?.workflow) / 3 || 0
            );
            quizScore.textContent = avgScore;
        }
        
        if (studyTime) {
            const minutes = Math.round((stats.total_study_time || 0) / 60);
            studyTime.textContent = minutes;
        }
    }

    startStudyTimer() {
        this.studyTimer = setInterval(() => {
            this.trackStudyTime();
        }, 60000); // Track every minute
    }

    async trackStudyTime() {
        try {
            await fetch('/api/progress/study-time', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: this.currentUser,
                    time_spent: 60 // 1 minute in seconds
                })
            });
        } catch (error) {
            console.error('Error tracking study time:', error);
        }
    }

    async openLesson(lessonId) {
        try {
            const response = await fetch(`/api/lessons/${lessonId}`);
            if (!response.ok) {
                throw new Error('Lesson not found');
            }
            
            const result = await response.json();
            const lesson = result.data;
            
            this.showLessonModal(lesson);
        } catch (error) {
            console.error('Error loading lesson:', error);
            alert('レッスンの読み込みに失敗しました。');
        }
    }

    showLessonModal(lesson) {
        const modal = document.getElementById('lesson-modal');
        const content = document.getElementById('lesson-content');
        
        if (modal && content) {
            content.innerHTML = lesson.content;
            modal.classList.add('active');
        }
    }

    closeModal() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
    }

    async completeLesson(lessonId) {
        try {
            const lessonStartTime = Date.now();
            const timeSpent = Math.round((Date.now() - lessonStartTime) / 1000);
            
            await fetch('/api/progress/lesson', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: this.currentUser,
                    course_type: 'beginner', // TODO: Dynamic course type
                    lesson_id: lessonId,
                    completed: true,
                    time_spent: timeSpent
                })
            });
            
            // Award achievement for first lesson
            await this.checkAchievements('lesson_completed', { lesson_id: lessonId });
            
            // Update progress
            await this.loadUserProgress();
            this.updateProgressDisplay();
            this.updateStats();
            
            this.closeModal();
            alert('🎉 レッスンを完了しました！');
        } catch (error) {
            console.error('Error completing lesson:', error);
        }
    }

    async checkAchievements(type, data) {
        try {
            await fetch('/api/progress/achievement', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: this.currentUser,
                    achievement_type: type,
                    achievement_data: JSON.stringify(data)
                })
            });
        } catch (error) {
            console.error('Error checking achievements:', error);
        }
    }

    async startQuiz(quizType) {
        try {
            // Load quiz questions
            const response = await fetch(`/api/quiz/${quizType}`);
            if (!response.ok) {
                throw new Error('Quiz not found');
            }
            
            const result = await response.json();
            const questions = result.data;
            
            this.showQuizInterface(quizType, questions);
        } catch (error) {
            console.error('Error starting quiz:', error);
            alert('クイズの読み込みに失敗しました。');
        }
    }

    showQuizInterface(quizType, questions) {
        const contentArea = document.getElementById('quiz-content');
        if (!contentArea) return;
        
        contentArea.innerHTML = `
            <div class="quiz-interface">
                <div class="quiz-header">
                    <h3>${this.getQuizTitle(quizType)}</h3>
                    <div class="quiz-progress">
                        <span id="current-question">1</span> / ${questions.length}
                    </div>
                </div>
                <div id="question-container">
                    <!-- Questions will be loaded here -->
                </div>
                <div class="quiz-controls">
                    <button id="prev-question" class="btn btn-secondary" disabled>前の問題</button>
                    <button id="next-question" class="btn btn-primary">次の問題</button>
                    <button id="submit-quiz" class="btn btn-success" style="display: none;">クイズ完了</button>
                </div>
            </div>
        `;
        
        contentArea.classList.add('active');
        this.initializeQuiz(quizType, questions);
    }

    getQuizTitle(quizType) {
        const titles = {
            basic: '基本知識クイズ',
            commands: 'コマンドクイズ',
            workflow: 'ワークフロークイズ'
        };
        return titles[quizType] || 'クイズ';
    }

    initializeQuiz(quizType, questions) {
        this.currentQuiz = {
            type: quizType,
            questions: questions,
            currentIndex: 0,
            answers: {},
            startTime: Date.now()
        };
        
        this.showQuestion(0);
        this.setupQuizControls();
    }

    showQuestion(index) {
        const question = this.currentQuiz.questions[index];
        const container = document.getElementById('question-container');
        
        if (!container || !question) return;
        
        container.innerHTML = `
            <div class="question">
                <h4>${question.question}</h4>
                <div class="options">
                    ${question.options.map((option, i) => `
                        <label class="option">
                            <input type="radio" name="answer" value="${i}" ${this.currentQuiz.answers[question.id] == i ? 'checked' : ''}>
                            <span>${option}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Update progress
        document.getElementById('current-question').textContent = index + 1;
        
        // Setup option listeners
        container.querySelectorAll('input[name="answer"]').forEach(input => {
            input.addEventListener('change', (e) => {
                this.currentQuiz.answers[question.id] = parseInt(e.target.value);
            });
        });
    }

    setupQuizControls() {
        const prevBtn = document.getElementById('prev-question');
        const nextBtn = document.getElementById('next-question');
        const submitBtn = document.getElementById('submit-quiz');
        
        prevBtn.addEventListener('click', () => {
            if (this.currentQuiz.currentIndex > 0) {
                this.currentQuiz.currentIndex--;
                this.showQuestion(this.currentQuiz.currentIndex);
                this.updateQuizControls();
            }
        });
        
        nextBtn.addEventListener('click', () => {
            if (this.currentQuiz.currentIndex < this.currentQuiz.questions.length - 1) {
                this.currentQuiz.currentIndex++;
                this.showQuestion(this.currentQuiz.currentIndex);
                this.updateQuizControls();
            }
        });
        
        submitBtn.addEventListener('click', () => {
            this.submitQuiz();
        });
        
        this.updateQuizControls();
    }

    updateQuizControls() {
        const prevBtn = document.getElementById('prev-question');
        const nextBtn = document.getElementById('next-question');
        const submitBtn = document.getElementById('submit-quiz');
        
        const isFirst = this.currentQuiz.currentIndex === 0;
        const isLast = this.currentQuiz.currentIndex === this.currentQuiz.questions.length - 1;
        
        prevBtn.disabled = isFirst;
        
        if (isLast) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-flex';
        } else {
            nextBtn.style.display = 'inline-flex';
            submitBtn.style.display = 'none';
        }
    }

    async submitQuiz() {
        try {
            let correctCount = 0;
            const totalTime = Math.round((Date.now() - this.currentQuiz.startTime) / 1000);
            
            // Submit each answer
            for (const question of this.currentQuiz.questions) {
                const answer = this.currentQuiz.answers[question.id];
                if (answer !== undefined) {
                    const response = await fetch('/api/quiz/submit', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            user_id: this.currentUser,
                            quiz_type: this.currentQuiz.type,
                            question_id: question.id,
                            answer: answer,
                            time_spent: Math.round(totalTime / this.currentQuiz.questions.length)
                        })
                    });
                    
                    if (response.ok) {
                        const result = await response.json();
                        if (result.data.is_correct) {
                            correctCount++;
                        }
                    }
                }
            }
            
            const score = Math.round((correctCount / this.currentQuiz.questions.length) * 100);
            
            // Show results
            this.showQuizResults(correctCount, this.currentQuiz.questions.length, score);
            
            // Update progress
            await this.loadUserProgress();
            this.updateProgressDisplay();
            this.updateStats();
            
        } catch (error) {
            console.error('Error submitting quiz:', error);
            alert('クイズの送信に失敗しました。');
        }
    }

    showQuizResults(correct, total, score) {
        const contentArea = document.getElementById('quiz-content');
        if (!contentArea) return;
        
        contentArea.innerHTML = `
            <div class="quiz-results">
                <div class="results-header">
                    <h3>🎉 クイズ完了！</h3>
                    <div class="score-display">
                        <div class="score-number">${score}%</div>
                        <div class="score-details">${correct} / ${total} 問正解</div>
                    </div>
                </div>
                <div class="results-actions">
                    <button class="btn btn-primary" onclick="app.showSection('quiz')">他のクイズに挑戦</button>
                    <button class="btn btn-secondary" onclick="app.showSection('home')">ホームに戻る</button>
                </div>
            </div>
        `;
    }

    startPractice(practiceType) {
        // Implementation for practice exercises would go here
        alert(`${practiceType} の実践練習は準備中です。`);
    }

    loadLessons() {
        // Lessons are already loaded in HTML, just ensure they're visible
        console.log('Loading lessons...');
    }

    loadQuizOptions() {
        // Quiz options are already loaded in HTML
        console.log('Loading quiz options...');
    }

    loadPracticeOptions() {
        // Practice options are already loaded in HTML
        console.log('Loading practice options...');
    }

    loadManual() {
        // Manual content would be loaded here
        console.log('Loading manual...');
    }
}

// Global functions for HTML onclick handlers
function startLearning() {
    app.showSection('learn');
}

function completeLesson(lessonId) {
    app.completeLesson(lessonId);
}

function nextLesson(lessonId) {
    app.openLesson(lessonId);
}

function showSection(sectionName) {
    app.showSection(sectionName);
}

function startQuiz(quizType) {
    app.startQuiz(quizType);
}

function startCommandPractice() {
    app.startPractice('command');
}

function startBranchPractice() {
    app.startPractice('branch');
}

function startPRPractice() {
    app.startPractice('pullrequest');
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new GitHubMasterApp();
});

// Export for ES modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GitHubMasterApp;
}
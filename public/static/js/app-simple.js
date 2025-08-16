console.log('🎓 GitHub Master App loading...');

// Simple app initialization
let currentUser = null;
let currentSection = 'home';

// Generate user ID
function generateUserId() {
    let userId = localStorage.getItem('github_master_user_id');
    if (!userId) {
        userId = 'user_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('github_master_user_id', userId);
    }
    return userId;
}

// Initialize user
async function initializeUser() {
    try {
        currentUser = generateUserId();
        const response = await fetch('/api/user/init', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: currentUser })
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log('✅ User initialized:', result);
            return result;
        } else {
            console.error('❌ User initialization failed');
            return null;
        }
    } catch (error) {
        console.error('❌ User initialization error:', error);
        return null;
    }
}

// Show section
function showSection(sectionName) {
    console.log('📍 Switching to section:', sectionName);
    
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionName + '-section');
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionName;
    }
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === sectionName) {
            link.classList.add('active');
        }
    });
}

// Setup event listeners
function setupEventListeners() {
    console.log('🔧 Setting up event listeners...');
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            if (section) {
                showSection(section);
            }
        });
    });
    
    // Learning path items
    const pathItems = document.querySelectorAll('.path-item');
    pathItems.forEach(item => {
        item.addEventListener('click', () => {
            const level = item.dataset.level;
            showSection('learn');
            if (level) {
                switchCourse(level);
            }
        });
    });
    
    // Course tabs
    const courseTabs = document.querySelectorAll('.course-tab');
    courseTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const course = tab.dataset.course;
            if (course) {
                switchCourse(course);
            }
        });
    });
    
    // CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            showSection('learn');
        });
    }
}

// Switch course
function switchCourse(courseType) {
    console.log('📚 Switching to course:', courseType);
    
    // Update course tabs
    const courseTabs = document.querySelectorAll('.course-tab');
    courseTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.course === courseType) {
            tab.classList.add('active');
        }
    });
    
    // Update lesson grids
    const lessonGrids = document.querySelectorAll('.lessons-grid');
    lessonGrids.forEach(grid => {
        grid.classList.remove('active');
    });
    
    const targetGrid = document.getElementById(courseType + '-lessons');
    if (targetGrid) {
        targetGrid.classList.add('active');
        loadLessons(courseType);
    }
}

// Load lessons for course
async function loadLessons(courseType) {
    console.log('📖 Loading lessons for:', courseType);
    
    const container = document.getElementById(courseType + '-lessons');
    if (!container) return;
    
    container.innerHTML = '<div style="text-align: center; padding: 20px;">📚 レッスンを読み込み中...</div>';
    
    try {
        const response = await fetch(`/api/lessons/course/${courseType}`);
        const data = await response.json();
        
        if (data.success && data.data) {
            const lessonsHtml = data.data.map(lesson => `
                <div class="lesson-card" data-lesson-id="${lesson.id}">
                    <div class="lesson-icon">📖</div>
                    <h3>${lesson.title}</h3>
                    <p>${lesson.description}</p>
                    <div class="lesson-meta">
                        <span><i class="fas fa-clock"></i> ${lesson.duration}分</span>
                        <span><i class="fas fa-signal"></i> ${lesson.difficulty}</span>
                    </div>
                    <button class="lesson-btn" onclick="openLesson('${lesson.id}')">
                        <i class="fas fa-play"></i> 開始
                    </button>
                </div>
            `).join('');
            
            container.innerHTML = lessonsHtml;
        } else {
            container.innerHTML = '<div style="text-align: center; padding: 20px;">❌ レッスンの読み込みに失敗しました</div>';
        }
    } catch (error) {
        console.error('❌ Error loading lessons:', error);
        container.innerHTML = '<div style="text-align: center; padding: 20px;">❌ レッスンの読み込みに失敗しました</div>';
    }
}

// Open lesson
async function openLesson(lessonId) {
    console.log('📖 Opening lesson:', lessonId);
    
    try {
        const response = await fetch(`/api/lessons/${lessonId}`);
        const data = await response.json();
        
        if (data.success && data.data) {
            const dynamicContent = document.getElementById('dynamic-content');
            if (dynamicContent) {
                dynamicContent.innerHTML = `
                    <div class="lesson-modal">
                        <div class="lesson-content">
                            <button class="close-btn" onclick="closeLesson()">×</button>
                            ${data.data.content}
                        </div>
                    </div>
                `;
                dynamicContent.style.display = 'block';
            }
        }
    } catch (error) {
        console.error('❌ Error opening lesson:', error);
        alert('レッスンの読み込みに失敗しました');
    }
}

// Close lesson
function closeLesson() {
    const dynamicContent = document.getElementById('dynamic-content');
    if (dynamicContent) {
        dynamicContent.style.display = 'none';
        dynamicContent.innerHTML = '';
    }
}

// Global functions for HTML onclick events
window.showSection = showSection;
window.switchCourse = switchCourse;
window.openLesson = openLesson;
window.closeLesson = closeLesson;
window.startLearning = () => showSection('learn');

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🚀 DOM loaded, initializing GitHub Master App...');
    
    try {
        // Initialize user
        await initializeUser();
        
        // Setup event listeners
        setupEventListeners();
        
        // Load initial course lessons
        loadLessons('beginner');
        
        console.log('✅ GitHub Master App initialized successfully!');
    } catch (error) {
        console.error('❌ App initialization failed:', error);
    }
});

console.log('📝 GitHub Master App script loaded!');
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import type { Bindings } from './types'

// Import API routes
import { apiRoutes } from './routes/api'
import { lessonRoutes } from './routes/lessons'
import { quizRoutes } from './routes/quiz'
import { practiceRoutes } from './routes/practice'
import { progressRoutes } from './routes/progress'

const app = new Hono<{ Bindings: Bindings }>()

// Middleware
app.use('/api/*', cors())

// API Routes first (before static files)
app.route('/api', apiRoutes)
app.route('/api/lessons', lessonRoutes)
app.route('/api/quiz', quizRoutes)
app.route('/api/practice', practiceRoutes)
app.route('/api/progress', progressRoutes)

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Main HTML route
app.get('/', async (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🎓 GitHub Master - 初心者向けGitHub学習アプリ</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="/static/style.css">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎓</text></svg>">
</head>
<body>
    <!-- Navigation Header -->
    <header class="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <i class="fab fa-github"></i>
                <span>GitHub Master</span>
            </div>
            <nav class="nav-menu">
                <a href="#home" class="nav-link active" data-section="home">
                    <i class="fas fa-home"></i> ホーム
                </a>
                <a href="#learn" class="nav-link" data-section="learn">
                    <i class="fas fa-book"></i> 学習
                </a>
                <a href="#practice" class="nav-link" data-section="practice">
                    <i class="fas fa-code"></i> 実践
                </a>
                <a href="#quiz" class="nav-link" data-section="quiz">
                    <i class="fas fa-brain"></i> クイズ
                </a>
                <a href="#manual" class="nav-link" data-section="manual">
                    <i class="fas fa-book-open"></i> マニュアル
                </a>
            </nav>
            <div class="nav-controls">
                <div class="progress-indicator">
                    <span class="progress-text">進捗: <span id="overall-progress">0</span>%</span>
                    <div class="progress-bar">
                        <div class="progress-fill" id="progress-fill"></div>
                    </div>
                </div>
                <div class="data-controls">
                    <button class="data-btn" onclick="dataManager.exportToFile()" title="学習データをダウンロード">
                        <i class="fas fa-download"></i>
                    </button>
                    <button class="data-btn" onclick="dataManager.importFromFile()" title="学習データを復元">
                        <i class="fas fa-upload"></i>
                    </button>
                    <div class="dropdown">
                        <button class="data-btn dropdown-toggle" title="その他のオプション">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                        <div class="dropdown-menu">
                            <button onclick="dataManager.generateQRCode()">
                                <i class="fas fa-qrcode"></i> QRコード生成
                            </button>
                            <button onclick="dataManager.generateShareURL()">
                                <i class="fas fa-link"></i> 共有URL作成
                            </button>
                            <button onclick="dataManager.showDataStats()">
                                <i class="fas fa-chart-bar"></i> データ統計
                            </button>
                            <hr>
                            <button onclick="dataManager.resetAllData()" class="danger">
                                <i class="fas fa-trash"></i> データリセット
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
        <!-- Home Section -->
        <section id="home-section" class="content-section active">
            <div class="hero-section">
                <div class="hero-content">
                    <h1 class="hero-title">
                        <i class="fab fa-github"></i>
                        GitHub Master
                    </h1>
                    <p class="hero-subtitle">初心者のためのGitHub学習アプリ</p>
                    <p class="hero-description">
                        GitとGitHubの基本から実践まで、図解とインタラクティブな学習で楽しく学べます！
                    </p>
                    <div class="hero-stats">
                        <div class="stat-item">
                            <div class="stat-number" id="lessons-completed">0</div>
                            <div class="stat-label">完了レッスン</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number" id="quiz-score">0</div>
                            <div class="stat-label">クイズスコア</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number" id="study-time">0</div>
                            <div class="stat-label">学習時間(分)</div>
                        </div>
                    </div>
                    <button class="cta-button" onclick="startLearning()">
                        <i class="fas fa-play"></i>
                        学習を始める
                    </button>
                </div>
                <div class="hero-visual">
                    <div class="github-illustration">
                        <div class="git-flow">
                            <div class="commit-node" style="animation-delay: 0s;">
                                <i class="fas fa-code-commit"></i>
                            </div>
                            <div class="commit-node" style="animation-delay: 0.5s;">
                                <i class="fas fa-code-branch"></i>
                            </div>
                            <div class="commit-node" style="animation-delay: 1s;">
                                <i class="fas fa-code-merge"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Learning Path -->
            <div class="learning-path">
                <h2 class="section-title">
                    <i class="fas fa-route"></i>
                    学習パス
                </h2>
                <div class="path-container">
                    <div class="path-item" data-level="beginner">
                        <div class="path-icon">
                            <i class="fas fa-seedling"></i>
                        </div>
                        <h3>初心者コース</h3>
                        <p>Gitの基本概念とGitHubの使い方</p>
                        <div class="path-progress">
                            <div class="progress-bar small">
                                <div class="progress-fill" style="width: 0%"></div>
                            </div>
                            <span>0/8 完了</span>
                        </div>
                    </div>
                    <div class="path-item" data-level="intermediate">
                        <div class="path-icon">
                            <i class="fas fa-tree"></i>
                        </div>
                        <h3>中級コース</h3>
                        <p>ブランチ管理とコラボレーション</p>
                        <div class="path-progress">
                            <div class="progress-bar small">
                                <div class="progress-fill" style="width: 0%"></div>
                            </div>
                            <span>0/6 完了</span>
                        </div>
                    </div>
                    <div class="path-item" data-level="advanced">
                        <div class="path-icon">
                            <i class="fas fa-rocket"></i>
                        </div>
                        <h3>上級コース</h3>
                        <p>GitHub Actions と高度な機能</p>
                        <div class="path-progress">
                            <div class="progress-bar small">
                                <div class="progress-fill" style="width: 0%"></div>
                            </div>
                            <span>0/4 完了</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Learning Section -->
        <section id="learn-section" class="content-section">
            <div class="section-header">
                <h2 class="section-title">
                    <i class="fas fa-book"></i>
                    学習コース
                </h2>
                <p class="section-description">段階的にGit・GitHubを学習しましょう</p>
            </div>

            <div class="course-tabs">
                <button class="course-tab active" data-course="beginner">
                    <i class="fas fa-seedling"></i>
                    初心者
                </button>
                <button class="course-tab" data-course="intermediate">
                    <i class="fas fa-tree"></i>
                    中級
                </button>
                <button class="course-tab" data-course="advanced">
                    <i class="fas fa-rocket"></i>
                    上級
                </button>
            </div>

            <div class="lessons-container">
                <div id="beginner-lessons" class="lessons-grid active">
                    <!-- Dynamic lessons will be loaded here -->
                </div>
                <div id="intermediate-lessons" class="lessons-grid">
                    <!-- Dynamic lessons will be loaded here -->
                </div>
                <div id="advanced-lessons" class="lessons-grid">
                    <!-- Dynamic lessons will be loaded here -->
                </div>
            </div>
        </section>

        <!-- Quiz Section -->
        <section id="quiz-section" class="content-section">
            <div class="section-header">
                <h2 class="section-title">
                    <i class="fas fa-brain"></i>
                    クイズで理解度チェック
                </h2>
                <p class="section-description">学習した内容をクイズで確認しましょう</p>
            </div>

            <div class="quiz-tabs">
                <button class="quiz-tab active" data-quiz="basic">
                    <i class="fas fa-info-circle"></i>
                    基本知識
                </button>
                <button class="quiz-tab" data-quiz="commands">
                    <i class="fas fa-terminal"></i>
                    コマンド
                </button>
                <button class="quiz-tab" data-quiz="workflow">
                    <i class="fas fa-project-diagram"></i>
                    ワークフロー
                </button>
            </div>

            <div class="quiz-container">
                <div id="quiz-content">
                    <!-- Dynamic quiz content will be loaded here -->
                </div>
            </div>
        </section>

        <!-- Practice Section -->
        <section id="practice-section" class="content-section">
            <div class="section-header">
                <h2 class="section-title">
                    <i class="fas fa-code"></i>
                    実践練習
                </h2>
                <p class="section-description">実際にGitコマンドを使って練習しましょう</p>
            </div>

            <div class="practice-terminal">
                <div class="terminal-header">
                    <div class="terminal-buttons">
                        <span class="terminal-button red"></span>
                        <span class="terminal-button yellow"></span>
                        <span class="terminal-button green"></span>
                    </div>
                    <div class="terminal-title">Git Practice Terminal</div>
                </div>
                <div class="terminal-content">
                    <div id="terminal-output">
                        <div class="terminal-line">
                            <span class="prompt">$ </span>
                            <span class="text">Welcome to Git Practice Terminal!</span>
                        </div>
                        <div class="terminal-line">
                            <span class="prompt">$ </span>
                            <span class="text">Type 'help' to see available commands.</span>
                        </div>
                    </div>
                    <div class="terminal-input-line">
                        <span class="prompt">$ </span>
                        <input type="text" id="terminal-input" placeholder="Type your git command here..." autocomplete="off">
                    </div>
                </div>
            </div>

            <div class="practice-exercises">
                <h3><i class="fas fa-tasks"></i> 練習課題</h3>
                <div class="exercises-grid">
                    <!-- Dynamic practice exercises will be loaded here -->
                </div>
            </div>
        </section>

        <!-- Manual Section -->
        <section id="manual-section" class="content-section">
            <div class="section-header">
                <h2 class="section-title">
                    <i class="fas fa-book-open"></i>
                    マニュアル・リファレンス
                </h2>
                <p class="section-description">Gitコマンドのリファレンスガイド</p>
            </div>

            <div class="manual-container">
                <div class="command-categories">
                    <div class="category-card">
                        <h3><i class="fas fa-plus"></i> 基本コマンド</h3>
                        <div class="command-list">
                            <div class="command-item">
                                <code>git init</code>
                                <span>リポジトリを初期化</span>
                            </div>
                            <div class="command-item">
                                <code>git add</code>
                                <span>ファイルをステージング</span>
                            </div>
                            <div class="command-item">
                                <code>git commit</code>
                                <span>変更をコミット</span>
                            </div>
                        </div>
                    </div>

                    <div class="category-card">
                        <h3><i class="fas fa-code-branch"></i> ブランチ操作</h3>
                        <div class="command-list">
                            <div class="command-item">
                                <code>git branch</code>
                                <span>ブランチ一覧・作成</span>
                            </div>
                            <div class="command-item">
                                <code>git checkout</code>
                                <span>ブランチを切り替え</span>
                            </div>
                            <div class="command-item">
                                <code>git merge</code>
                                <span>ブランチをマージ</span>
                            </div>
                        </div>
                    </div>

                    <div class="category-card">
                        <h3><i class="fas fa-cloud"></i> リモート操作</h3>
                        <div class="command-list">
                            <div class="command-item">
                                <code>git clone</code>
                                <span>リポジトリをクローン</span>
                            </div>
                            <div class="command-item">
                                <code>git push</code>
                                <span>変更をプッシュ</span>
                            </div>
                            <div class="command-item">
                                <code>git pull</code>
                                <span>変更をプル</span>
                            </div>
                        </div>
                    </div>

                    <div class="category-card">
                        <h3><i class="fas fa-info"></i> 情報確認</h3>
                        <div class="command-list">
                            <div class="command-item">
                                <code>git status</code>
                                <span>状態を確認</span>
                            </div>
                            <div class="command-item">
                                <code>git log</code>
                                <span>履歴を確認</span>
                            </div>
                            <div class="command-item">
                                <code>git diff</code>
                                <span>差分を確認</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Dynamic Content Container -->
        <div id="dynamic-content"></div>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-section">
                <h3><i class="fab fa-github"></i> GitHub Master</h3>
                <p>初心者のためのGitHub学習アプリ</p>
            </div>
            <div class="footer-section">
                <h4>学習リソース</h4>
                <ul>
                    <li><a href="#learn">基本コース</a></li>
                    <li><a href="#practice">実践練習</a></li>
                    <li><a href="#quiz">クイズ</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>サポート</h4>
                <ul>
                    <li><a href="#manual">マニュアル</a></li>
                    <li><a href="https://github.com">GitHub公式</a></li>
                    <li><a href="https://git-scm.com">Git公式</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>© 2024 GitHub Master. Educational purposes only.</p>
        </div>
    </footer>

    <!-- JavaScript -->
    <script src="/static/js/app-simple.js"></script>
</body>
</html>`)
})

export default app
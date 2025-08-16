import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'
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
app.use(renderer)

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// API Routes
app.route('/api', apiRoutes)
app.route('/api/lessons', lessonRoutes)
app.route('/api/quiz', quizRoutes)
app.route('/api/practice', practiceRoutes)
app.route('/api/progress', progressRoutes)

// Main application route
app.get('/', (c) => {
  return c.render(
    <div>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>🎓 GitHub Master - 初心者向けGitHub学習アプリ</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="stylesheet" href="/static/style.css" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎓</text></svg>" />
      </head>
      <body>
        {/* Navigation Header */}
        <header className="navbar">
          <div className="nav-container">
            <div className="nav-logo">
              <i className="fab fa-github"></i>
              <span>GitHub Master</span>
            </div>
            <nav className="nav-menu">
              <a href="#home" className="nav-link active" data-section="home">
                <i className="fas fa-home"></i> ホーム
              </a>
              <a href="#learn" className="nav-link" data-section="learn">
                <i className="fas fa-book"></i> 学習
              </a>
              <a href="#practice" className="nav-link" data-section="practice">
                <i className="fas fa-code"></i> 実践
              </a>
              <a href="#quiz" className="nav-link" data-section="quiz">
                <i className="fas fa-brain"></i> クイズ
              </a>
              <a href="#manual" className="nav-link" data-section="manual">
                <i className="fas fa-book-open"></i> マニュアル
              </a>
            </nav>
            <div className="nav-controls">
              <div className="progress-indicator">
                <span className="progress-text">進捗: <span id="overall-progress">0</span>%</span>
                <div className="progress-bar">
                  <div className="progress-fill" id="progress-fill"></div>
                </div>
              </div>
              <div className="data-controls">
                <button className="data-btn" onclick="dataManager.exportToFile()" title="学習データをダウンロード">
                  <i className="fas fa-download"></i>
                </button>
                <button className="data-btn" onclick="dataManager.importFromFile()" title="学習データを復元">
                  <i className="fas fa-upload"></i>
                </button>
                <div className="dropdown">
                  <button className="data-btn dropdown-toggle" title="その他のオプション">
                    <i className="fas fa-ellipsis-v"></i>
                  </button>
                  <div className="dropdown-menu">
                    <button onclick="dataManager.generateQRCode()">
                      <i className="fas fa-qrcode"></i> QRコード生成
                    </button>
                    <button onclick="dataManager.generateShareURL()">
                      <i className="fas fa-link"></i> 共有URL作成
                    </button>
                    <button onclick="dataManager.showDataStats()">
                      <i className="fas fa-chart-bar"></i> データ統計
                    </button>
                    <hr />
                    <button onclick="dataManager.resetAllData()" className="danger">
                      <i className="fas fa-trash"></i> データリセット
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="main-content">
          {/* Home Section */}
          <section id="home-section" className="content-section active">
            <div className="hero-section">
              <div className="hero-content">
                <h1 className="hero-title">
                  <i className="fab fa-github"></i>
                  GitHub Master
                </h1>
                <p className="hero-subtitle">初心者のためのGitHub学習アプリ</p>
                <p className="hero-description">
                  GitとGitHubの基本から実践まで、図解とインタラクティブな学習で楽しく学べます！
                </p>
                <div className="hero-stats">
                  <div className="stat-item">
                    <div className="stat-number" id="lessons-completed">0</div>
                    <div className="stat-label">完了レッスン</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number" id="quiz-score">0</div>
                    <div className="stat-label">クイズスコア</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number" id="study-time">0</div>
                    <div className="stat-label">学習時間(分)</div>
                  </div>
                </div>
                <button className="cta-button" onclick="startLearning()">
                  <i className="fas fa-play"></i>
                  学習を始める
                </button>
              </div>
              <div className="hero-visual">
                <div className="github-illustration">
                  <div className="git-flow">
                    <div className="commit-node" style="animation-delay: 0s;">
                      <i className="fas fa-code-commit"></i>
                    </div>
                    <div className="commit-node" style="animation-delay: 0.5s;">
                      <i className="fas fa-code-branch"></i>
                    </div>
                    <div className="commit-node" style="animation-delay: 1s;">
                      <i className="fas fa-code-merge"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Path */}
            <div className="learning-path">
              <h2 className="section-title">
                <i className="fas fa-route"></i>
                学習パス
              </h2>
              <div className="path-container">
                <div className="path-item" data-level="beginner">
                  <div className="path-icon">
                    <i className="fas fa-seedling"></i>
                  </div>
                  <h3>初心者コース</h3>
                  <p>Gitの基本概念とGitHubの使い方</p>
                  <div className="path-progress">
                    <div className="progress-bar small">
                      <div className="progress-fill" style="width: 0%"></div>
                    </div>
                    <span>0/8 完了</span>
                  </div>
                </div>
                <div className="path-item" data-level="intermediate">
                  <div className="path-icon">
                    <i className="fas fa-tree"></i>
                  </div>
                  <h3>中級コース</h3>
                  <p>ブランチ管理とコラボレーション</p>
                  <div className="path-progress">
                    <div className="progress-bar small">
                      <div className="progress-fill" style="width: 0%"></div>
                    </div>
                    <span>0/6 完了</span>
                  </div>
                </div>
                <div className="path-item" data-level="advanced">
                  <div className="path-icon">
                    <i className="fas fa-rocket"></i>
                  </div>
                  <h3>上級コース</h3>
                  <p>GitHub Actions と高度な機能</p>
                  <div className="path-progress">
                    <div className="progress-bar small">
                      <div className="progress-fill" style="width: 0%"></div>
                    </div>
                    <span>0/4 完了</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Dynamic content sections will be loaded here */}
          <div id="dynamic-content">
            {/* Content loaded via JavaScript */}
          </div>
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3><i className="fab fa-github"></i> GitHub Master</h3>
              <p>初心者のためのGitHub学習アプリ</p>
            </div>
            <div className="footer-section">
              <h4>学習リソース</h4>
              <ul>
                <li><a href="#learn">基本コース</a></li>
                <li><a href="#practice">実践練習</a></li>
                <li><a href="#quiz">クイズ</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>サポート</h4>
              <ul>
                <li><a href="#manual">マニュアル</a></li>
                <li><a href="https://github.com">GitHub公式</a></li>
                <li><a href="https://git-scm.com">Git公式</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 GitHub Master. Educational purposes only.</p>
          </div>
        </footer>

        {/* JavaScript */}
        <script src="/static/js/app.js"></script>
        <script src="/static/js/data-manager.js"></script>
        <script src="/static/js/lessons.js"></script>
        <script src="/static/js/quiz.js"></script>
        <script src="/static/js/practice.js"></script>
        <script src="/static/js/manual.js"></script>
      </body>
    </div>
  )
})

export default app
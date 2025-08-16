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

          {/* 学習セクション */}
          <section id="learn-section" className="content-section">
            <div className="section-header">
              <h2 className="section-title">
                <i className="fas fa-book"></i>
                学習コンテンツ
              </h2>
              <p className="section-description">段階的にGitHubをマスターしよう！</p>
            </div>

            <div className="course-tabs">
              <button className="tab-button active" data-course="beginner">
                <i className="fas fa-seedling"></i> 初心者
              </button>
              <button className="tab-button" data-course="intermediate">
                <i className="fas fa-tree"></i> 中級
              </button>
              <button className="tab-button" data-course="advanced">
                <i className="fas fa-rocket"></i> 上級
              </button>
            </div>

            <div className="course-content">
              {/* 初心者コース */}
              <div id="beginner-course" className="course-panel active">
                <div className="lessons-grid">
                  <div className="lesson-card" data-lesson="git-basics">
                    <div className="lesson-icon">
                      <i className="fab fa-git-alt"></i>
                    </div>
                    <h3>Gitとは？</h3>
                    <p>バージョン管理システムの基本概念</p>
                    <div className="lesson-meta">
                      <span className="duration"><i className="fas fa-clock"></i> 10分</span>
                      <span className="difficulty easy">初級</span>
                    </div>
                    <button className="lesson-button">
                      <i className="fas fa-play"></i> 開始
                    </button>
                  </div>

                  <div className="lesson-card" data-lesson="github-intro">
                    <div className="lesson-icon">
                      <i className="fab fa-github"></i>
                    </div>
                    <h3>GitHubとは？</h3>
                    <p>リモートリポジトリとソーシャルコーディング</p>
                    <div className="lesson-meta">
                      <span className="duration"><i className="fas fa-clock"></i> 15分</span>
                      <span className="difficulty easy">初級</span>
                    </div>
                    <button className="lesson-button">
                      <i className="fas fa-play"></i> 開始
                    </button>
                  </div>

                  <div className="lesson-card" data-lesson="repository-basics">
                    <div className="lesson-icon">
                      <i className="fas fa-folder-open"></i>
                    </div>
                    <h3>リポジトリの作成</h3>
                    <p>プロジェクトの始め方と初期設定</p>
                    <div className="lesson-meta">
                      <span className="duration"><i className="fas fa-clock"></i> 20分</span>
                      <span className="difficulty easy">初級</span>
                    </div>
                    <button className="lesson-button">
                      <i className="fas fa-play"></i> 開始
                    </button>
                  </div>

                  <div className="lesson-card" data-lesson="commit-push">
                    <div className="lesson-icon">
                      <i className="fas fa-upload"></i>
                    </div>
                    <h3>コミットとプッシュ</h3>
                    <p>変更の記録とアップロード</p>
                    <div className="lesson-meta">
                      <span className="duration"><i className="fas fa-clock"></i> 25分</span>
                      <span className="difficulty easy">初級</span>
                    </div>
                    <button className="lesson-button">
                      <i className="fas fa-play"></i> 開始
                    </button>
                  </div>
                </div>
              </div>

              {/* 中級コース */}
              <div id="intermediate-course" className="course-panel">
                <div className="lessons-grid">
                  <div className="lesson-card" data-lesson="branching-strategies">
                    <div className="lesson-icon">
                      <i className="fas fa-code-branch"></i>
                    </div>
                    <h3>ブランチ戦略</h3>
                    <p>Git Flowと効果的なブランチ管理戦略</p>
                    <div className="lesson-meta">
                      <span className="duration"><i className="fas fa-clock"></i> 20分</span>
                      <span className="difficulty medium">中級</span>
                    </div>
                    <button className="lesson-button">
                      <i className="fas fa-play"></i> 開始
                    </button>
                  </div>

                  <div className="lesson-card" data-lesson="merge-conflicts">
                    <div className="lesson-icon">
                      <i className="fas fa-exclamation-triangle"></i>
                    </div>
                    <h3>マージコンフリクトの解決</h3>
                    <p>コンフリクトが発生する理由と効果的な解決方法</p>
                    <div className="lesson-meta">
                      <span className="duration"><i className="fas fa-clock"></i> 25分</span>
                      <span className="difficulty medium">中級</span>
                    </div>
                    <button className="lesson-button">
                      <i className="fas fa-play"></i> 開始
                    </button>
                  </div>
                </div>
              </div>

              {/* 上級コース */}
              <div id="advanced-course" className="course-panel">
                <div className="lessons-grid">
                  <div className="lesson-card" data-lesson="github-actions">
                    <div className="lesson-icon">
                      <i className="fas fa-robot"></i>
                    </div>
                    <h3>GitHub Actions入門</h3>
                    <p>CI/CDパイプラインの構築と自動化</p>
                    <div className="lesson-meta">
                      <span className="duration"><i className="fas fa-clock"></i> 30分</span>
                      <span className="difficulty hard">上級</span>
                    </div>
                    <button className="lesson-button">
                      <i className="fas fa-play"></i> 開始
                    </button>
                  </div>

                  <div className="lesson-card" data-lesson="advanced-git">
                    <div className="lesson-icon">
                      <i className="fas fa-magic"></i>
                    </div>
                    <h3>高度なGit操作</h3>
                    <p>リベース、チェリーピック、サブモジュールなど</p>
                    <div className="lesson-meta">
                      <span className="duration"><i className="fas fa-clock"></i> 35分</span>
                      <span className="difficulty hard">上級</span>
                    </div>
                    <button className="lesson-button">
                      <i className="fas fa-play"></i> 開始
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 実践セクション */}
          <section id="practice-section" className="content-section">
            <div className="section-header">
              <h2 className="section-title">
                <i className="fas fa-code"></i>
                実践練習
              </h2>
              <p className="section-description">実際の操作を通じて学習しよう！</p>
            </div>
            
            <div className="practice-grid">
              <div className="practice-card">
                <div className="practice-icon">
                  <i className="fas fa-terminal"></i>
                </div>
                <h3>コマンドライン練習</h3>
                <p>Gitコマンドの基本操作を練習</p>
                <button className="practice-button" onclick="startCommandPractice()">
                  <i className="fas fa-play"></i> 開始
                </button>
              </div>

              <div className="practice-card">
                <div className="practice-icon">
                  <i className="fas fa-code-branch"></i>
                </div>
                <h3>ブランチ操作</h3>
                <p>ブランチの作成・切り替え・マージ</p>
                <button className="practice-button" onclick="startBranchPractice()">
                  <i className="fas fa-play"></i> 開始
                </button>
              </div>

              <div className="practice-card">
                <div className="practice-icon">
                  <i className="fas fa-code-pull-request"></i>
                </div>
                <h3>プルリクエスト</h3>
                <p>コラボレーションの基本</p>
                <button className="practice-button" onclick="startPRPractice()">
                  <i className="fas fa-play"></i> 開始
                </button>
              </div>
            </div>

            {/* 実践コンテンツエリア */}
            <div id="practice-content" className="practice-content-area">
              <!-- 動的にコンテンツが読み込まれます -->
            </div>
          </section>

          {/* クイズセクション */}
          <section id="quiz-section" className="content-section">
            <div className="section-header">
              <h2 className="section-title">
                <i className="fas fa-brain"></i>
                クイズチャレンジ
              </h2>
              <p className="section-description">知識をテストして理解度をチェック！</p>
            </div>

            <div className="quiz-options">
              <div className="quiz-card" data-quiz="basic">
                <div className="quiz-icon">
                  <i className="fas fa-star"></i>
                </div>
                <h3>基本知識クイズ</h3>
                <p>Git・GitHubの基本用語と概念</p>
                <div className="quiz-meta">
                  <span><i className="fas fa-question"></i> 10問</span>
                  <span><i className="fas fa-clock"></i> 5分</span>
                </div>
                <button className="quiz-button" onclick="startQuiz('basic')">
                  <i className="fas fa-play"></i> 開始
                </button>
              </div>

              <div className="quiz-card" data-quiz="commands">
                <div className="quiz-icon">
                  <i className="fas fa-terminal"></i>
                </div>
                <h3>コマンドクイズ</h3>
                <p>Gitコマンドの使い方をテスト</p>
                <div className="quiz-meta">
                  <span><i className="fas fa-question"></i> 15問</span>
                  <span><i className="fas fa-clock"></i> 8分</span>
                </div>
                <button className="quiz-button" onclick="startQuiz('commands')">
                  <i className="fas fa-play"></i> 開始
                </button>
              </div>

              <div className="quiz-card" data-quiz="workflow">
                <div className="quiz-icon">
                  <i className="fas fa-project-diagram"></i>
                </div>
                <h3>ワークフロークイズ</h3>
                <p>GitHubでの開発フローを理解</p>
                <div className="quiz-meta">
                  <span><i className="fas fa-question"></i> 12問</span>
                  <span><i className="fas fa-clock"></i> 10分</span>
                </div>
                <button className="quiz-button" onclick="startQuiz('workflow')">
                  <i className="fas fa-play"></i> 開始
                </button>
              </div>
            </div>

            {/* クイズコンテンツエリア */}
            <div id="quiz-content" className="quiz-content-area">
              <!-- 動的にクイズが読み込まれます -->
            </div>
          </section>

          {/* マニュアルセクション */}
          <section id="manual-section" className="content-section">
            <div className="section-header">
              <h2 className="section-title">
                <i className="fas fa-book-open"></i>
                完全マニュアル
              </h2>
              <p className="section-description">図解付きの詳細ガイド</p>
            </div>

            <div className="manual-sidebar">
              <nav className="manual-nav">
                <div className="manual-nav-item active" data-manual="getting-started">
                  <i className="fas fa-rocket"></i>
                  はじめに
                </div>
                <div className="manual-nav-item" data-manual="installation">
                  <i className="fas fa-download"></i>
                  インストール
                </div>
                <div className="manual-nav-item" data-manual="basic-concepts">
                  <i className="fas fa-lightbulb"></i>
                  基本概念
                </div>
                <div className="manual-nav-item" data-manual="commands">
                  <i className="fas fa-terminal"></i>
                  コマンド一覧
                </div>
                <div className="manual-nav-item" data-manual="workflows">
                  <i className="fas fa-sitemap"></i>
                  ワークフロー
                </div>
                <div className="manual-nav-item" data-manual="troubleshooting">
                  <i className="fas fa-tools"></i>
                  トラブルシューティング
                </div>
              </nav>
            </div>

            <div className="manual-content">
              <div id="manual-content-area">
                <!-- 動的にマニュアルコンテンツが読み込まれます -->
              </div>
            </div>
          </section>
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
        <script src="/static/js/data-manager.js"></script>
        <script src="/static/js/app.js"></script>
      </body>
    </div>
  )
})

export default app
import { Hono } from 'hono'
import type { Bindings, Lesson } from '../types'

export const lessonRoutes = new Hono<{ Bindings: Bindings }>()

// Lesson content data (in a real app, this might come from a CMS or database)
const lessonContent: Record<string, Lesson> = {
  // Beginner Course
  'git-basics': {
    id: 'git-basics',
    title: 'Gitとは？',
    description: 'バージョン管理システムの基本概念を学びます',
    course_type: 'beginner',
    duration: 10,
    difficulty: 'easy',
    order: 1,
    content: `
      <div class="lesson-content">
        <h2><i class="fab fa-git-alt"></i> Gitとは？</h2>
        
        <div class="lesson-section">
          <h3>🎯 学習目標</h3>
          <ul>
            <li>Gitの基本概念を理解する</li>
            <li>バージョン管理の重要性を学ぶ</li>
            <li>Gitの主要な特徴を把握する</li>
          </ul>
        </div>

        <div class="lesson-section">
          <h3>📚 Gitとは</h3>
          <p><strong>Git</strong>は、プログラムのソースコードなどの変更履歴を管理する<strong>分散型バージョン管理システム</strong>です。</p>
          
          <div class="info-box">
            <h4>💡 バージョン管理とは？</h4>
            <p>ファイルの変更履歴を管理し、過去の状態に戻したり、変更点を比較したりできる仕組みです。</p>
          </div>
        </div>

        <div class="lesson-section">
          <h3>🔥 Gitの主要な特徴</h3>
          <div class="feature-grid">
            <div class="feature-card">
              <i class="fas fa-network-wired"></i>
              <h4>分散型</h4>
              <p>各開発者が完全な履歴を持つ</p>
            </div>
            <div class="feature-card">
              <i class="fas fa-bolt"></i>
              <h4>高速</h4>
              <p>ローカルでの操作が基本</p>
            </div>
            <div class="feature-card">
              <i class="fas fa-shield-alt"></i>
              <h4>安全</h4>
              <p>データの整合性を保証</p>
            </div>
            <div class="feature-card">
              <i class="fas fa-code-branch"></i>
              <h4>ブランチ</h4>
              <p>並行開発が簡単</p>
            </div>
          </div>
        </div>

        <div class="lesson-section">
          <h3>🎨 Gitのワークフロー図解</h3>
          <div class="git-workflow-diagram">
            <div class="workflow-step">
              <div class="step-icon"><i class="fas fa-edit"></i></div>
              <div class="step-label">編集</div>
              <div class="step-desc">ファイルを変更</div>
            </div>
            <div class="workflow-arrow">→</div>
            <div class="workflow-step">
              <div class="step-icon"><i class="fas fa-plus"></i></div>
              <div class="step-label">ステージング</div>
              <div class="step-desc">変更を準備</div>
            </div>
            <div class="workflow-arrow">→</div>
            <div class="workflow-step">
              <div class="step-icon"><i class="fas fa-save"></i></div>
              <div class="step-label">コミット</div>
              <div class="step-desc">変更を記録</div>
            </div>
          </div>
        </div>

        <div class="lesson-section">
          <h3>🏆 まとめ</h3>
          <ul>
            <li>Gitは分散型バージョン管理システム</li>
            <li>変更履歴を効率的に管理できる</li>
            <li>複数人での開発に最適</li>
            <li>高速で安全なデータ管理</li>
          </ul>
        </div>

        <div class="lesson-actions">
          <button class="btn btn-success" onclick="completeLesson('git-basics')">
            <i class="fas fa-check"></i> レッスン完了
          </button>
          <button class="btn btn-primary" onclick="nextLesson('github-intro')">
            次のレッスン <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `
  },

  'github-intro': {
    id: 'github-intro',
    title: 'GitHubとは？',
    description: 'GitHubの基本概念とソーシャルコーディングを学びます',
    course_type: 'beginner',
    duration: 15,
    difficulty: 'easy',
    order: 2,
    content: `
      <div class="lesson-content">
        <h2><i class="fab fa-github"></i> GitHubとは？</h2>
        
        <div class="lesson-section">
          <h3>🎯 学習目標</h3>
          <ul>
            <li>GitHubの基本概念を理解する</li>
            <li>リモートリポジトリの役割を学ぶ</li>
            <li>ソーシャルコーディングの価値を把握する</li>
          </ul>
        </div>

        <div class="lesson-section">
          <h3>🌐 GitHubとは</h3>
          <p><strong>GitHub</strong>は、Gitリポジトリのホスティングサービスで、世界最大の<strong>ソーシャルコーディングプラットフォーム</strong>です。</p>
          
          <div class="info-box">
            <h4>💡 ソーシャルコーディングとは？</h4>
            <p>開発者同士が協力し、知識を共有しながらプログラムを開発するアプローチです。</p>
          </div>
        </div>

        <div class="lesson-section">
          <h3>⭐ GitHubの主要機能</h3>
          <div class="github-features">
            <div class="feature-item">
              <i class="fas fa-folder"></i>
              <h4>リポジトリホスティング</h4>
              <p>Gitリポジトリをクラウドで管理</p>
            </div>
            <div class="feature-item">
              <i class="fas fa-code-pull-request"></i>
              <h4>プルリクエスト</h4>
              <p>コードレビューと協力開発</p>
            </div>
            <div class="feature-item">
              <i class="fas fa-bug"></i>
              <h4>Issues</h4>
              <p>バグ報告や機能要求の管理</p>
            </div>
            <div class="feature-item">
              <i class="fas fa-robot"></i>
              <h4>GitHub Actions</h4>
              <p>CI/CDの自動化</p>
            </div>
            <div class="feature-item">
              <i class="fas fa-users"></i>
              <h4>コミュニティ</h4>
              <p>開発者との交流とフォロー</p>
            </div>
            <div class="feature-item">
              <i class="fas fa-book"></i>
              <h4>Documentation</h4>
              <p>Wiki、README、GitHub Pages</p>
            </div>
          </div>
        </div>

        <div class="lesson-section">
          <h3>🎨 GitHub vs Git の関係</h3>
          <div class="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>Git</th>
                  <th>GitHub</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>バージョン管理システム</td>
                  <td>ホスティングサービス</td>
                </tr>
                <tr>
                  <td>ローカルで動作</td>
                  <td>クラウドベース</td>
                </tr>
                <tr>
                  <td>コマンドライン</td>
                  <td>Web UI + API</td>
                </tr>
                <tr>
                  <td>個人作業</td>
                  <td>チーム協力</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="lesson-section">
          <h3>🚀 GitHubの利点</h3>
          <ul>
            <li><strong>🌐 どこからでもアクセス</strong> - インターネットがあればどこでも</li>
            <li><strong>👥 チーム開発</strong> - 複数人での協力が簡単</li>
            <li><strong>📈 ポートフォリオ</strong> - 作品を世界に公開</li>
            <li><strong>🔍 発見</strong> - 他の優秀なプロジェクトを見つける</li>
            <li><strong>📚 学習</strong> - オープンソースから学べる</li>
          </ul>
        </div>

        <div class="lesson-actions">
          <button class="btn btn-success" onclick="completeLesson('github-intro')">
            <i class="fas fa-check"></i> レッスン完了
          </button>
          <button class="btn btn-primary" onclick="nextLesson('repository-basics')">
            次のレッスン <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `
  },

  'repository-basics': {
    id: 'repository-basics',
    title: 'リポジトリの作成',
    description: 'GitHubリポジトリの作成と初期設定を学びます',
    course_type: 'beginner',
    duration: 20,
    difficulty: 'easy',
    order: 3,
    content: `
      <div class="lesson-content">
        <h2><i class="fas fa-folder-open"></i> リポジトリの作成</h2>
        
        <div class="lesson-section">
          <h3>🎯 学習目標</h3>
          <ul>
            <li>リポジトリの概念を理解する</li>
            <li>GitHubでリポジトリを作成する方法を学ぶ</li>
            <li>初期設定の重要性を把握する</li>
          </ul>
        </div>

        <div class="lesson-section">
          <h3>📁 リポジトリとは</h3>
          <p><strong>リポジトリ（Repository）</strong>は、プロジェクトのファイルとその変更履歴を保存する<strong>「箱」</strong>のようなものです。</p>
          
          <div class="repo-visual">
            <div class="repo-box">
              <div class="repo-header">
                <i class="fas fa-folder"></i> my-first-project
              </div>
              <div class="repo-content">
                <div class="file-item"><i class="fas fa-file"></i> README.md</div>
                <div class="file-item"><i class="fas fa-file-code"></i> index.html</div>
                <div class="file-item"><i class="fas fa-file-code"></i> style.css</div>
                <div class="file-item"><i class="fas fa-file-code"></i> script.js</div>
              </div>
            </div>
          </div>
        </div>

        <div class="lesson-section">
          <h3>🔧 リポジトリ作成手順</h3>
          <div class="steps-container">
            <div class="step-item">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>GitHubにログイン</h4>
                <p>github.com にアクセスしてアカウントにログイン</p>
              </div>
            </div>
            <div class="step-item">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>「New repository」をクリック</h4>
                <p>緑色の「New」ボタンまたは「+」メニューから選択</p>
              </div>
            </div>
            <div class="step-item">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>リポジトリ情報を入力</h4>
                <p>名前、説明、公開設定などを設定</p>
              </div>
            </div>
            <div class="step-item">
              <div class="step-number">4</div>
              <div class="step-content">
                <h4>「Create repository」</h4>
                <p>設定を確認して作成ボタンをクリック</p>
              </div>
            </div>
          </div>
        </div>

        <div class="lesson-section">
          <h3>⚙️ 重要な初期設定</h3>
          <div class="settings-grid">
            <div class="setting-card">
              <i class="fas fa-tag"></i>
              <h4>リポジトリ名</h4>
              <p>わかりやすく、英数字とハイフンを使用</p>
              <div class="example">例: my-portfolio</div>
            </div>
            <div class="setting-card">
              <i class="fas fa-file-alt"></i>
              <h4>説明文</h4>
              <p>プロジェクトの目的を簡潔に説明</p>
              <div class="example">例: 個人ポートフォリオサイト</div>
            </div>
            <div class="setting-card">
              <i class="fas fa-eye"></i>
              <h4>公開設定</h4>
              <p>Public（公開）またはPrivate（非公開）</p>
              <div class="example">学習用: Public推奨</div>
            </div>
            <div class="setting-card">
              <i class="fas fa-readme"></i>
              <h4>README</h4>
              <p>プロジェクトの説明書を自動作成</p>
              <div class="example">✅ 必ずチェック</div>
            </div>
          </div>
        </div>

        <div class="lesson-section">
          <h3>📝 README.md の重要性</h3>
          <p>README.mdは<strong>プロジェクトの顔</strong>となる重要なファイルです。</p>
          <div class="readme-structure">
            <h4>📋 READMEに含めるべき内容</h4>
            <ul>
              <li>プロジェクトの説明</li>
              <li>インストール方法</li>
              <li>使用方法</li>
              <li>ライセンス情報</li>
              <li>コントリビューション方法</li>
            </ul>
          </div>
        </div>

        <div class="lesson-actions">
          <button class="btn btn-success" onclick="completeLesson('repository-basics')">
            <i class="fas fa-check"></i> レッスン完了
          </button>
          <button class="btn btn-primary" onclick="nextLesson('commit-push')">
            次のレッスン <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `
  },

  'commit-push': {
    id: 'commit-push',
    title: 'コミットとプッシュ',
    description: '変更の記録とリモートリポジトリへのアップロード方法を学びます',
    course_type: 'beginner',
    duration: 25,
    difficulty: 'easy',
    order: 4,
    content: `
      <div class="lesson-content">
        <h2><i class="fas fa-upload"></i> コミットとプッシュ</h2>
        
        <div class="lesson-section">
          <h3>🎯 学習目標</h3>
          <ul>
            <li>コミットの概念と重要性を理解する</li>
            <li>プッシュでリモートに変更を送る方法を学ぶ</li>
            <li>基本的なGitワークフローを身につける</li>
          </ul>
        </div>

        <div class="lesson-section">
          <h3>💾 コミットとは</h3>
          <p><strong>コミット（Commit）</strong>は、変更を<strong>「スナップショット」</strong>として記録することです。</p>
          
          <div class="commit-visual">
            <div class="commit-timeline">
              <div class="commit-node">
                <i class="fas fa-camera"></i>
                <div class="commit-info">
                  <div class="commit-msg">Initial commit</div>
                  <div class="commit-hash">a1b2c3d</div>
                </div>
              </div>
              <div class="commit-line"></div>
              <div class="commit-node">
                <i class="fas fa-camera"></i>
                <div class="commit-info">
                  <div class="commit-msg">Add navigation</div>
                  <div class="commit-hash">e4f5g6h</div>
                </div>
              </div>
              <div class="commit-line"></div>
              <div class="commit-node active">
                <i class="fas fa-camera"></i>
                <div class="commit-info">
                  <div class="commit-msg">Fix header style</div>
                  <div class="commit-hash">i7j8k9l</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="lesson-section">
          <h3>🔄 Gitワークフロー</h3>
          <div class="workflow-diagram">
            <div class="workflow-stage">
              <div class="stage-icon working"><i class="fas fa-edit"></i></div>
              <div class="stage-label">作業ディレクトリ</div>
              <div class="stage-desc">ファイルを編集</div>
            </div>
            <div class="workflow-arrow">
              <div class="arrow-label">git add</div>
              <i class="fas fa-arrow-right"></i>
            </div>
            <div class="workflow-stage">
              <div class="stage-icon staging"><i class="fas fa-plus"></i></div>
              <div class="stage-label">ステージングエリア</div>
              <div class="stage-desc">コミット準備</div>
            </div>
            <div class="workflow-arrow">
              <div class="arrow-label">git commit</div>
              <i class="fas fa-arrow-right"></i>
            </div>
            <div class="workflow-stage">
              <div class="stage-icon local"><i class="fas fa-database"></i></div>
              <div class="stage-label">ローカルリポジトリ</div>
              <div class="stage-desc">履歴を記録</div>
            </div>
            <div class="workflow-arrow">
              <div class="arrow-label">git push</div>
              <i class="fas fa-arrow-right"></i>
            </div>
            <div class="workflow-stage">
              <div class="stage-icon remote"><i class="fab fa-github"></i></div>
              <div class="stage-label">リモートリポジトリ</div>
              <div class="stage-desc">GitHubに同期</div>
            </div>
          </div>
        </div>

        <div class="lesson-section">
          <h3>⌨️ 基本コマンド</h3>
          <div class="command-list">
            <div class="command-item">
              <div class="command-code">git add .</div>
              <div class="command-desc">全ての変更をステージングエリアに追加</div>
            </div>
            <div class="command-item">
              <div class="command-code">git commit -m "メッセージ"</div>
              <div class="command-desc">変更をコミット（メッセージ付き）</div>
            </div>
            <div class="command-item">
              <div class="command-code">git push origin main</div>
              <div class="command-desc">ローカルの変更をリモートリポジトリに送信</div>
            </div>
            <div class="command-item">
              <div class="command-code">git status</div>
              <div class="command-desc">現在の状態を確認</div>
            </div>
          </div>
        </div>

        <div class="lesson-section">
          <h3>✍️ 良いコミットメッセージの書き方</h3>
          <div class="commit-message-guide">
            <div class="good-example">
              <h4>✅ 良い例</h4>
              <ul>
                <li>"Add user authentication feature"</li>
                <li>"Fix navbar responsive design"</li>
                <li>"Update README with installation steps"</li>
              </ul>
            </div>
            <div class="bad-example">
              <h4>❌ 悪い例</h4>
              <ul>
                <li>"fix"</li>
                <li>"update"</li>
                <li>"いろいろ変更"</li>
              </ul>
            </div>
          </div>
          
          <div class="commit-tips">
            <h4>📝 コミットメッセージのコツ</h4>
            <ul>
              <li>英語で書く（推奨）</li>
              <li>動詞から始める（Add, Fix, Update等）</li>
              <li>50文字以内で簡潔に</li>
              <li>何を変更したかを明確に</li>
            </ul>
          </div>
        </div>

        <div class="lesson-section">
          <h3>🎯 実践の流れ</h3>
          <div class="practice-flow">
            <div class="flow-step">
              <div class="step-num">1</div>
              <div class="step-text">ファイルを編集・作成</div>
            </div>
            <div class="flow-step">
              <div class="step-num">2</div>
              <div class="step-text">git add で変更を追加</div>
            </div>
            <div class="flow-step">
              <div class="step-num">3</div>
              <div class="step-text">git commit でスナップショット作成</div>
            </div>
            <div class="flow-step">
              <div class="step-num">4</div>
              <div class="step-text">git push でGitHubに送信</div>
            </div>
          </div>
        </div>

        <div class="lesson-actions">
          <button class="btn btn-success" onclick="completeLesson('commit-push')">
            <i class="fas fa-check"></i> レッスン完了
          </button>
          <button class="btn btn-info" onclick="showSection('practice')">
            実践練習へ <i class="fas fa-code"></i>
          </button>
        </div>
      </div>
    `
  },

  // Intermediate Course
  'branching-strategies': {
    id: 'branching-strategies',
    title: 'ブランチ戦略',
    description: 'Git Flowと効果的なブランチ管理戦略を学びます',
    course_type: 'intermediate',
    duration: 20,
    difficulty: 'medium',
    order: 1,
    content: `
      <div class="lesson-content">
        <h2><i class="fas fa-code-branch"></i> ブランチ戦略</h2>
        
        <div class="lesson-section">
          <h3>🎯 学習目標</h3>
          <ul>
            <li>Git Flowの概念を理解する</li>
            <li>効果的なブランチ命名規則を学ぶ</li>
            <li>チーム開発でのブランチ戦略を身につける</li>
          </ul>
        </div>

        <div class="lesson-section">
          <h3>🌳 Git Flow とは</h3>
          <p><strong>Git Flow</strong>は、Gitを使った開発フローの一つで、特定のブランチ構造と運用ルールを定めた手法です。</p>
        </div>

        <div class="lesson-actions">
          <button class="btn btn-success" onclick="completeLesson('branching-strategies')">
            <i class="fas fa-check"></i> レッスン完了
          </button>
        </div>
      </div>
    `
  },

  'merge-conflicts': {
    id: 'merge-conflicts',
    title: 'マージコンフリクトの解決',
    description: 'コンフリクトが発生する理由と効果的な解決方法を学びます',
    course_type: 'intermediate',
    duration: 25,
    difficulty: 'medium',
    order: 2,
    content: `
      <div class="lesson-content">
        <h2><i class="fas fa-exclamation-triangle"></i> マージコンフリクトの解決</h2>
        
        <div class="lesson-section">
          <h3>🎯 学習目標</h3>
          <ul>
            <li>マージコンフリクトが発生する原因を理解する</li>
            <li>コンフリクトを効率的に解決する方法を学ぶ</li>
            <li>コンフリクトを予防する開発手法を身につける</li>
          </ul>
        </div>

        <div class="lesson-actions">
          <button class="btn btn-success" onclick="completeLesson('merge-conflicts')">
            <i class="fas fa-check"></i> レッスン完了
          </button>
        </div>
      </div>
    `
  },

  // Advanced Course
  'github-actions': {
    id: 'github-actions',
    title: 'GitHub Actions入門',
    description: 'CI/CDパイプラインの構築と自動化を学びます',
    course_type: 'advanced',
    duration: 30,
    difficulty: 'hard',
    order: 1,
    content: `
      <div class="lesson-content">
        <h2><i class="fas fa-robot"></i> GitHub Actions入門</h2>
        
        <div class="lesson-section">
          <h3>🎯 学習目標</h3>
          <ul>
            <li>GitHub Actionsの基本概念を理解する</li>
            <li>ワークフローファイルの書き方を学ぶ</li>
            <li>CI/CDパイプラインを構築する</li>
          </ul>
        </div>

        <div class="lesson-actions">
          <button class="btn btn-success" onclick="completeLesson('github-actions')">
            <i class="fas fa-check"></i> レッスン完了
          </button>
        </div>
      </div>
    `
  },

  'advanced-git': {
    id: 'advanced-git',
    title: '高度なGit操作',
    description: 'リベース、チェリーピック、サブモジュールなどの高度な機能を学びます',
    course_type: 'advanced',
    duration: 35,
    difficulty: 'hard',
    order: 2,
    content: `
      <div class="lesson-content">
        <h2><i class="fas fa-magic"></i> 高度なGit操作</h2>
        
        <div class="lesson-section">
          <h3>🎯 学習目標</h3>
          <ul>
            <li>git rebaseの使い方を学ぶ</li>
            <li>cherry-pickで特定のコミットを取り込む</li>
            <li>サブモジュールの管理方法を理解する</li>
          </ul>
        </div>

        <div class="lesson-actions">
          <button class="btn btn-success" onclick="completeLesson('advanced-git')">
            <i class="fas fa-check"></i> レッスン完了
          </button>
        </div>
      </div>
    `
  }
}

// Get lesson content
lessonRoutes.get('/:lessonId', (c) => {
  const lessonId = c.req.param('lessonId')
  const lesson = lessonContent[lessonId]
  
  if (!lesson) {
    return c.json({ error: 'Lesson not found' }, 404)
  }
  
  return c.json({
    success: true,
    data: lesson
  })
})

// Get all lessons for a course
lessonRoutes.get('/course/:courseType', (c) => {
  const courseType = c.req.param('courseType')
  
  const courseLessons = Object.values(lessonContent)
    .filter(lesson => lesson.course_type === courseType)
    .sort((a, b) => a.order - b.order)
  
  return c.json({
    success: true,
    data: courseLessons
  })
})

// Get lesson list (metadata only)
lessonRoutes.get('/', (c) => {
  const lessons = Object.values(lessonContent).map(lesson => ({
    id: lesson.id,
    title: lesson.title,
    description: lesson.description,
    course_type: lesson.course_type,
    duration: lesson.duration,
    difficulty: lesson.difficulty,
    order: lesson.order
  }))
  
  return c.json({
    success: true,
    data: lessons
  })
})
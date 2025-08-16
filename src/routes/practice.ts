import { Hono } from 'hono'
import type { Bindings, PracticeExercise } from '../types'

export const practiceRoutes = new Hono<{ Bindings: Bindings }>()

// Practice exercises data
const practiceExercises: Record<string, PracticeExercise[]> = {
  command: [
    {
      id: 'basic-git-setup',
      practice_type: 'command',
      title: 'Git基本設定',
      description: 'Gitの基本設定を行い、最初のリポジトリを作成しましょう',
      instructions: [
        'Gitのユーザー名を設定してください',
        'Gitのメールアドレスを設定してください',
        '新しいディレクトリを作成してください',
        'Gitリポジトリを初期化してください',
        'READMEファイルを作成してください',
        'ファイルをステージングしてください',
        '最初のコミットを作成してください'
      ],
      expected_commands: [
        'git config --global user.name "Your Name"',
        'git config --global user.email "your.email@example.com"',
        'mkdir my-project',
        'cd my-project',
        'git init',
        'echo "# My Project" > README.md',
        'git add README.md',
        'git commit -m "Initial commit"'
      ],
      hints: [
        'git config コマンドでユーザー情報を設定できます',
        'mkdir コマンドでディレクトリを作成できます',
        'git init でGitリポジトリを初期化できます',
        'echo コマンドでファイルを作成できます',
        'git add でファイルをステージングできます',
        'git commit -m でメッセージ付きコミットができます'
      ]
    },
    {
      id: 'file-management',
      practice_type: 'command',
      title: 'ファイル管理の実践',
      description: 'Gitでのファイル追加、修正、削除の操作を練習しましょう',
      instructions: [
        '新しいファイル index.html を作成してください',
        'index.html を Git で追跡してください',
        'ファイルの内容を修正してください',
        '変更をステージングしてください',
        '変更をコミットしてください',
        'Git の状態を確認してください',
        'コミット履歴を表示してください'
      ],
      expected_commands: [
        'touch index.html',
        'git add index.html',
        'echo "<!DOCTYPE html>" > index.html',
        'git add index.html',
        'git commit -m "Add index.html"',
        'git status',
        'git log --oneline'
      ],
      hints: [
        'touch コマンドで空ファイルを作成できます',
        'echo コマンドでファイルに内容を書き込めます',
        'git status で現在の状態を確認できます',
        'git log でコミット履歴を見ることができます'
      ]
    },
    {
      id: 'remote-operations',
      practice_type: 'command',
      title: 'リモートリポジトリ操作',
      description: 'GitHub などのリモートリポジトリとの連携を練習しましょう',
      instructions: [
        'リモートリポジトリを追加してください',
        'リモートリポジトリの情報を確認してください',
        'ローカルの変更をリモートにプッシュしてください',
        'リモートから最新の変更を取得してください'
      ],
      expected_commands: [
        'git remote add origin https://github.com/username/repository.git',
        'git remote -v',
        'git push -u origin main',
        'git pull origin main'
      ],
      hints: [
        'git remote add でリモートリポジトリを追加できます',
        'git remote -v でリモートリポジトリの一覧を表示できます',
        'git push でローカルの変更をリモートに送信できます',
        'git pull でリモートの変更を取得・マージできます'
      ]
    }
  ],

  branch: [
    {
      id: 'basic-branching',
      practice_type: 'branch',
      title: 'ブランチの基本操作',
      description: 'ブランチの作成、切り替え、統合の基本を学びましょう',
      instructions: [
        '現在のブランチを確認してください',
        '新しいブランチ "feature/header" を作成してください',
        '作成したブランチに切り替えてください',
        'ブランチ一覧を表示してください',
        'header.html ファイルを作成してください',
        '変更をコミットしてください',
        'main ブランチに切り替えてください',
        'feature/header ブランチをマージしてください'
      ],
      expected_commands: [
        'git branch',
        'git branch feature/header',
        'git checkout feature/header',
        'git branch -a',
        'echo "<header>Header Content</header>" > header.html',
        'git add header.html',
        'git commit -m "Add header component"',
        'git checkout main',
        'git merge feature/header'
      ],
      hints: [
        'git branch でブランチ操作ができます',
        'git checkout でブランチを切り替えられます',
        'git branch -a で全ブランチを表示できます',
        'git merge で他のブランチを統合できます'
      ]
    },
    {
      id: 'feature-development',
      practice_type: 'branch',
      title: '機能開発ワークフロー',
      description: '実際の開発での機能ブランチの使い方を練習しましょう',
      instructions: [
        '新しい機能ブランチ "feature/navigation" を作成・切り替えしてください',
        'nav.css ファイルを作成してください',
        'navigation.js ファイルも作成してください',
        'すべての変更をまとめてコミットしてください',
        'main ブランチに戻ってください',
        '別の機能ブランチ "feature/footer" を作成してください',
        'footer.html を作成してコミットしてください',
        'main ブランチで navigation 機能をマージしてください',
        'footer 機能もマージしてください'
      ],
      expected_commands: [
        'git checkout -b feature/navigation',
        'echo ".nav { display: flex; }" > nav.css',
        'echo "console.log(\'navigation\');" > navigation.js',
        'git add .',
        'git commit -m "Add navigation feature"',
        'git checkout main',
        'git checkout -b feature/footer',
        'echo "<footer>Footer Content</footer>" > footer.html',
        'git add footer.html',
        'git commit -m "Add footer component"',
        'git checkout main',
        'git merge feature/navigation',
        'git merge feature/footer'
      ],
      hints: [
        'git checkout -b でブランチ作成と切り替えを同時にできます',
        'git add . で全ての変更をステージングできます',
        '機能ごとにブランチを分けることで並行開発が可能です'
      ]
    },
    {
      id: 'conflict-resolution',
      practice_type: 'branch',
      title: 'コンフリクト解決',
      description: 'マージコンフリクトの解決方法を学びましょう',
      instructions: [
        'main ブランチで config.txt を作成してコミットしてください',
        'ブランチ "update-config-1" を作成・切り替えしてください',
        'config.txt の内容を修正してコミットしてください',
        'main ブランチに戻ってください',
        'ブランチ "update-config-2" を作成・切り替えしてください',
        'config.txt の同じ行を別の内容で修正してコミットしてください',
        'main ブランチに戻って update-config-1 をマージしてください',
        'update-config-2 をマージしてコンフリクトを解決してください'
      ],
      expected_commands: [
        'echo "version=1.0" > config.txt',
        'git add config.txt',
        'git commit -m "Add initial config"',
        'git checkout -b update-config-1',
        'echo "version=1.1" > config.txt',
        'git add config.txt',
        'git commit -m "Update version to 1.1"',
        'git checkout main',
        'git checkout -b update-config-2',
        'echo "version=2.0" > config.txt',
        'git add config.txt',
        'git commit -m "Update version to 2.0"',
        'git checkout main',
        'git merge update-config-1',
        'git merge update-config-2'
      ],
      hints: [
        'マージコンフリクトが発生したら手動で編集が必要です',
        'コンフリクトマーカー (<<<<, ====, >>>>) を削除してください',
        '解決後は git add と git commit を実行してください'
      ]
    }
  ],

  pullrequest: [
    {
      id: 'github-workflow',
      practice_type: 'pullrequest',
      title: 'GitHub Pull Request ワークフロー',
      description: 'GitHubでのPull Requestを使った開発フローを練習しましょう',
      instructions: [
        'GitHubでリポジトリをフォークしてください',
        'フォークしたリポジトリをクローンしてください',
        '新しいブランチを作成してください',
        '何らかの改善を加えてコミットしてください',
        '変更をGitHubにプッシュしてください',
        'GitHubでPull Requestを作成してください',
        'レビュー後にマージしてください'
      ],
      expected_commands: [
        '# GitHubでForkボタンをクリック',
        'git clone https://github.com/yourusername/forked-repo.git',
        'cd forked-repo',
        'git checkout -b improvement/readme',
        'echo "## Installation" >> README.md',
        'git add README.md',
        'git commit -m "Add installation section to README"',
        'git push origin improvement/readme',
        '# GitHubでPull Requestを作成'
      ],
      hints: [
        'Fork は元のリポジトリの個人コピーを作成します',
        'ブランチ名は何を変更するかが分かりやすい名前にしましょう',
        'Pull Request の説明は詳細に書きましょう',
        'レビューでのフィードバックは学習の機会です'
      ]
    },
    {
      id: 'collaborative-development',
      practice_type: 'pullrequest',
      title: 'チーム開発の実践',
      description: '実際のチーム開発でのPull Requestの使い方を学びましょう',
      instructions: [
        'Issue を作成して作業内容を明確にしてください',
        'Issue 番号を含むブランチ名で作業ブランチを作成してください',
        '機能を実装してテストしてください',
        'コミットメッセージに Issue 番号を含めてください',
        'Pull Request の説明で Issue をリンクしてください',
        'レビュアーを指定してレビューを依頼してください',
        'フィードバックに基づいて修正してください'
      ],
      expected_commands: [
        '# GitHub で Issue を作成 (例: Issue #123)',
        'git checkout -b feature/123-user-authentication',
        'echo "function authenticate() { }" > auth.js',
        'git add auth.js',
        'git commit -m "Add user authentication feature (fixes #123)"',
        'git push origin feature/123-user-authentication',
        '# Pull Request で "Closes #123" を説明に記載'
      ],
      hints: [
        'Issue は作業の目的と要件を明確にします',
        'ブランチ名に Issue 番号を含めると管理しやすいです',
        '"fixes #123" でコミットとIssueを自動リンクできます',
        'レビューは品質向上の重要なプロセスです'
      ]
    },
    {
      id: 'code-review-process',
      practice_type: 'pullrequest',
      title: 'コードレビュープロセス',
      description: 'レビュアーとして、また作者としてのコードレビューを練習しましょう',
      instructions: [
        '他の人のPull Requestをレビューしてください',
        'コードの品質をチェックしてください',
        '建設的なフィードバックを提供してください',
        '自分のPull Requestでフィードバックを受けてください',
        'フィードバックに基づいて修正してください',
        '修正をプッシュして再レビューを依頼してください',
        'レビューが承認されたらマージしてください'
      ],
      expected_commands: [
        '# GitHubでFiles Changedタブを確認',
        '# +ボタンでインラインコメントを追加',
        'git checkout feature/authentication',
        'echo "// Add proper error handling" >> auth.js',
        'git add auth.js',
        'git commit -m "Add error handling based on review feedback"',
        'git push origin feature/authentication',
        '# Re-request review on GitHub'
      ],
      hints: [
        'レビューでは機能性、可読性、保守性を確認しましょう',
        '建設的で具体的なフィードバックを心がけましょう',
        '修正後は必ず再テストを行いましょう',
        'レビューは学習とチーム内知識共有の機会です'
      ]
    }
  ]
}

// Get practice exercises by type
practiceRoutes.get('/:practiceType', (c) => {
  const practiceType = c.req.param('practiceType')
  const exercises = practiceExercises[practiceType]
  
  if (!exercises) {
    return c.json({ error: 'Practice type not found' }, 404)
  }
  
  return c.json({
    success: true,
    data: exercises
  })
})

// Get specific exercise
practiceRoutes.get('/:practiceType/:exerciseId', (c) => {
  const practiceType = c.req.param('practiceType')
  const exerciseId = c.req.param('exerciseId')
  
  const exercises = practiceExercises[practiceType]
  if (!exercises) {
    return c.json({ error: 'Practice type not found' }, 404)
  }
  
  const exercise = exercises.find(ex => ex.id === exerciseId)
  if (!exercise) {
    return c.json({ error: 'Exercise not found' }, 404)
  }
  
  return c.json({
    success: true,
    data: exercise
  })
})

// Submit practice session result
practiceRoutes.post('/session', async (c) => {
  try {
    const { user_id, practice_type, exercise_id, session_data, completed, time_spent } = await c.req.json()
    
    if (!user_id || !practice_type || !exercise_id) {
      return c.json({ error: 'Missing required fields' }, 400)
    }

    const { env } = c

    // Insert practice session
    const result = await env.DB.prepare(`
      INSERT INTO practice_sessions (user_id, practice_type, session_data, completed, time_spent, completion_date)
      VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).bind(
      user_id, 
      practice_type, 
      JSON.stringify({ exercise_id, ...session_data }),
      completed ? 1 : 0, 
      time_spent || 0
    ).run()

    if (result.success) {
      // Update user stats if completed
      if (completed) {
        await env.DB.prepare(`
          UPDATE user_stats 
          SET 
            practice_sessions_completed = practice_sessions_completed + 1,
            total_study_time = total_study_time + ?,
            updated_at = CURRENT_TIMESTAMP
          WHERE user_id = ?
        `).bind(time_spent || 0, user_id).run()
      }

      return c.json({
        success: true,
        message: 'Practice session recorded successfully',
        data: { id: result.meta.last_row_id }
      })
    } else {
      throw new Error('Failed to record practice session')
    }
  } catch (error) {
    console.error('Error recording practice session:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to record practice session',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})

// Get user practice sessions
practiceRoutes.get('/sessions/:userId', async (c) => {
  try {
    const userId = c.req.param('userId')
    const practiceType = c.req.query('type')
    const { env } = c

    let query = 'SELECT * FROM practice_sessions WHERE user_id = ?'
    let params = [userId]

    if (practiceType) {
      query += ' AND practice_type = ?'
      params.push(practiceType)
    }

    query += ' ORDER BY completion_date DESC'

    const results = await env.DB.prepare(query).bind(...params).all()

    return c.json({
      success: true,
      data: results.results || []
    })
  } catch (error) {
    console.error('Error fetching practice sessions:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to fetch practice sessions',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})

// Get practice statistics
practiceRoutes.get('/stats/:userId', async (c) => {
  try {
    const userId = c.req.param('userId')
    const { env } = c

    const stats = await env.DB.prepare(`
      SELECT 
        practice_type,
        COUNT(*) as total_sessions,
        SUM(CASE WHEN completed = 1 THEN 1 ELSE 0 END) as completed_sessions,
        SUM(time_spent) as total_time,
        AVG(time_spent) as avg_time
      FROM practice_sessions 
      WHERE user_id = ?
      GROUP BY practice_type
    `).bind(userId).all()

    const formattedStats = {
      command: { completed: 0, total: 0, time: 0 },
      branch: { completed: 0, total: 0, time: 0 },
      pullrequest: { completed: 0, total: 0, time: 0 }
    }

    if (stats.results) {
      stats.results.forEach((stat: any) => {
        if (formattedStats[stat.practice_type as keyof typeof formattedStats]) {
          formattedStats[stat.practice_type as keyof typeof formattedStats] = {
            completed: stat.completed_sessions || 0,
            total: stat.total_sessions || 0,
            time: stat.total_time || 0
          }
        }
      })
    }

    return c.json({
      success: true,
      data: formattedStats
    })
  } catch (error) {
    console.error('Error fetching practice stats:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to fetch practice stats',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})

// Validate command input (for interactive practice)
practiceRoutes.post('/validate', (c) => {
  try {
    const { command, expected_commands, context } = c.req.json()
    
    if (!command || !expected_commands) {
      return c.json({ error: 'Missing required fields' }, 400)
    }

    // Simple command validation (in a real app, this might be more sophisticated)
    const normalizeCommand = (cmd: string) => cmd.trim().toLowerCase().replace(/\s+/g, ' ')
    const normalizedInput = normalizeCommand(command)
    
    const matches = expected_commands.some((expected: string) => {
      const normalizedExpected = normalizeCommand(expected)
      return normalizedInput === normalizedExpected || 
             normalizedInput.includes(normalizedExpected) ||
             normalizedExpected.includes(normalizedInput)
    })

    let feedback = ''
    if (matches) {
      feedback = '✅ 正解です！次のステップに進みましょう。'
    } else {
      feedback = '❌ コマンドが正しくないようです。ヒントを確認してもう一度試してください。'
    }

    return c.json({
      success: true,
      data: {
        is_correct: matches,
        feedback: feedback,
        expected: expected_commands
      }
    })
  } catch (error) {
    console.error('Error validating command:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to validate command',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})
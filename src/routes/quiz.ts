import { Hono } from 'hono'
import type { Bindings, QuizQuestion } from '../types'

export const quizRoutes = new Hono<{ Bindings: Bindings }>()

// Quiz questions data
const quizQuestions: Record<string, QuizQuestion[]> = {
  basic: [
    {
      id: 'q1_git_definition',
      quiz_type: 'basic',
      question: 'Gitとは何ですか？',
      options: [
        'テキストエディタ',
        'バージョン管理システム',
        'プログラミング言語',
        'ウェブブラウザ'
      ],
      correct_answer: 1,
      explanation: 'Gitは分散型バージョン管理システムで、ファイルの変更履歴を効率的に管理するツールです。',
      points: 10
    },
    {
      id: 'q2_github_purpose',
      quiz_type: 'basic',
      question: 'GitHubの主な用途は何ですか？',
      options: [
        '動画共有',
        'SNS',
        'Gitリポジトリのホスティング',
        'オンラインゲーム'
      ],
      correct_answer: 2,
      explanation: 'GitHubはGitリポジトリをクラウドでホスティングし、開発者同士の協力を支援するプラットフォームです。',
      points: 10
    },
    {
      id: 'q3_commit_meaning',
      quiz_type: 'basic',
      question: '「コミット」とは何を意味しますか？',
      options: [
        'ファイルを削除する',
        '変更のスナップショットを記録する',
        'プログラムを実行する',
        'ファイルをダウンロードする'
      ],
      correct_answer: 1,
      explanation: 'コミットは、その時点でのファイルの状態を「スナップショット」として履歴に記録することです。',
      points: 10
    },
    {
      id: 'q4_repository_definition',
      quiz_type: 'basic',
      question: 'リポジトリとは何ですか？',
      options: [
        'プログラムのファイルと履歴を保存する場所',
        'インターネットブラウザ',
        'データベース管理システム',
        '画像編集ソフト'
      ],
      correct_answer: 0,
      explanation: 'リポジトリは、プロジェクトのファイルとその変更履歴を保存する「箱」のような場所です。',
      points: 10
    },
    {
      id: 'q5_branch_concept',
      quiz_type: 'basic',
      question: 'ブランチの役割は何ですか？',
      options: [
        'ファイルを圧縮する',
        '並行して開発を進められる',
        'バックアップを作る',
        'プログラムを高速化する'
      ],
      correct_answer: 1,
      explanation: 'ブランチは開発の流れを分岐させ、複数の機能を並行して開発できるようにする仕組みです。',
      points: 10
    },
    {
      id: 'q6_pull_request',
      quiz_type: 'basic',
      question: 'プルリクエストの目的は何ですか？',
      options: [
        'ファイルをダウンロードする',
        'コードレビューと統合の提案',
        'エラーを修正する',
        'プログラムを実行する'
      ],
      correct_answer: 1,
      explanation: 'プルリクエストは、変更をメインブランチに統合する前にコードレビューを行うための仕組みです。',
      points: 10
    },
    {
      id: 'q7_clone_meaning',
      quiz_type: 'basic',
      question: '「クローン」の意味は？',
      options: [
        'ファイルを削除する',
        'リモートリポジトリをローカルにコピーする',
        'プログラムを実行する',
        '新しいファイルを作る'
      ],
      correct_answer: 1,
      explanation: 'クローンは、リモートリポジトリ（GitHubなど）をローカルマシンに完全にコピーすることです。',
      points: 10
    },
    {
      id: 'q8_merge_process',
      quiz_type: 'basic',
      question: 'マージとは何をすることですか？',
      options: [
        'ファイルを分割する',
        '2つのブランチを統合する',
        'プログラムを削除する',
        'バックアップを作る'
      ],
      correct_answer: 1,
      explanation: 'マージは、異なるブランチの変更を統合して、一つのブランチにまとめることです。',
      points: 10
    },
    {
      id: 'q9_remote_local',
      quiz_type: 'basic',
      question: 'リモートリポジトリとローカルリポジトリの違いは？',
      options: [
        'リモートはクラウド、ローカルは自分のPC',
        '違いはない',
        'リモートの方が高速',
        'ローカルの方が安全'
      ],
      correct_answer: 0,
      explanation: 'リモートリポジトリは GitHub などのクラウド上に、ローカルリポジトリは自分のコンピュータ上にあります。',
      points: 10
    },
    {
      id: 'q10_staging_area',
      quiz_type: 'basic',
      question: 'ステージングエリアの役割は？',
      options: [
        'ファイルを削除する場所',
        'コミット前に変更を準備する場所',
        'バックアップを保存する場所',
        'プログラムを実行する場所'
      ],
      correct_answer: 1,
      explanation: 'ステージングエリアは、コミットに含める変更を準備・選択するための中間的な場所です。',
      points: 10
    }
  ],

  commands: [
    {
      id: 'q1_git_init',
      quiz_type: 'commands',
      question: '新しいGitリポジトリを初期化するコマンドは？',
      options: ['git start', 'git init', 'git new', 'git create'],
      correct_answer: 1,
      explanation: 'git init コマンドで新しいGitリポジトリを初期化できます。',
      points: 10
    },
    {
      id: 'q2_git_add_all',
      quiz_type: 'commands',
      question: 'すべての変更をステージングエリアに追加するコマンドは？',
      options: ['git add *', 'git add .', 'git add all', 'git stage .'],
      correct_answer: 1,
      explanation: 'git add . ですべての変更（新規・修正・削除）をステージングエリアに追加できます。',
      points: 10
    },
    {
      id: 'q3_git_commit_message',
      quiz_type: 'commands',
      question: 'メッセージ付きでコミットするコマンドは？',
      options: [
        'git commit "message"',
        'git commit -m "message"',
        'git save -m "message"',
        'git commit --message "message"'
      ],
      correct_answer: 1,
      explanation: 'git commit -m "message" でメッセージを付けてコミットできます。-m は message の略です。',
      points: 10
    },
    {
      id: 'q4_git_status',
      quiz_type: 'commands',
      question: '現在の作業ディレクトリの状態を確認するコマンドは？',
      options: ['git check', 'git status', 'git info', 'git state'],
      correct_answer: 1,
      explanation: 'git status で現在の作業ディレクトリとステージングエリアの状態を確認できます。',
      points: 10
    },
    {
      id: 'q5_git_push',
      quiz_type: 'commands',
      question: 'ローカルの変更をリモートリポジトリに送信するコマンドは？',
      options: ['git upload', 'git send', 'git push', 'git sync'],
      correct_answer: 2,
      explanation: 'git push でローカルリポジトリの変更をリモートリポジトリに送信できます。',
      points: 10
    },
    {
      id: 'q6_git_pull',
      quiz_type: 'commands',
      question: 'リモートリポジトリの最新変更を取得・統合するコマンドは？',
      options: ['git download', 'git pull', 'git fetch', 'git get'],
      correct_answer: 1,
      explanation: 'git pull でリモートリポジトリの最新変更を取得し、現在のブランチに統合できます。',
      points: 10
    },
    {
      id: 'q7_git_clone',
      quiz_type: 'commands',
      question: 'リモートリポジトリをローカルにコピーするコマンドは？',
      options: ['git copy', 'git clone', 'git download', 'git get'],
      correct_answer: 1,
      explanation: 'git clone でリモートリポジトリをローカルマシンに完全にコピーできます。',
      points: 10
    },
    {
      id: 'q8_git_branch_create',
      quiz_type: 'commands',
      question: '新しいブランチを作成するコマンドは？',
      options: [
        'git branch new-branch',
        'git create branch new-branch',
        'git new new-branch',
        'git make new-branch'
      ],
      correct_answer: 0,
      explanation: 'git branch <ブランチ名> で新しいブランチを作成できます。',
      points: 10
    },
    {
      id: 'q9_git_checkout',
      quiz_type: 'commands',
      question: '別のブランチに切り替えるコマンドは？',
      options: [
        'git switch branch-name',
        'git checkout branch-name',
        'git change branch-name',
        'git go branch-name'
      ],
      correct_answer: 1,
      explanation: 'git checkout <ブランチ名> で指定したブランチに切り替えできます。新しいバージョンではgit switchも使えます。',
      points: 10
    },
    {
      id: 'q10_git_merge',
      quiz_type: 'commands',
      question: '現在のブランチに他のブランチをマージするコマンドは？',
      options: [
        'git merge branch-name',
        'git join branch-name',
        'git combine branch-name',
        'git add branch-name'
      ],
      correct_answer: 0,
      explanation: 'git merge <ブランチ名> で指定したブランチを現在のブランチに統合できます。',
      points: 10
    },
    {
      id: 'q11_git_log',
      quiz_type: 'commands',
      question: 'コミット履歴を表示するコマンドは？',
      options: ['git history', 'git log', 'git commits', 'git show'],
      correct_answer: 1,
      explanation: 'git log でコミット履歴を時系列順に表示できます。',
      points: 10
    },
    {
      id: 'q12_git_diff',
      quiz_type: 'commands',
      question: 'ファイルの変更内容を表示するコマンドは？',
      options: ['git changes', 'git diff', 'git compare', 'git show'],
      correct_answer: 1,
      explanation: 'git diff で作業ディレクトリとステージングエリアの差分を表示できます。',
      points: 10
    },
    {
      id: 'q13_git_remote_add',
      quiz_type: 'commands',
      question: 'リモートリポジトリを追加するコマンドは？',
      options: [
        'git remote add origin <URL>',
        'git add remote origin <URL>',
        'git connect origin <URL>',
        'git link origin <URL>'
      ],
      correct_answer: 0,
      explanation: 'git remote add origin <URL> でoriginという名前でリモートリポジトリを追加できます。',
      points: 10
    },
    {
      id: 'q14_git_reset',
      quiz_type: 'commands',
      question: 'ステージングエリアの変更を取り消すコマンドは？',
      options: [
        'git reset <file>',
        'git unstage <file>',
        'git remove <file>',
        'git undo <file>'
      ],
      correct_answer: 0,
      explanation: 'git reset <ファイル名> でステージングエリアから指定ファイルの変更を取り消せます。',
      points: 10
    },
    {
      id: 'q15_git_stash',
      quiz_type: 'commands',
      question: '作業中の変更を一時的に保存するコマンドは？',
      options: ['git save', 'git stash', 'git temp', 'git hold'],
      correct_answer: 1,
      explanation: 'git stash で現在の作業を一時的に保存し、後で復元できます。',
      points: 10
    }
  ],

  workflow: [
    {
      id: 'q1_basic_workflow',
      quiz_type: 'workflow',
      question: '基本的なGitワークフローの正しい順序は？',
      options: [
        'edit → add → commit → push',
        'add → edit → commit → push',
        'commit → add → edit → push',
        'push → edit → add → commit'
      ],
      correct_answer: 0,
      explanation: '基本的な順序は：1)ファイル編集 → 2)変更をステージング(add) → 3)コミット → 4)リモートにプッシュです。',
      points: 15
    },
    {
      id: 'q2_collaboration_flow',
      quiz_type: 'workflow',
      question: 'チーム開発での一般的なワークフローは？',
      options: [
        'main ブランチで直接作業',
        'feature ブランチで作業 → Pull Request → merge',
        '各自が別々のリポジトリで作業',
        'メールでコードを共有'
      ],
      correct_answer: 1,
      explanation: 'チーム開発では feature ブランチで作業し、Pull Request でコードレビューを経てからメインブランチにマージするのが一般的です。',
      points: 15
    },
    {
      id: 'q3_pull_request_process',
      quiz_type: 'workflow',
      question: 'Pull Request の一般的なプロセスは？',
      options: [
        '作成 → レビュー → 承認 → マージ',
        '作成 → マージ → レビュー → 承認',
        'レビュー → 作成 → 承認 → マージ',
        'マージ → 作成 → レビュー → 承認'
      ],
      correct_answer: 0,
      explanation: 'Pull Request は作成後、チームメンバーがレビューし、承認された後にマージされます。',
      points: 15
    },
    {
      id: 'q4_conflict_resolution',
      quiz_type: 'workflow',
      question: 'マージコンフリクトが発生した場合の対処法は？',
      options: [
        '無視して強制マージする',
        '手動で競合部分を解決してコミット',
        '片方のブランチを削除する',
        'プロジェクトを最初からやり直す'
      ],
      correct_answer: 1,
      explanation: 'マージコンフリクトは手動で競合部分を確認・修正し、解決後にコミットします。',
      points: 15
    },
    {
      id: 'q5_gitignore_purpose',
      quiz_type: 'workflow',
      question: '.gitignore ファイルの目的は？',
      options: [
        'Git の設定を保存する',
        'バージョン管理から除外するファイルを指定',
        'プロジェクトの説明を書く',
        'コミットメッセージの雛形を保存'
      ],
      correct_answer: 1,
      explanation: '.gitignore はバージョン管理したくないファイル（ビルド成果物、設定ファイルなど）を指定するためのファイルです。',
      points: 15
    },
    {
      id: 'q6_branch_strategy',
      quiz_type: 'workflow',
      question: 'Git Flow での一般的なブランチ戦略は？',
      options: [
        'main, develop, feature, release, hotfix',
        'master, slave, feature',
        'main, backup, feature',
        'production, staging, development'
      ],
      correct_answer: 0,
      explanation: 'Git Flow では main(本番), develop(開発), feature(機能), release(リリース), hotfix(緊急修正) の5種類のブランチを使います。',
      points: 15
    },
    {
      id: 'q7_commit_best_practices',
      quiz_type: 'workflow',
      question: '良いコミットメッセージの特徴は？',
      options: [
        '長くて詳細な説明',
        '短くて分かりやすい説明',
        '日本語のみで記述',
        '絵文字をたくさん使用'
      ],
      correct_answer: 1,
      explanation: '良いコミットメッセージは簡潔で分かりやすく、何を変更したかが一目で分かるものです。',
      points: 15
    },
    {
      id: 'q8_code_review',
      quiz_type: 'workflow',
      question: 'コードレビューで確認すべき点は？',
      options: [
        'コードの実行速度のみ',
        '機能性、可読性、セキュリティ、性能',
        'ファイル名の長さ',
        'コメントの文字数'
      ],
      correct_answer: 1,
      explanation: 'コードレビューでは機能が正しく動作するか、読みやすいか、セキュリティ問題がないか、性能に問題がないかを確認します。',
      points: 15
    },
    {
      id: 'q9_continuous_integration',
      quiz_type: 'workflow',
      question: 'CI/CD (継続的インテグレーション/デプロイ) の利点は？',
      options: [
        'コードを手動でテストする必要がない',
        '自動化により品質向上と迅速なデプロイが可能',
        'プログラマーが不要になる',
        'コストが完全に無料になる'
      ],
      correct_answer: 1,
      explanation: 'CI/CDにより自動テスト・ビルド・デプロイが実現し、品質の向上と迅速なリリースが可能になります。',
      points: 15
    },
    {
      id: 'q10_release_management',
      quiz_type: 'workflow',
      question: 'ソフトウェアリリース管理で重要なことは？',
      options: [
        '毎日リリースする',
        '機能完成後すぐリリース',
        '計画的なリリーススケジュールとテスト',
        'リリース内容を秘密にする'
      ],
      correct_answer: 2,
      explanation: 'リリース管理では計画的なスケジューリング、十分なテスト、ロールバック計画などが重要です。',
      points: 15
    },
    {
      id: 'q11_issue_tracking',
      quiz_type: 'workflow',
      question: 'GitHub Issues の主な用途は？',
      options: [
        'ソースコードの保存',
        'バグ報告と機能要求の管理',
        'ファイルのダウンロード',
        'プログラムの実行'
      ],
      correct_answer: 1,
      explanation: 'GitHub Issues はバグ報告、機能要求、タスク管理などプロジェクトの課題を追跡・管理するためのツールです。',
      points: 15
    },
    {
      id: 'q12_documentation',
      quiz_type: 'workflow',
      question: 'プロジェクトドキュメンテーションで最も重要なのは？',
      options: [
        'README.md ファイル',
        '実行ファイル',
        'バイナリファイル',
        '設定ファイル'
      ],
      correct_answer: 0,
      explanation: 'README.md はプロジェクトの説明、インストール方法、使用方法などを記載する最も重要なドキュメントです。',
      points: 15
    }
  ]
}

// Get quiz questions by type
quizRoutes.get('/:quizType', (c) => {
  const quizType = c.req.param('quizType')
  const questions = quizQuestions[quizType]
  
  if (!questions) {
    return c.json({ error: 'Quiz type not found' }, 404)
  }
  
  return c.json({
    success: true,
    data: questions
  })
})

// Submit quiz answer
quizRoutes.post('/submit', async (c) => {
  try {
    const { user_id, quiz_type, question_id, answer, time_spent } = await c.req.json()
    
    if (!user_id || !quiz_type || !question_id || answer === undefined) {
      return c.json({ error: 'Missing required fields' }, 400)
    }

    const { env } = c

    // Find the question to check if answer is correct
    const questions = quizQuestions[quiz_type]
    if (!questions) {
      return c.json({ error: 'Invalid quiz type' }, 400)
    }

    const question = questions.find(q => q.id === question_id)
    if (!question) {
      return c.json({ error: 'Question not found' }, 400)
    }

    const isCorrect = answer === question.correct_answer

    // Check if user already answered this question
    const existingAnswer = await env.DB.prepare(
      'SELECT * FROM quiz_results WHERE user_id = ? AND quiz_type = ? AND question_id = ?'
    ).bind(user_id, quiz_type, question_id).first()

    let result;
    if (existingAnswer) {
      // Update existing answer
      result = await env.DB.prepare(`
        UPDATE quiz_results 
        SET answer = ?, is_correct = ?, attempts = attempts + 1, completed_at = CURRENT_TIMESTAMP, time_spent = ?
        WHERE user_id = ? AND quiz_type = ? AND question_id = ?
      `).bind(String(answer), isCorrect ? 1 : 0, time_spent || 0, user_id, quiz_type, question_id).run()
    } else {
      // Insert new answer
      result = await env.DB.prepare(`
        INSERT INTO quiz_results (user_id, quiz_type, question_id, answer, is_correct, time_spent, completed_at)
        VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `).bind(user_id, quiz_type, question_id, String(answer), isCorrect ? 1 : 0, time_spent || 0).run()
    }

    if (result.success) {
      // Update user stats if this is a new correct answer
      if (isCorrect && !existingAnswer) {
        await env.DB.prepare(`
          UPDATE user_stats 
          SET 
            quizzes_completed = quizzes_completed + 1,
            total_study_time = total_study_time + ?,
            updated_at = CURRENT_TIMESTAMP
          WHERE user_id = ?
        `).bind(time_spent || 0, user_id).run()
      }

      return c.json({
        success: true,
        data: {
          is_correct: isCorrect,
          explanation: question.explanation,
          correct_answer: question.correct_answer,
          points: isCorrect ? question.points : 0
        }
      })
    } else {
      throw new Error('Failed to save quiz answer')
    }
  } catch (error) {
    console.error('Error submitting quiz answer:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to submit quiz answer',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})

// Get user quiz results
quizRoutes.get('/:quizType/results/:userId', async (c) => {
  try {
    const quizType = c.req.param('quizType')
    const userId = c.req.param('userId')
    const { env } = c

    const results = await env.DB.prepare(`
      SELECT * FROM quiz_results 
      WHERE user_id = ? AND quiz_type = ?
      ORDER BY completed_at DESC
    `).bind(userId, quizType).all()

    // Calculate score
    const correctAnswers = results.results?.filter((r: any) => r.is_correct === 1).length || 0
    const totalQuestions = quizQuestions[quizType]?.length || 0
    const score = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0

    return c.json({
      success: true,
      data: {
        results: results.results || [],
        score,
        correct_answers: correctAnswers,
        total_questions: totalQuestions
      }
    })
  } catch (error) {
    console.error('Error fetching quiz results:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to fetch quiz results',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})

// Get quiz statistics
quizRoutes.get('/stats/:userId', async (c) => {
  try {
    const userId = c.req.param('userId')
    const { env } = c

    const stats = await env.DB.prepare(`
      SELECT 
        quiz_type,
        COUNT(*) as total_answered,
        SUM(CASE WHEN is_correct = 1 THEN 1 ELSE 0 END) as correct_answers,
        AVG(CASE WHEN is_correct = 1 THEN 100 ELSE 0 END) as score,
        SUM(time_spent) as total_time
      FROM quiz_results 
      WHERE user_id = ?
      GROUP BY quiz_type
    `).bind(userId).all()

    const formattedStats = {
      basic: { score: 0, answered: 0, total: quizQuestions.basic.length },
      commands: { score: 0, answered: 0, total: quizQuestions.commands.length },
      workflow: { score: 0, answered: 0, total: quizQuestions.workflow.length }
    }

    if (stats.results) {
      stats.results.forEach((stat: any) => {
        if (formattedStats[stat.quiz_type as keyof typeof formattedStats]) {
          formattedStats[stat.quiz_type as keyof typeof formattedStats] = {
            score: Math.round(stat.score || 0),
            answered: stat.total_answered || 0,
            total: quizQuestions[stat.quiz_type].length
          }
        }
      })
    }

    return c.json({
      success: true,
      data: formattedStats
    })
  } catch (error) {
    console.error('Error fetching quiz stats:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to fetch quiz stats',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})
import { Hono } from 'hono'
import type { Bindings } from '../types'

export const apiRoutes = new Hono<{ Bindings: Bindings }>()

// Health check endpoint
apiRoutes.get('/health', (c) => {
  return c.json({
    status: 'ok',
    message: 'GitHub Master Study App API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  })
})

// Initialize user stats
apiRoutes.post('/user/init', async (c) => {
  try {
    const { user_id } = await c.req.json()
    
    if (!user_id) {
      return c.json({ error: 'User ID is required' }, 400)
    }

    const { env } = c

    // Check if user already exists
    const existingUser = await env.DB.prepare(
      'SELECT * FROM user_stats WHERE user_id = ?'
    ).bind(user_id).first()

    if (existingUser) {
      return c.json({
        success: true,
        message: 'User already exists',
        data: existingUser
      })
    }

    // Create new user
    const result = await env.DB.prepare(`
      INSERT INTO user_stats (user_id, total_study_time, lessons_completed, quizzes_completed, practice_sessions_completed, current_level)
      VALUES (?, 0, 0, 0, 0, 'beginner')
    `).bind(user_id).run()

    if (result.success) {
      const newUser = await env.DB.prepare(
        'SELECT * FROM user_stats WHERE user_id = ?'
      ).bind(user_id).first()

      return c.json({
        success: true,
        message: 'User initialized successfully',
        data: newUser
      })
    } else {
      throw new Error('Failed to create user')
    }
  } catch (error) {
    console.error('Error initializing user:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to initialize user',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})

// Get user data summary
apiRoutes.get('/user/:userId/summary', async (c) => {
  try {
    const userId = c.req.param('userId')
    const { env } = c

    // Get user stats
    const userStats = await env.DB.prepare(
      'SELECT * FROM user_stats WHERE user_id = ?'
    ).bind(userId).first()

    if (!userStats) {
      return c.json({ error: 'User not found' }, 404)
    }

    // Get progress by course type
    const progressResults = await env.DB.prepare(`
      SELECT 
        course_type,
        COUNT(*) as total_lessons,
        SUM(CASE WHEN completed = 1 THEN 1 ELSE 0 END) as completed_lessons
      FROM user_progress 
      WHERE user_id = ?
      GROUP BY course_type
    `).bind(userId).all()

    const progress = {
      beginner: 0,
      intermediate: 0,
      advanced: 0
    }

    if (progressResults.results) {
      progressResults.results.forEach((row: any) => {
        const percentage = (row.completed_lessons / row.total_lessons) * 100
        progress[row.course_type as keyof typeof progress] = Math.round(percentage)
      })
    }

    // Get quiz scores
    const quizResults = await env.DB.prepare(`
      SELECT 
        quiz_type,
        AVG(CASE WHEN is_correct = 1 THEN 100 ELSE 0 END) as score
      FROM quiz_results 
      WHERE user_id = ?
      GROUP BY quiz_type
    `).bind(userId).all()

    const quizScores = {
      basic: 0,
      commands: 0,
      workflow: 0
    }

    if (quizResults.results) {
      quizResults.results.forEach((row: any) => {
        quizScores[row.quiz_type as keyof typeof quizScores] = Math.round(row.score || 0)
      })
    }

    // Get achievements count
    const achievementsCount = await env.DB.prepare(
      'SELECT COUNT(*) as count FROM achievements WHERE user_id = ?'
    ).bind(userId).first()

    const summary = {
      user_id: userId,
      overall_progress: Math.round((progress.beginner + progress.intermediate + progress.advanced) / 3),
      ...progress,
      quiz_scores: quizScores,
      total_study_time: userStats.total_study_time || 0,
      achievements_count: achievementsCount?.count || 0,
      streak_days: userStats.streak_days || 0,
      current_level: userStats.current_level || 'beginner'
    }

    return c.json({
      success: true,
      data: summary
    })
  } catch (error) {
    console.error('Error fetching user summary:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to fetch user summary',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})

// Export user data
apiRoutes.get('/user/:userId/export', async (c) => {
  try {
    const userId = c.req.param('userId')
    const { env } = c

    // Get all user data
    const [userStats, userProgress, quizResults, practiceSessions, achievements, learningPaths] = await Promise.all([
      env.DB.prepare('SELECT * FROM user_stats WHERE user_id = ?').bind(userId).first(),
      env.DB.prepare('SELECT * FROM user_progress WHERE user_id = ?').bind(userId).all(),
      env.DB.prepare('SELECT * FROM quiz_results WHERE user_id = ?').bind(userId).all(),
      env.DB.prepare('SELECT * FROM practice_sessions WHERE user_id = ?').bind(userId).all(),
      env.DB.prepare('SELECT * FROM achievements WHERE user_id = ?').bind(userId).all(),
      env.DB.prepare('SELECT * FROM learning_paths WHERE user_id = ?').bind(userId).all()
    ])

    const exportData = {
      user_stats: userStats,
      user_progress: userProgress.results || [],
      quiz_results: quizResults.results || [],
      practice_sessions: practiceSessions.results || [],
      achievements: achievements.results || [],
      learning_paths: learningPaths.results || [],
      export_timestamp: new Date().toISOString(),
      version: '1.0.0'
    }

    return c.json({
      success: true,
      data: exportData
    })
  } catch (error) {
    console.error('Error exporting user data:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to export user data',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})
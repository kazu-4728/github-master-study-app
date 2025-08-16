import { Hono } from 'hono'
import type { Bindings, UserProgress, UserStats } from '../types'

export const progressRoutes = new Hono<{ Bindings: Bindings }>()

// Update lesson progress
progressRoutes.post('/lesson', async (c) => {
  try {
    const { user_id, course_type, lesson_id, completed, time_spent } = await c.req.json()
    
    if (!user_id || !course_type || !lesson_id) {
      return c.json({ error: 'Missing required fields' }, 400)
    }

    const { env } = c

    // Insert or update progress
    const result = await env.DB.prepare(`
      INSERT INTO user_progress (user_id, course_type, lesson_id, completed, time_spent, completion_date)
      VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(user_id, course_type, lesson_id) 
      DO UPDATE SET 
        completed = excluded.completed,
        time_spent = excluded.time_spent,
        completion_date = CURRENT_TIMESTAMP
    `).bind(user_id, course_type, lesson_id, completed ? 1 : 0, time_spent || 0).run()

    if (result.success) {
      // Update user stats
      if (completed) {
        await env.DB.prepare(`
          UPDATE user_stats 
          SET 
            lessons_completed = lessons_completed + 1,
            total_study_time = total_study_time + ?,
            updated_at = CURRENT_TIMESTAMP
          WHERE user_id = ?
        `).bind(time_spent || 0, user_id).run()
      }

      return c.json({
        success: true,
        message: 'Progress updated successfully'
      })
    } else {
      throw new Error('Failed to update progress')
    }
  } catch (error) {
    console.error('Error updating lesson progress:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to update progress',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})

// Get user progress for a specific course
progressRoutes.get('/:userId/:courseType', async (c) => {
  try {
    const userId = c.req.param('userId')
    const courseType = c.req.param('courseType')
    const { env } = c

    const results = await env.DB.prepare(`
      SELECT * FROM user_progress 
      WHERE user_id = ? AND course_type = ?
      ORDER BY lesson_id
    `).bind(userId, courseType).all()

    return c.json({
      success: true,
      data: results.results || []
    })
  } catch (error) {
    console.error('Error fetching progress:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to fetch progress',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})

// Update study time
progressRoutes.post('/study-time', async (c) => {
  try {
    const { user_id, time_spent } = await c.req.json()
    
    if (!user_id || !time_spent) {
      return c.json({ error: 'Missing required fields' }, 400)
    }

    const { env } = c

    const result = await env.DB.prepare(`
      UPDATE user_stats 
      SET 
        total_study_time = total_study_time + ?,
        last_activity_date = CURRENT_DATE,
        updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ?
    `).bind(time_spent, user_id).run()

    if (result.success) {
      return c.json({
        success: true,
        message: 'Study time updated successfully'
      })
    } else {
      throw new Error('Failed to update study time')
    }
  } catch (error) {
    console.error('Error updating study time:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to update study time',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})

// Award achievement
progressRoutes.post('/achievement', async (c) => {
  try {
    const { user_id, achievement_type, achievement_data } = await c.req.json()
    
    if (!user_id || !achievement_type) {
      return c.json({ error: 'Missing required fields' }, 400)
    }

    const { env } = c

    // Check if achievement already exists
    const existing = await env.DB.prepare(
      'SELECT * FROM achievements WHERE user_id = ? AND achievement_type = ?'
    ).bind(user_id, achievement_type).first()

    if (existing) {
      return c.json({
        success: true,
        message: 'Achievement already earned',
        data: existing
      })
    }

    // Award new achievement
    const result = await env.DB.prepare(`
      INSERT INTO achievements (user_id, achievement_type, achievement_data, earned_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    `).bind(user_id, achievement_type, achievement_data || null).run()

    if (result.success) {
      const newAchievement = await env.DB.prepare(
        'SELECT * FROM achievements WHERE id = ?'
      ).bind(result.meta.last_row_id).first()

      return c.json({
        success: true,
        message: 'Achievement awarded successfully',
        data: newAchievement
      })
    } else {
      throw new Error('Failed to award achievement')
    }
  } catch (error) {
    console.error('Error awarding achievement:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to award achievement',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})

// Get user achievements
progressRoutes.get('/:userId/achievements', async (c) => {
  try {
    const userId = c.req.param('userId')
    const { env } = c

    const results = await env.DB.prepare(`
      SELECT * FROM achievements 
      WHERE user_id = ?
      ORDER BY earned_at DESC
    `).bind(userId).all()

    return c.json({
      success: true,
      data: results.results || []
    })
  } catch (error) {
    console.error('Error fetching achievements:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to fetch achievements',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})
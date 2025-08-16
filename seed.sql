-- Sample data for GitHub Master Study App

-- Insert sample user stats
INSERT OR IGNORE INTO user_stats (user_id, total_study_time, lessons_completed, quizzes_completed, practice_sessions_completed, current_level) VALUES 
    ('demo-user', 3600, 4, 3, 2, 'beginner'),
    ('test-user-1', 7200, 8, 6, 5, 'intermediate'),
    ('test-user-2', 1800, 2, 1, 1, 'beginner');

-- Insert sample user progress for demo user
INSERT OR IGNORE INTO user_progress (user_id, course_type, lesson_id, completed, time_spent) VALUES 
    ('demo-user', 'beginner', 'git-basics', TRUE, 600),
    ('demo-user', 'beginner', 'github-intro', TRUE, 900),
    ('demo-user', 'beginner', 'repository-basics', TRUE, 1200),
    ('demo-user', 'beginner', 'commit-push', TRUE, 1500),
    ('demo-user', 'intermediate', 'branching-strategies', FALSE, 300),
    ('demo-user', 'intermediate', 'merge-conflicts', FALSE, 0);

-- Insert sample quiz results
INSERT OR IGNORE INTO quiz_results (user_id, quiz_type, question_id, answer, is_correct, time_spent) VALUES 
    ('demo-user', 'basic', 'q1_git_definition', 'Version control system', TRUE, 30),
    ('demo-user', 'basic', 'q2_github_purpose', 'Cloud-based Git repository hosting', TRUE, 25),
    ('demo-user', 'basic', 'q3_commit_meaning', 'A snapshot of changes', TRUE, 35),
    ('demo-user', 'commands', 'q1_git_init', 'git init', TRUE, 20),
    ('demo-user', 'commands', 'q2_git_add', 'git add .', TRUE, 18),
    ('demo-user', 'workflow', 'q1_pull_request', 'Code review process', TRUE, 45);

-- Insert sample practice sessions
INSERT OR IGNORE INTO practice_sessions (user_id, practice_type, session_data, completed, time_spent) VALUES 
    ('demo-user', 'command', '{"commands_practiced": ["git init", "git add", "git commit"], "score": 85}', TRUE, 900),
    ('demo-user', 'branch', '{"branches_created": ["feature/login", "bugfix/header"], "merges_performed": 1}', TRUE, 1200);

-- Insert sample achievements
INSERT OR IGNORE INTO achievements (user_id, achievement_type, achievement_data) VALUES 
    ('demo-user', 'first_lesson', '{"lesson": "git-basics", "completion_date": "2024-08-16"}'),
    ('demo-user', 'quiz_master', '{"quiz_type": "basic", "perfect_score": true}'),
    ('demo-user', 'fast_learner', '{"lessons_completed_in_day": 4}');

-- Insert sample learning paths
INSERT OR IGNORE INTO learning_paths (user_id, path_name, path_config) VALUES 
    ('demo-user', 'Quick Start', '{"lessons": ["git-basics", "github-intro", "repository-basics"], "estimated_time": 45}'),
    ('demo-user', 'Complete Mastery', '{"lessons": ["git-basics", "github-intro", "repository-basics", "commit-push", "branching-strategies", "merge-conflicts", "github-actions"], "estimated_time": 180}');
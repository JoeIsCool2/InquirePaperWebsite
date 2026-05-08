export const ACHIEVEMENTS = [
  {
    id: 'first_lesson',
    title: 'First steps',
    description: 'Complete any lesson.',
  },
  {
    id: 'daily_goal',
    title: 'Daily goal',
    description: 'Complete at least one lesson today.',
  },
  {
    id: 'five_lessons',
    title: 'Deep reader',
    description: 'Complete 5 lessons total.',
  },
  {
    id: 'crown_5',
    title: 'Crown collector',
    description: 'Reach crown level 5 in any unit.',
  },
  {
    id: 'path_complete',
    title: 'Path complete',
    description: 'Finish every lesson in the path.',
  },
] as const

export type AchievementId = (typeof ACHIEVEMENTS)[number]['id']

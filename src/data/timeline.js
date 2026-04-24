export const timelineSteps = [
  {
    pid: '001',
    phase: 'INIT',
    status: 'COMPLETE',
    progress: 100,
    title: 'The Spark',
    description: 'Discovered the terminal. Wrote my first "Hello, World" and realized code is just structured thinking. Fell in love with the logic, the precision, the power.',
    icon: '📡',
  },
  {
    pid: '002',
    phase: 'BUILD',
    status: 'COMPLETE',
    progress: 100,
    title: 'First Stack',
    description: 'React, Node, MongoDB — the holy trinity. Built my first full-stack app, broke it 47 times, fixed it 48. Learned that shipping is a skill.',
    icon: '🔧',
  },
  {
    pid: '003',
    phase: 'CRASH',
    status: 'COMPLETE',
    progress: 100,
    title: 'The Breaking Point',
    description: 'Scaled too fast. Crashed harder. Realized "it works on my machine" is not a deployment strategy. Learned about system design the hard way.',
    icon: '💥',
  },
  {
    pid: '004',
    phase: 'HARDEN',
    status: 'COMPLETE',
    progress: 100,
    title: 'Production Mindset',
    description: 'Redis caching. JWT auth. Rate limiting. Input validation. Started thinking about what happens when 1000 users hit the same endpoint at once.',
    icon: '⚡',
  },
  {
    pid: '005',
    phase: 'EVOLVE',
    status: 'RUNNING',
    progress: 90,
    title: 'Building the Future',
    description: 'Real-time systems with Socket.IO. Atlassian plugin development with Jira Forge. Cloud deployment. Thinking in architectures, not just components.',
    icon: '🚀',
  },
];

// status: 'loaded' = proven by shipped work, 'learning' = actively developing
export const skillModules = [
  // ── Proven ──
  { name: 'javascript.core', label: 'JavaScript', status: 'loaded' },
  { name: 'react.mod', label: 'React', status: 'loaded' },
  { name: 'node.runtime', label: 'Node.js', status: 'loaded' },
  { name: 'express.framework', label: 'Express.js', status: 'loaded' },
  { name: 'mongodb.driver', label: 'MongoDB', status: 'loaded' },
  { name: 'redis.cache', label: 'Redis', status: 'loaded' },
  { name: 'socketio.realtime', label: 'Socket.IO', status: 'loaded' },
  { name: 'jira-forge.plugin', label: 'Jira Forge', status: 'loaded' },
  { name: 'atlassian.sdk', label: 'Atlassian Plugins', status: 'loaded' },

  // ── Learning (shown as warnings) ──
  { name: 'python.core', label: 'Python', status: 'learning' },
  { name: 'sql.relational', label: 'SQL / PostgreSQL', status: 'learning' },
  { name: 'typescript.typed', label: 'TypeScript', status: 'learning' },
  { name: 'aws.cloud', label: 'AWS', status: 'learning' },
  { name: 'docker.container', label: 'Docker', status: 'learning' },
  { name: 'dsa.algorithms', label: 'DSA', status: 'learning' },
  { name: 'system-design.core', label: 'System Design', status: 'learning' },
];

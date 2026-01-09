/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { detectAIAgent, isRunningInAIAgent } from '../src/detect_ai_agent.js'

/**
 * All AI agent environment variables to clean up between tests
 */
const AI_AGENT_ENV_VARS = [
  'CLAUDECODE',
  'GEMINI_CLI',
  'GITHUB_COPILOT_CLI_MODE',
  'WINDSURF_SESSION',
  'TERM_PROGRAM',
  'CODEX_CLI',
  'CODEX_SANDBOX',
  'OPENCODE',
  'CURSOR_AGENT',
] as const

/**
 * Helper to save current env vars state
 */
function saveEnvVars() {
  return Object.fromEntries(AI_AGENT_ENV_VARS.map((key) => [key, process.env[key]]))
}

/**
 * Helper to restore env vars state
 */
function restoreEnvVars(saved: Record<string, string | undefined>) {
  for (const key of AI_AGENT_ENV_VARS) {
    if (saved[key] === undefined) delete process.env[key]
    else process.env[key] = saved[key]
  }
}

/**
 * Helper to clear all AI agent env vars
 */
function clearAllAgentEnvVars() {
  for (const key of AI_AGENT_ENV_VARS) delete process.env[key]
}

/**
 * Helper to test agent detection
 */
function testAgentDetection(options: {
  envVar: string
  value: string
  expectedAgent: string
  description: string
}) {
  test(options.description, ({ assert }) => {
    const saved = saveEnvVars()
    clearAllAgentEnvVars()
    process.env[options.envVar] = options.value
    assert.equal(detectAIAgent(), options.expectedAgent)
    restoreEnvVars(saved)
  })
}

test.group('detectAIAgent', () => {
  testAgentDetection({
    envVar: 'CLAUDECODE',
    value: '1',
    expectedAgent: 'claude',
    description: 'should detect Claude Code when CLAUDECODE=1',
  })

  testAgentDetection({
    envVar: 'GEMINI_CLI',
    value: '1',
    expectedAgent: 'gemini',
    description: 'should detect Gemini when GEMINI_CLI=1',
  })

  testAgentDetection({
    envVar: 'GITHUB_COPILOT_CLI_MODE',
    value: '1',
    expectedAgent: 'copilot',
    description: 'should detect GitHub Copilot when GITHUB_COPILOT_CLI_MODE=1',
  })

  testAgentDetection({
    envVar: 'WINDSURF_SESSION',
    value: '1',
    expectedAgent: 'windsurf',
    description: 'should detect Windsurf when WINDSURF_SESSION=1',
  })

  testAgentDetection({
    envVar: 'TERM_PROGRAM',
    value: 'windsurf',
    expectedAgent: 'windsurf',
    description: 'should detect Windsurf when TERM_PROGRAM=windsurf',
  })

  testAgentDetection({
    envVar: 'CODEX_CLI',
    value: '1',
    expectedAgent: 'codex',
    description: 'should detect Codex when CODEX_CLI=1',
  })

  testAgentDetection({
    envVar: 'CODEX_SANDBOX',
    value: '1',
    expectedAgent: 'codex',
    description: 'should detect Codex when CODEX_SANDBOX=1',
  })

  testAgentDetection({
    envVar: 'OPENCODE',
    value: '1',
    expectedAgent: 'opencode',
    description: 'should detect OpenCode when OPENCODE=1',
  })

  testAgentDetection({
    envVar: 'CURSOR_AGENT',
    value: '1',
    expectedAgent: 'cursor',
    description: 'should detect Cursor when CURSOR_AGENT=1',
  })

  test('should return null when no AI agent is detected', ({ assert }) => {
    const saved = saveEnvVars()
    clearAllAgentEnvVars()
    assert.equal(detectAIAgent(), null)
    restoreEnvVars(saved)
  })
})

test.group('isRunningInAIAgent', () => {
  const agents = [
    { envVar: 'CLAUDECODE', value: '1', name: 'Claude Code' },
    { envVar: 'GEMINI_CLI', value: '1', name: 'Gemini' },
    { envVar: 'GITHUB_COPILOT_CLI_MODE', value: '1', name: 'GitHub Copilot' },
    { envVar: 'WINDSURF_SESSION', value: '1', name: 'Windsurf' },
    { envVar: 'CODEX_CLI', value: '1', name: 'Codex' },
    { envVar: 'OPENCODE', value: '1', name: 'OpenCode' },
    { envVar: 'CURSOR_AGENT', value: '1', name: 'Cursor' },
  ]

  for (const agent of agents) {
    test(`should return true when running in ${agent.name}`, ({ assert }) => {
      const saved = saveEnvVars()
      clearAllAgentEnvVars()
      process.env[agent.envVar] = agent.value
      assert.isTrue(isRunningInAIAgent())
      restoreEnvVars(saved)
    })
  }

  test('should return false when no AI agent is detected', ({ assert }) => {
    const saved = saveEnvVars()
    clearAllAgentEnvVars()
    assert.isFalse(isRunningInAIAgent())
    restoreEnvVars(saved)
  })
})

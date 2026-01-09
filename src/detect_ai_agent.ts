/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

type AIAgent = 'claude' | 'cursor' | 'opencode' | 'gemini' | 'copilot' | 'windsurf' | 'codex'

/**
 * Detects which AI coding agent the code is running under.
 * Checks for environment variables set by different AI coding assistants:
 * - CLAUDECODE='1' for Claude Code
 * - GEMINI_CLI='1' for Gemini
 * - GITHUB_COPILOT_CLI_MODE='1' for GitHub Copilot
 * - WINDSURF_SESSION='1' or TERM_PROGRAM='windsurf' for Windsurf
 * - CODEX_CLI='1' or CODEX_SANDBOX='1' for Codex
 * - OPENCODE='1' for OpenCode
 * - CURSOR_AGENT='1' for Cursor
 */
export function detectAIAgent(): AIAgent | null {
  if (process.env.CLAUDECODE === '1') return 'claude'
  if (process.env.GEMINI_CLI === '1') return 'gemini'
  if (process.env.GITHUB_COPILOT_CLI_MODE === '1') return 'copilot'
  if (process.env.WINDSURF_SESSION === '1' || process.env.TERM_PROGRAM === 'windsurf')
    return 'windsurf'
  if (process.env.CODEX_CLI === '1' || process.env.CODEX_SANDBOX === '1') return 'codex'
  if (process.env.OPENCODE === '1') return 'opencode'
  if (process.env.CURSOR_AGENT === '1') return 'cursor'
  return null
}

/**
 * Returns true if the code is running within any AI coding agent.
 */
export function isRunningInAIAgent(): boolean {
  return detectAIAgent() !== null
}

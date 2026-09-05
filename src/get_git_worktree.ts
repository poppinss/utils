/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { promisify } from 'node:util'
import string from '@poppinss/string'
import { createHash } from 'node:crypto'
import { realpath } from 'node:fs/promises'
import { execFile } from 'node:child_process'
import { basename, isAbsolute, relative, sep } from 'node:path'

const execFileAsync = promisify(execFile)

/**
 * Information about a linked Git worktree.
 */
export type GitWorktree = {
  /**
   * Basename of the worktree directory.
   */
  name: string

  /**
   * URL-safe slug generated from the worktree name.
   */
  slug: string

  /**
   * First twelve characters of the SHA-256 hash for the canonical path.
   */
  hash: string

  /**
   * Canonical absolute path to the worktree.
   */
  path: string
}

/**
 * Returns true when the target path is inside the parent path.
 */
function isPathInside(parent: string, target: string) {
  const relativePath = relative(parent, target)
  return (
    relativePath === '' ||
    (relativePath !== '..' && !relativePath.startsWith(`..${sep}`) && !isAbsolute(relativePath))
  )
}

/**
 * Returns information about the linked Git worktree containing the given
 * directory. Returns null for the main worktree and directories outside a
 * Git repository.
 */
export async function getGitWorktree(cwd: string = process.cwd()): Promise<GitWorktree | null> {
  try {
    const [{ stdout }, resolvedCwd] = await Promise.all([
      execFileAsync('git', ['worktree', 'list', '--porcelain', '-z'], {
        cwd,
        encoding: 'utf8',
        windowsHide: true,
      }),
      realpath(cwd),
    ])

    const worktreePaths = stdout
      .split('\0')
      .filter((field) => field.startsWith('worktree '))
      .map((field) => field.slice('worktree '.length))

    const worktrees = await Promise.all(
      worktreePaths.map(async (worktreePath, index) => {
        try {
          return { index, path: await realpath(worktreePath) }
        } catch {
          return null
        }
      })
    )

    const currentWorktree = worktrees
      .filter((worktree): worktree is NonNullable<typeof worktree> => {
        return worktree !== null && isPathInside(worktree.path, resolvedCwd)
      })
      .sort((current, next) => next.path.length - current.path.length)[0]

    if (!currentWorktree || currentWorktree.index === 0) {
      return null
    }

    const name = basename(currentWorktree.path)
    const hash = createHash('sha256').update(currentWorktree.path).digest('hex').slice(0, 12)

    return {
      name,
      hash,
      path: currentWorktree.path,
      slug: string.slug(name, { lower: true, strict: true }) || `worktree-${hash}`,
    }
  } catch {
    return null
  }
}

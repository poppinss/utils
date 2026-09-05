/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { execFile } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdtemp, realpath } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { promisify } from 'node:util'
import { test } from '@japa/runner'
import { ensureDir, remove } from 'fs-extra'

import { getGitWorktree } from '../src/get_git_worktree.js'

const execFileAsync = promisify(execFile)

test.group('getGitWorktree', (group) => {
  let basePath: string
  let primaryPath: string
  let worktreePath: string

  group.setup(async () => {
    basePath = await mkdtemp(join(tmpdir(), 'poppinss-utils-worktree-'))
    primaryPath = join(basePath, 'primary')
    worktreePath = join(basePath, 'Feature Café')

    await ensureDir(primaryPath)
    await execFileAsync('git', ['init'], { cwd: primaryPath })
    await execFileAsync(
      'git',
      [
        '-c',
        'user.name=Poppinss Tests',
        '-c',
        'user.email=tests@poppinss.dev',
        '-c',
        'commit.gpgSign=false',
        'commit',
        '--allow-empty',
        '-m',
        'Initial commit',
      ],
      { cwd: primaryPath }
    )
    await execFileAsync('git', ['worktree', 'add', '--detach', worktreePath], {
      cwd: primaryPath,
    })

    return () => remove(basePath)
  })

  test('return null outside a Git repository', async ({ assert }) => {
    const outsidePath = join(basePath, 'outside')
    await ensureDir(outsidePath)

    assert.isNull(await getGitWorktree(outsidePath))
  })

  test('return null inside the primary worktree', async ({ assert }) => {
    assert.isNull(await getGitWorktree(primaryPath))
  })

  test('return information about a linked worktree', async ({ assert }) => {
    const nestedPath = join(worktreePath, 'nested')
    await ensureDir(nestedPath)

    const resolvedWorktreePath = await realpath(worktreePath)
    assert.deepEqual(await getGitWorktree(nestedPath), {
      name: 'Feature Café',
      slug: 'feature-cafe',
      hash: createHash('sha256').update(resolvedWorktreePath).digest('hex').slice(0, 12),
      path: resolvedWorktreePath,
    })
  })
})

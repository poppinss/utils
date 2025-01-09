import { Youch } from 'youch'
import { BaseReporter } from '@japa/runner/core'
import { stripVTControlCharacters } from 'node:util'

export class GhReporter extends BaseReporter {
  static name = 'gh'

  protected formatMessage({
    command,
    properties,
    message,
  }: {
    command: string
    properties: Record<string, string>
    message: string
  }): string {
    let result = `::${command}`
    Object.entries(properties).forEach(([k, v], i) => {
      result += i === 0 ? ' ' : ','
      result += `${k}=${this.escapeProperty(v)}`
    })
    result += `::${this.escapeData(message)}`
    return result
  }

  protected escapeData(s: string): string {
    return s.replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A')
  }

  protected escapeProperty(s: string): string {
    return s
      .replace(/%/g, '%25')
      .replace(/\r/g, '%0D')
      .replace(/\n/g, '%0A')
      .replace(/:/g, '%3A')
      .replace(/,/g, '%2C')
  }

  async end() {
    const summary = this.runner!.getSummary()
    const errorsList: { title: string; phase: string; error: any }[] = []
    summary.failureTree.forEach((suite) => {
      suite.errors.forEach((error) => errorsList.push({ title: suite.name, ...error }))
      suite.children.forEach((testOrGroup) => {
        if (testOrGroup.type === 'test') {
          testOrGroup.errors.forEach((error) => {
            errorsList.push({ title: `${suite.name} / ${testOrGroup.title}`, ...error })
          })
          return
        }
        testOrGroup.errors.forEach((error) => {
          errorsList.push({ title: testOrGroup.name, ...error })
        })
        testOrGroup.children.forEach((test) => {
          test.errors.forEach((error) => {
            errorsList.push({ title: `${testOrGroup.name} / ${test.title}`, ...error })
          })
        })
      })
    })

    for (let error of errorsList) {
      const youch = new Youch()
      const parsedError = await youch.toJSON(error)
      const mainFrame = parsedError.frames.find((frame) => {
        return frame.type === 'app'
      })

      if (mainFrame) {
        const formatted = this.formatMessage({
          command: 'error',
          properties: {
            file: mainFrame.fileName!,
            title: error.title,
            line: String(mainFrame.lineNumber!),
            column: String(mainFrame.columnNumber!),
          },
          message: stripVTControlCharacters(parsedError.message),
        })
        console.log(`\n${formatted}`)
      }
    }
  }
}

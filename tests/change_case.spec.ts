/*
 * @poppinss/utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import string from '../src/string/main.js'

test.group('Change case', () => {
  test('convert {input} to camelCase')
    .with([
      { input: '', output: '' },
      { input: 'test', output: 'test' },
      { input: 'test string', output: 'testString' },
      { input: 'Test String', output: 'testString' },
      { input: 'TestV2', output: 'testV2' },
      { input: '_foo_bar_', output: 'fooBar' },
      // old output - version_1_2_10
      { input: 'version 1.2.10', output: 'version1210' },
      // old output - version_1_21_0
      { input: 'version 1.21.0', output: 'version1210' },
    ])
    .run(({ assert }, { input, output }) => {
      assert.equal(string.camelCase(input), output)
    })

  test('convert {input} to snake_case')
    .with([
      { input: '', output: '' },
      { input: '_id', output: 'id' },
      { input: 'test', output: 'test' },
      { input: 'test string', output: 'test_string' },
      { input: 'Test String', output: 'test_string' },
      { input: 'Test V2', output: 'test_v2' },
      // old output: test_v2
      { input: 'TestV2', output: 'test_v_2' },
      // old output: version_1_2_10
      { input: 'version 1.2.10', output: 'version_1210' },
      // old output: version_1_21_0
      { input: 'version 1.21.0', output: 'version_1210' },
    ])
    .run(({ assert }, { input, output }) => {
      assert.equal(string.snakeCase(input), output)
    })

  test('convert {input} to dash-case')
    .with([
      { input: '', output: '' },
      { input: 'test', output: 'test' },
      { input: 'test string', output: 'test-string' },
      { input: 'Test String', output: 'test-string' },
      { input: 'Test V2', output: 'test-v2' },
      // old output: test-v2
      { input: 'TestV2', output: 'test-v-2' },
      // old output: version-1-2-10
      { input: 'version 1.2.10', output: 'version-1210' },
      // old output: version-1-21-0
      { input: 'version 1.21.0', output: 'version-1210' },
    ])
    .run(({ assert }, { input, output }) => {
      assert.equal(string.dashCase(input), output)
    })

  test('convert {input} to dash-case and capitalize')
    .with([
      { input: '', output: '' },
      { input: 'test', output: 'Test' },
      { input: 'test string', output: 'Test-String' },
      { input: 'Test String', output: 'Test-String' },
      { input: 'TestV2', output: 'Test-V-2' },
      { input: 'version 1.2.10', output: 'Version-1210' },
      { input: 'version 1.21.0', output: 'Version-1210' },
    ])
    .run(({ assert }, { input, output }) => {
      assert.equal(string.dashCase(input, { capitalize: true }), output)
    })

  test('convert {input} to PascalCase')
    .with([
      { input: '', output: '' },
      { input: 'test', output: 'Test' },
      { input: 'test string', output: 'TestString' },
      { input: 'Test String', output: 'TestString' },
      { input: 'TestV2', output: 'TestV2' },
      // old output: Version_1_2_10
      { input: 'version 1.2.10', output: 'Version1210' },
      // old output: Version_1_21_0
      { input: 'version 1.21.0', output: 'Version1210' },
    ])
    .run(({ assert }, { input, output }) => {
      assert.equal(string.pascalCase(input), output)
    })

  test('convert {input} to Capital Case')
    .with([
      { input: '', output: '' },
      { input: 'test', output: 'Test' },
      { input: 'test string', output: 'Test String' },
      { input: 'Test String', output: 'Test String' },
      // old output: Test V2
      { input: 'TestV2', output: 'Test V 2' },
      // old output: Version 1 2 10
      { input: 'version 1.2.10', output: 'Version 1.2.10' },
      // old output: Version 1 21 0
      { input: 'version 1.21.0', output: 'Version 1.21.0' },
    ])
    .run(({ assert }, { input, output }) => {
      assert.equal(string.capitalCase(input), output)
    })

  test('convert "{input}" to Title Case')
    .with([
      { input: '', output: '' },
      { input: '2019', output: '2019' },
      { input: 'test', output: 'Test' },
      { input: 'two words', output: 'Two Words' },
      { input: 'one. two.', output: 'One. Two.' },
      { input: 'a small word starts', output: 'A Small Word Starts' },
      { input: 'small word ends on', output: 'Small Word Ends On' },
      { input: 'we keep NASA capitalized', output: 'We Keep NASA Capitalized' },
      { input: 'pass camelCase through', output: 'Pass camelCase Through' },
      { input: 'follow step-by-step instructions', output: 'Follow Step-by-Step Instructions' },
      { input: 'your hair[cut] looks (nice)', output: 'Your Hair[cut] Looks (Nice)' },
      { input: 'leave Q&A unscathed', output: 'Leave Q&A Unscathed' },
      {
        input: 'piña colada while you listen to ænima',
        output: 'Piña Colada While You Listen to Ænima',
      },
      { input: 'start title – end title', output: 'Start Title – End Title' },
      { input: 'start title–end title', output: 'Start Title–End Title' },
      { input: 'start title — end title', output: 'Start Title — End Title' },
      { input: 'start title—end title', output: 'Start Title—End Title' },
      { input: 'start title - end title', output: 'Start Title - End Title' },
      { input: "don't break", output: "Don't Break" },
      { input: '"double quotes"', output: '"Double Quotes"' },
      { input: 'double quotes "inner" word', output: 'Double Quotes "Inner" Word' },
      { input: 'fancy double quotes “inner” word', output: 'Fancy Double Quotes “Inner” Word' },
      { input: 'have you read “The Lottery”?', output: 'Have You Read “The Lottery”?' },
      { input: 'one: two', output: 'One: Two' },
      { input: 'one two: three four', output: 'One Two: Three Four' },
      { input: 'one two: "Three Four"', output: 'One Two: "Three Four"' },
      { input: 'email email@example.com address', output: 'Email email@example.com Address' },
      {
        input: 'you have an https://example.com/ title',
        output: 'You Have an https://example.com/ Title',
      },
      { input: '_underscores around words_', output: '_Underscores Around Words_' },
      { input: '*asterisks around words*', output: '*Asterisks Around Words*' },
      { input: 'this vs. that', output: 'This vs. That' },
      { input: 'this vs that', output: 'This vs That' },
      { input: 'this v. that', output: 'This v. That' },
      { input: 'this v that', output: 'This v That' },
      {
        input: 'Scott Moritz and TheStreet.com’s million iPhone la-la land',
        output: 'Scott Moritz and TheStreet.com’s Million iPhone La-La Land',
      },
      {
        input:
          'Notes and observations regarding Apple’s announcements from ‘The Beat Goes On’ special event',
        output:
          'Notes and Observations Regarding Apple’s Announcements From ‘The Beat Goes On’ Special Event',
      },
      {
        input: 'the quick brown fox jumps over the lazy dog',
        output: 'The Quick Brown Fox Jumps over the Lazy Dog',
      },
      { input: 'newcastle upon tyne', output: 'Newcastle upon Tyne' },
      { input: 'newcastle *upon* tyne', output: 'Newcastle *upon* Tyne' },
    ])
    .run(({ assert }, { input, output }) => {
      assert.equal(string.titleCase(input), output)
    })

  test('convert {input} to Sentence case')
    .with([
      { input: '', output: '' },
      { input: 'test', output: 'Test' },
      { input: 'test string', output: 'Test string' },
      { input: 'Test String', output: 'Test string' },
      { input: 'TestV2', output: 'Test v2' },
      { input: 'version 1.2.10', output: 'Version 1 2 10' },
      { input: 'version 1.21.0', output: 'Version 1 21 0' },
    ])
    .run(({ assert }, { input, output }) => {
      assert.equal(string.sentenceCase(input), output)
    })

  test('convert {input} to dot.case')
    .with([
      { input: '', output: '' },
      { input: 'test', output: 'test' },
      { input: 'test string', output: 'test.string' },
      // old output: test.string
      { input: 'Test String', output: 'Test.String' },
      { input: 'dot.case', output: 'dot.case' },
      { input: 'path/case', output: 'path.case' },
      // old output: test.v2
      { input: 'TestV2', output: 'Test.V.2' },
      // old output: version.1.2.10
      { input: 'version 1.2.10', output: 'version.1210' },
      // old output: version.1.21.0
      { input: 'version 1.21.0', output: 'version.1210' },
    ])
    .run(({ assert }, { input, output }) => {
      assert.equal(string.dotCase(input), output)
    })

  test('convert {input} to dot.case as lowercase')
    .with([
      { input: '', output: '' },
      { input: 'test', output: 'test' },
      { input: 'test string', output: 'test.string' },
      { input: 'Test String', output: 'test.string' },
      { input: 'dot.case', output: 'dot.case' },
      { input: 'path/case', output: 'path.case' },
      // old output: test.v2
      { input: 'TestV2', output: 'test.v.2' },
      // old output: version.1.2.10
      { input: 'version 1.2.10', output: 'version.1210' },
      // old output: version.1.21.0
      { input: 'version 1.21.0', output: 'version.1210' },
    ])
    .run(({ assert }, { input, output }) => {
      assert.equal(string.dotCase(input, { lowerCase: true }), output)
    })

  test('removing casing from "{input}"')
    .with([
      // Single words.
      { input: 'test', output: 'test' },
      { input: 'TEST', output: 'test' },

      // Camel case.
      { input: 'testString', output: 'test string' },
      { input: 'testString123', output: 'test string123' },
      { input: 'testString_1_2_3', output: 'test string 1 2 3' },
      { input: 'x_256', output: 'x 256' },
      { input: 'anHTMLTag', output: 'an html tag' },
      { input: 'ID123String', output: 'id123 string' },
      { input: 'Id123String', output: 'id123 string' },
      { input: 'foo bar123', output: 'foo bar123' },
      { input: 'a1bStar', output: 'a1b star' },

      // Constant case.
      { input: 'CONSTANT_CASE ', output: 'constant case' },
      { input: 'CONST123_FOO', output: 'const123 foo' },

      // Random cases.
      { input: 'FOO_bar', output: 'foo bar' },
      { input: 'XMLHttpRequest', output: 'xml http request' },
      { input: 'IQueryAArgs', output: 'i query a args' },

      // Non-alphanumeric separators.
      { input: 'dot.case', output: 'dot case' },
      { input: 'path/case', output: 'path case' },
      { input: 'snake_case', output: 'snake case' },
      { input: 'snake_case123', output: 'snake case123' },
      { input: 'snake_case_123', output: 'snake case 123' },

      // Punctuation.
      { input: '"quotes"', output: 'quotes' },

      // Space between number parts.
      { input: 'version 0.45.0', output: 'version 0 45 0' },
      { input: 'version 0..78..9', output: 'version 0 78 9' },
      { input: 'version 4_99/4', output: 'version 4 99 4' },

      // Whitespace.
      { input: '  test  ', output: 'test' },

      // Number string input.
      { input: 'something_2014_other', output: 'something 2014 other' },

      // https://github.com/blakeembrey/change-case/issues/21
      { input: 'amazon s3 data', output: 'amazon s3 data' },
      { input: 'foo_13_bar', output: 'foo 13 bar' },
    ])
    .run(({ assert }, { input, output }) => {
      assert.equal(string.noCase(input), output)
    })
})

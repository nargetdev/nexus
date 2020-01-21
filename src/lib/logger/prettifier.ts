import chalk, { Chalk } from 'chalk'
import * as Logger from './logger'
import * as Level from './level'
import * as utils from '../utils'

// Helpful unicode pickers:
// - https://jrgraphix.net/r/Unicode/2600-26FF
// - https://graphemica.com/

const LEVEL_STYLES: Record<
  Level.Level,
  { badge: string; color: chalk.Chalk }
> = {
  fatal: {
    // badge: '⚰',
    // badge: '☠',
    badge: '✕',
    color: chalk.red,
  },
  error: {
    badge: '■',
    color: chalk.red,
  },
  warn: {
    badge: '▲',
    color: chalk.yellow,
  },
  info: {
    // badge: '↣',
    badge: '●',
    color: chalk.green,
  },
  debug: {
    // badge: '◒',
    badge: '○',

    // badge: '⚒',
    // badge: '↺',
    // badge: '↯',
    // badge: '⟐',
    color: chalk.blue,
  },
  trace: {
    badge: '—',
    // badge: '~',
    // badge: '⟣',
    // badge: '⟛',
    // badge: '⠿',
    color: chalk.magenta,
  },
}

const pathSep = {
  symbol: ':',
  color: chalk.gray,
}

const eventSep = ':'

const contextSep = {
  symbol: '--',
  // context = ` ${chalk.gray('⸬')}  ` + context
  // context = ` ${chalk.gray('•')}  ` + context
  // context = ` ${chalk.gray('⑊')}  ` + context
  // context = ` ${chalk.gray('//')}  ` + context
  // context = ` ${chalk.gray('—')}  ` + context
  // context = ` ${chalk.gray('~')}  ` + context
  // context = ` ${chalk.gray('⌀')}  ` + context
  // context = ` ${chalk.gray('——')}  ` + context
  // context = ` ${chalk.gray('❯')}  ` + context
  // context = ` ${chalk.gray('->')}  ` + context
  // context = ` ${chalk.gray('⌁')}  ` + context
  // context = ` ${chalk.gray('⋯')}  ` + context
  // context = ` ${chalk.gray('⌁')}  ` + context
  // context = ` ${chalk.gray('⟛')}  ` + context
  color: chalk.gray,
}

const contextKeyValSep = {
  symbol: ': ',
  color: chalk.gray,
}

export function render(rec: Logger.LogRecord): string {
  const levelLabel = Level.LEVELS_BY_NUM[rec.level].label
  const path = rec.path.join(renderEl(pathSep))
  let context = Object.entries(rec.context)
    .map(e => `${chalk.gray(e[0])}${renderEl(contextKeyValSep)}${e[1]}`)
    .join('  ')
  if (context) {
    context = ` ${renderEl(contextSep)}  ` + context
  }
  const style = LEVEL_STYLES[levelLabel]
  return `${style.color(
    `${style.badge} ${utils.spanSpace(5, levelLabel)} ${path}`
  )}${chalk.gray(eventSep)}${rec.event} ${context}\n`
}

type El = {
  symbol: string
  color?: Chalk
}

function renderEl(el: El) {
  return el.color ? el.color(el.symbol) : el.symbol
}
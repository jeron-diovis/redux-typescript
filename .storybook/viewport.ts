import {
  MINIMAL_VIEWPORTS,
  Viewport,
  ViewportMap,
} from '@storybook/addon-viewport'
import { Preview } from '@storybook/react'
import { mapValues } from 'lodash-es'

const BREAKPOINTS: Record<string, number> = {
  /* md: 768, ... */
}

/**
 * @see https://storybook.js.org/docs/essentials/viewport
 */
export const viewport: NonNullable<Preview['parameters']>['viewport'] = {
  viewports: getViewports(),
  defaultViewport: 'responsive',
}

// ---

function getViewports(): ViewportMap {
  return Object.keys(BREAKPOINTS).length === 0
    ? MINIMAL_VIEWPORTS
    : createBreakpointViewports(BREAKPOINTS)
}

function createBreakpointViewports(
  breakpoints: Record<string, number>
): ViewportMap {
  return mapValues(breakpoints, (width, name) =>
    createBreakpointViewport(name, width)
  )
}

function createBreakpointViewport(name: string, width: number): Viewport {
  const query = `w >= ${width}`
  const height = width / (16 / 9)
  return {
    name: `${name} [ ${query} ] ${width} x ${height}`,
    type: 'other',
    styles: {
      width: `${width}px`,
      height: `${height}px`,
    },
  }
}

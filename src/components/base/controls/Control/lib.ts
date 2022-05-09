import { CSSProperties, useMemo } from 'react'

import { IControlComponentProps } from './types'

export function useContentStyle(
  config: Pick<
    IControlComponentProps,
    'style' | 'labelVerticalAlign' | 'justify' | 'layout' | 'gap'
  >
) {
  const { style, labelVerticalAlign, layout, gap, justify } = config
  return useMemo((): CSSProperties => {
    return {
      ...style,
      gap,
      alignItems: labelVerticalAlign,
      justifyContent: justify === false ? undefined : justify,
      ...getContentGridStyle(layout),
    }
  }, [style, justify, gap, labelVerticalAlign, layout])
}

function getContentGridStyle(
  layout: IControlComponentProps['layout']
): CSSProperties {
  switch (layout) {
    case 'col':
      return {
        gridAutoFlow: 'row',
        // single column, stretch it as it wants
        gridAutoColumns: '1fr',
      }

    case 'row':
      return {
        gridAutoFlow: 'column',
        // two columns: label has width of it's text, input stretches as it wants
        // It's expected that only a single child will be passed
        gridAutoColumns: 'max-content 1fr',
      }

    default:
      return {
        gridTemplateColumns: layout,
      }
  }
}

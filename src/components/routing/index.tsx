import { RouteChildrenProps } from 'react-router'
import { Route, RouteProps } from 'react-router-dom'

export function ExcludeRoute(
  props: Omit<RouteProps, 'path' | 'component' | 'render'> & {
    path: Required<RouteProps>['path']
  }
) {
  const { children } = props
  return (
    <Route {...props}>
      {(params: RouteChildrenProps) =>
        !params.match &&
        (typeof children === 'function' ? children(params) : children)
      }
    </Route>
  )
}

import { Route, RouteProps } from 'react-router-dom'

export function ExcludeRoute(
  props: Omit<RouteProps, 'path' | 'component' | 'render'> & {
    path: Required<RouteProps>['path']
  }
) {
  const { children } = props
  return (
    <Route {...props}>
      {params => (
        <If condition={!params.match}>
          {typeof children === 'function' ? children(params) : children}
        </If>
      )}
    </Route>
  )
}

import React from 'react'
import {
  ErrorBoundary as BaseErrorBoundary,
  ErrorBoundaryPropsWithComponent,
  ErrorBoundaryPropsWithFallback,
  ErrorBoundaryPropsWithRender,
  FallbackProps,
} from 'react-error-boundary'

import ErrorComponent from './ErrorComponent'

const DefaultFallback: React.FC<FallbackProps> = props => {
  const { error } = props
  return <ErrorComponent>{error.message}</ErrorComponent>
}

/**
 * @see https://www.npmjs.com/package/react-error-boundary
 */

/*
 * All this extra code is just to provide a default error component
 */
const ErrorBoundary: React.FC<
  | ErrorBoundaryPropsWithFallback
  | ErrorBoundaryPropsWithRender
  | PartialProps<ErrorBoundaryPropsWithComponent, 'FallbackComponent'>
> = props => {
  const {
    children,
    FallbackComponent = DefaultFallback,
    fallbackRender,
    fallback,
    ...rest
  } = props

  if (fallback) {
    return (
      <BaseErrorBoundary fallback={fallback} {...rest}>
        {children}
      </BaseErrorBoundary>
    )
  }

  if (fallbackRender) {
    return (
      <BaseErrorBoundary fallbackRender={fallbackRender} {...rest}>
        {children}
      </BaseErrorBoundary>
    )
  }

  if (FallbackComponent) {
    return (
      <BaseErrorBoundary FallbackComponent={FallbackComponent} {...rest}>
        {children}
      </BaseErrorBoundary>
    )
  }

  return null
}

export default ErrorBoundary

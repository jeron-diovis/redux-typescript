import { Suspense as BaseSuspense, SuspenseProps } from 'react'

import Loader from './Loader'

export default function Suspense(
  props: SuspenseProps & {
    fallback?: SuspenseProps['fallback']
  }
) {
  const { fallback = <Loader />, ...rest } = props
  return <BaseSuspense {...rest} fallback={fallback} />
}

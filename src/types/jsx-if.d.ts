import { FC, PropsWithChildren } from 'react'

declare global {
  // @see https://github.com/AlexGilleran/jsx-control-statements/issues/72#issuecomment-389484553
  declare const If: FC<PropsWithChildren<{ condition: boolean }>>
  declare const Choose: FC<PropsWithChildren>
  declare const When: FC<PropsWithChildren<{ condition: boolean }>>
  declare const Otherwise: FC<PropsWithChildren>
  // Don't support <With> / <For>, because they are hard to type properly,
  // and only complicate code readability anyway.
}

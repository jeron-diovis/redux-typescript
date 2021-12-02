// ---
// By default react-table getters requires you do this:
// > getRowProps: (currentProps, { row }) => ({ ...currentProps, style: someLogicWithRow(row) })
// Keep in mind, that if you want extend styles instead of replacing (which you do want 99% cases),
// you'll have to write even more boilerplate for recursive merging.
// So instead, let's turn these getters into this:
// > getRowProps: ({ row }) => ({ style: someLogicWithRow(row) })
// which will do merging automatically.
type ToFunc<T> = Extract<T, (...args: any[]) => unknown>
type Rearg2<F extends (a: unknown, b: unknown) => unknown> = (
  b: Parameters<F>[1],
  a: Parameters<F>[0]
) => ReturnType<F>
export type PatchPropGetter<MaybeFunc> = Rearg2<ToFunc<MaybeFunc>>

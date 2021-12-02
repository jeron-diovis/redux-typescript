import { ReactChild } from 'react'
import {
  CellPropGetter,
  HeaderPropGetter,
  RowPropGetter,
  TableCellProps,
  TableOptions,
} from 'react-table'

import { ICustomPaginationProps } from './pagination'
import { PatchPropGetter } from './util'

export interface ITableProps<Row extends object>
  extends TableOptions<Row>,
    ITablePaginationOptions {
  className?: string
  placeholder?: ReactChild
  getRowProps?: PatchPropGetter<RowPropGetter<Row>>
}

export interface ITablePaginationOptions extends ICustomPaginationProps {}

// ---

type CustomCellProps = Omit<TableCellProps, 'key'>

export interface ICustomColumnOptions<D extends object> {
  // props to be passed directly BOTH to `td` and `th` cells
  tx?: CustomCellProps | (() => CustomCellProps)
  // props to be passed directly to `th` cells
  th?: PatchPropGetter<HeaderPropGetter<D>>
  // props to be passed directly to `td` cells
  td?: PatchPropGetter<CellPropGetter<D>>
}

// ---

declare module 'react-table' {
  interface ColumnInterface<D> extends ICustomColumnOptions<D> {}

  interface TableInstance<D extends object>
    extends UsePaginationInstanceProps<D> {}

  interface TableState<D extends object> extends UsePaginationState<D> {}
}

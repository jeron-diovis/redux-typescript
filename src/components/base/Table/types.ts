import { TableCellProps, TableOptions } from 'react-table'

export interface ITableProps<Row extends object>
  extends Pick<TableOptions<Row>, 'data' | 'columns'> {}

// ---

type CustomCellProps = Omit<TableCellProps, 'key'>

export interface ICustomColumnOptions {
  // props to be passed directly BOTH to `td` and `th` cells
  // will be overridden with td / th respectively, if any
  tx?: CustomCellProps
  // props to be passed directly to `th` cells
  th?: CustomCellProps
  // props to be passed directly to `td` cells
  td?: CustomCellProps
  // shorthand for { style: { whiteSpace: 'nowrap' } }
  nowrap?: boolean
}

declare module 'react-table' {
  interface ColumnInterface extends ICustomColumnOptions {}
}

import { UsePaginationInstanceProps, UsePaginationState } from 'react-table'

export interface IPaginationProps<Row extends object>
  extends ICustomPaginationProps,
    UsePaginationInstanceProps<Row>,
    UsePaginationState<Row> {}

export interface ICustomPaginationProps {
  pageSizesList?: number[]
  pageNumberLabel?: string
  pageSizeLabel?: string
}

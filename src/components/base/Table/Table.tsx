import { TableCellProps, usePagination, useTable } from 'react-table'

import clsx from 'clsx'
import { merge } from 'lodash'

import Pagination from './Pagination'
import Placeholder from './Placeholder'
import { ITableProps } from './types'

import styles from './table.module.scss'

export default function Table<Row extends object>(props: ITableProps<Row>) {
  const {
    getRowProps,
    className,
    placeholder = 'No data available',
    // pagination
    pageSizesList,
    pageSizeLabel,
    pageNumberLabel,
    // hook config
    ...config
  } = props
  const table = useTable(config, usePagination)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page: rows,
    state: { pageIndex, pageSize },
    pageCount,
  } = table

  /* keys are provided internally by `getXXXProps` methods */
  /* eslint-disable react/jsx-key */
  const $table = (
    <table
      {...getTableProps({
        className: clsx(styles.table, className),
      })}
    >
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => {
              const { tx, th } = column
              return (
                <th
                  {...mergeCellProps(
                    column.getHeaderProps(tx),
                    column.getHeaderProps(patchPropGetter(th))
                  )}
                >
                  {column.render('Header')}
                </th>
              )
            })}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps(patchPropGetter(getRowProps))}>
              {row.cells.map(cell => {
                const { tx, td } = cell.column
                return (
                  <td
                    {...mergeCellProps(
                      cell.getCellProps(tx),
                      cell.getCellProps(patchPropGetter(td))
                    )}
                  >
                    <div className={styles.cell_content}>
                      {cell.render('Cell')}
                    </div>
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )

  // ---

  const isEmpty = pageCount === 0
  const shouldShowPagination = !isEmpty

  const $pagination = shouldShowPagination && (
    <Pagination
      {...table}
      pageIndex={pageIndex}
      pageSize={pageSize}
      pageSizesList={pageSizesList}
      pageSizeLabel={pageSizeLabel}
      pageNumberLabel={pageNumberLabel}
    />
  )

  const $placeholder = isEmpty && <Placeholder>{placeholder}</Placeholder>

  return (
    <div className={styles.container}>
      <div className={styles.placeholder_container}>
        {$table}
        {$placeholder}
      </div>
      {$pagination}
    </div>
  )
}

// ---

function patchPropGetter<Meta, Props, R>(fn?: (meta: Meta, props: Props) => R) {
  return (props: Props, meta: Meta) =>
    !fn ? props : merge({}, props, fn(meta, props))
}

function mergeCellProps(common: TableCellProps, extra: TableCellProps) {
  return merge({}, common, extra, {
    className: clsx(styles.cell, common.className, extra.className),
  })
}

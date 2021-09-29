import { useTable } from 'react-table'

import { merge } from 'lodash'

import { ICustomColumnOptions, ITableProps } from './types'

import styles from './styles.module.scss'

export default function Table<Row extends object>(props: ITableProps<Row>) {
  const { data, columns } = props

  const table = useTable({
    columns,
    data,
  })

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    table

  /* keys are provided internally by `getXXXProps` methods */
  /* eslint-disable react/jsx-key */
  return (
    <table
      {...getTableProps({
        className: styles.table,
      })}
    >
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => {
              return (
                <th {...column.getHeaderProps(resolveCellProps(column, true))}>
                  {column.render('Header')}
                </th>
              )
            })}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td {...cell.getCellProps(resolveCellProps(cell.column))}>
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
}

function resolveCellProps(opts: ICustomColumnOptions, head = false) {
  const { tx = {}, td = {}, th = {}, nowrap = false } = opts
  const cell = head ? th : td
  const staticProps = merge(
    tx,
    cell,
    nowrap
      ? {
          style: {
            whiteSpace: 'nowrap',
          },
        }
      : null
  )
  return {
    ...staticProps,
    className: styles.cell,
  }
}

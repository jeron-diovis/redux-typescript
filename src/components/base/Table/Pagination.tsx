import { IPaginationProps } from './types'

import styles from './pagination.module.scss'

const DEFAULT_PAGE_SIZES = [10, 20, 30, 40, 50]

export default function Pagination<Row extends object>(
  props: IPaginationProps<Row>
) {
  const {
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    pageIndex,
    pageSize,
    pageSizesList = DEFAULT_PAGE_SIZES,
    pageSizeLabel = 'Page Size:',
    pageNumberLabel = 'Page:',
  } = props

  return (
    <div className={styles.pagination}>
      <button
        className={styles.btn_navigation}
        onClick={() => gotoPage(0)}
        disabled={!canPreviousPage}
      >
        {'<<'}
      </button>
      <button
        className={styles.btn_navigation}
        onClick={previousPage}
        disabled={!canPreviousPage}
      >
        {'<'}
      </button>
      <button
        className={styles.btn_navigation}
        onClick={nextPage}
        disabled={!canNextPage}
      >
        {'>'}
      </button>
      <button
        className={styles.btn_navigation}
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage}
      >
        {'>>'}
      </button>
      <span className={styles.page_counter}>
        {pageNumberLabel}
        <span>
          {pageIndex + 1} / {pageOptions.length}
        </span>
      </span>
      <span className={styles.page_size}>
        {pageSizeLabel}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(+e.target.value)
          }}
        >
          {pageSizesList.map(pageSize => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </span>
    </div>
  )
}

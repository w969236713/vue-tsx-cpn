export interface Pageable {
  pageNum: number
  pageSize: number
  total: number
}

export interface PaginationProps {
  pageable: Pageable
  handleSizeChange: (size: number) => void
  handleCurrentChange: (currentPage: number) => void
}

export type TableRow = Record<string, any>

export interface TableAction {
  label: string
  handler: (row: TableRow) => void
}

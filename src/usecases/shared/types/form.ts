export interface FieldConfig {
  label: string
  type: 'text' | 'select' | 'radio' | 'checkbox' | 'date'
  model: string
  options?: string[]
}

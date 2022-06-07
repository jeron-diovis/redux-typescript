import { ReactNode } from 'react'
import { DropzoneOptions, FileRejection } from 'react-dropzone'

export interface IFileInputProps
  extends Pick<DropzoneOptions, 'maxSize' | 'minSize'> {
  accept: string | string[]
  name?: string
  onChange?: (file: File) => void
  onError?: (rejection: FileRejection) => void
  placeholder?: ReactNode
  icon?: ReactNode
}

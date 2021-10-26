import { ImgHTMLAttributes } from 'react'

export interface ILoaderProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  center?: boolean
}

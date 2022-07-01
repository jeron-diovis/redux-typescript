import React from 'react'
import { DropzoneOptions, useDropzone } from 'react-dropzone'

import { IFileInputProps } from './types'

import styles from './styles.module.scss'

export type { IFileInputProps }

export function FileInput(props: IFileInputProps) {
  const {
    onChange,
    onError,
    name,
    accept = 'image/*',
    maxSize,
    minSize,
    placeholder = 'Upload image',
    icon = null,
  } = props

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: resolveAcceptProp(accept),
    maxSize,
    minSize,
    multiple: false,
    // our input is inside <label>, thus clicking it will open file dialog anyway
    noClick: true,
    onDropAccepted([file]) {
      onChange?.(file)
    },
    onDropRejected([rejection]) {
      onError?.(rejection)
    },
  })

  return (
    <div {...getRootProps()} className={styles.root}>
      <label className={styles.label}>
        {placeholder}
        <span className={styles.icon_holder}>{icon}</span>
        <input name={name} {...getInputProps()} />
      </label>

      {acceptedFiles.map(file => (
        <span
          key={`${file.name}_${file.type}_${file.size}`}
          className={styles.filename}
        >
          {file.name}
        </span>
      ))}
    </div>
  )
}

/**
 * Weird interface in react-dropzone
 *
 * @see https://react-dropzone.js.org/#section-accepting-specific-file-types
 * @see https://github.com/react-dropzone/react-dropzone/blob/a2039fd4bc5430a166858d71b7499a17036e68f9/src/utils/index.js#L234
 */
function resolveAcceptProp(
  x: IFileInputProps['accept']
): DropzoneOptions['accept'] {
  if (typeof x === 'string') {
    return {
      [x]: [],
    }
  }
  return {
    [x[0]]: x,
  }
}

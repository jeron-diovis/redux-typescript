import React, { ReactNode, useEffect, useMemo, useRef } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { pick } from 'lodash'

import { useSwitch } from 'src/hooks'

import styles from './debugger.module.scss'

function toggleHighlight(e: React.SyntheticEvent, state: boolean) {
  const form = (e.target as HTMLElement).closest('form')
  form?.classList.toggle(styles.highlighted_form, state)
}

function FormDebug() {
  const form = useFormContext()

  const { formState } = form

  // It's important to get values with `useWatch` instead of `form.getValues()`,
  // to keep debugger updated whenever values change.
  // Essential for nested structures.
  const values = useWatch({})

  // `formState` is a proxy object (for optimization purposes)
  // turn it into plain object, to allow `JSON.stringify` it
  const state = useMemo(
    () =>
      pick(formState, Object.keys(Object.getOwnPropertyDescriptors(formState))),
    [formState]
  )

  const [isExpanded, toggleExpanded] = useSwitch(true)

  return (
    <SimpleDraggable>
      <div
        className={styles.debugger}
        onMouseEnter={e => {
          toggleHighlight(e, true)
        }}
        onMouseLeave={e => {
          toggleHighlight(e, false)
        }}
      >
        <div className={styles.toolbar}>
          <button
            title="Log form object to console"
            type="button"
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log(form)
            }}
          >
            &gt;_
          </button>
          <button
            title={isExpanded ? 'Minimize debug panel' : 'Expand debug panel'}
            type="button"
            onClick={toggleExpanded}
          >
            {isExpanded ? '–' : '+'}
          </button>
        </div>

        <If condition={isExpanded}>
          <hr />
          <pre className={styles.debug_data}>
            values:
            <br />
            {JSON.stringify(values, null, 4)}
            <hr />
            state:
            <br />
            {JSON.stringify(state, null, 4)}
          </pre>
        </If>
      </div>
    </SimpleDraggable>
  )
}

export default React.memo(FormDebug)

// ---

let isDraggingDebug = false
let isDocHandlerAdded = false

function SimpleDraggable(props: { children: ReactNode }) {
  const { children } = props
  const refMouseMove = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!isDocHandlerAdded) {
      isDocHandlerAdded = true
      const handler = (e: DragEvent) => {
        if (isDraggingDebug) {
          // prevent preview img bouncing to it's source position when drag ended
          e.preventDefault()
        }
      }
      document.addEventListener('dragover', handler)
      return () => {
        isDocHandlerAdded = false
        document.removeEventListener('dragover', handler)
      }
    }
  }, [])

  return (
    <div
      className={styles.draggable}
      onMouseMove={e => {
        refMouseMove.current.x = e.clientX
        refMouseMove.current.y = e.clientY
      }}
      draggable
      onDragStart={e => {
        isDraggingDebug = true
        e.dataTransfer.effectAllowed = 'move'
      }}
      onDragEnd={e => {
        isDraggingDebug = false
        const node = e.target as HTMLElement
        const box = node.getBoundingClientRect()
        const offsetX = refMouseMove.current.x - box.left
        const offsetY = refMouseMove.current.y - box.top
        node.style.left = `${e.clientX - offsetX}px`
        node.style.top = `${e.clientY - offsetY}px`
        node.style.right = 'unset'
      }}
    >
      {children}
    </div>
  )
}

import type { Meta, StoryObj } from '@storybook/react'

import Component from './Counter'

type TComponent = typeof Component
type Story = StoryObj<TComponent>

const meta: Meta<TComponent> = {
  component: Component,
  tags: ['autodocs'],
}

export default meta

export const Default: Story = {}

import React from 'react'

import createTitle from '@parachutehome/create-title.macro'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Button as Component } from './Button'

export default {
  title: createTitle(),
  component: Component,
} as ComponentMeta<typeof Component>

const Template: ComponentStory<typeof Component> = args => (
  <Component {...args} />
)

export const Default = Template.bind({})

Default.args = {
  children: 'Button',
}

import MgntAlert from 'component/mgnt-alert/src/MgntAlert.vue'
import type {Meta, StoryObj} from '@storybook/vue3'
import {defaultRenderFn} from './exampleProps'

const meta: Meta<typeof MgntAlert> = {
  title: 'Example/MgntAlert',
  component: MgntAlert,
  argTypes: {
    type: {
      options: ["is-info", "is-warning", "is-error", "is-success", "is-neutral"],
      control: {
        type: "radio",
      },
    },
    size: {
        options: ["medium", "large"],
        control: {
          type: "radio",
        },
    }
  },
}

export default meta

type Story = StoryObj<typeof MgntAlert>

export const Basic: Story = {
    args: {
        title: "Title",
        bodyText: "Body text",
        type: "is-success",
        size: "medium",
        isButton: false,
        isClose: false,
    },
    render: defaultRenderFn,
  }
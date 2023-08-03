import type { Meta, StoryObj } from '@storybook/react';

import { MapView } from '../components';

const meta: any = {
  title: 'Example/MapView',
  component: MapView,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof MapView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default_Map_View: Story = {
  args: {
    primary: true,
    bingKey: ""
  }
};

export const May_Type_Grayscale: Story = {
  args: {
    bingKey: "",
    mapType: 'grayscale'
  }
};

export const Map_Zoom: Story = {
  args: {
    bingKey: "",
    zoom: ""
  },
};

export const Center_Location: Story = {
  args: {
    bingKey: "",
    centerLocation: [20.5937, 78.9629]
  },
};


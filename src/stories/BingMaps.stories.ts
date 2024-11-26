import type { Meta, StoryObj } from '@storybook/react';

import { BingMaps } from '../components';


const pushpins = [
  {
    icon: 'IS',
    center: {
      latitude: 28.6448,
      longitude: 77.216721
    },
    content: {
      title: 'Delhi',
      description: {
        name: 'Capital'
      }
    }
  },
  {
    icon: 'F',
    center: {
      latitude: 13.067439,
      longitude: 80.237617
    },
    content: {
      title: 'Chennai',
      description: {
        name: 'Tamil Nadu'
      }
    }
  },
  {
    icon: 'M',
    center: {
      latitude: 9.383452,
      longitude: 76.574059
    },
    content: {
      title: 'Thiruvalla',
      description: {
        name: 'Kerala'
      }
    }
  },
  {
    icon: 'IS',
    center: {
      latitude: 12.12,
      longitude: 76.68
    },
    content: {
      title: 'Nanjangud',
      description: {
        name: 'Karnataka'
      }
    }
  },
  {
    icon: 'IS',
    center: {
      latitude: 24.879999,
      longitude: 74.629997
    },
    content: {
      title: 'Chittorgarh',
      description: {
        name: 'Rajasthan'
      }
    }
  },
  {
    icon: 'M',
    center: {
      latitude: 19.155001,
      longitude: 72.849998
    },
    content: {
      title: 'Goregaon',
      description: {
        name: 'Maharashtra'
      }
    }
  },
  {
    icon: 'KK',
    center: {
      latitude: 26.85,
      longitude: 80.949997
    },
    content: {
      title: 'Lucknow',
      description: {
        name: 'Uttar Pradesh'
      }
    }
  },
  {
    icon: 'F',
    center: {
      latitude: 23.905445,
      longitude: 87.52462
    },
    content: {
      title: 'Suri',
      description: {
        name: 'West Bengal'
      }
    }
  },
  {
    icon: 'IS',
    center: {
      latitude: 14.913181,
      longitude: 79.992981
    },
    content: {
      title: 'Kavali',
      description: {
        name: 'Andhra Pradesh'
      }
    }
  }
];

const meta: any = {
  title: 'Example/BingMaps',
  component: BingMaps,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    mapType: { control: 'select', options: ['aerial', 'canvasDark', 'canvasLight', 'birdseye', 'grayscale', 'mercator', 'ordnanceSurvey', 'road', 'streetside'] },
    zoom: { control: { type: 'range', min: 1, max: 19 }},
    language: { control: 'select', options: ['en-IN', 'hi-IN']}
  },
} satisfies Meta<typeof BingMaps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    bingKey: "",
    mapType: 'grayscale',
    zoom: 1,
    centerLocation: [28.6448, 77.216721],
    pushPins: pushpins,
    showScalebar: false,
    showCopyright: false,
    showLogo: false,
  },
};

export const Map_View: Story = {
  args: {
    bingKey: "",
    mapType: 'grayscale',
    zoom: 1,
    centerLocation: [28.6448, 77.216721],
    pushPins: pushpins,
    showScalebar: true,
    showCopyright: true,
    disableZooming: false,
    showBreadcrumb: true,
    showLocateMeButton: true,
    showLogo: true,
    showZoomButtons: true,
    showMapTypeSelector: true
  }
};




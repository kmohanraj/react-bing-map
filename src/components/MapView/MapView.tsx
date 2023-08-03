import React, { useEffect } from 'react';
import useBingMaps from '../../hooks/useBingMaps';
import { TMapView } from '../../hooks/useBingMaps';

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

export const MapView = (props: any) => {
  const {
    mapType = '',
    bingKey = '',
    centerLocation = [0, 0],
    zoom = 0,
    pushPins = pushpins,
    pushPinIcon = ''
  } = props;
  const mapView: TMapView = {
    mapType: mapType,
    bingKey: bingKey,
    centerLocation: centerLocation,
    zoom: zoom,
    pushPins: pushPins,
    pushPinIcon: pushPinIcon
  };
  const [myWindow, initMap] = useBingMaps(mapView);
  myWindow.initMap = initMap;

  useEffect(() => {
    if (!document.querySelector('[data-bing="true"]')) {
      const scriptTag = document.createElement('script');
      scriptTag.src =
        'https://www.bing.com/api/maps/mapcontrol?callback=initMap';
      scriptTag.async = true;
      scriptTag.dataset.bing = 'true';
      document.body.appendChild(scriptTag);
    }
  }, [initMap]);

  return (
    <div
      id='bing-map'
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }}
    ></div>
  );
};

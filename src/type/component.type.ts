

export type TContent = {
  title: string;
  description: HTMLElement | string;
};

export type TLocation = {
   latitude: number; 
   longitude: number
};

export type TMapPosition = { 
  north: number,
  south: number,
  east: number,
  west: number,
}

export type TPushPin = {
  icon: string | any;
  location: TLocation;
  content: TContent;
};

export type TMapView = {
  mapType: string;
  bingKey: string;
  mapPosition?: TMapPosition;
  centerLocation?: [number, number];
  language?: string;
  zoom?: number;
  pushPins?: [];
  pushPinIcon?: string;
  showScalebar?: boolean;
  showCopyright?: boolean;
  showLogo?: boolean;
  disableZooming?: boolean;
  showBreadcrumb?: boolean;
  showLocateMeButton: boolean,
  showZoomButtons?: boolean;
  showMapTypeSelector?: boolean;
};
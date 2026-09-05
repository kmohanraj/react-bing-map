

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

export type TInfoBoxStyle = {
  maxWidth?: number;
  maxHeight?: number;
};

export type TPushPin = {
  icon: string | any;
  location: TLocation;
  content: TContent;
};

export type TRoute = {
  source: TLocation;
  destination: TLocation;
};

export type TRouteMode = 'driving' | 'walking' | 'transit';

export type TRouteInfo = {
  source: TLocation;
  destination: TLocation;
  distance: number;
  distanceUnit: 'kilometers';
  duration?: number;
  isFallback?: boolean;
};

export type TMapView = {
  mapType: string;
  bingKey: string;
  mapPosition?: TMapPosition;
  infoBoxStyle?: TInfoBoxStyle;
  centerLocation?: [number, number];
  language?: string;
  zoom?: number;
  pushPins?: TPushPin[];
  pushPinIcon?: string;
  showScalebar?: boolean;
  showCopyright?: boolean;
  showLogo?: boolean;
  disableZooming?: boolean;
  showBreadcrumb?: boolean;
  showLocateMeButton?: boolean,
  showZoomButtons?: boolean;
  showMapTypeSelector?: boolean;
  source?: TLocation;
  destination?: TLocation;
  showRoute?: boolean;
  routeMode?: TRouteMode;
  useGPS?: boolean;
  onGPSLocationFound?: (location: TLocation) => void;
  onGPSError?: (error: string) => void;
  onRouteCalculated?: (routeInfo: TRouteInfo) => void;
};
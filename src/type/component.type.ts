
type TDescription = {
  name: string;
};

export type TContent = {
  title: string;
  description: TDescription;
};

export type TPushPin = {
  icon: string;
  center: {};
  content: TContent;
};

export type TMapView = {
  mapType: string;
  bingKey: string;
  centerLocation?: [number, number];
  language?: string;
  zoom?: number;
  pushPins?: [];
  pushPinIcon?: any;
  showScalebar?: boolean;
  showCopyright?: boolean;
  showLogo?: boolean;
  disableZooming?: boolean;
  showBreadcrumb?: boolean;
  showLocateMeButton: boolean,
  showZoomButtons?: boolean;
  showMapTypeSelector?: boolean;
};

type DescriptionType = {
  name: string;
};

export type ContentType = {
  title: string;
  description: DescriptionType;
};

export type IContent = {
  title: string;
  description: DescriptionType;
};

export type TPushPin = {
  icon: string;
  center: {};
  content: IContent;
};

export type TMapView = {
  mapType?: string;
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
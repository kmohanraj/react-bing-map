import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { BingMaps, RouteSelectionWithGPS } from "../components";
import { TLocation } from "../type/component.type";

const content = `
<div class="pin-detail">
    <section>
      <div class="name">Partner:</div>
      <div class="value">1067207 <span id="copy_42" class="copy-section"></span></div>
    </section>
    <section>
      <div class="name">NPS:</div>
      <div class="value">N/A</div>
    </section>
    <section>
      <div class="name">Phone:</div>
      <div class="value">(405) 604-5278</div>
    </section>
    <section>
      <div class="name">Email:</div>
      <div class="value"><a href="mailto:test@gmail.com">test@gmail.com</a></div>
    </section>
    <section>
      <div class="name">Address:</div>
      <div class="value">308 W. Britton Rd OKLAHOMA CITY OK US 73114 </div>
    </section>
</div>
`;

const pushpins = [
  {
    icon: "",
    location: { latitude: 28.6448, longitude: 77.216721 },
    content: { title: "Delhi", description: "content" },
  },
  {
    icon: "",
    location: { latitude: 13.067439, longitude: 80.237617 },
    content: { title: "Chennai", description: content },
  },
  {
    icon: "",
    location: { latitude: 9.383452, longitude: 76.574059 },
    content: { title: "Thiruvalla", description: content },
  },
  {
    icon: "",
    location: { latitude: 12.12, longitude: 76.68 },
    content: { title: "Nanjangud", description: content },
  },
  {
    icon: "",
    location: { latitude: 24.879999, longitude: 74.629997 },
    content: { title: "Chittorgarh", description: content },
  },
  {
    icon: "",
    location: { latitude: 19.155001, longitude: 72.849998 },
    content: { title: "Goregaon", description: content },
  },
  {
    icon: "",
    location: { latitude: 26.85, longitude: 80.949997 },
    content: { title: "Lucknow", description: content },
  },
  {
    icon: "",
    location: { latitude: 23.905445, longitude: 87.52462 },
    content: { title: "Suri", description: content },
  },
  {
    icon: "",
    location: { latitude: 14.913181, longitude: 79.992981 },
    content: { title: "Kavali", description: content },
  },
];

const locations: Record<string, TLocation> = {
  delhi: { latitude: 28.7041, longitude: 77.1025 },
  mumbai: { latitude: 19.076, longitude: 72.8777 },
  bangalore: { latitude: 12.9716, longitude: 77.5946 },
  hyderabad: { latitude: 17.385, longitude: 78.4867 },
  chennai: { latitude: 13.0827, longitude: 80.2707 },
  kolkata: { latitude: 22.5726, longitude: 88.3639 },
};

const meta: Meta<any> = {
  title: "Example/BingMaps",
  component: BingMaps,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    bingKey: { control: "text" },
    drawerPosition: {
      control: "radio",
      options: ["left", "right", "top", "bottom"],
      description: "Position of the route configuration drawer",
    },
    mapType: {
      control: "select",
      options: ["aerial", "canvasDark", "canvasLight", "birdseye", "grayscale", "mercator", "ordnanceSurvey", "road", "streetside"],
    },
    zoom: { control: { type: "range", min: 1, max: 19 } },
    language: { control: "select", options: ["en-IN", "hi-IN"] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    bingKey: "",
    mapType: "grayscale",
    pushPinIcon: "",
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
    mapType: "grayscale",
    pushPinIcon: "",
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
    showMapTypeSelector: true,
    mapPosition: { north: 49.234, south: 24.175, east: -65.573, west: -125.778 },
    infoBoxStyle: { maxWidth: 490, maxHeight: 600 },
  },
};

export const RouteNavigation: Story = {
  render: (args) => <RouteSelectionWithGPS {...args} />,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    bingKey: "",
    drawerPosition: "right",
    mapType: "grayscale",
    language: "en-IN",
    zoom: 5,
    disableZooming: false,
    showScalebar: true,
    showCopyright: true,
    showLogo: true,
    showBreadcrumb: true,
    showLocateMeButton: true,
    showZoomButtons: true,
    showMapTypeSelector: true,
  },
};

export const ChennaiToBangalore: Story = {
  args: {
    bingKey: "",
    mapType: "road",
    centerLocation: [17.5, 84.5],
    language: "en-IN",
    zoom: 4,
    source: locations.chennai,
    destination: locations.bangalore,
    showRoute: true,
    showScalebar: true,
    showCopyright: true,
    showLogo: true,
    disableZooming: false,
    showBreadcrumb: true,
    showLocateMeButton: true,
    showZoomButtons: true,
    showMapTypeSelector: true,
  },
};
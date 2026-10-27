// reach-map-places.js — the hand-maintained half of the Reach map's data.
//
// reach-map-engagements.js is generated from the website handoff. This file
// says where things sit on the map: places (with coordinates), which place
// each engagement's ledger `location` resolves to, and the offices with the
// team members a client can reach there.
//
// One pin per place. A pin opens one card with everything at that place:
// the office (if there is one), the people there, and the engagements.
//
// `precision` is shown to the visitor so a pin never claims more than the
// ledger knows: 'city' (a known city), 'state', 'country' (pin at the
// capital or centre), 'region' (the ledger names a region only).
// `country` must match a country name in reach-map-geo.js; that country is
// shaded on the map while its pin is open.

// Partner photos ship inside this folder and are imported, so the site's
// bundler copies and links them with the code. Nothing has to be placed in
// a public folder, and the links survive any base path or subfolder.
import hannanPhoto from './photos/hannan.jpg';
import nileshPhoto from './photos/nilesh.jpg';
import advaithPhoto from './photos/advaith.jpg';
import arjunPhoto from './photos/arjun.jpg';
import rimaPhoto from './photos/rima.jpg';
import tejPhoto from './photos/tej.jpg';

export const PLACES = [
  { id: 'cupertino', label: 'Cupertino', sub: 'California, United States', country: 'United States of America', precision: 'city', lat: 37.32, lon: -122.03 },
  { id: 'north-america', label: 'North America', sub: null, country: null, precision: 'region', lat: 39.5, lon: -98.35 },
  { id: 'delaware', label: 'Delaware', sub: 'United States', country: 'United States of America', precision: 'state', lat: 39.0, lon: -75.5 },
  { id: 'new-york', label: 'New York', sub: 'United States', country: 'United States of America', precision: 'city', lat: 40.71, lon: -74.01 },
  { id: 'united-kingdom', label: 'United Kingdom', sub: null, country: 'United Kingdom', precision: 'country', lat: 51.51, lon: -0.13 },
  { id: 'spain', label: 'Spain', sub: null, country: 'Spain', precision: 'country', lat: 40.42, lon: -3.7 },
  { id: 'paris', label: 'Paris', sub: 'France', country: 'France', precision: 'city', lat: 48.86, lon: 2.35 },
  { id: 'amsterdam', label: 'Amsterdam', sub: 'Netherlands', country: 'Netherlands', precision: 'city', lat: 52.37, lon: 4.9 },
  { id: 'switzerland', label: 'Switzerland', sub: null, country: 'Switzerland', precision: 'country', lat: 46.95, lon: 7.45 },
  { id: 'germany', label: 'Germany', sub: null, country: 'Germany', precision: 'country', lat: 51.17, lon: 10.45 },
  { id: 'europe', label: 'Europe', sub: null, country: null, precision: 'region', lat: 48.6, lon: 17.5 },
  { id: 'middle-east', label: 'Middle East', sub: null, country: null, precision: 'region', lat: 29.4, lon: 47.9 },
  { id: 'riyadh', label: 'Riyadh', sub: 'Saudi Arabia', country: 'Saudi Arabia', precision: 'city', lat: 24.71, lon: 46.68 },
  { id: 'dubai', label: 'Dubai', sub: 'United Arab Emirates', country: 'United Arab Emirates', precision: 'city', lat: 25.2, lon: 55.27 },
  { id: 'india', label: 'India', sub: null, country: 'India', precision: 'country', lat: 21.0, lon: 78.5 },
  { id: 'singapore', label: 'Singapore', sub: null, country: 'Singapore', precision: 'city', lat: 1.35, lon: 103.82 },
  { id: 'asia', label: 'Asia', sub: null, country: null, precision: 'region', lat: 34.0, lon: 104.0 },
];

// Ledger `location` string -> place id. Anything not listed here, and any
// engagement whose location is Global or Cross-industry, stays off the map.
export const LOCATION_TO_PLACE = {
  'New York, United States': 'new-york',
  'North America': 'north-america',
  USA: 'north-america',
  'United Kingdom': 'united-kingdom',
  Spain: 'spain',
  Germany: 'germany',
  Switzerland: 'switzerland',
  Europe: 'europe',
  'Middle East': 'middle-east',
  'Saudi Arabia': 'riyadh',
  India: 'india',
  Asia: 'asia',
  'France / India': 'paris',
};

// Per-engagement corrections where the copy is more specific than the
// ledger's Location column.
export const ENGAGEMENT_PLACE_OVERRIDES = {
  'agentic-onboarding-for-b2b-payments': 'united-kingdom', // "UK based B2B payments provider"
  'ecommerce-payment-integration': 'singapore', // the Asian steel manufacturer is a Singapore entity (Hannan, 2026-10-23)
};

// Offices and registered addresses, with the team members a client can
// reach at each (given by Hannan, 2026-10-23).
export const OFFICES = [
  { id: 'cupertino', type: 'Registered office', placeId: 'cupertino', team: ['hannan', 'nilesh'] },
  { id: 'delaware', type: 'Registered business address', placeId: 'delaware', team: [] },
  { id: 'amsterdam', type: 'Registered business address', placeId: 'amsterdam', team: ['tej', 'arjun'] },
  { id: 'dubai', type: 'Office', placeId: 'dubai', team: ['arjun'] },
  { id: 'india', type: 'Office', placeId: 'india', team: ['nilesh', 'rima'] },
];

// Our people. Each person shows on the card of every office they are listed
// on (OFFICES.team) and of every place in their own `home` list. `photo` is
// an imported image (above); `email` shows as a mail link on their card.
// With no photo on file a person
// shows by name only. Locations given by Hannan, 2026-10-23; emails 2026-10-24.
export const PEOPLE = {
  hannan: { name: 'Hannan Hakim', role: 'Founding Partner', photo: hannanPhoto, home: [], email: 'Hannan@hyperlycheelabs.com' },
  nilesh: { name: 'Nilesh Nalnikar', role: 'Senior Partner', photo: nileshPhoto, home: ['north-america'], email: 'Nilesh@hyperlycheelabs.com' },
  advaith: { name: 'Advaith Mohan', role: 'Partner', photo: advaithPhoto, home: ['new-york'], email: 'Advaith@hyperlycheelabs.com' },
  arjun: { name: 'Arjun Pathni', role: 'Partner, Operations', photo: arjunPhoto, home: [], email: 'Arjun@hyperlycheelabs.com' },
  rima: { name: 'Rima Sarkar', role: 'Head of Growth', photo: rimaPhoto, home: [], email: 'Rima@hyperlycheelabs.com' },
  vidya: { name: 'Vidya Mohan', role: 'Partner', photo: null, home: ['india'], email: 'Vidya@hyperlycheelabs.com' },
  santosh: { name: 'Santosh Maruwada', role: 'Associate Partner', photo: null, home: ['singapore'], email: 'Santosh@hyperlycheelabs.com' },
  tej: { name: 'Tej Haldule', role: null, photo: tejPhoto, home: [], email: 'Tej@hyperlycheelabs.com' },
};

// Service -> the gradient variant its accent uses. Cloud has no variant of
// its own in VARIANT_GRADIENTS and borrows Foundation's.
export const SERVICE_VARIANT = {
  'data-analytics': 'hll-foundation',
  cloud: 'hll-foundation',
  applications: 'hll-application',
  ai: 'hll-ai',
  'trust-governance': 'hll-trust',
  'people-policy': 'hll-people',
  ontology: 'hll-ontology',
};

// The map's accent: the About menu item's gradient, since the map lives on
// the About page.
export const ACCENT_VARIANT = 'about';

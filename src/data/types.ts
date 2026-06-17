/**
 * The content model. Every guide, curated or generated, is a `Guide`.
 * The UI knows nothing about React or Android specifically; it renders this shape.
 */

export type FieldId = string;

export interface Field {
  id: FieldId;
  label: string;
  /** One line shown under the option, in the home turf's own words. */
  blurb: string;
  /** Emoji-free short tag used in chips, e.g. "JS / TS". */
  tag: string;
}

/** A single "you already do X; over here it's Y" mapping. The core unit. */
export interface RosettaRow {
  concept: string;
  from: string;
  to: string;
  note?: string;
}

export interface RosettaGroup {
  title: string;
  rows: RosettaRow[];
}

/** A bigger-picture reframing rather than a 1:1 tool swap. */
export interface MentalShift {
  title: string;
  from: string;
  to: string;
}

export interface Gotcha {
  title: string;
  body: string;
}

export interface FirstStep {
  title: string;
  body: string;
  code?: string;
}

export interface KnownPackage {
  name: string;
  what: string;
  /** The closest thing in the source field, if there is one. */
  analog?: string;
}

export type ResourceKind = 'docs' | 'course' | 'sample' | 'tool' | 'community';

export interface Resource {
  label: string;
  href: string;
  kind: ResourceKind;
  note?: string;
}

export interface Guide {
  source: FieldId;
  target: FieldId;
  /** Headline framed as a translation, e.g. "From components to composables". */
  headline: string;
  intro: string;
  /** The single most reassuring sentence: the thing that transfers cleanly. */
  goodNews: string;
  mentalShifts: MentalShift[];
  rosetta: RosettaGroup[];
  gotchas: Gotcha[];
  firstRun: FirstStep[];
  packagesToKnow: KnownPackage[];
  resources: Resource[];
}

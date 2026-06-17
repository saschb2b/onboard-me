import type { Field, FieldId } from './types';

/**
 * The catalog of selectable fields. Order is roughly "most common starting
 * points first". Adding a field here makes it selectable on both sides; a
 * curated guide may or may not exist for any given pair (see guides/index).
 */
export const FIELDS: Field[] = [
  { id: 'react', label: 'React Developer', tag: 'JS / TS', blurb: 'Components, hooks, the npm world, SPA tooling.' },
  { id: 'vue', label: 'Vue Developer', tag: 'JS / TS', blurb: 'SFCs, reactivity, the Vite ecosystem.' },
  { id: 'angular', label: 'Angular Developer', tag: 'TS', blurb: 'Modules, DI, RxJS, opinionated tooling.' },
  { id: 'node', label: 'Node Backend Developer', tag: 'JS / TS', blurb: 'HTTP servers, npm, async I/O, REST/GraphQL.' },
  { id: 'android', label: 'Android Developer', tag: 'Kotlin', blurb: 'Compose, Gradle, the JVM, the Play Store.' },
  { id: 'ios', label: 'iOS Developer', tag: 'Swift', blurb: 'SwiftUI, Xcode, the App Store.' },
  { id: 'python', label: 'Python Developer', tag: 'Python', blurb: 'pip, scripting, data, web frameworks.' },
  { id: 'rust', label: 'Rust Developer', tag: 'Rust', blurb: 'Cargo, ownership, zero-cost abstractions.' },
  { id: 'go', label: 'Go Developer', tag: 'Go', blurb: 'Goroutines, the standard library, single binaries.' },
  { id: 'gamedev', label: 'Game Developer', tag: 'Engines', blurb: 'Scenes, the game loop, Godot / Unity.' },
  { id: 'devops', label: 'DevOps Engineer', tag: 'Infra', blurb: 'CI/CD, containers, IaC, observability.' },
  { id: 'data', label: 'Data / ML Engineer', tag: 'Python', blurb: 'Notebooks, pandas, training pipelines.' },
];

const FIELD_BY_ID = new Map<FieldId, Field>(FIELDS.map((f) => [f.id, f]));

export function getField(id: FieldId): Field | undefined {
  return FIELD_BY_ID.get(id);
}

/** Value -> label map in the shape Base UI Select wants for `items`. */
export const FIELD_ITEMS: Record<string, string> = Object.fromEntries(
  FIELDS.map((f) => [f.id, f.label]),
);

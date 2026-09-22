// Lives outside lightfx-runtime.js so that importing it does not pull in that
// module's `three` dependency. Buttons and tags clone their preset on every
// render but only touch the runtime itself once they are on screen.

/* eslint-disable @typescript-eslint/no-explicit-any */
export function cloneDefinition<T>(def: T): T {
  return JSON.parse(JSON.stringify(def));
}

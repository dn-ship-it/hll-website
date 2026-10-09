import * as migration_20260930_212805_initial_schema from './20260930_212805_initial_schema';
import * as migration_20261009_203105_more_testimonials from './20261009_203105_more_testimonials';

export const migrations = [
  {
    up: migration_20260930_212805_initial_schema.up,
    down: migration_20260930_212805_initial_schema.down,
    name: '20260930_212805_initial_schema',
  },
  {
    up: migration_20261009_203105_more_testimonials.up,
    down: migration_20261009_203105_more_testimonials.down,
    name: '20261009_203105_more_testimonials'
  },
];

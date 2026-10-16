import * as migration_20260930_212805_initial_schema from './20260930_212805_initial_schema';
import * as migration_20261009_203105_more_testimonials from './20261009_203105_more_testimonials';
import * as migration_20261011_141317_cms_coverage from './20261011_141317_cms_coverage';
import * as migration_20261014_205241_voice_logos from './20261014_205241_voice_logos';

export const migrations = [
  {
    up: migration_20260930_212805_initial_schema.up,
    down: migration_20260930_212805_initial_schema.down,
    name: '20260930_212805_initial_schema',
  },
  {
    up: migration_20261009_203105_more_testimonials.up,
    down: migration_20261009_203105_more_testimonials.down,
    name: '20261009_203105_more_testimonials',
  },
  {
    up: migration_20261011_141317_cms_coverage.up,
    down: migration_20261011_141317_cms_coverage.down,
    name: '20261011_141317_cms_coverage',
  },
  {
    up: migration_20261014_205241_voice_logos.up,
    down: migration_20261014_205241_voice_logos.down,
    name: '20261014_205241_voice_logos'
  },
];

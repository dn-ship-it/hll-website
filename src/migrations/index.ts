import * as migration_20260930_212805_initial_schema from './20260930_212805_initial_schema';
import * as migration_20261009_203105_more_testimonials from './20261009_203105_more_testimonials';
import * as migration_20261011_141317_cms_coverage from './20261011_141317_cms_coverage';
import * as migration_20261014_205241_voice_logos from './20261014_205241_voice_logos';
import * as migration_20261017_155658_handoff_cloud_service from './20261017_155658_handoff_cloud_service';
import * as migration_20261017_160138_handoff_chart_display from './20261017_160138_handoff_chart_display';
import * as migration_20261017_164716_handoff_art from './20261017_164716_handoff_art';
import * as migration_20261017_171556_handoff_services from './20261017_171556_handoff_services';
import * as migration_20261017_185743_handoff_industries from './20261017_185743_handoff_industries';
import * as migration_20261019_114956_handoff_outcome_links from './20261019_114956_handoff_outcome_links';
import * as migration_20261023_184540_motion_step_video from './20261023_184540_motion_step_video';
import * as migration_20261025_101221_contact_office_details from './20261025_101221_contact_office_details';

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
    name: '20261014_205241_voice_logos',
  },
  {
    up: migration_20261017_155658_handoff_cloud_service.up,
    down: migration_20261017_155658_handoff_cloud_service.down,
    name: '20261017_155658_handoff_cloud_service',
  },
  {
    up: migration_20261017_160138_handoff_chart_display.up,
    down: migration_20261017_160138_handoff_chart_display.down,
    name: '20261017_160138_handoff_chart_display',
  },
  {
    up: migration_20261017_164716_handoff_art.up,
    down: migration_20261017_164716_handoff_art.down,
    name: '20261017_164716_handoff_art',
  },
  {
    up: migration_20261017_171556_handoff_services.up,
    down: migration_20261017_171556_handoff_services.down,
    name: '20261017_171556_handoff_services',
  },
  {
    up: migration_20261017_185743_handoff_industries.up,
    down: migration_20261017_185743_handoff_industries.down,
    name: '20261017_185743_handoff_industries',
  },
  {
    up: migration_20261019_114956_handoff_outcome_links.up,
    down: migration_20261019_114956_handoff_outcome_links.down,
    name: '20261019_114956_handoff_outcome_links',
  },
  {
    up: migration_20261023_184540_motion_step_video.up,
    down: migration_20261023_184540_motion_step_video.down,
    name: '20261023_184540_motion_step_video',
  },
  {
    up: migration_20261025_101221_contact_office_details.up,
    down: migration_20261025_101221_contact_office_details.down,
    name: '20261025_101221_contact_office_details'
  },
];

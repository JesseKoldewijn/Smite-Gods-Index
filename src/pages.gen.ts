// deno-fmt-ignore-file
// biome-ignore format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages, GetConfigResponse } from 'waku/router';

// prettier-ignore
import type { getConfig as Root_getConfig } from './pages/_root';
// prettier-ignore
import type { getConfig as GodGodSlug_getConfig } from './pages/god/[godSlug]';
// prettier-ignore
import type { getConfig as Gods_getConfig } from './pages/gods';
// prettier-ignore
import type { getConfig as Index_getConfig } from './pages/index';

// prettier-ignore
type Page =
| ({ path: '/_root' } & GetConfigResponse<typeof Root_getConfig>)
| ({ path: '/god/[godSlug]' } & GetConfigResponse<typeof GodGodSlug_getConfig>)
| ({ path: '/gods' } & GetConfigResponse<typeof Gods_getConfig>)
| ({ path: '/' } & GetConfigResponse<typeof Index_getConfig>);

// prettier-ignore
declare module 'waku/router' {
  interface RouteConfig {
    paths: PathsForPages<Page>;
  }
  interface CreatePagesConfig {
    pages: Page;
  }
}
  
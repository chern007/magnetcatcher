import {
  PEERFLIX_EXTRA,
  TORRENTIO_EXTRA,
  PIRATEBAY_EXTRA,
  ORION_EXTRA,
  MEDIAFUSION_EXTRA,
} from '@env';

type Addon = { base: string; extra: string };

export const addons: Record<string, Addon> = {
  peerflix   : {
    base : 'https://peerflix.mov',
    extra: PEERFLIX_EXTRA || ''
  },
  torrentio  : {
    base : 'https://torrentio.strem.fun',
    extra: TORRENTIO_EXTRA || ''
  },
  thepirate  : {
    base : 'https://thepiratebay-plus.strem.fun',
    extra: PIRATEBAY_EXTRA || ''
  },
  orion      : {
    base : 'https://orion.strem.fun',
    extra: ORION_EXTRA || '' // añade &api_key=...
  },
  mediafusion: {
    base : 'https://mediafusion.elfhosted.com',
    extra: MEDIAFUSION_EXTRA || '' // añade &token=...
  }
};

export function setAddonExtra(key: keyof typeof addons, extra: string) {
  addons[key].extra = extra;
}

import {
  PEERFLIX_EXTRA,
  TORRENTIO_EXTRA,
  PIRATEBAY_EXTRA,
  ORION_EXTRA,
  MEDIAFUSION_EXTRA,
} from '@env';

type Addon = { base: string; extra: string };

export const addons: Record<string, Addon> = {
  peerflix: {
    base: 'https://peerflix-addon.onrender.com',
    extra: PEERFLIX_EXTRA || 'language=es|sort=language-desc',
  },
  torrentio: {
    base: 'https://torrentio.strem.fun',
    extra:
      TORRENTIO_EXTRA ||
      'providers=yts,eztv,rarbg,1337x,thepiratebay,kickasstorrents,torrentgalaxy,magnetdl,horriblesubs,nyaasi,tokyotosho,anidex,mejortorrent,wolfmax4k|language=spanish',
  },
  thepirate: {
    base: 'https://thepiratebay-plus.strem.fun',
    extra: PIRATEBAY_EXTRA || '',
  },
};

if (ORION_EXTRA) {
  addons.orion = {
    base: 'https://5a0d1888fa64-orion.baby-beamup.club',
    extra: ORION_EXTRA,
  };
}

if (MEDIAFUSION_EXTRA) {
  addons.mediafusion = {
    base: 'https://mediafusion.elfhosted.com',
    extra: MEDIAFUSION_EXTRA,
  };
}

export function setAddonExtra(key: keyof typeof addons, extra: string) {
  addons[key].extra = extra;
}

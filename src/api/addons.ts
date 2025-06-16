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
    base : 'https://peerflix-addon.onrender.com',
    extra: PEERFLIX_EXTRA || 'language=es|sort=language-desc'
  },
  torrentio  : {
    base : 'https://torrentio.strem.fun',
    extra: TORRENTIO_EXTRA || 'providers=yts,eztv,rarbg,1337x,thepiratebay,kickasstorrents,torrentgalaxy,magnetdl,horriblesubs,nyaasi,tokyotosho,anidex,mejortorrent,wolfmax4k|language=spanish'
  },
  thepirate  : {
    base : 'https://thepiratebay-plus.strem.fun',
    extra: PIRATEBAY_EXTRA || ''
  },
  orion      : {
    base : 'https://5a0d1888fa64-orion.baby-beamup.club',
    extra: ORION_EXTRA || 'eyJhcGkiOiJHVUYzOUNHSlNFQjdIU0Q1S1BDQ0xBNEtLN0xNR0Y4VSIsImxpbmtMaW1pdCI6IjMiLCJzb3J0VmFsdWUiOiJzdHJlYW1zZWVkcyIsImF1ZGlvY2hhbm5lbHMiOiIyLDYsOCIsInZpZGVvcXVhbGl0eSI6ImhkNGssaGQyayxoZDEwODAsaGQ3MjAsc2QiLCJsaXN0T3B0IjoidG9ycmVudCIsImRlYnJpZHNlcnZpY2VzIjpbXSwiYXVkaW9sYW5ndWFnZXMiOlsiZXMiXSwiYWRkaXRpb25hbFBhcmFtZXRlcnMiOiIifQ'
  },
  mediafusion: {
    base : 'https://mediafusion.elfhosted.com',
    extra: MEDIAFUSION_EXTRA || 'D-MwAHYWyoinQmo7680dnCraVcidbZz5sCQlR2x6zEztLCSbGTWP_5BlcCkQO9jV557OvY03MPejeGv1EF8v-sIA63smTh00psMEmuKMLW0oY'
  }
};

export function setAddonExtra(key: keyof typeof addons, extra: string) {
  addons[key].extra = extra;
}

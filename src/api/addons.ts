type Addon = { base: string; extra: string };

export const addons: Record<string, Addon> = {
  peerflix   : { base: 'https://peerflix.mov',                     extra: '' },
  torrentio  : { base: 'https://torrentio.strem.fun',              extra: '' },
  thepirate  : { base: 'https://thepiratebay-plus.strem.fun',      extra: '' },
  orion      : { base: 'https://orion.strem.fun',                  extra: '' },    // añade &api_key=...
  mediafusion: { base: 'https://mediafusion.elfhosted.com',        extra: '' }     // añade &token=...
};

export function setAddonExtra(key: keyof typeof addons, extra: string) {
  addons[key].extra = extra;
}

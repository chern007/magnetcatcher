# MagnetCatcher

This Expo/React Native app searches TV shows on TMDB and retrieves torrent streams from several Stremio add-ons. It displays available seasons, episodes and stream links so you can copy the magnet URL.

## Development

```bash
npm install
npm start
```

## Environment Variables

Create a `.env` file based on the following keys:

```
TMDB_KEY=your_tmdb_api_key
PEERFLIX_EXTRA=
TORRENTIO_EXTRA=
PIRATEBAY_EXTRA=
ORION_EXTRA=
MEDIAFUSION_EXTRA=
```

Some add-ons require tokens or API keys. Provide them in the `*_EXTRA` variables if necessary.

## Network Restrictions

If you see warnings like:

```
Addon failed https://orion.strem.fun TypeError: Network request failed
Addon failed https://peerflix.mov SyntaxError: JSON Parse error: Unexpected character: i
```

it is likely that the add-on domains are blocked or unreachable from your network. The testing environment for this repository blocks those URLs, so no stream options will be listed. Ensure your connection allows requests to the add-on hosts and that the extra tokens are correctly set.

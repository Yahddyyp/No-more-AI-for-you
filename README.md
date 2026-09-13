# No more ai for you 

A tiny browser extension that intercepts top-level navigation to a list of
AI chatbot sites and rickrolls you instead, before the page loads.

Two folders are included since Chrome and Firefox want slightly different
manifest shapes:

```
ai-redirect-extension/
├── chrome/
│   ├── manifest.json
│   └── background.js
└── firefox/
    ├── manifest.json
    └── background.js
```

Both `background.js` files are identical copies, edit one, then copy it
over the other if you make changes.

## Load it in Chrome

1. Go to `chrome://extensions`
2. Turn on **Developer mode** (top right)
3. Click **Load unpacked**
4. Select the `chrome/` folder
5. Visit chatgpt.com, perplexity.ai, or claude.ai and enjoy

## Load it in Firefox

Use firefox addons [here](https://addons.mozilla.org/en-US/firefox/addon/no-more-ai-for-you/)

### Load from source 
1. Go to `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on…**
3. Select `firefox/manifest.json`

Note: temporary add-ons in Firefox are removed when you restart the
browser. For something permanent you'd need to sign it via Mozilla's
add-on developer hub.

## Customizing which sites / which videos

Open `background.js`. Two things to edit:

- `DEFAULT_VIDEO` — the fallback YouTube URL used for any site in the map
  below that doesn't get its own specific video.
- `SITE_VIDEO_MAP` — a hostname → video URL map. Give any entry its own
  URL if you want e.g. Perplexity to get a different video than ChatGPT.

```js
const SITE_VIDEO_MAP = {
  "chatgpt.com": DEFAULT_VIDEO,
  "claude.ai": "https://www.youtube.com/watch?v=SOME_OTHER_ID",
  // add more hosts here
};
```

To watch a new site, add its hostname to `SITE_VIDEO_MAP` **and** add a
matching pattern to `host_permissions` in both `manifest.json` files
otherwise the browser won't let the extension see navigation to it.

## Uninstalling

Chrome: `chrome://extensions` → remove.
Firefox: `about:debugging` → remove, or just restart the browser since
temporary add-ons don't persist.

## Note on AI Usage

This extension was vibe coded so that i stop relying on AI as much even
tho i used it to make this extension, but to beat the AI you use the AI am 
I right fellas. 

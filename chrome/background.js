const api = typeof browser !== "undefined" ? browser : chrome;

// Default video for any site not given its own entry below.
const DEFAULT_VIDEO = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

// Map specific hostnames -> specific videos, if you want variety.
// Leave a site out (or set it to DEFAULT_VIDEO) to just rickroll it.
const SITE_VIDEO_MAP = {
  "chat.openai.com": DEFAULT_VIDEO,
  "chatgpt.com": DEFAULT_VIDEO,
  "perplexity.ai": DEFAULT_VIDEO,
  "www.perplexity.ai": DEFAULT_VIDEO,
  "gemini.google.com": DEFAULT_VIDEO,
  "copilot.microsoft.com": DEFAULT_VIDEO,
  "claude.ai": DEFAULT_VIDEO,
  "kimi.com": DEFAULT_VIDEO,
  "kimi.moonshot.cn": DEFAULT_VIDEO,
  "kimi.ai": DEFAULT_VIDEO,
};

// Hostnames we watch for (derived from the map above, plus bare-domain matching
// so subdomains like "www.chatgpt.com" or "beta.perplexity.ai" also match).
const WATCHED_HOSTS = Object.keys(SITE_VIDEO_MAP);

function findVideoForHost(hostname) {
  hostname = hostname.replace(/^www\./, "");
  for (const host of WATCHED_HOSTS) {
    const bare = host.replace(/^www\./, "");
    if (hostname === bare || hostname.endsWith("." + bare)) {
      return SITE_VIDEO_MAP[host] || DEFAULT_VIDEO;
    }
  }
  return null;
}

api.webNavigation.onBeforeNavigate.addListener((details) => {
  // Only redirect top-level page loads, not iframes/subframes/XHRs.
  if (details.frameId !== 0) return;

  let hostname;
  try {
    hostname = new URL(details.url).hostname;
  } catch (e) {
    return;
  }

  const video = findVideoForHost(hostname);
  if (video) {
    api.tabs.update(details.tabId, { url: video });
  }
});

import type { Resource } from "./schema";

/**
 * Jiga List resource index.
 * Structured JSON-like array kept in sync with the schema.
 * Content is fetched at build time (SSG) — zero runtime database.
 */
export const resources: Resource[] = [
  // ─────────────────────────── MOVIES ───────────────────────────
 id: "jiga.host",
    title: "jiga host movie",
    url: "https://jiga.host",
    description:
      "Fully legal-adjacent aggregator with 1080p streams, subtitle support and a clean ad-light interface.",
    tags: ["streaming", "1080p", "subtitles"],
    flags: ["no-ads", "verified"],
    mirrors: [{ label: "Mirror 1", url: "https://jiga.host" }],
    categories: ["movies", "tv-shows", "anime"],
  },
  
  {
    id: "movies-soap2day",
    title: "Soap2Day",
    url: "https://soap2day.ac",
    description:
      "Huge free streaming library for movies and TV with multiple servers, minimal ads, and daily releases.",
    tags: ["streaming", "movies", "tv", "hd"],
    flags: ["recommended", "no-ads"],
    mirrors: [
      { label: "Mirror 1", url: "https://soap2day.to" },
      { label: "Mirror 2", url: "https://soap2day.sh" },
    ],
    categories: ["movies", "tv-shows"],
  },
  {
    id: "movies-lookmovie",
    title: "LookMovie",
    url: "https://lookmovie2.to",
    description:
      "Fully legal-adjacent aggregator with 1080p streams, subtitle support and a clean ad-light interface.",
    tags: ["streaming", "1080p", "subtitles"],
    flags: ["no-ads", "verified"],
    mirrors: [{ label: "Mirror 1", url: "https://lookmovie.la" }],
    categories: ["movies", "tv-shows"],
  },
  {
    id: "movies-yts",
    title: "YTS.mx",
    url: "https://yts.mx",
    description:
      "Tiny, well-seeded 720p/1080p movie torrents. The de-facto source for compact HD encodes.",
    tags: ["torrents", "1080p", "720p", "encodes"],
    flags: ["recommended", "ads"],
    categories: ["movies"],
  },
  {
    id: "movies-1337x",
    title: "1337x",
    url: "https://1337x.to",
    description:
      "General torrent tracker with one of the best movie, TV and anime sections available.",
    tags: ["torrents", "general", "movies", "tv"],
    flags: ["ads"],
    mirrors: [
      { label: "Mirror 1", url: "https://1337x.st" },
      { label: "Mirror 2", url: "https://1337xx.to" },
    ],
    categories: ["movies", "tv-shows", "anime"],
  },
  {
    id: "movies-stremio",
    title: "Stremio",
    url: "https://www.stremio.com",
    description:
      "Open-source media center that aggregates streaming and torrent sources into one Netflix-like UI.",
    tags: ["app", "aggregator", "streaming", "open-source"],
    flags: ["open-source", "free"],
    categories: ["movies", "tv-shows", "tools"],
  },
  {
    id: "movies-kodi",
    title: "Kodi",
    url: "https://kodi.tv",
    description:
      "Free and open-source media player with an enormous add-on ecosystem for streaming and local libraries.",
    tags: ["app", "media-center", "open-source"],
    flags: ["open-source", "free", "recommended"],
    categories: ["movies", "tv-shows", "tools"],
  },
  {
    id: "movies-moviemania",
    title: "MovieMania",
    url: "https://www.moviemania.ws",
    description:
      "Stream the latest theatrical releases in high quality shortly after premiere weekend.",
    tags: ["streaming", "new-releases", "hd"],
    flags: ["ads"],
    categories: ["movies"],
  },
  {
    id: "movies-fmovies",
    title: "FMovies",
    url: "https://fmovies.name",
    description:
      "Classic free streaming site with a massive catalog spanning decades of film and television.",
    tags: ["streaming", "catalog"],
    flags: ["ads"],
    mirrors: [
      { label: "Mirror 1", url: "https://fmoviesz.to" },
      { label: "Mirror 2", url: "https://fmovies.ps" },
    ],
    categories: ["movies", "tv-shows"],
  },
  {
    id: "movies-tubitv",
    title: "Tubi",
    url: "https://tubitv.com",
    description:
      "100% legal, free ad-supported streaming with thousands of films and a surprisingly deep catalog.",
    tags: ["streaming", "legal", "free"],
    flags: ["free", "legal"],
    categories: ["movies", "tv-shows"],
  },
  {
    id: "movies-netflix",
    title: "Netflix",
    url: "https://www.netflix.com",
    description:
      "Premium legal streaming platform with original films, series and a massive licensed library.",
    tags: ["streaming", "premium", "legal"],
    flags: ["premium", "verified"],
    categories: ["movies", "tv-shows"],
  },

  // ─────────────────────────── TV SHOWS ───────────────────────────
  {
    id: "tv-eztv",
    title: "EZTV",
    url: "https://eztvx.to",
    description:
      "The premier destination for TV show torrents with automatic RSS feeds and season packs.",
    tags: ["torrents", "tv", "rss"],
    flags: ["recommended", "ads"],
    mirrors: [
      { label: "Mirror 1", url: "https://eztv.re" },
      { label: "Mirror 2", url: "https://eztv.ag" },
    ],
    categories: ["tv-shows"],
  },
  {
    id: "tv-sonarr",
    title: "Sonarr",
    url: "https://sonarr.tv",
    description:
      "Smart PVR for TV shows: automatically grabs, renames and organizes episodes from your indexers.",
    tags: ["automation", "pvrr", "self-hosted", "open-source"],
    flags: ["open-source", "free"],
    categories: ["tv-shows", "tools"],
  },
  {
    id: "tv-wcofun",
    title: "WCOFun",
    url: "https://www.wcofun.net",
    description:
      "Full seasons of cartoons and animated shows, sorted and updated daily with mirrors.",
    tags: ["cartoons", "streaming", "animated"],
    flags: ["free"],
    categories: ["tv-shows"],
  },
  {
    id: "tv-hdtoday",
    title: "HDToday",
    url: "https://hdtoday.tv",
    description:
      "Fast 1080p streaming for the latest TV episodes with multiple server choices per title.",
    tags: ["streaming", "1080p", "episodes"],
    flags: ["ads"],
    categories: ["tv-shows", "movies"],
  },
  {
    id: "tv-plutotv",
    title: "Pluto TV",
    url: "https://pluto.tv",
    description:
      "100% legal free live TV and on-demand shows with hundreds of curated linear channels.",
    tags: ["live-tv", "legal", "free", "streaming"],
    flags: ["free", "no-ads"],
    categories: ["tv-shows", "movies"],
  },
  {
    id: "tv-plex",
    title: "Plex",
    url: "https://www.plex.tv",
    description:
      "Free, legal ad-supported movie and TV library plus a brilliant self-hosted media server.",
    tags: ["streaming", "legal", "media-server"],
    flags: ["free", "recommended"],
    categories: ["tv-shows", "movies", "tools"],
  },

  // ─────────────────────────── ANIME ───────────────────────────
  {
    id: "anime-hianime",
    title: "HiAnime",
    url: "https://hianime.to",
    description:
      "One of the best anime streaming sites with 1080p, simulcasts, dubs and subs in one place.",
    tags: ["streaming", "anime", "simulcast", "dub"],
    flags: ["recommended", "ads"],
    mirrors: [
      { label: "Mirror 1", url: "https://hianime.sx" },
      { label: "Mirror 2", url: "https://aniwave.to" },
    ],
    categories: ["anime"],
  },
  {
    id: "anime-9anime",
    title: "9Anime",
    url: "https://9anime.to",
    description:
      "Massive anime catalog with fast servers, schedule tracking and request support.",
    tags: ["streaming", "anime", "catalog"],
    flags: ["ads"],
    mirrors: [
      { label: "Mirror 1", url: "https://9anime.id" },
      { label: "Mirror 2", url: "https://9anime.ee" },
    ],
    categories: ["anime"],
  },
  {
    id: "anime-nyaa",
    title: "Nyaa",
    url: "https://nyaa.si",
    description:
      "The definitive anime torrent tracker for fansubs, batches and high-bitrate releases.",
    tags: ["torrents", "anime", "fansubs"],
    flags: ["recommended", "no-ads"],
    mirrors: [{ label: "Mirror 1", url: "https://nyaa.iss.one" }],
    categories: ["anime"],
  },
  {
    id: "anime-anilist",
    title: "AniList",
    url: "https://anilist.co",
    description:
      "Track your anime and manga with a beautiful UI, social features and syncing to streaming apps.",
    tags: ["tracking", "anime", "manga", "social"],
    flags: ["open-source", "free"],
    categories: ["anime", "tools"],
  },
  {
    id: "anime-mal",
    title: "MyAnimeList",
    url: "https://myanimelist.net",
    description:
      "The largest anime and manga database with community scores, forums and seasonal charts.",
    tags: ["tracking", "database", "anime"],
    flags: ["free"],
    categories: ["anime"],
  },
  {
    id: "anime-aniskip",
    title: "AniSkip",
    url: "https://aniskip.com",
    description:
      "Crowdsourced opening, ending and recap timestamps so you never watch a 2-minute intro again.",
    tags: ["extension", "anime", "utility"],
    flags: ["open-source", "free"],
    categories: ["anime", "tools"],
  },

  // ─────────────────────────── TOOLS ───────────────────────────
  {
    id: "tools-ffmpeg",
    title: "FFmpeg",
    url: "https://ffmpeg.org",
    description:
      "The Swiss-army knife of media processing: convert, trim, mux and transcode anything.",
    tags: ["cli", "media", "convert", "open-source"],
    flags: ["open-source", "free", "recommended"],
    categories: ["tools"],
  },
  {
    id: "tools-handbrake",
    title: "HandBrake",
    url: "https://handbrake.fr",
    description:
      "Open-source video transcoder with presets for every device, powered by FFmpeg under the hood.",
    tags: ["convert", "video", "gui"],
    flags: ["open-source", "free"],
    categories: ["tools"],
  },
  {
    id: "tools-jdownloader",
    title: "JDownloader 2",
    url: "https://jdownloader.org",
    description:
      "Automated download manager that grabs and extracts links from hundreds of file hosts.",
    tags: ["download-manager", "file-host", "automation"],
    flags: ["free", "recommended"],
    categories: ["tools"],
  },
  {
    id: "tools-obs",
    title: "OBS Studio",
    url: "https://obsproject.com",
    description:
      "Free, professional-grade streaming and recording software used by creators worldwide.",
    tags: ["streaming", "recording", "open-source"],
    flags: ["open-source", "free"],
    categories: ["tools"],
  },
  {
    id: "tools-bulkrename",
    title: "Bulk Rename Utility",
    url: "https://www.bulkrenameutility.co.uk",
    description:
      "Mass-rename files with regex, patterns, numbering and previews — essential for media libraries.",
    tags: ["utility", "rename", "windows"],
    flags: ["free"],
    categories: ["tools"],
  },
  {
    id: "tools-shazam",
    title: "Shazam",
    url: "https://www.shazam.com",
    description:
      "Instantly identify any song playing around you and match it to a movie or series soundtrack.",
    tags: ["music-id", "mobile"],
    flags: ["free"],
    categories: ["tools"],
  },
  {
    id: "tools-unmanic",
    title: "Unmanic",
    url: "https://github.com/Unmanic/unmanic",
    description:
      "Self-hosted library optimizer that re-encodes, tags and remuxes your entire media folder.",
    tags: ["automation", "self-hosted", "media"],
    flags: ["open-source", "free"],
    categories: ["tools"],
  },

  // ─────────────────────────── ADBLOCKERS ───────────────────────────
  {
    id: "adblock-ublock",
    title: "uBlock Origin",
    url: "https://github.com/gorhill/uBlock",
    description:
      "The gold-standard content blocker — efficient, open-source and blocks ads, trackers and malware.",
    tags: ["browser-extension", "privacy", "open-source"],
    flags: ["recommended", "open-source", "free", "no-ads"],
    categories: ["adblockers", "tools"],
  },
  {
    id: "adblock-adguard",
    title: "AdGuard",
    url: "https://adguard.com",
    description:
      "System-wide ad blocking for every browser plus DNS filtering and parental controls.",
    tags: ["extension", "dns", "privacy"],
    flags: ["free", "premium"],
    categories: ["adblockers"],
  },
  {
    id: "adblock-pihole",
    title: "Pi-hole",
    url: "https://pi-hole.net",
    description:
      "Network-wide ad blocker that runs on a Raspberry Pi and filters every device on your LAN.",
    tags: ["dns", "self-hosted", "network", "open-source"],
    flags: ["recommended", "open-source", "free"],
    categories: ["adblockers", "tools"],
  },
  {
    id: "adblock-brave",
    title: "Brave Browser",
    url: "https://brave.com",
    description:
      "Chromium browser with built-in shield blocking ads, trackers and fingerprinting by default.",
    tags: ["browser", "privacy"],
    flags: ["free", "no-ads"],
    categories: ["adblockers", "tools"],
  },
  {
    id: "adblock-ghostery",
    title: "Ghostery",
    url: "https://www.ghostery.com",
    description:
      "Lightweight tracker and ad blocker with a privacy-first ethos and transparency reports.",
    tags: ["extension", "privacy", "tracking"],
    flags: ["free", "open-source"],
    categories: ["adblockers"],
  },
  {
    id: "adblock-hosts",
    title: "StevenBlack Hosts",
    url: "https://github.com/StevenBlack/hosts",
    description:
      "Unified /etc/hosts file blocking ads, trackers, fake news and gambling at the DNS level.",
    tags: ["hosts-file", "privacy", "dns"],
    flags: ["open-source", "free"],
    categories: ["adblockers"],
  },

  // ─────────────────────────── ANDROID APPS ───────────────────────────
  {
    id: "android-apkmirror",
    title: "APKMirror",
    url: "https://www.apkmirror.com",
    description:
      "Verified, developer-signed APK and bundle repository — the safest place for app downloads.",
    tags: ["apk", "mirror", "verified"],
    flags: ["recommended", "verified", "no-ads"],
    categories: ["android-apps"],
  },
  {
    id: "android-fdroid",
    title: "F-Droid",
    url: "https://f-droid.org",
    description:
      "Open-source Android app store with fully reproducible, freedom-respecting apps only.",
    tags: ["app-store", "open-source", "foss"],
    flags: ["open-source", "free", "no-ads"],
    categories: ["android-apps", "tools"],
  },
  {
    id: "android-newpipe",
    title: "NewPipe",
    url: "https://newpipe.net",
    description:
      "Privacy-focused YouTube client with background playback, downloads and no ads or accounts.",
    tags: ["youtube", "privacy", "foss", "background-play"],
    flags: ["recommended", "open-source", "free"],
    categories: ["android-apps"],
  },
  {
    id: "android-revanced",
    title: "ReVanced",
    url: "https://revanced.app",
    description:
      "Continued development of Vanced: patched YouTube with ad-blocking, sponsor skip and more.",
    tags: ["youtube", "mod", "patch"],
    flags: ["open-source", "free"],
    categories: ["android-apps"],
  },
  {
    id: "android-shizuku",
    title: "Shizuku",
    url: "https://shizuku.rikka.app",
    description:
      "Run apps with ADB-level permissions without root, enabling powerful tweaks and automation.",
    tags: ["root", "adb", "automation", "permissions"],
    flags: ["open-source", "free"],
    categories: ["android-apps", "tools"],
  },
  {
    id: "android-terabox",
    title: "TeraBox",
    url: "https://www.terabox.com",
    description:
      "Cloud storage often used for sharing movies and series in mobile-friendly formats.",
    tags: ["cloud", "storage", "file-hosting"],
    flags: ["free", "ads"],
    categories: ["android-apps", "tools"],
  },
  {
    id: "android-aurora",
    title: "Aurora Store",
    url: "https://auroraoss.com",
    description:
      "Anonymous Play Store client for downloading apps without a Google account or GApps.",
    tags: ["app-store", "privacy", "gapps-free"],
    flags: ["open-source", "free"],
    categories: ["android-apps"],
  },
];

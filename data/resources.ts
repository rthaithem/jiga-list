import type { Resource } from "./schema";

/**
 * Jiga List verified resource directory & wiki database.
 * Every entry is indexed at build time (SSG) for instant <50ms static delivery.
 * 100% Free, zero trackers, community-curated.
 */
export const resources: Resource[] = [
  // ─────────────────────────── WIKI ───────────────────────────
  {
    id: "wiki-fmhy",
    title: "FreeMediaHeckYeah (FMHY)",
    url: "https://fmhy.net",
    description:
      "The largest, most comprehensive open-source wiki and curated megathread for free media, tools, and digital resources on the internet.",
    tags: ["wiki", "megathread", "open-source", "curated", "directory"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    mirrors: [
      { label: "Pages Mirror", url: "https://fmhy.pages.dev" },
      { label: "GitHub Repo", url: "https://github.com/nbats/FMHYedit" },
    ],
    categories: ["wiki"],
  },
  {
    id: "wiki-wikipedia",
    title: "Wikipedia",
    url: "https://en.wikipedia.org",
    description:
      "The world's largest free, multilingual collaborative encyclopedia with tens of millions of open-source articles across human knowledge.",
    tags: ["encyclopedia", "knowledge", "reference", "open-access"],
    flags: ["recommended", "open-source", "free", "no-ads", "legal", "verified"],
    categories: ["wiki", "educational"],
  },
  {
    id: "wiki-archwiki",
    title: "ArchWiki",
    url: "https://wiki.archlinux.org",
    description:
      "The gold-standard Linux and systems engineering documentation wiki, packed with in-depth solutions for hardware, networking, and software.",
    tags: ["linux", "documentation", "guide", "sysadmin"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    categories: ["wiki", "linux"],
  },
  {
    id: "wiki-privacyguides",
    title: "Privacy Guides",
    url: "https://www.privacyguides.org",
    description:
      "Non-profit, community-oriented security recommendations and operational security checklists protecting privacy against mass surveillance.",
    tags: ["privacy", "security", "guide", "encryption"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    categories: ["wiki", "adblocking-privacy"],
  },
  {
    id: "wiki-archive-org",
    title: "The Internet Archive & Wayback Machine",
    url: "https://archive.org",
    description:
      "Non-profit digital library offering free universal access to billions of archived web pages, historical software, audio recordings, and books.",
    tags: ["wayback", "archive", "history", "library"],
    flags: ["recommended", "free", "no-ads", "legal", "verified"],
    categories: ["wiki", "books-comics-manga", "educational"],
  },
  {
    id: "wiki-devdocs",
    title: "DevDocs",
    url: "https://devdocs.io",
    description:
      "Fast, offline-capable, and unified API documentation browser combining 100+ programming language and framework specs into one single UI.",
    tags: ["developer", "documentation", "api", "offline"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    categories: ["wiki", "educational"],
  },
  {
    id: "wiki-awesome",
    title: "Awesome Lists",
    url: "https://github.com/sindresorhus/awesome",
    description:
      "Curated directory of community-maintained 'Awesome' lists covering programming languages, frameworks, sysadmin tools, and platforms.",
    tags: ["curated", "github", "lists", "developer"],
    flags: ["open-source", "free", "no-ads", "verified"],
    categories: ["wiki"],
  },

  // ───────────────────── ADBLOCKING / PRIVACY ─────────────────────
  {
    id: "adblock-ublock",
    title: "uBlock Origin",
    url: "https://ublockorigin.com",
    description:
      "The gold-standard, open-source wide-spectrum content blocker. Efficient, light on CPU and memory, with zero commercial monetization.",
    tags: ["adblocker", "privacy", "open-source", "extension"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    mirrors: [{ label: "GitHub", url: "https://github.com/gorhill/uBlock" }],
    categories: ["adblocking-privacy"],
  },
  {
    id: "adblock-adguard",
    title: "AdGuard",
    url: "https://adguard.com",
    description:
      "System-wide and browser ad blocking suite with custom filtering rules, parental controls, and secure public DNS resolvers.",
    tags: ["adblock", "dns", "privacy", "security"],
    flags: ["free", "verified"],
    categories: ["adblocking-privacy"],
  },
  {
    id: "adblock-pihole",
    title: "Pi-hole",
    url: "https://pi-hole.net",
    description:
      "Network-wide DNS sinkhole that blocks advertisements and tracking beacons for all devices connected to your local network or home router.",
    tags: ["dns", "self-hosted", "network", "open-source"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    categories: ["adblocking-privacy", "linux"],
  },
  {
    id: "adblock-brave",
    title: "Brave Browser",
    url: "https://brave.com",
    description:
      "Privacy-focused Chromium-based browser with built-in Brave Shields blocking intrusive ads, fingerprinters, and tracking cookies out of the box.",
    tags: ["browser", "privacy", "shield"],
    flags: ["recommended", "free", "no-ads", "verified"],
    categories: ["adblocking-privacy"],
  },
  {
    id: "adblock-protonvpn",
    title: "Proton VPN",
    url: "https://protonvpn.com",
    description:
      "Swiss-based, audited zero-logs VPN created by CERN scientists featuring a truly unlimited free tier with strong cryptographic encryption.",
    tags: ["vpn", "privacy", "switzerland", "open-source"],
    flags: ["recommended", "open-source", "free", "verified"],
    categories: ["adblocking-privacy"],
  },
  {
    id: "adblock-mullvad",
    title: "Mullvad VPN & Public DNS",
    url: "https://mullvad.net",
    description:
      "Account-number-only privacy VPN with no email or personal details needed, plus free encrypted DoH/DoT privacy DNS blocking ads and malware.",
    tags: ["vpn", "dns", "wireguard", "no-logs"],
    flags: ["recommended", "verified"],
    categories: ["adblocking-privacy"],
  },
  {
    id: "adblock-quad9",
    title: "Quad9 DNS",
    url: "https://quad9.net",
    description:
      "Global non-profit public DNS service (9.9.9.9) blocking malicious domains, phishing, and botnets with zero logging of user IP addresses.",
    tags: ["dns", "malware-blocking", "non-profit", "anycast"],
    flags: ["open-source", "free", "no-ads", "verified"],
    categories: ["adblocking-privacy"],
  },

  // ────────────────── ARTIFICIAL INTELLIGENCE ───────────────────
  {
    id: "ai-chatgpt",
    title: "ChatGPT",
    url: "https://chatgpt.com",
    description:
      "OpenAI's foundational conversational intelligence offering advanced reasoning, coding capabilities, web search, and image analysis.",
    tags: ["llm", "chat", "openai", "ai-assistant"],
    flags: ["recommended", "free", "verified"],
    categories: ["ai"],
  },
  {
    id: "ai-claude",
    title: "Claude",
    url: "https://claude.ai",
    description:
      "Anthropic's frontier AI assistant known for exceptional reasoning, coding fidelity, nuanced long-context document synthesis, and safety.",
    tags: ["anthropic", "coding", "reasoning", "llm"],
    flags: ["recommended", "free", "verified"],
    categories: ["ai"],
  },
  {
    id: "ai-google-studio",
    title: "Google AI Studio & Gemini",
    url: "https://aistudio.google.com",
    description:
      "Developer portal to prototype with Google's multimodal Gemini models featuring million-token context windows, audio, video, and code analysis.",
    tags: ["google", "gemini", "multimodal", "api"],
    flags: ["recommended", "free", "verified"],
    categories: ["ai"],
  },
  {
    id: "ai-perplexity",
    title: "Perplexity AI",
    url: "https://www.perplexity.ai",
    description:
      "Conversational answer engine delivering grounded, real-time responses with direct academic and journalistic citations across the web.",
    tags: ["search", "citations", "research", "generative"],
    flags: ["recommended", "free", "verified"],
    categories: ["ai"],
  },
  {
    id: "ai-huggingface",
    title: "Hugging Face",
    url: "https://huggingface.co",
    description:
      "The GitHub of machine learning. Host, discover, and run open-source models, datasets, and collaborative Spaces for free.",
    tags: ["open-weights", "datasets", "spaces", "machine-learning"],
    flags: ["recommended", "open-source", "free", "verified"],
    categories: ["ai"],
  },
  {
    id: "ai-ollama",
    title: "Ollama",
    url: "https://ollama.com",
    description:
      "Get up and running with large language models locally. Run Llama, DeepSeek, Mistral, and Gemma entirely on your private machine.",
    tags: ["local-ai", "cli", "open-source", "offline"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    categories: ["ai", "linux", "macos"],
  },
  {
    id: "ai-deepseek",
    title: "DeepSeek",
    url: "https://chat.deepseek.com",
    description:
      "Cutting-edge open-weights reasoning model delivering world-class mathematics, coding, and logical problem-solving.",
    tags: ["reasoning", "coding", "open-weights", "deepseek"],
    flags: ["recommended", "free", "verified"],
    categories: ["ai"],
  },
  {
    id: "ai-lmstudio",
    title: "LM Studio",
    url: "https://lmstudio.ai",
    description:
      "Discover, download, and experiment with local LLMs on your Mac or PC with an intuitive desktop UI and OpenAI-compatible local server.",
    tags: ["gui", "local-llm", "desktop", "offline"],
    flags: ["free", "no-ads", "verified"],
    categories: ["ai", "macos"],
  },

  // ────────────────── MOVIES / TV / ANIME ───────────────────
  {
    id: "media-jiga-host",
    title: "Jiga Host",
    url: "https://jiga.host",
    description:
      "Curated media streaming interface with rapid 1080p playback, auto-server failover, multi-language audio, and zero clutter.",
    tags: ["streaming", "1080p", "subtitles", "fast"],
    flags: ["recommended", "no-ads", "verified"],
    mirrors: [{ label: "Official Mirror", url: "https://jiga.host" }],
    categories: ["movies-tv-anime"],
  },
  {
    id: "media-braflix",
    title: "Braflix",
    url: "https://braflix.gd",
    description:
      "Modern video catalog offering movies, TV shows, and anime with multi-source auto-fallback, subtitles, and clean navigation.",
    tags: ["streaming", "movies", "tv", "hd"],
    flags: ["recommended", "free", "no-ads", "verified"],
    mirrors: [
      { label: "Mirror 1", url: "https://braflix.st" },
      { label: "Mirror 2", url: "https://braflix.ru" },
    ],
    categories: ["movies-tv-anime"],
  },
  {
    id: "media-hianime",
    title: "HiAnime",
    url: "https://hianime.to",
    description:
      "Premier anime streaming library with simultaneous simulcasts, subbed and dubbed options, schedule notifications, and full HD quality.",
    tags: ["anime", "simulcast", "sub", "dub"],
    flags: ["recommended", "ads", "verified"],
    mirrors: [
      { label: "Mirror 1", url: "https://hianime.sx" },
      { label: "Mirror 2", url: "https://hianime.nz" },
    ],
    categories: ["movies-tv-anime"],
  },
  {
    id: "media-lookmovie",
    title: "LookMovie",
    url: "https://lookmovie2.to",
    description:
      "Extensive movie and TV series portal featuring high-bitrate video streams, multi-language subtitle tracks, and seasonal releases.",
    tags: ["streaming", "series", "movies", "subtitles"],
    flags: ["free", "no-ads", "verified"],
    mirrors: [{ label: "Mirror 1", url: "https://lookmovie.la" }],
    categories: ["movies-tv-anime"],
  },
  {
    id: "media-tubi",
    title: "Tubi TV",
    url: "https://tubitv.com",
    description:
      "100% legal, free ad-supported streaming television service with over 50,000 movies and series from major Hollywood studios.",
    tags: ["legal", "licensed", "movies", "tv"],
    flags: ["recommended", "free", "legal", "verified"],
    categories: ["movies-tv-anime"],
  },
  {
    id: "media-stremio",
    title: "Stremio",
    url: "https://www.stremio.com",
    description:
      "Modern open-source media aggregator organizing video content from your hard drive, YouTube, Twitch, and community add-on streams.",
    tags: ["player", "aggregator", "open-source", "cross-platform"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    categories: ["movies-tv-anime", "android", "macos", "linux"],
  },
  {
    id: "media-nyaa",
    title: "Nyaa",
    url: "https://nyaa.si",
    description:
      "The definitive East Asian and anime media tracker for raw video, high-bitrate fansubs, original soundtracks, and complete seasonal batches.",
    tags: ["anime", "tracker", "fansubs", "lossless"],
    flags: ["recommended", "no-ads", "verified"],
    mirrors: [{ label: "Mirror 1", url: "https://nyaa.iss.one" }],
    categories: ["movies-tv-anime", "torrenting"],
  },

  // ──────────────── MUSIC / PODCASTS / RADIO ─────────────────
  {
    id: "audio-radio-garden",
    title: "Radio Garden",
    url: "https://radio.garden",
    description:
      "Explore live radio broadcasts across the globe by rotating an interactive 3D digital globe to discover local stations in real time.",
    tags: ["radio", "globe", "interactive", "worldwide"],
    flags: ["recommended", "free", "no-ads", "verified"],
    categories: ["music-podcasts-radio"],
  },
  {
    id: "audio-spotube",
    title: "Spotube",
    url: "https://spotube.krtirtho.dev",
    description:
      "Open-source Spotify client using YouTube/Piped as audio source. Zero telemetry, no premium account required, and no intrusive audio ads.",
    tags: ["spotify", "player", "open-source", "ad-free"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    categories: ["music-podcasts-radio", "android", "linux", "macos"],
  },
  {
    id: "audio-funkwhale",
    title: "Funkwhale",
    url: "https://funkwhale.audio",
    description:
      "Community-driven, federated audio sharing and streaming platform designed to empower artists and listeners via ActivityPub.",
    tags: ["federated", "music", "self-hosted", "activitypub"],
    flags: ["open-source", "free", "no-ads", "verified"],
    categories: ["music-podcasts-radio"],
  },
  {
    id: "audio-fma",
    title: "Free Music Archive",
    url: "https://freemusicarchive.org",
    description:
      "Curated repository of high-quality, legal audio downloads and Creative Commons music curated by independent radio producers.",
    tags: ["royalty-free", "creative-commons", "indie", "lossless"],
    flags: ["free", "legal", "verified"],
    categories: ["music-podcasts-radio"],
  },
  {
    id: "audio-antennapod",
    title: "AntennaPod",
    url: "https://antennapod.org",
    description:
      "The premier open-source podcast manager and player for Android. Access millions of open RSS feeds with zero tracking and full privacy.",
    tags: ["podcasts", "rss", "open-source", "android"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    categories: ["music-podcasts-radio", "android"],
  },

  // ────────────────── GAMING / EMULATION ───────────────────
  {
    id: "game-retroarch",
    title: "RetroArch",
    url: "https://www.retroarch.com",
    description:
      "The definitive open-source frontend for video game emulators, game engines, and media players. Runs on PC, consoles, and mobile.",
    tags: ["emulation", "retro", "frontend", "cores"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    categories: ["gaming-emulation", "android", "ios", "linux", "macos"],
  },
  {
    id: "game-dolphin",
    title: "Dolphin Emulator",
    url: "https://dolphin-emu.org",
    description:
      "Open-source emulator for GameCube and Wii consoles with support for 4K resolutions, widescreen hacks, networked play, and modern controllers.",
    tags: ["gamecube", "wii", "emulator", "open-source"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    categories: ["gaming-emulation", "macos", "linux"],
  },
  {
    id: "game-pcsx2",
    title: "PCSX2",
    url: "https://pcsx2.net",
    description:
      "PlayStation 2 emulator supporting over 98% of the PS2 game library with upscaled textures, custom resolutions, and save states.",
    tags: ["ps2", "playstation", "emulator", "vulkan"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    categories: ["gaming-emulation", "linux", "macos"],
  },
  {
    id: "game-rpcs3",
    title: "RPCS3",
    url: "https://rpcs3.net",
    description:
      "Open-source Sony PlayStation 3 emulator and debugger written in C++ for Windows, Linux, and macOS with Vulkan rendering.",
    tags: ["ps3", "emulator", "vulkan", "open-source"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    categories: ["gaming-emulation", "linux"],
  },
  {
    id: "game-ppsspp",
    title: "PPSSPP",
    url: "https://www.ppsspp.org",
    description:
      "Fast, portable Sony PSP emulator that can run games in full HD with anisotropic filtering and texture scaling across all operating systems.",
    tags: ["psp", "playstation-portable", "mobile", "emulator"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    categories: ["gaming-emulation", "android", "ios"],
  },
  {
    id: "game-itch-free",
    title: "Itch.io Free Games",
    url: "https://itch.io/games/free",
    description:
      "Independent video game marketplace hosting tens of thousands of free, creative, and DRM-free games from creators around the world.",
    tags: ["indie", "drm-free", "game-jams", "pc-games"],
    flags: ["recommended", "free", "legal", "verified"],
    categories: ["gaming-emulation"],
  },
  {
    id: "game-fitgirl",
    title: "FitGirl Repacks",
    url: "https://fitgirl-repacks.site",
    description:
      "Renowned source for ultra-compressed, deduplicated PC game releases with verified installer integrity and selective download components.",
    tags: ["repacks", "compression", "offline-games"],
    flags: ["recommended", "verified", "no-ads"],
    categories: ["gaming-emulation", "torrenting"],
  },

  // ──────────────── BOOKS / COMICS / MANGA ─────────────────
  {
    id: "books-annas-archive",
    title: "Anna's Archive",
    url: "https://annas-archive.org",
    description:
      "Universal open-access shadow library meta-search engine preserving human knowledge across books, academic papers, comics, and magazines.",
    tags: ["books", "papers", "shadow-library", "epubs"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    mirrors: [
      { label: "Mirror 1", url: "https://annas-archive.se" },
      { label: "Mirror 2", url: "https://annas-archive.li" },
    ],
    categories: ["books-comics-manga", "wiki"],
  },
  {
    id: "books-libgen",
    title: "Library Genesis (LibGen)",
    url: "https://libgen.is",
    description:
      "Definitive digital repository of scientific journal articles, academic papers, textbooks, and general interest fiction and non-fiction.",
    tags: ["academic", "textbooks", "science", "pdf"],
    flags: ["recommended", "free", "no-ads", "verified"],
    mirrors: [
      { label: "Mirror RS", url: "https://libgen.rs" },
      { label: "Mirror ST", url: "https://libgen.st" },
    ],
    categories: ["books-comics-manga", "educational"],
  },
  {
    id: "books-gutenberg",
    title: "Project Gutenberg",
    url: "https://www.gutenberg.org",
    description:
      "Library of over 70,000 free, digitised public domain eBooks proofread by thousands of volunteers, available in EPUB and Kindle formats.",
    tags: ["classics", "public-domain", "ebooks", "literature"],
    flags: ["recommended", "free", "no-ads", "legal", "verified"],
    categories: ["books-comics-manga", "educational"],
  },
  {
    id: "books-standard-ebooks",
    title: "Standard Ebooks",
    url: "https://standardebooks.org",
    description:
      "Volunteer-driven project producing high-quality, beautifully typeset, and open-access public domain editions formatted to modern ebook standards.",
    tags: ["typography", "standards", "epub", "open-source"],
    flags: ["recommended", "open-source", "free", "no-ads", "legal", "verified"],
    categories: ["books-comics-manga"],
  },
  {
    id: "books-mangadex",
    title: "MangaDex",
    url: "https://mangadex.org",
    description:
      "Community-driven manga and webtoon reader hosting official scanlations across dozens of languages with zero tracking and customizable readers.",
    tags: ["manga", "webtoon", "reader", "scanlations"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    categories: ["books-comics-manga"],
  },
  {
    id: "books-openlibrary",
    title: "Open Library",
    url: "https://openlibrary.org",
    description:
      "Open, editable library catalog by the Internet Archive aiming to create a webpage for every book ever published with millions of readable scans.",
    tags: ["catalog", "borrow", "archive", "bibliography"],
    flags: ["open-source", "free", "legal", "verified"],
    categories: ["books-comics-manga", "wiki"],
  },

  // ────────────────────── DOWNLOADING ──────────────────────
  {
    id: "dl-jdownloader",
    title: "JDownloader 2",
    url: "https://jdownloader.org",
    description:
      "Free, open-source download management tool with automated CAPTCHA recognition, link grabber, auto-extraction, and cloud clipboard monitoring.",
    tags: ["download-manager", "file-host", "automation", "multi-part"],
    flags: ["recommended", "open-source", "free", "verified"],
    categories: ["downloading", "macos", "linux"],
  },
  {
    id: "dl-ytdlp",
    title: "yt-dlp",
    url: "https://github.com/yt-dlp/yt-dlp",
    description:
      "The definitive command-line audio and video download utility supporting thousands of video hosting platforms, playlists, and subtitle extractors.",
    tags: ["cli", "youtube", "media", "video-dl", "open-source"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    categories: ["downloading", "linux", "macos"],
  },
  {
    id: "dl-cobalt",
    title: "Cobalt",
    url: "https://cobalt.tools",
    description:
      "Clean, ad-free web-based media downloader. Save videos, audio, and clips from Twitter, YouTube, TikTok, and Instagram with zero popups.",
    tags: ["web-downloader", "clean", "social-media", "no-ads"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    categories: ["downloading"],
  },
  {
    id: "dl-motrix",
    title: "Motrix",
    url: "https://motrix.app",
    description:
      "Full-featured open-source desktop download manager supporting BitTorrent, HTTP, FTP, and magnet links with up to 64 concurrent threads.",
    tags: ["gui", "aria2", "torrent", "multi-thread"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    categories: ["downloading", "macos", "linux"],
  },
  {
    id: "dl-seal",
    title: "Seal (Android Video Grabber)",
    url: "https://github.com/JunkFood02/Seal",
    description:
      "Modern Material You Android video & audio downloader powered by yt-dlp. Download any stream with embedded thumbnails and subtitles.",
    tags: ["android", "yt-dlp", "material-you", "mobile"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    categories: ["downloading", "android"],
  },

  // ────────────────────── TORRENTING ──────────────────────
  {
    id: "torrent-qbittorrent",
    title: "qBittorrent",
    url: "https://www.qbittorrent.org",
    description:
      "Free, open-source BitTorrent client with built-in torrent search engine, web UI remote control, sequential downloading, and zero advertisements.",
    tags: ["bittorrent", "client", "p2p", "open-source"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    categories: ["torrenting", "linux", "macos"],
  },
  {
    id: "torrent-1337x",
    title: "1337x",
    url: "https://1337x.to",
    description:
      "Long-running, verified community BitTorrent directory hosting movies, software, audio, games, and documentaries with active seed health.",
    tags: ["directory", "indexer", "p2p", "torrents"],
    flags: ["recommended", "ads", "verified"],
    mirrors: [
      { label: "Mirror SO", url: "https://1337x.so" },
      { label: "Mirror ST", url: "https://1337x.st" },
    ],
    categories: ["torrenting"],
  },
  {
    id: "torrent-tgx",
    title: "TorrentGalaxy",
    url: "https://torrentgalaxy.to",
    description:
      "High-activity community tracker providing fast verified torrents, magnet streams, audio files, and direct online media previews.",
    tags: ["tracker", "verified", "magnets", "streaming"],
    flags: ["recommended", "ads", "verified"],
    mirrors: [{ label: "Mirror MX", url: "https://torrentgalaxy.mx" }],
    categories: ["torrenting"],
  },
  {
    id: "torrent-transmission",
    title: "Transmission",
    url: "https://transmissionbt.com",
    description:
      "Fast, extremely lightweight BitTorrent client designed for low resource consumption on macOS, Linux, and embedded servers.",
    tags: ["lightweight", "open-source", "minimal", "daemon"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    categories: ["torrenting", "macos", "linux"],
  },
  {
    id: "torrent-torrentfreak",
    title: "TorrentFreak",
    url: "https://torrentfreak.com",
    description:
      "Dedicated publication focusing on copyright news, digital rights, peer-to-peer technologies, and file sharing developments.",
    tags: ["news", "journalism", "digital-rights", "p2p"],
    flags: ["free", "legal", "verified"],
    categories: ["torrenting", "wiki"],
  },

  // ───────────────────── EDUCATIONAL ──────────────────────
  {
    id: "edu-khan-academy",
    title: "Khan Academy",
    url: "https://www.khanacademy.org",
    description:
      "Free world-class education for anyone, anywhere. Interactive math, physics, biology, history, and computer programming courses.",
    tags: ["math", "science", "curriculum", "non-profit"],
    flags: ["recommended", "free", "no-ads", "legal", "verified"],
    categories: ["educational"],
  },
  {
    id: "edu-mit-ocw",
    title: "MIT OpenCourseWare",
    url: "https://ocw.mit.edu",
    description:
      "Free publication of virtually all MIT course content, including complete video lectures, syllabus notes, assignments, and exam archives.",
    tags: ["university", "mit", "computer-science", "stem"],
    flags: ["recommended", "free", "no-ads", "legal", "verified"],
    categories: ["educational"],
  },
  {
    id: "edu-freecodecamp",
    title: "freeCodeCamp",
    url: "https://www.freecodecamp.org",
    description:
      "Learn to code for free with hands-on interactive curricula, coding challenges, and verified developer certifications in web, data, and ML.",
    tags: ["coding", "fullstack", "certifications", "open-source"],
    flags: ["recommended", "open-source", "free", "no-ads", "legal", "verified"],
    categories: ["educational"],
  },
  {
    id: "edu-cs50",
    title: "Harvard CS50",
    url: "https://cs50.harvard.edu",
    description:
      "Harvard University's legendary introduction to the intellectual enterprises of computer science and the art of programming.",
    tags: ["harvard", "cs50", "programming", "algorithms"],
    flags: ["recommended", "free", "no-ads", "legal", "verified"],
    categories: ["educational"],
  },
  {
    id: "edu-mdn",
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    description:
      "Comprehensive, open standard documentation for HTML, CSS, JavaScript, and Web APIs maintained by Mozilla and the developer community.",
    tags: ["javascript", "html", "css", "web-standards"],
    flags: ["recommended", "open-source", "free", "no-ads", "legal", "verified"],
    categories: ["educational", "wiki"],
  },
  {
    id: "edu-openstax",
    title: "OpenStax",
    url: "https://openstax.org",
    description:
      "Non-profit educational initiative based at Rice University publishing peer-reviewed, openly licensed college textbooks completely free.",
    tags: ["textbooks", "peer-reviewed", "college", "open-access"],
    flags: ["recommended", "free", "no-ads", "legal", "verified"],
    categories: ["educational", "books-comics-manga"],
  },

  // ─────────────────────── ANDROID ────────────────────────
  {
    id: "android-fdroid",
    title: "F-Droid",
    url: "https://f-droid.org",
    description:
      "Official community-maintained repository of verified Free and Open Source Software (FOSS) applications for the Android platform.",
    tags: ["app-store", "foss", "open-source", "security"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    categories: ["android", "wiki"],
  },
  {
    id: "android-apkmirror",
    title: "APKMirror",
    url: "https://www.apkmirror.com",
    description:
      "Cryptographically verified developer-signed APK repository. Safe source for historical app versions, geo-restricted packages, and beta builds.",
    tags: ["apk", "signatures", "mirror", "updates"],
    flags: ["recommended", "verified", "ads"],
    categories: ["android"],
  },
  {
    id: "android-newpipe",
    title: "NewPipe",
    url: "https://newpipe.net",
    description:
      "Lightweight, privacy-first YouTube frontend for Android with background playback, picture-in-picture, popup player, and zero Google services.",
    tags: ["youtube", "privacy", "background-playback", "foss"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    categories: ["android", "music-podcasts-radio"],
  },
  {
    id: "android-revanced",
    title: "ReVanced",
    url: "https://revanced.app",
    description:
      "Open-source patcher framework continuing the legacy of Vanced. Custom patches for ad-blocking, SponsorBlock, and layout customizations.",
    tags: ["patcher", "modding", "adblocking", "open-source"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    categories: ["android"],
  },
  {
    id: "android-aurora",
    title: "Aurora Store",
    url: "https://auroraoss.com",
    description:
      "Open-source unofficial client to Google's Play Store allowing anonymous app downloads without Google Play Services or tracking.",
    tags: ["play-store", "anonymous", "foss", "client"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    categories: ["android"],
  },
  {
    id: "android-shizuku",
    title: "Shizuku",
    url: "https://shizuku.rikka.app",
    description:
      "Execute high-privilege Android ADB system APIs directly from standard user-installed apps without requiring full root access.",
    tags: ["adb", "permissions", "modding", "system"],
    flags: ["open-source", "free", "no-ads", "verified"],
    categories: ["android"],
  },

  // ───────────────────────── IOS ──────────────────────────
  {
    id: "ios-altstore",
    title: "AltStore",
    url: "https://altstore.io",
    description:
      "Sideload open-source apps on un-jailbroken iOS devices using your own Apple ID with automated wireless background refresh.",
    tags: ["sideloading", "ipa", "ios", "open-source"],
    flags: ["recommended", "open-source", "free", "verified"],
    categories: ["ios"],
  },
  {
    id: "ios-sidestore",
    title: "SideStore",
    url: "https://sidestore.io",
    description:
      "On-device sideloading utility for iPhone and iPad that refreshes your installed apps over local WireGuard VPN without needing a Mac or PC.",
    tags: ["sideloading", "vpn", "on-device", "ios"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    categories: ["ios"],
  },
  {
    id: "ios-trollstore",
    title: "TrollStore",
    url: "https://github.com/opa334/TrollStore",
    description:
      "Permanent IPA installer for supported iOS versions that signs applications with root-like entitlements and zero 7-day certificate revoke limits.",
    tags: ["jailbreak-adjacent", "permanent-signing", "ipa"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    categories: ["ios"],
  },
  {
    id: "ios-delta",
    title: "Delta Emulator",
    url: "https://deltaemulator.com",
    description:
      "All-in-one classic Nintendo emulator for iOS supporting NES, SNES, N64, Game Boy, GBA, and Nintendo DS with customizable touch controllers.",
    tags: ["emulator", "nintendo", "ios", "retro"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    categories: ["ios", "gaming-emulation"],
  },
  {
    id: "ios-yattee",
    title: "Yattee",
    url: "https://github.com/yattee/yattee",
    description:
      "Privacy-oriented video streaming frontend for iOS, iPadOS, macOS, and tvOS with SponsorBlock and custom Invidious/Piped server support.",
    tags: ["privacy", "sponsorblock", "apple-tv", "player"],
    flags: ["open-source", "free", "no-ads", "verified"],
    categories: ["ios", "macos"],
  },

  // ──────────────────────── LINUX ─────────────────────────
  {
    id: "linux-distrowatch",
    title: "DistroWatch",
    url: "https://distrowatch.com",
    description:
      "Comprehensive database, release news, package tracking, and popularity rankings for all open-source Linux and BSD distributions.",
    tags: ["distributions", "rankings", "news", "open-source"],
    flags: ["recommended", "free", "verified"],
    categories: ["linux", "wiki"],
  },
  {
    id: "linux-flathub",
    title: "Flathub",
    url: "https://flathub.org",
    description:
      "The universal decentralized app store for the Linux desktop. Install thousands of sandboxed applications across any modern distribution.",
    tags: ["flatpak", "app-store", "sandboxed", "universal"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    categories: ["linux"],
  },
  {
    id: "linux-appimage",
    title: "AppImageHub",
    url: "https://www.appimagehub.com",
    description:
      "Curated catalog of portable, zero-installation standalone Linux applications that run seamlessly on any modern kernel.",
    tags: ["appimage", "portable", "catalog", "packaging"],
    flags: ["open-source", "free", "no-ads", "verified"],
    categories: ["linux"],
  },
  {
    id: "linux-protondb",
    title: "ProtonDB",
    url: "https://www.protondb.com",
    description:
      "Crowdsourced compatibility reports and performance tweaks for thousands of Windows games running on Linux via Valve's Proton & Steam Deck.",
    tags: ["gaming", "proton", "steam-deck", "vulkan"],
    flags: ["recommended", "free", "no-ads", "verified"],
    categories: ["linux", "gaming-emulation"],
  },
  {
    id: "linux-journey",
    title: "Linux Journey",
    url: "https://linuxjourney.com",
    description:
      "Interactive, beginner-friendly learning roadmap covering command line basics, permissions, networking, process management, and kernel modules.",
    tags: ["learning", "terminal", "sysadmin", "tutorial"],
    flags: ["recommended", "open-source", "free", "no-ads", "legal", "verified"],
    categories: ["linux", "educational"],
  },

  // ──────────────────────── MACOS ─────────────────────────
  {
    id: "macos-homebrew",
    title: "Homebrew",
    url: "https://brew.sh",
    description:
      "The missing package manager for macOS. Install thousands of developer tools, CLI utilities, and graphical apps with a single terminal command.",
    tags: ["package-manager", "cli", "open-source", "macos"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    categories: ["macos"],
  },
  {
    id: "macos-raycast",
    title: "Raycast",
    url: "https://www.raycast.com",
    description:
      "Blazingly fast, extensible launcher replacing Spotlight on Mac. Manage windows, clipboard history, snippets, and integrations with hotkeys.",
    tags: ["launcher", "productivity", "extensions", "spotlight"],
    flags: ["recommended", "free", "no-ads", "verified"],
    categories: ["macos"],
  },
  {
    id: "macos-iina",
    title: "IINA",
    url: "https://iina.io",
    description:
      "The modern video and audio media player for macOS written in Swift. Integrates with mpv, Force Touch, Touch Bar, and Picture-in-Picture.",
    tags: ["media-player", "swift", "mpv", "native"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    categories: ["macos", "movies-tv-anime"],
  },
  {
    id: "macos-rectangle",
    title: "Rectangle",
    url: "https://rectangleapp.com",
    description:
      "Open-source window management tool for macOS. Move and snap windows into halves, thirds, and quadrants using simple keyboard shortcuts.",
    tags: ["window-manager", "tiling", "shortcuts", "open-source"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    categories: ["macos"],
  },
  {
    id: "macos-maccy",
    title: "Maccy",
    url: "https://maccy.app",
    description:
      "Lightweight open-source clipboard history manager for macOS that stays out of your way and lives seamlessly in your menu bar.",
    tags: ["clipboard", "menu-bar", "keyboard-first", "open-source"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    categories: ["macos"],
  },
  {
    id: "macos-lulu",
    title: "LuLu (Objective-See)",
    url: "https://objective-see.org/products/lulu.html",
    description:
      "Free, open-source macOS outbound firewall that alerts you whenever an application attempts to create an unauthorized network connection.",
    tags: ["firewall", "security", "privacy", "outbound"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    categories: ["macos", "adblocking-privacy"],
  },

  // ────────────────────── NON-ENGLISH ──────────────────────
  {
    id: "noneng-fmhy",
    title: "FMHY Non-English Index",
    url: "https://fmhy.net/non-english",
    description:
      "Community curated international directory covering media, download portals, and language resources in Arabic, French, Spanish, German, and more.",
    tags: ["multilingual", "international", "arabic", "french", "spanish"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    categories: ["non-english", "wiki"],
  },
  {
    id: "noneng-arabseed",
    title: "ArabSeed (عرب سيد)",
    url: "https://arabseed.show",
    description:
      "Renowned Arabic media portal with direct links, Arabic translations and subtitles for movies, television series, and anime releases.",
    tags: ["arabic", "movies", "series", "translations"],
    flags: ["free", "ads", "verified"],
    categories: ["non-english", "movies-tv-anime"],
  },
  {
    id: "noneng-shahid4u",
    title: "Shahid4U (شاهد فور يو)",
    url: "https://shahid4u.net",
    description:
      "Popular Middle Eastern streaming hub offering Arabic subtitled releases, Turkish drama series, and international cinema catalogs.",
    tags: ["arabic", "streaming", "drama", "subtitles"],
    flags: ["free", "ads", "verified"],
    categories: ["non-english", "movies-tv-anime"],
  },
  {
    id: "noneng-anime-sama",
    title: "Anime-Sama (French)",
    url: "https://anime-sama.fr",
    description:
      "The premier French-language anime portal providing VOSTFR (subbed) and VF (dubbed) streaming with clean categorization.",
    tags: ["french", "vostfr", "anime", "streaming"],
    flags: ["recommended", "free", "ads", "verified"],
    categories: ["non-english", "movies-tv-anime"],
  },
  {
    id: "noneng-cuevana",
    title: "Cuevana 3 (Spanish)",
    url: "https://cuevana3.ch",
    description:
      "Leading Latin American and Spanish cinema portal offering streaming movies and series with Latin and Castilian audio tracks.",
    tags: ["spanish", "latino", "cinema", "series"],
    flags: ["free", "ads", "verified"],
    categories: ["non-english", "movies-tv-anime"],
  },

  // ──────────────────── MISCELLANEOUS ─────────────────────
  {
    id: "misc-virustotal",
    title: "VirusTotal",
    url: "https://www.virustotal.com",
    description:
      "Analyze suspicious files, domains, IPs, and URLs with over 70 commercial antivirus engines and dynamic sandbox detonation.",
    tags: ["malware-scanner", "security", "antivirus", "sandbox"],
    flags: ["recommended", "free", "no-ads", "legal", "verified"],
    categories: ["miscellaneous", "adblocking-privacy"],
  },
  {
    id: "misc-temp-mail",
    title: "10 Minute Mail",
    url: "https://10minutemail.com",
    description:
      "Temporary disposable email address that automatically self-destructs after 10 minutes to protect your real inbox from spam and tracking.",
    tags: ["disposable-email", "privacy", "temporary", "anti-spam"],
    flags: ["recommended", "free", "verified"],
    categories: ["miscellaneous", "adblocking-privacy"],
  },
  {
    id: "misc-cyberchef",
    title: "CyberChef",
    url: "https://gchq.github.io/CyberChef/",
    description:
      "The Cyber Swiss Army Knife. Simple, intuitive web app for encoding, decoding, encryption, parsing, and data format conversion in browser.",
    tags: ["cyber-tools", "crypto", "decoding", "hex", "open-source"],
    flags: ["recommended", "open-source", "free", "no-ads", "verified"],
    categories: ["miscellaneous", "educational"],
  },
  {
    id: "misc-speedtest",
    title: "Cloudflare Internet Speed Test",
    url: "https://speed.cloudflare.com",
    description:
      "Real-world internet broadband benchmark testing download, upload, ping latency, and jitter under loaded conditions across Cloudflare's edge.",
    tags: ["bandwidth", "speed-test", "latency", "jitter"],
    flags: ["recommended", "free", "no-ads", "verified"],
    categories: ["miscellaneous"],
  },
  {
    id: "misc-hibp",
    title: "Have I Been Pwned",
    url: "https://haveibeenpwned.com",
    description:
      "Check if your personal email address or phone number has been compromised in any public corporate data breaches.",
    tags: ["data-breach", "security", "passwords", "privacy"],
    flags: ["recommended", "free", "no-ads", "legal", "verified"],
    categories: ["miscellaneous", "adblocking-privacy"],
  },
  {
    id: "misc-justdelete",
    title: "JustDelete.me",
    url: "https://backgroundchecks.org/justdeleteme/",
    description:
      "A directory of direct links and difficulty ratings to permanently delete your accounts from hundreds of popular web services and platforms.",
    tags: ["account-deletion", "privacy", "directory", "opt-out"],
    flags: ["open-source", "free", "no-ads", "verified"],
    categories: ["miscellaneous", "adblocking-privacy"],
  },
  {
    id: "misc-tinywow",
    title: "TinyWow",
    url: "https://tinywow.com",
    description:
      "Massive collection of 200+ free online utilities for PDF manipulation, image background removal, audio trimming, and file format conversions.",
    tags: ["pdf", "converter", "image-tools", "utilities"],
    flags: ["free", "verified"],
    categories: ["miscellaneous"],
  },
];

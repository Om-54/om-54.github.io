# Asset Replacement Guide for Omprakash Rahangdale's Portfolio

Welcome to your portfolio asset directory! This portfolio has been pre-configured with **zero broken links** and **production-grade placeholders**.

Whenever you are ready to upload your real videos, images, or certificate files, simply follow the guide below.

---

## 1. Directory Structure

```
assets/
├── lemon-ideas/          # Hero Case Study assets
│   ├── lemon-reel-01.svg       -> Replace with your actual Reel (MP4 or JPG thumbnail)
│   ├── lemon-carousel-01.svg   -> Replace with 4:5 Carousel export
│   ├── lemon-graphic-01.svg    -> Replace with 1:1 Social Graphic
│   ├── lemon-thumbnail-01.svg  -> Replace with 16:9 YouTube Thumbnail
│   └── lemon-campaign-01.svg   -> Replace with 16:9 Campaign Creative
│
├── google-gemini/        # Community & Outreach Ambassador assets
│   ├── gemini-event-01.svg     -> Replace with your campus event photo
│   ├── gemini-workshop-01.svg  -> Replace with live workshop demonstration photo
│   ├── gemini-promo-01.svg     -> Replace with campus promotional poster/creative
│   └── gemini-community-01.svg -> Replace with campus AI community screenshot
│
├── reels/                # Short-Form Video Portfolio
│   ├── reel-01.svg             -> Replace with MP4 video or preview image
│   ├── reel-02.svg             -> Replace with MP4 video or preview image
│   └── reel-03.svg             -> Replace with MP4 video or preview image
│
├── graphics/             # Visual Creatives & Carousels
│   ├── graphic-01.svg          -> Replace with 1:1 promotional graphic
│   ├── carousel-01.svg         -> Replace with 4:5 carousel cover
│   └── campaign-01.svg         -> Replace with 16:9 campaign asset
│
└── certificates/         # Verified Credentials
    ├── hubspot-certificate.svg -> Replace with your HubSpot Academy certificate PNG/JPG
    └── udemy-certificate.svg   -> Replace with your Udemy Growth PM certificate PNG/JPG
```

---

## 2. Recommended Formats & Dimensions

| Asset Category | Format | Recommended Dimensions | Notes |
| :--- | :--- | :--- | :--- |
| **Reels / Short-Form Video** | `.mp4` or `.jpg` / `.png` | **1080 × 1920 px** (9:16) | Keep video files under 15MB for fast loading, or link directly to Instagram/YouTube via data attributes. |
| **Social Carousels** | `.jpg` or `.png` | **1080 × 1350 px** (4:5) | Standard Instagram / LinkedIn portrait aspect ratio. |
| **Social Graphics / Posts** | `.jpg` or `.png` | **1080 × 1080 px** (1:1) | Clean square composition. |
| **YouTube Thumbnails** | `.jpg` or `.png` | **1920 × 1080 px** (16:9) | High-contrast visual focus. |
| **Certificates** | `.jpg` or `.png` | **1600 × 1130 px** (~4:3) | High resolution, clear legible text. |
| **Event Photos** | `.jpg` or `.png` | **1600 × 1200 px** (4:3) | Authentic, clear campus workshop photos. |

---

## 3. How to Swap in Real Files

### Option A: Direct File Overwrite (Easiest)
1. Export your real image as JPG or PNG.
2. In `index.html`, update the file extension from `.svg` to `.jpg` or `.png` (e.g. change `src="assets/lemon-ideas/lemon-reel-01.svg"` to `src="assets/lemon-ideas/lemon-reel-01.jpg"`).
3. Place your file into the corresponding folder.

### Option B: Link External Video URLs
If you want your Reels to play from your live Instagram or YouTube links:
1. Open `index.html`.
2. Locate the project card (e.g., `data-video-url=""`).
3. Paste your public Instagram Reel URL or YouTube Shorts URL.

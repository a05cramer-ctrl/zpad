# ZPAD website + brand kit

## What is in this zip
- `site/` — the website. Plain HTML/CSS/JS, no build step. Upload the folder as-is to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages, or a plain web server).
- `brand-kit/` — `zpad-token-1000.png` (token image for DexScreener / Raydium / wallets), `zpad-x-header-1500x500.png` (X header), `zpad-social-1200x630.png` (link-preview card), `zpad-logo-512.png`, plus the original webp masters.
- `spec/ZPAD-concept-and-launch-spec.md` — concept, flywheel split, launch plan mapped to the 12-step checklist.

## Edit before sharing (all in `site/config.js`)
1. `contractAddress` — paste the $ZPAD mint. Until it is set the page shows the "launching" state with a countdown; once set it shows the CA with Copy / Buy / Chart buttons (Buy = Raydium LaunchLab page, Chart = DexScreener).
2. `launchpad` — `"raydium"` (default, LaunchLab) or `"pumpfun"`.
3. `launchTimeUtc` — the launch time for the countdown.
4. `links` — X, Telegram (optional), docs, the launch app URL (the "Launch a coin" buttons point here once set).
5. `feeSplit` — the four percentages shown in the fee bar; must add to 100.
6. `stats` / `statsApi` — static numbers, or a JSON endpoint returning `{zecPaid, zpadBurned, coinsLaunched, tradingAfter24h}` that the page polls every 30 s.
7. `verify` — deployer, payout bot, buyback bot and treasury addresses (shown with Solscan links).

Also replace `assets/banner-1500x500.webp`, `assets/logo-256.webp` and `assets/favicon-64.png` if you re-brand.

## Hosting
- Vercel / Netlify: drag the `site` folder into the dashboard, or point a project at it with no build command and output directory `/`.
- GitHub Pages: push the contents of `site/` to a repo and enable Pages on the main branch.
- Any server: copy `site/` to the web root.

## Notes
- Fonts load from Google Fonts; everything else is local.
- No analytics, no wallet connect, no trading on the page by design — the CA lives on DexScreener/Raydium.
- Update the DexScreener Enhanced Token Info order with this site URL and the X handle as soon as the token exists.

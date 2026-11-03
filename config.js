// ZPAD site config — edit this file only. Everything on the page reads from here.
window.ZPAD_CONFIG = {
  // Contract address of $ZPAD. Leave empty ("") until launch: the page shows a "launching" state.
  contractAddress: "3QKr2nU23cNfad3JwiXebDKon83EedpETrSDZ6DSpump",

  // Which launchpad the token launched on. "raydium" (LaunchLab) or "pumpfun".
  launchpad: "pumpfun",

  // Launch time shown in the launching state (ISO 8601, UTC). Leave "" to hide the countdown.
  launchTimeUtc: "2026-11-04T15:00:00Z",

  // Social and product links. Leave "" to hide a link.
  links: {
    x: "https://x.com/zpaddevfun",
    telegram: "",
    docs: "#rules",
    app: "",            // e.g. "https://app.zpad.fun" once the launch page is live
    zcashNU7: "https://z.cash/upgrade/",
  },

  // Fee split shown in the "where every fee goes" bar. Must add up to 100.
  feeSplit: [
    { label: "ZEC paid to holders", pct: 50, note: "every few minutes, pro rata" },
    { label: "Buy & burn $ZPAD", pct: 35, note: "on-chain, in small chunks" },
    { label: "Treasury", pct: 10, note: "servers, DexScreener profiles" },
    { label: "Coin creator", pct: 5, note: "paid in ZEC" },
  ],

  // Live counters. If statsApi is set, the page fetches JSON {zecPaid, zpadBurned, coinsLaunched, tradingAfter24h}
  // from it every 30s. Otherwise the numbers below are shown as-is (use "—" before launch).
  statsApi: "",
  stats: {
    zecPaid: "—",
    zpadBurned: "—",
    coinsLaunched: "—",
    tradingAfter24h: "—",
  },

  // Addresses listed on the verify section. Fill in before launch.
  verify: [
    { label: "Deployer", address: "" },
    { label: "Payout bot", address: "" },
    { label: "Buyback bot", address: "" },
    { label: "Treasury", address: "" },
  ],
};

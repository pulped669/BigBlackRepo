export const SITE = {
  name: "Big Black Coin",
  ticker: "$BBC",
  pegTicker: "$BB",
  pegName: "BlackBerry",
  chain: "Robinhood Chain",
  chainShort: "RHCHAIN",
  ca: "0xBBC0000000000000000000000000000000000007",
  supply: "7,000,000,000",
  tax: "0 / 0",
  lp: "Burned",
  team: "None",
  bbPrice: 8.16,
  bbcPegRatio: 10_000,
  xUrl: "https://x.com/BigBlackCoin",
  dexUrl: "https://dexscreener.com/search?q=%24BBC",
} as const;

export const TAPE = [
  SITE.ticker,
  SITE.name.toUpperCase(),
  `TIED TO ${SITE.pegTicker}`,
  SITE.chain.toUpperCase(),
  "SEVEN KEYS",
  "ZERO TAX",
  "THE STOCK THAT LEARNED TO MINT",
  "NEVER DIES",
  "CULTURAL PEG",
  "NOT A SECURITY",
  "THUMBS UP, FOREVER",
];

export const KEYS = [
  {
    n: "01",
    title: "Never dies",
    body: "The handset left. The ticker stayed. $BBC is what happens when a brand refuses the funeral.",
  },
  {
    n: "02",
    title: "Seven keys",
    body: "Seven chrome pills. Same mark that taught a generation to type with their thumbs. Now it mints.",
  },
  {
    n: "03",
    title: "Tied to $BB",
    body: "Not a wrap. Not a note. A cultural peg — when BlackBerry twitches, the chain remembers.",
  },
  {
    n: "04",
    title: "Robinhood Chain",
    body: "The L2 they built so the market could stay open after bedtime. $BBC lives there, on purpose.",
  },
  {
    n: "05",
    title: "Zero tax",
    body: "In 0. Out 0. If you want a toll booth, buy a turnpike. This is a disc.",
  },
  {
    n: "06",
    title: "Seven billion",
    body: "One billion for each key. Supply is a joke told in a straight face. The joke is the point.",
  },
  {
    n: "07",
    title: "No team",
    body: "The coin is the team. If you need a face, look at the seven pills. They already have one.",
  },
] as const;

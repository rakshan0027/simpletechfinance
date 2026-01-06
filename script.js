/* =========================
   CONFIG
========================= */
const STOCK_API_KEY = "35BE6KWF0HC0E9DP";
const STOCK_API = "https://www.alphavantage.co/query";
const CRYPTO_API = "https://api.coingecko.com/api/v3";

/* =========================
   STOCK PRICES
========================= */
async function getStock(symbol, id) {
  try {
    const res = await fetch(
      `${STOCK_API}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${STOCK_API_KEY}`
    );
    const data = await res.json();
    const price = data["Global Quote"]["05. price"];
    document.getElementById(id).textContent = "$" + Number(price).toFixed(2);
  } catch {
    document.getElementById(id).textContent = "N/A";
  }
}

getStock("AAPL", "aapl");
setTimeout(() => getStock("MSFT", "msft"), 1200);
setTimeout(() => getStock("GOOGL", "googl"), 2400);
setTimeout(() => getStock("AMZN", "amzn"), 3600);

/* =========================
   CRYPTO PRICES
========================= */
async function getCrypto() {
  const res = await fetch(
    `${CRYPTO_API}/simple/price?ids=bitcoin,ethereum&vs_currencies=usd`
  );
  const data = await res.json();

  document.getElementById("btc").textContent = "$" + data.bitcoin.usd;
  document.getElementById("eth").textContent = "$" + data.ethereum.usd;
}

getCrypto();
setInterval(getCrypto, 60000);

/* =========================
   BITCOIN CHART
========================= */
async function loadBTCChart() {
  const res = await fetch(
    `${CRYPTO_API}/coins/bitcoin/market_chart?vs_currency=usd&days=1`
  );
  const data = await res.json();

  const labels = data.prices.map(p =>
    new Date(p[0]).toLocaleTimeString()
  );
  const prices = data.prices.map(p => p[1]);

  const ctx = document.getElementById("btcChart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "BTC Price (USD)",
        data: prices,
        borderWidth: 2,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { display: false }
      }
    }
  });
}

loadBTCChart();

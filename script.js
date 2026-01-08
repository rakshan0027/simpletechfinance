/* ===============================
   CONFIG
================================ */
const STOCK_API_KEY = "35BE6KWF0HC0E9DP";
const STOCK_API = "https://www.alphavantage.co/query";
const CRYPTO_API = "https://api.coingecko.com/api/v3";

/* ===============================
   STOCK PRICES (Alpha Vantage)
================================ */
async function getStock(symbol, id) {
  try {
    const res = await fetch(
      `${STOCK_API}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${STOCK_API_KEY}`
    );
    const data = await res.json();

    if (!data["Global Quote"] || !data["Global Quote"]["05. price"]) {
      throw new Error("Invalid stock data");
    }

    const price = Number(data["Global Quote"]["05. price"]);
    document.getElementById(id).textContent = "$" + price.toFixed(2);
  } catch {
    const el = document.getElementById(id);
    if (el) el.textContent = "N/A";
  }
}

getStock("AAPL", "aapl");
setTimeout(() => getStock("MSFT", "msft"), 1200);
setTimeout(() => getStock("GOOGL", "googl"), 2400);
setTimeout(() => getStock("AMZN", "amzn"), 3600);

/* ===============================
   CRYPTO PRICES (CoinGecko)
================================ */
async function getCrypto() {
  try {
    const res = await fetch(
      `${CRYPTO_API}/simple/price?ids=bitcoin,ethereum&vs_currencies=usd`
    );
    const data = await res.json();

    if (document.getElementById("btc"))
      document.getElementById("btc").textContent = "$" + data.bitcoin.usd;

    if (document.getElementById("eth"))
      document.getElementById("eth").textContent = "$" + data.ethereum.usd;
  } catch {}
}

getCrypto();
setInterval(getCrypto, 60000);

/* ===============================
   BITCOIN CHART (Chart.js)
================================ */
let btcChartInstance = null;

async function loadBTCChart() {
  const canvas = document.getElementById("btcChart");
  if (!canvas || typeof Chart === "undefined") return;

  const res = await fetch(
    `${CRYPTO_API}/coins/bitcoin/market_chart?vs_currency=usd&days=1`
  );
  const data = await res.json();

  const labels = data.prices.map(p =>
    new Date(p[0]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  const prices = data.prices.map(p => p[1]);

  if (btcChartInstance) btcChartInstance.destroy();

  btcChartInstance = new Chart(canvas.getContext("2d"), {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "BTC Price (USD)",
        data: prices,
        borderWidth: 2,
        tension: 0.4,
        borderColor: "#2563eb",
        pointRadius: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { x: { display: false } }
    }
  });
}

loadBTCChart();

/* ===============================
   DARK MODE
================================ */
const toggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") document.body.classList.add("dark");

toggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
});

/* ===============================
   SCROLL FEATURES (ONE LISTENER)
================================ */
const progressBar = document.getElementById("progressBar");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  /* Reading progress */
  const article = document.getElementById("articleContent");
  if (article && progressBar) {
    const height = article.scrollHeight - window.innerHeight;
    progressBar.style.width =
      (window.scrollY / height) * 100 + "%";
  }

  /* Back to top */
  if (backToTop) {
    backToTop.style.display = window.scrollY > 300 ? "block" : "none";
  }
});

/* Back to top click */
backToTop?.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);

/* ===============================
   ARTICLE SEARCH (articles.html)
================================ */
document.getElementById("articleSearch")?.addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  document.querySelectorAll(".edu-card").forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(term)
      ? "block"
      : "none";
  });
});

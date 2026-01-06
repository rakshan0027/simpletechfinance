const API_KEY = "35BE6KWF0HC0E9DP";
const BASE_URL = "https://www.alphavantage.co/query";

async function getStock(symbol, elementId) {
  try {
    const url = `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    const price = data["Global Quote"]["05. price"];
    document.getElementById(elementId).textContent = "$" + parseFloat(price).toFixed(2);
  } catch (error) {
    document.getElementById(elementId).textContent = "N/A";
  }
}

// Load stocks (respect API limits)
getStock("AAPL", "aapl");
setTimeout(() => getStock("MSFT", "msft"), 1200);
setTimeout(() => getStock("GOOGL", "googl"), 2400);
setTimeout(() => getStock("AMZN", "amzn"), 3600);


const productMap = {
  "MS327CI": {
    name: "New Balance MS327CI",
    ebayPrice: 135000,
    stockxPrice: 129000,
    ebaySales: 38,
    stockxSales: 14
  },
  "511416-010": {
    name: "Nike Air Max Correlate",
    ebayPrice: 139000,
    stockxPrice: 132000,
    ebaySales: 42,
    stockxSales: 12
  },
  "U574RZ2": {
    name: "New Balance U574RZ2",
    ebayPrice: 142000,
    stockxPrice: 138000,
    ebaySales: 28,
    stockxSales: 18
  },
  "JOG-100S": {
    name: "Nike Jogger Pants JOG-100S",
    ebayPrice: 89000,
    stockxPrice: 95000,
    ebaySales: 31,
    stockxSales: 9
  }
};

function getSKUFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("sku") ? params.get("sku").toUpperCase() : null;
}

const sku = getSKUFromURL();
let product = sku && productMap[sku];

if (sku) {
  document.getElementById("skuInfo").innerHTML = product
    ? `SKU: ${sku}<br>제품명: ${product.name}`
    : `SKU: ${sku}<br>알 수 없는 제품입니다 (등록 필요)`;
}

function analyze() {
  if (!product) {
    document.getElementById("result").innerHTML = "해당 SKU는 현재 등록되어 있지 않습니다.";
    return;
  }

  const krPrice = parseInt(document.getElementById("krPrice").value);
  if (isNaN(krPrice)) {
    document.getElementById("result").innerText = "국내가를 입력해주세요.";
    return;
  }

  const ebayPrice = product.ebayPrice;
  const fee = Math.round(ebayPrice * 0.12);
  const shipping = 18000;
  const netProfit = ebayPrice - fee - shipping - krPrice;

  let recommendation = "✔ 추천";
  if (netProfit < 10000) recommendation = "⚠ 테스트";
  if (netProfit < 0) recommendation = "❌ 제외";

  document.getElementById("result").innerHTML = `
    <b>eBay 평균가:</b> ₩${ebayPrice}<br>
    <b>StockX 시세:</b> ₩${product.stockxPrice}<br>
    <b>30일 eBay 판매량:</b> ${product.ebaySales}건<br>
    <b>국내가:</b> ₩${krPrice}<br>
    <b>수수료:</b> ₩${fee}<br>
    <b>배송비:</b> ₩${shipping}<br>
    <b>예상 순이익:</b> ₩${netProfit}<br>
    <b>추천 결과:</b> ${recommendation}
  `;
}

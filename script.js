
document.addEventListener("DOMContentLoaded", function() {
  const urlParams = new URLSearchParams(window.location.search);
  const skuFromURL = urlParams.get("sku");
  if (skuFromURL) {
    document.getElementById("sku").value = skuFromURL;
  }
});

document.getElementById("resellForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const sku = document.getElementById("sku").value.trim();
  const domesticPrice = parseInt(document.getElementById("domesticPrice").value);

  if (!sku || isNaN(domesticPrice)) {
    document.getElementById("resultArea").textContent = "SKU와 국내가를 모두 입력해주세요.";
    return;
  }

  fetch("data.json")
    .then(res => res.json())
    .then(data => {
      const item = data[sku];
      if (!item) {
        document.getElementById("resultArea").textContent = "해당 SKU 정보를 찾을 수 없습니다.";
        return;
      }

      const { ebayPrice, stockxPrice, monthlySales } = item;
      const fee = Math.round(ebayPrice * 0.12);
      const shipping = 18000;
      const netProfit = ebayPrice - domesticPrice - fee - shipping;

      let recommendation = "❌ 제외";
      if (netProfit >= 10000 && monthlySales >= 15) {
        recommendation = "✔ 추천";
      } else if (netProfit >= 1000) {
        recommendation = "⚠ 테스트";
      }

      document.getElementById("resultArea").innerHTML = `
        <br>eBay 시세: ₩${ebayPrice.toLocaleString()}<br>
        수수료: ₩${fee.toLocaleString()}<br>
        배송비: ₩${shipping.toLocaleString()}<br>
        국내가: ₩${domesticPrice.toLocaleString()}<br>
        예상 순이익: ₩${netProfit.toLocaleString()}<br>
        월 판매량: ${monthlySales}개<br>
        판단: ${recommendation}
      `;
    })
    .catch(() => {
      document.getElementById("resultArea").textContent = "데이터를 불러올 수 없습니다. 인터넷 연결을 확인해주세요.";
    });
});

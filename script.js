function predict() {
    const sku = document.getElementById('skuInput').value.trim();
    const price = parseInt(document.getElementById('priceInput').value);

    if (!sku || !price) {
        document.getElementById('result').innerText = "SKU와 가격을 입력해주세요.";
        return;
    }

    // 테스트용 SKU별 가격 (향후 외부 연동 가능)
    const overseasPrices = {
        "JOG-100S": 135000,
        "MS327CI": 143000,
        "U574RZ2": 132000
    };

    const ebayPrice = overseasPrices[sku.toUpperCase()];
    if (!ebayPrice) {
        document.getElementById('result').innerText = "등록되지 않은 SKU입니다.";
        return;
    }

    const fee = Math.round(ebayPrice * 0.12);
    const shipping = 18000;
    const profit = ebayPrice - fee - shipping - price;

    let decision = '❌ 제외';
    if (profit > 10000) {
        decision = '✔ 추천';
    } else if (profit > 0) {
        decision = '⚠ 테스트';
    }

    document.getElementById('result').innerHTML = 
        `eBay 시세: ₩${ebayPrice}<br>` +
        `수수료: ₩${fee}<br>` +
        `배송비: ₩${shipping}<br>` +
        `국내가: ₩${price}<br>` +
        `예상 순이익: ₩${profit}<br>` +
        `판단: ${decision}`;
}
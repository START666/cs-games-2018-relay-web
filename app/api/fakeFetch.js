import wallets from './wallets.json';
import trades from './trades.json';

const delay = (ms) => (
    new Promise((resolve) => setTimeout(resolve, ms))
);

export const fakeFetch = (urlGetter, options) => (
    delay(300).then(() => {
        //ugly hack to create immutable copy of file.
        const walletsCopied = JSON.parse(JSON.stringify(wallets));
        const tradesCopied = JSON.parse(JSON.stringify(trades));


        switch (urlGetter) {
            case "/api/wallets":
                return walletsCopied;
            case "/api/price":
                return getCurrPrice();
            case "api/trades":
                return tradesCopied;
            default:
                throw new Error('Unknown urlGetter:');
        }
    })
);

const getCurrPrice = () => {
    const t = JSON.parse(JSON.stringify(trades))
    const latest = trades.trades[trades.trades.length - 1];
    console.log(latest);
    return latest.price / latest.quantity;
    // return latest;
}

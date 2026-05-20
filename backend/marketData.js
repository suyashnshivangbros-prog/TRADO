function getMarketData(){

    const prices = [

        24910,
        24950,
        25000,
        25080,
        25120,
        24880

    ];



    const randomPrice =
    prices[
        Math.floor(
            Math.random() * prices.length
        )
    ];



    return {

        symbol:"NIFTY50",

        price:randomPrice,

        volume:
        Math.floor(
            100000 + Math.random() * 500000
        ),

        trend:
        randomPrice > 25000
        ? "BULLISH"
        : "BEARISH"

    };

}



module.exports = {

    getMarketData

};

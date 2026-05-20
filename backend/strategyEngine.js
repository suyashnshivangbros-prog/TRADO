const {
    getMarketData
} = require("./marketdata");



function runVWAPStrategy(){

    const market =
    getMarketData();



    let signal = "HOLD";



    if(market.price > 25000){

        signal = "BUY";

    }



    if(market.price < 24900){

        signal = "SELL";

    }



    return {

        strategy:"VWAP EMA",

        signal,

        market

    };

}



module.exports = {

    runVWAPStrategy

};

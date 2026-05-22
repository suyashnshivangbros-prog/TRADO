const express = require("express");
const cors = require("cors");
const fs = require("fs");

const {
    runVWAPStrategy
} = require("./strategyEngine");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());



// =========================================
// DATABASE FILE
// =========================================

const strategyFile =
"./strategies.json";



// =========================================
// LOAD STRATEGIES
// =========================================

function loadStrategies(){

    try{

        const data =
        fs.readFileSync(strategyFile);

        return JSON.parse(data);

    }

    catch(error){

        return [];

    }

}



// =========================================
// SAVE STRATEGIES
// =========================================

function saveStrategies(strategies){

    fs.writeFileSync(

        strategyFile,

        JSON.stringify(
            strategies,
            null,
            2
        )

    );

}



// =========================================
// LOGIN SYSTEM
// =========================================

app.post("/api/login", (req,res) => {

    const { password } =
    req.body;

    if(password === "trado123"){

        res.json({
            success:true
        });

    }

    else{

        res.json({
            success:false
        });

    }

});



// =========================================
// CREATE STRATEGY
// =========================================

app.post("/api/strategy/create", (req,res) => {

    const strategies =
    loadStrategies();

    const strategy = {

        id:
        Date.now().toString(),

        name:
        req.body.name,

        description:
        req.body.description,

        logic:
        req.body.logic,

        risk:
        req.body.risk,

        enabled:false

    };



    strategies.push(strategy);

    saveStrategies(strategies);



    res.json({

        success:true,

        strategy

    });

});



// =========================================
// GET ALL STRATEGIES
// =========================================

app.get("/api/strategy/all", (req,res) => {

    const strategies =
    loadStrategies();

    res.json(strategies);

});



// =========================================
// DELETE STRATEGY
// =========================================

app.delete("/api/strategy/delete/:id", (req,res) => {

    const strategies =
    loadStrategies();

    const filtered =
    strategies.filter(strategy =>
        strategy.id !== req.params.id
    );

    saveStrategies(filtered);

    res.json({
        success:true
    });

});



// =========================================
// SIGNAL ENGINE
// =========================================

app.get("/api/signal", (req,res) => {

    const result =
    runVWAPStrategy();

    res.json({

        signal:
        result.signal,

        market:
        result.market.trend,

        price:
        result.market.price

    });

});



// =========================================
// BACKTEST ENGINE
// =========================================

app.post("/api/backtest/run", (req,res) => {

    const profit =
    Math.floor(
        Math.random() * 50000
    );

    const trades =
    Math.floor(
        20 + Math.random() * 100
    );

    const winRate =
    (50 + Math.random() * 40)
    .toFixed(1);

    const drawdown =
    (Math.random() * 15)
    .toFixed(1);

    res.json({

        result:{

            profit,
            trades,
            winRate,
            drawdown

        }

    });

});



// =========================================
// ROOT STATUS
// =========================================

app.get("/", (req,res) => {

    res.send(
        "TRADO BACKEND RUNNING"
    );

});



// =========================================
// START SERVER
// =========================================

app.listen(5000, () => {

    console.log(
        "Server Running On Port 5000"
    );

});

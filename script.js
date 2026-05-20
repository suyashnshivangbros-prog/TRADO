// =========================================
// LOGIN SYSTEM
// =========================================

const loginBtn =
document.getElementById("loginBtn");

if(loginBtn){

    loginBtn.addEventListener("click", async () => {

        const password =
        document
        .getElementById("loginPassword")
        .value;

        try{

            const response =
            await fetch(
                "http://localhost:5000/api/login",
                {
                    method:"POST",

                    headers:{
                        "Content-Type":"application/json"
                    },

                    body:JSON.stringify({
                        password
                    })
                }
            );

            const data =
            await response.json();

            if(data.success){

                document
                .getElementById("loginOverlay")
                .style.display = "none";

            }

            else{

                alert("Wrong Password");

            }

        }

        catch(error){

            console.error(error);

            alert(
            "Backend Offline / Connection Failed"
            );

        }

    });

}



// =========================================
// LOGOUT
// =========================================

const logoutBtn =
document.getElementById("logoutBtn");

if(logoutBtn){

    logoutBtn.addEventListener("click", () => {

        document
        .getElementById("loginOverlay")
        .style.display = "flex";

    });

}



// =========================================
// TAB SYSTEM
// =========================================

const tabButtons =
document.querySelectorAll(".tab-button");

const tabContents =
document.querySelectorAll(".tab-content");

tabButtons.forEach(button => {

    button.addEventListener("click", () => {

        const target =
        button.dataset.tab;

        tabButtons.forEach(btn => {

            btn.classList.remove("active-tab");

        });

        tabContents.forEach(content => {

            content.classList.remove("active-content");

        });

        button.classList.add("active-tab");

        document
        .getElementById(target)
        .classList.add("active-content");

    });

});



// =========================================
// STRATEGY STORAGE
// =========================================

let strategies = [];



// =========================================
// STRATEGY POPUP
// =========================================

const strategyPopup =
document.getElementById("strategyPopup");

const openStrategyPopupBtn =
document.getElementById("openStrategyPopupBtn");

const closeStrategyPopupBtn =
document.getElementById("closeStrategyPopupBtn");



if(openStrategyPopupBtn){

    openStrategyPopupBtn.addEventListener("click", () => {

        strategyPopup.style.display = "flex";

    });

}



if(closeStrategyPopupBtn){

    closeStrategyPopupBtn.addEventListener("click", () => {

        strategyPopup.style.display = "none";

    });

}



// =========================================
// CREATE STRATEGY
// =========================================

const createStrategyBtn =
document.getElementById("createStrategyBtn");



if(createStrategyBtn){

    createStrategyBtn.addEventListener("click", async () => {

        const strategyName =
        document
        .getElementById("strategyName")
        .value;

        const strategyDescription =
        document
        .getElementById("strategyDescription")
        .value;

        const strategyLogic =
        document
        .getElementById("strategyLogic")
        .value;

        const strategyRisk =
        document
        .getElementById("strategyRisk")
        .value;



        if(strategyName === ""){

            alert("Enter Strategy Name");

            return;

        }



        const strategy = {

            name: strategyName,

            description: strategyDescription,

            logic: strategyLogic,

            risk: strategyRisk,

            enabled:false

        };



        try{

            const response =
            await fetch(
                "http://localhost:5000/api/strategy/create",
                {

                    method:"POST",

                    headers:{
                        "Content-Type":"application/json"
                    },

                    body:JSON.stringify(strategy)

                }
            );



            const data =
            await response.json();



            strategies.push(data.strategy);



            renderStrategies();



            strategyPopup.style.display = "none";



            document
            .getElementById("strategyName")
            .value = "";



            document
            .getElementById("strategyDescription")
            .value = "";



            document
            .getElementById("strategyLogic")
            .value = "";

        }

        catch(error){

            console.error(error);

            alert("Strategy Creation Failed");

        }

    });

}



// =========================================
// RENDER STRATEGY
// =========================================

function renderStrategies(){

    const strategyContainer =
    document.getElementById("strategyContainer");

    if(!strategyContainer) return;

    strategyContainer.innerHTML = "";



    strategies.forEach(strategy => {

        const card =
        document.createElement("div");

        card.classList.add("strategy-card");



        card.innerHTML = `

            <h2>${strategy.name}</h2>

            <p>${strategy.description}</p>

            <p>
            Risk:
            ${strategy.risk}%
            </p>

            <div class="strategy-buttons">

                <button
                onclick="toggleStrategy('${strategy.id}')">
                ${strategy.enabled ? "Disable" : "Enable"}
                </button>

                <button
                onclick="deleteStrategy('${strategy.id}')">
                Delete
                </button>

            </div>

        `;

        strategyContainer.appendChild(card);

    });

}



// =========================================
// TOGGLE STRATEGY
// =========================================

function toggleStrategy(id){

    strategies =
    strategies.map(strategy => {

        if(strategy.id === id){

            strategy.enabled =
            !strategy.enabled;

        }

        return strategy;

    });

    renderStrategies();

}



// =========================================
// DELETE STRATEGY
// =========================================

function deleteStrategy(id){

    strategies =
    strategies.filter(strategy =>
        strategy.id !== id
    );

    renderStrategies();

}



// =========================================
// BACKTEST SYSTEM
// =========================================

const runBacktestBtn =
document.getElementById("runBacktestBtn");



if(runBacktestBtn){

    runBacktestBtn.addEventListener("click", async () => {

        try{

            const response =
            await fetch(
                "http://localhost:5000/api/backtest/run",
                {
                    method:"POST",

                    headers:{
                        "Content-Type":"application/json"
                    }
                }
            );



            const data =
            await response.json();



            document
            .getElementById("profitResult")
            .innerText =
            "₹" + data.result.profit;



            document
            .getElementById("winRateResult")
            .innerText =
            data.result.winRate + "%";



            document
            .getElementById("tradeResult")
            .innerText =
            data.result.trades;



            document
            .getElementById("drawdownResult")
            .innerText =
            data.result.drawdown + "%";



            document
            .getElementById("overviewContent")
            .innerText =
            "Backtest Completed Successfully";

        }

        catch(error){

            console.error(error);

            alert("Backtest Failed");

        }

    });

}



// =========================================
// SIGNAL SYSTEM
// =========================================

async function loadSignal(){

    try{

        const response =
        await fetch(
            "http://localhost:5000/api/signal"
        );



        const data =
        await response.json();



        const signalOutput =
        document.getElementById("signalOutput");



        if(signalOutput){

            signalOutput.innerText =
            data.signal;

        }



        const marketState =
        document.getElementById("marketState");



        if(marketState){

            marketState.innerText =
            data.market;

        }



        const systemStatus =
        document.getElementById("systemStatus");



        if(systemStatus){

            systemStatus.innerText =
            "ONLINE";

        }

    }

    catch(error){

        console.error(error);



        const systemStatus =
        document.getElementById("systemStatus");



        if(systemStatus){

            systemStatus.innerText =
            "OFFLINE";

        }

    }

}



setInterval(loadSignal, 3000);

loadSignal();



// =========================================
// PROFILE SYSTEM
// =========================================

const refreshProfileBtn =
document.getElementById("refreshProfileBtn");



if(refreshProfileBtn){

    refreshProfileBtn.addEventListener("click", () => {

        document
        .getElementById("profileCapital")
        .innerText =
        "₹500000";



        document
        .getElementById("profileBroker")
        .innerText =
        "Paper Trading";

    });

}



// =========================================
// BROKER SYSTEM
// =========================================

const saveBrokerBtn =
document.getElementById("saveBrokerBtn");



if(saveBrokerBtn){

    saveBrokerBtn.addEventListener("click", () => {

        const brokerKey =
        document
        .getElementById("brokerKey")
        .value;

        const brokerSecret =
        document
        .getElementById("brokerSecret")
        .value;



        localStorage.setItem(
            "brokerKey",
            brokerKey
        );



        localStorage.setItem(
            "brokerSecret",
            brokerSecret
        );



        alert("Broker Saved");

    });

}



// =========================================
// DEPLOYMENT SYSTEM
// =========================================

const paperModeBtn =
document.getElementById("paperModeBtn");

const liveModeBtn =
document.getElementById("liveModeBtn");

const stopModeBtn =
document.getElementById("stopModeBtn");



if(paperModeBtn){

    paperModeBtn.addEventListener("click", () => {

        document
        .getElementById("deploymentStatus")
        .innerText =
        "PAPER MODE";

    });

}



if(liveModeBtn){

    liveModeBtn.addEventListener("click", () => {

        const confirmDeploy =
        confirm(
        "Enable Live Trading?"
        );



        if(confirmDeploy){

            document
            .getElementById("deploymentStatus")
            .innerText =
            "LIVE MODE";

        }

    });

}



if(stopModeBtn){

    stopModeBtn.addEventListener("click", () => {

        document
        .getElementById("deploymentStatus")
        .innerText =
        "STOPPED";

    });

}



// =========================================
// SETTINGS
// =========================================

const saveSettingsBtn =
document.getElementById("saveSettingsBtn");



if(saveSettingsBtn){

    saveSettingsBtn.addEventListener("click", () => {

        alert("Settings Saved");

    });

}



// =========================================
// INITIAL LOAD
// =========================================

renderStrategies();

 

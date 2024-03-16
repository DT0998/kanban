const moralis = require("moralis");
const { convertArrayToObjects } = require("../utils/utils");
const ABI = require("../../config/abi/abi.json");
const adminAddress = config.get("adminAddress");
const { connectionMysql } = require("../utils/connect");

function payPremium(req, res) {
    const { address } = req.params;
    const premium = true;
}

function getHistory(req, res) {
  const { address } = req.params;
}

function calculatePremium() {
    
}

module.exports = { payPremium, getHistory };

const moralis = require("moralis");
const { convertArrayToObjects } = require("../utils/utils");
const ABI = require("../../config/abi/abi.json");
const adminAddress = config.get("adminAddress");
const { connectionMysql } = require("../utils/connect");

const subscribePremium = (req, res) => {
  const { address } = req.params;
  const premium = true;
};

const getHistory = (req, res) => {
  const { address } = req.params;
};

const calculateDatePremium = () => {};

module.exports = { subscribePremium, getHistory };

const convertArrayToObjects = (arr) => {
  const dataArray = arr.map((transaction, index) => ({
    key: (arr.length + 1 - index).toString(),
    amount: transaction[1],
    address: `${transaction[2].slice(0, 4)}...${transaction[2].slice(0, 4)}`,
  }));

  return dataArray.reverse();
};

module.exports = { convertArrayToObjects };

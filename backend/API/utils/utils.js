const convertArrayToObjects = (arr) => {
  const dataArray = arr.map((transaction, index) => ({
    key: (arr.length + 1 - index).toString(),
    address: `${transaction[1].slice(0, 4)}...${transaction[1].slice(0, 4)}`,
  }));

  return dataArray.reverse();
};

module.exports = { convertArrayToObjects };

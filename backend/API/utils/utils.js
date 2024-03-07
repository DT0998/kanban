function convertArrayToObjects(arr) {
  const dataArray = arr.map((transaction, index) => ({
    key: (arr.length + 1 - index).toString(),
    type: transaction[0],
    amount: transaction[1],
    message: transaction[2],
    address: `${transaction[3].slice(0, 4)}...${transaction[3].slice(0, 4)}`,
    subject: transaction[4],
  }));

  return dataArray.reverse();
}

module.exports = convertArrayToObjects;

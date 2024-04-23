// const crypto_tax = [
//   { tradeType: "B", currency: "BTC", price: 680000.0, amount: 2.5 },
//   { tradeType: "B", currency: "ETH ", price: 43000.0, amount: 12.0 },
//   { tradeType: "B", currency: "BTC", price: 690000.0, amount: 2.5 },
//   { tradeType: "S", currency: "BTC", price: 695000.0, amount: 3.0 },
//   { tradeType: "B", currency: "ETH ", price: 43500.0, amount: 23.5 },
//   { tradeType: "S", currency: "BTC", price: 695000.0, amount: 1.0 },
//   { tradeType: "S", currency: "ETH ", price: 45000.0, amount: 30.0 },
// ];

// const result = crypto_tax.reduce(
//   (acc, { tradeType, currency, price, amount }) => {
//     console.log(acc);
//   }
// );

// const crypto_tax = [
//   { tradeType: "B", currency: "BTC", price: 680000.0, amount: 2.5 },
//   { tradeType: "B", currency: "BTC", price: 690000.0, amount: 2.5 },
//   { tradeType: "S", currency: "BTC", price: 695000.0, amount: 3.0 },
// ];

// const result = crypto_tax.reduce(
//   (acc, { tradeType, currency, price, amount }) => {
//     // console.log(acc);
//     // if (tradeType === "B") {
//     //   return acc.push({ tradeType, currency, price, amount });
//     // }

//     console.log(acc);
//   },
//   crypto_tax
// );

const crypto_tax = [
  { tradeType: "B", currency: "BTC", price: 680000.0, amount: 2.5 },
  { tradeType: "B", currency: "ETH", price: 43000.0, amount: 12.0 },
  { tradeType: "B", currency: "BTC", price: 690000.0, amount: 2.5 },
  { tradeType: "S", currency: "BTC", price: 695000.0, amount: 3.0 },
  { tradeType: "B", currency: "ETH", price: 43500.0, amount: 23.5 },
  { tradeType: "S", currency: "BTC", price: 695000.0, amount: 1.0 },
  { tradeType: "S", currency: "ETH", price: 45000.0, amount: 30.0 },
];

function calculateFIFO(transactions) {
  const transactionsByCurrency = new Map();

  for (const transaction of transactions) {
    const { currency } = transaction;
    if (!transactionsByCurrency.has(currency))
      transactionsByCurrency.set(currency, []);

    transactionsByCurrency.get(currency).push(transaction);
  }
}

calculateFIFO(crypto_tax);

// const calculateFIFO = (transactions) => {
//   const transactionsByCurrency = {};

//   // แยกข้อมูลการซื้อขายตามสกุลเงิน
//   transactions.forEach((transaction) => {
//     const { currency } = transaction;

//     if (!transactionsByCurrency[currency]) {
//       transactionsByCurrency[currency] = [];
//     }
//     transactionsByCurrency[currency].push(transaction);
//   });

//   console.log(transactionsByCurrency);

//   // คำนวณต้นทุนและกำไรตามหลัก FIFO สำหรับแต่ละสกุลเงิน
//   for (const currency in transactionsByCurrency) {
//     let costBasis = 0;
//     let totalProfit = 0;
//     let remainingAmount = 0;

//     transactionsByCurrency[currency].forEach((transaction) => {
//       const { tradeType, price, amount } = transaction;
//       if (tradeType === "B") {
//         // การซื้อ
//         costBasis += price * amount;
//         remainingAmount += amount;
//       } else {
//         // การขาย
//         const soldAmount = Math.min(amount, remainingAmount);
//         totalProfit += (price - costBasis / remainingAmount) * soldAmount;
//         remainingAmount -= soldAmount;
//       }
//     });

//     console.log(`สกุลเงิน: ${currency}`);
//     console.log(`ต้นทุนที่ซื้อ: ${costBasis.toFixed(2)}`);
//     console.log(`กำไร: ${totalProfit.toFixed(2)}`);
//     console.log("--------------------");
//   }
// };

// calculateFIFO(crypto_tax);

const callbacksetTimeout = (text, ms) => {
  setTimeout(() => {
    console.log(text);
  }, ms);
};

const promisesetTimeout = (text, ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(text);
      resolve();
    }, ms);
  });
};

const asyncsetTimeout = async (text, ms) => {
  setTimeout(() => {
    console.log(text);
  }, ms);
};

module.exports = {
  callbacksetTimeout,
  promisesetTimeout,
  asyncsetTimeout,
};

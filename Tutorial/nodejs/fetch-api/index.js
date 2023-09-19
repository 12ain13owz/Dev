const { default: axios } = require("axios");
const url = "https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8";

const apiFetch = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => console.log(data));
};

const apiFetchHeader = (url) => {
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

const apiAxios = (url) => {
  axios.get(url).then((res) => console.log(res.data));
};

const apiAxiosHeader = (url) => {
  axios.post(
    url,
    {},
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

apiFetchHeader(url);

function convertUTCDateToLocalDate(date) {
  let newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

  let offset = date.getTimezoneOffset() / 60;
  let hours = date.getHours();

  newDate.setHours(hours - offset);

  return newDate;
}

let inputDateUTC = "2021-11-03 20:17:25";
let dateGMT = convertUTCDateToLocalDate(new Date(inputDateUTC));

let txtp = document.getElementById("txt1");
txtp.textContent = dateGMT.toString();

let d = new Date();
let d1 = new Date(d.getTime() + d.getTimezoneOffset());
let d2 = new Date(d.getTime() + d.getTimezoneOffset() / 60 / 1000);

let o = d2.getTimezoneOffset() / 60;
let h = d2.getHours();
let dateLocal = d2.setHours(h - o);

console.log(dateLocal);

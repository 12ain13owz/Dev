const btn = document.querySelector("button"),
  toast = document.querySelector(".toast"),
  closeIcon = document.querySelector(".close"),
  progress = document.querySelector(".progress");

const toastTimeout = [];
let toastRunning = false;

btn.addEventListener("click", () => {
  if (!toastRunning) {
    toast.classList.add("active");
    progress.classList.add("active");

    toastTimeout.push(
      setTimeout(() => {
        toast.classList.remove("active");
      }, 5000)
    );

    toastTimeout.push(
      setTimeout(() => {
        progress.classList.remove("active");
        toastRunning = false;
      }, 5300)
    );

    toastRunning = true;
  }
});

document.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    btn.click();
  }
});

closeIcon.addEventListener("click", () => {
  toast.classList.remove("active");
  toastTimeout.forEach((value) => clearTimeout(value));

  setTimeout(() => {
    progress.classList.remove("active");
    toastRunning = false;
  }, 300);
});

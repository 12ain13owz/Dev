class Toast {
  constructor(config = {}) {
    this.config = {
      horizontal: config.horizontal || "right",
      vertical: config.vertical || "bottom",
      duration: config.duration || 5000,
    };

    this.toastData = {
      type: "info",
      title: "Information",
      icon: "fa-info",
      class: "toast-info",
    };

    this.toastTimeout = [];
    this.toastRunning = false;

    this.toastElement = this.#generateToast();
    this.toast = {
      main: this.toastElement,
      close: this.toastElement.querySelector(".toast-close"),
      progress: this.toastElement.querySelector(".toast-progress"),
      icon: this.toastElement.querySelector(".toast-icon"),
      title: this.toastElement.querySelector(".toast-title"),
      text: this.toastElement.querySelector(".toast-text"),
    };

    this.toast.close.addEventListener("click", () => {
      this.#clearTimeout();
    });

    document.body.appendChild(this.toastElement);
  }

  showToast(type, message) {
    if (!this.toastRunning) {
      this.#setType(type);
      this.#setClass();

      this.toast.main.classList.add("toast-active");
      this.toast.progress.classList.add("toast-active");
      this.toast.text.textContent = message;

      this.toastTimeout.push(
        setTimeout(() => {
          this.toast.main.classList.remove("toast-active");
        }, this.config.duration)
      );

      this.toastTimeout.push(
        setTimeout(() => {
          this.toast.progress.classList.remove("toast-active");
          this.toast.text.textContent = "";
          this.toastRunning = false;
        }, this.config.duration + 300)
      );

      this.toastRunning = true;
    } else this.#clearTimeout().then(() => this.showToast(type, message));
  }

  #clearTimeout() {
    this.toast.main.classList.remove("toast-active");
    this.toastTimeout.forEach((timeout) => clearTimeout(timeout));
    this.toastTimeout = [];

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.toast.progress.classList.remove("toast-active");
        this.toastRunning = false;
      }, 300);

      setTimeout(() => {
        resolve();
      }, 400);
    });
  }

  #generateToast() {
    this.#setType();

    const toastContainer = document.createElement("div");
    toastContainer.classList.add(
      "toast",
      `toast-${this.config.vertical}-${this.config.horizontal}`
    );

    const toastContent = document.createElement("div");
    toastContent.classList.add("toast-content");

    const toastIcon = document.createElement("i");
    toastIcon.classList.add("fa-solid", this.toastData.icon, "toast-icon");

    const toastMessage = document.createElement("div");
    toastMessage.classList.add("toast-message");

    const toastTitle = document.createElement("div");
    toastTitle.classList.add("toast-title");
    toastTitle.textContent = this.toastData.title;

    const toastText = document.createElement("div");
    toastText.classList.add("toast-text");

    const toastClose = document.createElement("i");
    toastClose.classList.add("fa-solid", "fa-xmark", "toast-close");

    const toastProgress = document.createElement("div");
    toastProgress.classList.add("toast-progress");

    toastMessage.appendChild(toastTitle);
    toastMessage.appendChild(toastText);

    toastContent.appendChild(toastIcon);
    toastContent.appendChild(toastMessage);

    toastContainer.appendChild(toastContent);
    toastContainer.appendChild(toastClose);
    toastContainer.appendChild(toastProgress);

    return toastContainer;
  }

  #setType(type) {
    if (type === "success") {
      this.toastData.title = "Success!";
      this.toastData.icon = "fa-check";
      this.toastData.class = "toast-success";
      return;
    }

    if (type === "warning") {
      this.toastData.title = "Warning!";
      this.toastData.icon = "fa-exclamation";
      this.toastData.class = "toast-warning";
      return;
    }

    if (type === "error") {
      this.toastData.title = "Error!";
      this.toastData.icon = "fa-xmark";
      this.toastData.class = "toast-error";
      return;
    }

    this.toastData.title = "Information!";
    this.toastData.icon = "fa-info";
    this.toastData.class = "toast-info";
    return;
  }

  #setClass() {
    this.toast.main.classList.remove();
    this.toast.main.classList.add(
      "toast",
      `toast-${this.config.vertical}-${this.config.horizontal}`,
      this.toastData.class
    );

    this.toast.icon.classList.remove();
    this.toast.icon.classList.add(
      "fa-solid",
      this.toastData.icon,
      "toast-icon"
    );
    this.toast.title.textContent = this.toastData.title;
    this.toast.progress.style.setProperty(
      "--duration",
      `${this.config.duration}ms`
    );
  }
}

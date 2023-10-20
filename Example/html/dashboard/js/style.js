const allSidemenu = document.querySelectorAll("#sidebar .side-menu.top li a");

allSidemenu.forEach((item) => {
  const li = item.parentElement;

  item.addEventListener("click", () => {
    allSidemenu.forEach((i) => {
      i.parentElement.classList.remove("active");
    });

    li.classList.add("active");
  });
});

const searchBox = document.querySelector("#search");
const searchContainer = document.querySelector(".search-container");

searchBox.addEventListener("focus", () => {
  searchContainer.classList.add("search-active");
});

searchBox.addEventListener("blur", () => {
  searchContainer.classList.remove("search-active");
});

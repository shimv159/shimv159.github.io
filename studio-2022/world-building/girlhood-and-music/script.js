let toggleMenu = document.querySelector(".mobile-menu");

let headerStatus = document.querySelector(".header");

toggleMenu.addEventListener("click",() => {
	if (headerStatus.classList.contains("open")) {
		headerStatus.classList.remove("open");
	} else {
		headerStatus.classList.add("open");

	}
})
(function () {
	// Start here

	/* Event listeners for the catagory buttons 
  Declaring all of the elements to target*/
	const snackButton = document.getElementById("snacks");
	const coldButton = document.getElementById("coldDrinks");
	const hotButton = document.getElementById("hotDrinks");
	const showAll = document.getElementById("showAll");
	const productWrapper = document.getElementById("productCards");

	//Creating the event listener for each button that is clicked//

	if (snackButton !== null && snackButton !== undefined) {
		snackButton.addEventListener("click", () => {
			//looping through all the product cards//
			for (let i = 0; i < productWrapper.children.length; i++) {
				let product = productWrapper.children[i];
				/*changing the visablity for each card if it contains the 
		  correct property that matches the button*/
				if (product.classList.contains("snack")) {
					product.style.display = "flex";
				} else {
					product.style.display = "none";
				}
			}
		});
	}

	if (coldButton !== null && coldButton !== undefined) {
		coldButton.addEventListener("click", () => {
			//looping through all the product cards//
			for (let i = 0; i < productWrapper.children.length; i++) {
				let product = productWrapper.children[i];
				/*changing the visablity for each card if it contains the 
	  correct property that matches the button*/
				if (product.classList.contains("cold")) {
					product.style.display = "flex";
				} else {
					product.style.display = "none";
				}
			}
		});
	}

	if (hotButton !== null && hotButton !== undefined) {
		hotButton.addEventListener("click", () => {
			//looping through all the product cards//
			for (let i = 0; i < productWrapper.children.length; i++) {
				let product = productWrapper.children[i];
				/*changing the visablity for each card if it contains the 
	  correct property that matches the button*/
				if (product.classList.contains("hot")) {
					product.style.display = "flex";
				} else {
					product.style.display = "none";
				}
			}
		});
	}

	// End here
})();

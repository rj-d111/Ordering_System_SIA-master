(function () {
	//Product Data Element
	let productData = document.getElementById("productData");

	//quantity input
	let quantityInput = document.getElementsByClassName("numOf")[0];

	//Add to cart button
	let addToCartButton = document.getElementById("add-to-cart");

	//Get Cart
	let cart = localStorage.getItem("cart");
	cart = JSON.parse(cart);

	//If cart is empty create array
	if (cart === null) {
		cart = [];
	}

	//Loop thru aray and see if product is in cart
	cart.forEach((item) => {
		if (item !== undefined && item.name === productData.dataset.name) {
			//Item exists in cart lets set the quantity on the front end
			quantityInput.value = item.quantity;
		}
	});

	//Click event to increment quantity
	document.getElementById("add").addEventListener("click", () => {
		document.querySelector(".numOf").stepUp();
	});

	//Click event to decrese quantity
	document.getElementById("minus").addEventListener("click", () => {
		document.querySelector(".numOf").stepDown();
	});

	//When add to cart is clicked add item to cart and redirect
	addToCartButton.addEventListener("click", () => {
		let found = false;

		//Loop thru cart to find item
		cart.forEach((item, index) => {
			if (
				item !== undefined &&
				item.name === productData.dataset.name
			) {
				//Item found update quantity
				found = true;
				cart[index].quantity = quantityInput.value;
			}
		});

		//Item not found
		if (found === false) {
			//Add item to cart
			cart.push({
				name: productData.dataset.name,
				image: productData.dataset.image,
				price: productData.dataset.price,
				quantity: quantityInput.value,
			});
		}

		//Store item into local storage
		localStorage.setItem("cart", JSON.stringify(cart));

		// Show alert when item has been added to cart
		let addedToCartAlert = document.querySelector(".alert");
		addedToCartAlert.style.display = "flex";
	});

	function hideElement() {
		const timeout = document.querySelector(".alert");
		setTimeout(hideElement, 4000); //milliseconds until timeout//
		timeout.style.display = "none";
	}

	// close the alert
	let closeAlert = document.querySelector(".closebtn");
	closeAlert.addEventListener("click", () => {
		closeAlert.parentElement.style.display = "none";
	});

	hideElement();
})();

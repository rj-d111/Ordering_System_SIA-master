(function () {
  //Hiding "Your cart is empty :(" if the cart has items
  let hide = document.getElementsByClassName("emptyCart")[0];

  //Get Cart
  let cart = localStorage.getItem("cart");
  cart = JSON.parse(cart);

  //If cart is empty create array
  if (cart === null) {
    cart = [];
  }
  if (cart.length !== 0) {
    hide.style.display = "none";
  }
  //Items Container
  let cartItmes = document.getElementById("cartItmes");

  //Loop thru cart and create items
  cart.forEach((item, index) => {
    if (item !== undefined) {
      let htmlTemplate = `
				<div class="cartItem">
					<img class="cartProductImage" src="${item.image}" alt="${item.name}">
					<div class="nameAndQty">
						<h2 class="productName">${item.name}</h2>
						<div class="quantityContainer">
							<label for="quantity">QTY:</label>
							<input type="number" class="cartItemQuantity" id="quantity" name="quantity" min="1" value="${item.quantity}" data-name="${item.name}">
						</div>
					</div>
					<p class="price">₱${item.price}</p>
					<button data-name="${item.name}" class="remove">REMOVE</button>
				</div>`;

      cartItmes.insertAdjacentHTML("beforeend", htmlTemplate);
    }
  });

  // Wait for document ready state
  if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
  } else {
    ready();
  }

  //Ready Function
  function ready() {
    // targeting all remove buttons
    let removeCartItemButtons = document.querySelectorAll(".remove");

    // looping through remove buttons and deleting the parent container when clicked
    for (let i = 0; i < removeCartItemButtons.length; i++) {
      let button = removeCartItemButtons[i];
      button.addEventListener("click", removeCartItem);
    }
    // targeting all quantity inputs
    let quantity = document.getElementsByClassName("cartItemQuantity");

    // looping through quantity inputs to account for quantity changes in the cart
    for (let i = 0; i < quantity.length; i++) {
      let input = quantity[i];
      input.addEventListener("change", quantityChanged);
    }

    updateCartTotal();
  }

  // removes the item's parent div when "remove" is clicked, and then update the cart total immediately
  function removeCartItem(event) {
    let buttonClicked = event.target;
    let name = buttonClicked.dataset.name;

    //Remove items from cart object
    cart.forEach((item, index) => {
      if (item.name === name) {
        cart.splice(index, 1);
      }
    });

    //Save cart to storage
    localStorage.setItem("cart", JSON.stringify(cart));

    //Remove Item from UI
    buttonClicked.parentElement.remove();

    //Recalculate Total
    updateCartTotal();
  }

  // makes sure the quantities changed are always a number and never a negative value
  function quantityChanged(event) {
    let input = event.target;
    let name = input.dataset.name;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }

    //Update cart object Quantity
    cart.forEach((item, index) => {
      if (item.name === name) {
        cart[index].quantity = input.value;
      }
    });

    //Save cart to storage
    localStorage.setItem("cart", JSON.stringify(cart));

    //Recalculate total
    updateCartTotal();
  }
  // Updating the number of items and Subtotal
  function updateCartTotal() {
    let cartItemContainer = document.getElementById("cartItmes");
    let cartItems = cartItemContainer.getElementsByClassName("cartItem");
    let total = 0;
    let totalItems = 0;
    let roundedTotal = 0;

    // Loop through parent containers looking for price and quantity
    for (let i = 0; i < cartItems.length; i++) {
      let cartItem = cartItems[i];
      let priceElement = cartItem.getElementsByClassName("price")[0];

      let quantityElement =
        cartItem.getElementsByClassName("cartItemQuantity")[0];
      // Removing the $ to make string an integer
      let price = parseFloat(priceElement.innerText.replace("₱", ""));
      // Collecting all input values and setting a total amount of items
      let quantity = quantityElement.value;
      totalItems = parseInt(totalItems) + parseInt(quantity);

      // Collecting all input values and setting a total amount of items
      total = total + price * quantity;
      roundedTotal = total.toFixed(2);
    }
    // Replacing the HTML to hold the new total amount of items
    let itemQty = document.getElementById("itemQty");
    itemQty.innerText = `${totalItems} items`;

    // Replacing the HTML to hold the new total price
    let subtotal = document.querySelector(".totalPrice");
    subtotal.innerText = "₱" + roundedTotal;
  }

  // End here
})();

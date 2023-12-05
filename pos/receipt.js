(function () {
  // Start here

  //Get Cart
  let cart = localStorage.getItem("cart");
  cart = JSON.parse(cart);

  //If cart is empty create array
  if (cart === null) {
    cart = [];
  }

  //Items Container
  let cartItmes = document.getElementById("miniReceiptItems");

  //Loop thru cart and create items
  cart.forEach((item, index) => {
    if (item !== undefined) {
      let htmlTemplate = `
            
            <div class="miniReceiptItem">
                                    <img
					                    class="cartProductImage"
					                    src="${item.image}"
					                    alt="${item.name}"/>
                                    <div class="receiptNameAndQty">
                                        <h3 class="miniReceiptProductName">${item.name}</h3>
                                            <div class="miniReceiptQuantityContainer">
                                                <p>QTY:</p><p class="receiptItemQty">${item.quantity}</p>
                                            </div>
                                    </div>
                                    <p class="receiptPrice">${item.price}</p>
                                </div>`;

      cartItmes.insertAdjacentHTML("beforeend", htmlTemplate);
    }
  });

  updateReceiptSubtotal();

  function updateReceiptSubtotal() {
    let receiptItemContainer = document.getElementById("miniReceiptItems");
    let receiptItems =
      receiptItemContainer.getElementsByClassName("miniReceiptItem");
    let total = 0;
    let totalItems = 0;
    let roundedTotal = 0;
    let tax = 0;
    let roundedTax = 0;
    let totalWithTax = 0;
    let roundedTotalWithTax = 0;

    // Loop through parent containers looking for price and quantity
    for (let i = 0; i < receiptItems.length; i++) {
      let receiptItem = receiptItems[i];
      let priceElement = receiptItem.getElementsByClassName("receiptPrice")[0];

      let quantityElement =
        receiptItem.getElementsByClassName("receiptItemQty")[0];
      console.log(quantityElement);

      // Removing the $ to make string an integer
      let price = parseFloat(priceElement.innerText.replace("₱", ""));

      // Collecting all input values and setting a total amount of items
      let quantity = parseInt(quantityElement.innerText);
      totalItems = parseInt(totalItems) + parseInt(quantity);

      console.log(quantity, totalItems, price);

      // Collecting all input values and setting a total amount of items
      total = total + price * quantity;
      roundedTotal = total.toFixed(2);

      // Calculating Tax
      tax = roundedTotal * 0.06;
      roundedTax = tax.toFixed(2);

      // Calculating Total With Tax
      totalWithTax = roundedTotal * 1.06;
      roundedTotalWithTax = totalWithTax.toFixed(2);
    }

    // Replacing the HTML to hold the new total price
    let subtotal = document.getElementById("subtotalValue");
    subtotal.innerText = "₱" + roundedTotal;

    let taxValue = document.getElementById("taxValue");
    taxValue.innerText = "₱" + roundedTax;

    let totalValue = document.getElementById("totalValue");
    totalValue.innerText = "₱" + roundedTotalWithTax;
  }
  //Clearing the cart data when clicking the back to menu button

  let cartClear = document.getElementsByClassName("back-button-link")[0];

  cartClear.addEventListener("click", () => {
    localStorage.clear();
  });
  // End here
})();

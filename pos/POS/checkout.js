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
  let cartItmes = document.getElementById("itemsInCart");

  //Loop thru cart and create items
  cart.forEach((item, index) => {
    if (item !== undefined) {
      let htmlTemplate = `
                <div class="miniCartItem">
                       <img
                        class="miniCartProductImage"
                        src="${item.image}"
                        alt="${item.name}"/>
                         <div class="cartNameAndQty">
                           <h3 class="cartProductName">${item.name}</h3>
                                        <div class="miniCartQuantityContainer">
                                            <p>QTY:</p><p class="miniCartItemQty">${item.quantity}</p>
                                        </div>
                                </div>
                                <p class="miniCartPrice">₱${item.price}</p>
                            </div>
                            </div>`;

      cartItmes.insertAdjacentHTML("beforeend", htmlTemplate);
    }
  });

  updateCheckoutSubtotal();

  function updateCheckoutSubtotal() {
    let checkoutItemContainer = document.getElementById("miniCartItems");
    let checkoutItems =
      checkoutItemContainer.getElementsByClassName("miniCartItem");
    let total = 0;
    let totalItems = 0;
    let roundedTotal = 0;
    let tax = 0;
    let roundedTax = 0;
    let totalWithTax = 0;
    let roundedTotalWithTax = 0;

    // Loop through parent containers looking for price and quantity
    for (let i = 0; i < checkoutItems.length; i++) {
      let checkoutItem = checkoutItems[i];
      let priceElement =
        checkoutItem.getElementsByClassName("miniCartPrice")[0];

      let quantityElement =
        checkoutItem.getElementsByClassName("miniCartItemQty")[0];
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

    let buttonCalc = document.querySelector(".calculateChange");

    buttonCalc.addEventListener("click", () => {
      // Targeting the Amount container
      let changeDueField = document.getElementById("changeAmount");

      // Collecting value from the imput
      let cashProvided = document.getElementById("cashProvided").value;
      // Evaluating the total that will be subtracted from the Cash provided
      let totalChangeDue = 0;
      let roundedTotalChangeDue = 0;

      totalChangeDue = parseInt(cashProvided) - roundedTotalWithTax;
      roundedTotalChangeDue = totalChangeDue.toFixed(2);
      changeDueField.innerText = "₱" + roundedTotalChangeDue;
    });
  }

  let creditCardRadio = document.getElementById("cardPaymentSelection");
  creditCardRadio.addEventListener("click", () => {
    // Show Credit Card Field
    let payWithCard = document.querySelector(".payWithCard");
    payWithCard.style.display = "block";
    // Hide Cash Field
    let payWithCash = document.querySelector(".payWithCash");
    payWithCash.style.display = "none";
    // Hide Face ID Field
    let payWithFace = document.querySelector(".payWithFaceID");
    payWithFace.style.display = "none";
  });

  let cashRadio = document.getElementById("cashPaymentSelection");
  cashRadio.addEventListener("click", () => {
    // Hide Credit Card Field
    let payWithCard = document.querySelector(".payWithCard");
    payWithCard.style.display = "none";
    // Show Cash Field
    let payWithCash = document.querySelector(".payWithCash");
    payWithCash.style.display = "block";
    // Hide Face ID Field
    let payWithFace = document.querySelector(".payWithFaceID");
    payWithFace.style.display = "none";
  });

  let faceIDRadio = document.getElementById("faceIDPaymentSelection");
  faceIDRadio.addEventListener("click", () => {
    // Hide Credit Card Field
    let payWithCard = document.querySelector(".payWithCard");
    payWithCard.style.display = "none";
    // Hide Cash Field
    let payWithCash = document.querySelector(".payWithCash");
    payWithCash.style.display = "none";
    // Show Face ID Field
    let payWithFace = document.querySelector(".payWithFaceID");
    payWithFace.style.display = "flex";

    // Turning on Camera for Face ID
    var video = document.querySelector("#video");

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
        .then(function (stream) {
          video.srcObject = stream;
        })
        .catch(function (err0r) {
          console.log("Something went wrong!");
        });
    }
  });

  function pauseVid() {
    let video = document.getElementById("video");
    video.pause();
  }

  let shutter = document.querySelector(".cameraShutter");
  shutter.addEventListener("click", () => {
    let approved = document.getElementById("checkIcon");
    approved.style.display = "block";
    let face = document.getElementById("faceIcon");
    face.style.display = "none";
    pauseVid();
  });

  // Watching the cash input to see if the provided cash has been edited

  // End here
})();


function AdddedToCart(){
    const cartButton = document.querySelector(".btn.btn-success.rounded-circle");
// Add a click event listener to the button
cartButton.addEventListener("click", () => {
    // Toggle the button classes between "btn-success" and "btn-primary"
    cartButton.classList.toggle("btn-success");
    cartButton.classList.toggle("btn-primary");
  
    // Replace the button content based on its current class
    if (cartButton.classList.contains("btn-success")) {
      cartButton.textContent = "+";
    } else {
      cartButton.textContent = "✓"; // Replace "+" with checked symbol
    }
  });    
}

AdddedToCart();
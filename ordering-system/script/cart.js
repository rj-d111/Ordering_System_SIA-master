//Global Variables
const orderQty = document.querySelector("#order-1");
const orderTotal = document.querySelector("#order-total");
const cartTotal = document.querySelector("#cart-total");
let num = 1;
// const exportTotal = "";

function addMsAutoAttribute(){
    const width = window.innerWidth;
    if(width<476){
      console.log(width);
  }else{
    console.log("Greater than 476");
  }
}

function PlusMinusButton(){
    const plusBtn = document.querySelector("#plus");
    const minusBtn = document.querySelector("#minus");
   
    plusBtn.addEventListener('click', ()=> {
        num++;
       orderQty.value = num;
       PriceDynamic(num);

    });
    minusBtn.addEventListener('click', ()=> {
      if(num !=0){
        num--;
        PriceDynamic(num);
      }
     orderQty.value = num;
  });
}

function PriceDynamic(num = 1){
  const totalProd = "P " + num *80.00;
  orderTotal.innerHTML = totalProd +".00";
  cartTotal.innerHTML = totalProd + ".00";
}


addMsAutoAttribute();
PlusMinusButton();
PriceDynamic();
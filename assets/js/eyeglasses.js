// cart
let cartIcon = document.querySelector('.cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('.close-cart');
var openCart = document.querySelector('.add-cart');

//open cart

cartIcon.onclick = () => {
    cart.classList.add("active");
    }
    
    
    //close cart
    closeCart.onclick = () => {
        cart.classList.remove("active");
        }
        
        openCart.onclick = () => {
            cart.classList.add("active");
        }

// cart Working JS
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}


// Making function
function ready(){
    // Remove Items from Cart
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem);
    }
    //Quantity Changes
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    // Add To Cart
    var addCart = document.getElementsByClassName("add-cart")
    for (var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    // Buy Button Work
    document
    .getElementsByClassName('btn-buy')[0]
    .addEventListener("click", buyButtonClicked)
}

// Buy Button
function buyButtonClicked(){

    var totalAmount = updatetotal() * 100; // Convert to paise

    // Ensure totalAmount is an integer and greater than or equal to 100
    if (totalAmount < 100) {
        alert("Invalid amount. The amount should be at least 1 INR.");
        return;
    }


    var options = {
        key: "rzp_test_PV1oQ0oMtgXOsq", // Enter the Key ID generated from the Dashboard
        amount: totalAmount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "MyShop Checkout",
        description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        theme: {
          color: "#000",
        },
        image:
          "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
      }
      
      var rzpy1 = new Razorpay(options);
      rzpy1.open();

      
    //   alert('Your order is placed')
    var cartContent = document.getElementsByClassName('cart-content')[0]
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}



//Remove Items from Cart
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

// Quantity Changes
function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
     updatetotal();
}

// Add To cart
function addCartClicked(event){
    var button = event.target
    var shopProducts = button.parentElement
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
}

// function updateWishList(event) {
//     // Select the <span> element within the #Wish element
//     const wishListSpan = document.querySelector('#Wish span');
    
//     // Update the text content of the <span> element
//     wishListSpan.textContent = event;
   
// }


function updateWishList(event) {
    // Select the <span> element within the #Wish element
    const wishListSpan = document.querySelector('#Wish span');
    
    // Get the current wish list items from the <span> element
    let wishList = wishListSpan.textContent.split(',').map(item => item.trim()).filter(item => item);

    // Check if the event (item) is already in the wish list
    const itemIndex = wishList.indexOf(event);

    if (itemIndex === -1) {
        // Item not in the wish list, so add it
        wishList.push(event);
    } else {
        // Item is in the wish list, so remove it
        wishList.splice(itemIndex, 1);
    }

    // Update the text content of the <span> element
    wishListSpan.textContent = wishList.join(', ');
}

// Example usage with buttons to add/remove items
document.querySelectorAll('.cart-remove').forEach(button => {
    button.addEventListener('click', function() {
        updateWishList(this.dataset.item);
    });
});


function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    document.querySelector('#Wish span').innerHTML=cartItemsNames.length+1;

    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("You have already added this item to the cart");
            return;
        }
    }

    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class="ri-close-circle-fill cart-remove"></i>`;
        
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.appendChild(cartShopBox);

    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener('change', quantityChanged);
}


// Update Total
function updatetotal(){
    var cartContent =  document.getElementsByClassName("cart-content")[0]
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("₹", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
        // If price Contain some Cents Value  
        total = Math.round(total * 100) / 100;
        document.getElementsByClassName("total-price")[0].innerText = "₹" + total;
        return total;
};


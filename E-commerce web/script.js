const container = document.getElementById("container");
const cartContainer = document.getElementById("cart-container");
const totalPrice = document.getElementById("total-price");
let cartList = JSON.parse(localStorage.getItem("cart")) || [];

let qty = 1;

cartList = cartList.map((cart) => {
  return {...cart, qty: 1};
});

const fetchProducts = () => {
    fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => displayProducts(data.products))
    .catch((err) => console.log(err));
}


const displayProducts = (products) => {
    products.forEach((product) =>{

const div = document.createElement("div");
div.className = "col-md-4 col-lg-3 mb-4";

div.innerHTML = `
<div class="card product-card-dark h-100 border-0">
  
  <div class="p-3 text-center bg-dark-soft position-relative">
    <img src="${product.images[0]}" 
         alt="${product.title}" 
         class="img-fluid"
         style="height:180px; object-fit:contain;">
    
    <span class="badge bg-success position-absolute top-0 end-0 m-2">
      ${product.discountPercentage}% OFF
    </span>
  </div>

  <div class="card-body d-flex flex-column">
    <h6 class="fw-semibold text-light text-truncate">${product.title}</h6>

   <p class="product-desc small mb-2">

      ${product.description}
    </p>

    <div class="d-flex justify-content-between align-items-center mb-2">
      <span class="fs-5 fw-bold text-info">₹${product.price}</span>
      <span class="text-warning">${product.rating} ⭐</span>
    </div>

    <div class="text-secondary small mb-3">
      Brand: <span class="text-light fw-semibold">${product.brand}</span>
    </div>

    <div class="mt-auto d-flex gap-2">
      <button class="btn btn-outline-light btn-sm w-50">View</button>
  <button onclick='addToCart(${JSON.stringify(product)})'
              class="btn btn-info btn-sm w-50 text-dark fw-semibold">
        Add to Cart
      </button>

    </div>
  </div>
</div>
`;
container.appendChild(div);


    });

}





const removeProduct = (i) => {
  cartList.splice(i, 1);
  localStorage.setItem("cart", JSON.stringify(cartList));
   displayCart();
}
 
const displayCart = () => {
  cartContainer.innerHTML = "";
  totalPrice.textContent = ""
 let total = 0;
  cartList.forEach((cart , i) => {
   
    const discountAmount = (cart.price * cart.discountPercentage) / 100;
    const finalPrice = cart.price - discountAmount;

    const div = document.createElement("div");

    div.innerHTML = `
      <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${cart.images[0]}" class="img-fluid rounded-start" alt="${cart.title}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${cart.title}</h5>
              <p class="card-text">Price: ₹${cart.price}</p>
              <p class="card-text text-success">
                Discount: -₹${discountAmount.toFixed(2)}
              </p>
              <p class="card-text fw-bold">
                Final Price: ₹${finalPrice.toFixed(2)}
              </p>
              <button onclick='removeProduct(${i})' class= "btn btn-danger m-2">Remove</button>
               <span>
               <button onclick='decrement(${i})' class="btn btn-secondary">-</button>
               <span class="m-2">${cart.qty}</span>
               <button onclick='increment(${i})' class="btn btn-secondary">+</button>

               </span>
              </div>
          </div>
        </div>
      </div>
    `;

    total =  total + (cart.price - (cart.price * cart.discountPercentage / 100))*cart.qty;
    totalPrice.textContent = `Total price - ${total}`;
    cartContainer.appendChild(div);
  });
};


    const increment = (i) => {
     cartList[i].qty++;
     localStorage.setItem("cart", JSON.stringify(cartList));
     displayCart()
    }
    const decrement = (i) => {
      cartList[i].qty--;
      localStorage.setItem("cart", JSON.stringify(cartList));
      displayCart()
    }







const addToCart = (product) => {
cartList.push(product);
localStorage.setItem("cart", JSON.stringify(cartList));
alert("add to cart");
}




if (container) {
  fetchProducts();
}

if (cartContainer) {
  displayCart();
}



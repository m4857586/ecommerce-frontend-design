// Update Cart Count
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartElement = document.getElementById("cartCount");
  if (cartElement) {
    cartElement.innerText = `Cart 🛒 (${total})`;
  }
}

// Add product to cart (reusable function)
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct = cart.find(item => item.name === name);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ name, price, image, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showToast(`${name} added to cart 🛒`);
}

// Toast notification
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast-notification";
  toast.innerText = message;
  document.body.appendChild(toast);

  // Show animation
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  // Remove after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// Initialize Add to Cart buttons (multiple products)
function initAddToCartButtons() {
  const buttons = document.querySelectorAll(".add-to-cart");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const productCard = button.closest(".product-card");
      if (!productCard) return;

      const name = productCard.querySelector("h3")?.innerText || "Unknown Product";
      const price = parseFloat(productCard.querySelector(".price")?.innerText.replace(/[^0-9.]/g, "")) || 0;
      const image = productCard.querySelector("img")?.src || "";

      addToCart(name, price, image);
    });
  });
}

//  Initialize Detail Page Button (single product)
function initDetailPageButton() {
  const detailBtn = document.getElementById("addToCart");
  if (!detailBtn) return;

  detailBtn.addEventListener("click", () => {
    const name = document.querySelector(".product-info h1")?.innerText || "Unknown Product";
    const price = parseFloat(document.querySelector(".price")?.innerText.replace(/[^0-9.]/g, "")) || 0;
    const image = document.querySelector(".product-image img")?.src || "";

    addToCart(name, price, image);
  });
}

//  Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  initAddToCartButtons();
  initDetailPageButton();
});

// Load cart from localStorage and display
function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cartContainer");
  container.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>$${item.price}</p>
      <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="qtyInput">
      <p>$${itemTotal.toFixed(2)}</p>
      <button data-index="${index}" class="removeBtn">Remove</button>
    `;
    container.appendChild(div);
  });

  document.getElementById("cartTotal").innerText = total.toFixed(2);
  updateCartCount();
  attachEvents();
}

// Update quantity and remove functionality
function attachEvents() {
  document.querySelectorAll(".qtyInput").forEach(input => {
    input.addEventListener("change", e => {
      const index = e.target.dataset.index;
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      let qty = parseInt(e.target.value);
      if (qty < 1) qty = 1;
      cart[index].quantity = qty;
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart();
    });
  });

  document.querySelectorAll(".removeBtn").forEach(btn => {
    btn.addEventListener("click", e => {
      const index = e.target.dataset.index;
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart();
    });
  });
}

// Update cart count in header
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cartCount").innerText = `Cart 🛒 (${totalQty})`;
}

// Checkout button
document.getElementById("checkoutBtn").addEventListener("click", () => {
  alert("Proceeding to checkout!");
  // You can redirect to a payment page here
});

// Initialize cart page
loadCart();
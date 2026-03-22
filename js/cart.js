// ===== Cart logic =====
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, image, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartElement = document.getElementById("cartCount");
  if (cartElement) {
    cartElement.innerText = `Cart 🛒 (${totalQty})`;
  }
}

// ===== Homepage & Detail Page Buttons =====
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  // Homepage buttons
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".product-card");
      const name = card.querySelector("h3").innerText;
      const price = parseFloat(card.querySelector(".price").innerText.replace(/[^0-9.]/g, ""));
      const image = card.querySelector("img").src;
      addToCart(name, price, image);
      alert(`${name} added to cart!`);
    });
  });

  // Detail page button
  const detailBtn = document.getElementById("addToCart");
  if (detailBtn) {
    detailBtn.addEventListener("click", () => {
      const name = document.querySelector(".product-info h1").innerText;
      const price = parseFloat(document.querySelector(".price").innerText.replace(/[^0-9.]/g, ""));
      const image = document.querySelector(".product-image img").src;
      addToCart(name, price, image);
      alert(`${name} added to cart!`);
    });
  }
});
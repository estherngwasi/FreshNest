// Navigate to products page
function startShopping() {
    window.location.href = 'products.html';
  }
  
  // Get cart from localStorage or initialize
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Save cart to localStorage
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  // Add item to cart
  function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }
    saveCart();
    alert(`${name} added to cart.`);
  }
  
  // Remove item from cart
  function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    saveCart();
    renderCart();
  }
  
  // Update item quantity
  function updateQuantity(name, quantity) {
    const item = cart.find(i => i.name === name);
    if (item) {
      item.quantity = parseInt(quantity);
      if (item.quantity <= 0) {
        removeFromCart(name);
      } else {
        saveCart();
        renderCart();
      }
    }
  }
  
  // Clear entire cart
  function clearCart() {
    if (confirm("Are you sure you want to clear your cart?")) {
      cart = [];
      saveCart();
      renderCart();
    }
  }
  
  // Render cart items in cart.html
  function renderCart() {
    const cartItemsEl = document.getElementById('cart-items');
    if (!cartItemsEl) return;
  
    cartItemsEl.innerHTML = '';
  
    if (cart.length === 0) {
      cartItemsEl.innerHTML = '<p>Your cart is empty.</p>';
      return;
    }
  
    cart.forEach(item => {
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `
        <span>${item.name} - $${item.price} x </span>
        <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity('${item.name}', this.value)" />
        = <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
        <button onclick="removeFromCart('${item.name}')">Remove</button>
      `;
      cartItemsEl.appendChild(li);
    });
  
    // Total
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalEl = document.createElement('p');
    totalEl.className = 'cart-total';
    totalEl.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    cartItemsEl.appendChild(totalEl);
  
    // Clear cart button
    const clearBtn = document.createElement('button');
    clearBtn.textContent = "Clear Cart";
    clearBtn.onclick = clearCart;
    clearBtn.className = 'clear-cart';
    cartItemsEl.appendChild(clearBtn);
  }
  
  // Setup add-to-cart buttons on products.html
  document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.add-to-cart');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        addToCart(name, price);
      });
    });
  
    renderCart(); // if on cart page
  });
  
// script.js

let cart = [];

function openProduct(card) {
  const imgSrc = card.querySelector("img").src;
  document.getElementById("modalImg").src = imgSrc;
  document.getElementById("productModal").style.display = "flex";
  const name = card.querySelector(".product-name").textContent;
  const price = card.querySelector(".price").textContent;
  document.getElementById("modalImg").dataset.name = name;
  document.getElementById("modalImg").dataset.price = price;
  document.getElementById("modalImg").dataset.img = imgSrc;
}

function closeModal() {
  document.getElementById("productModal").style.display = "none";
}

function addToCart() {
  const img = document.getElementById("modalImg");
  cart.push({
    name: img.dataset.name,
    price: img.dataset.price,
    img: img.dataset.img
  });
  alert("Product added to cart!");
  closeModal();
  updateCartUI();
}

function updateCartUI() {
  const cartPanel = document.getElementById("cartPanel");
  cartPanel.innerHTML = `
    <div class="cart-header">
      <span class="back-arrow" onclick="toggleCart()">&#8592;</span>
      <h3>Shopping Cart</h3>
    </div>
  `;
  cart.forEach((item, index) => {
    cartPanel.innerHTML += `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}" style="width: 100px; border-radius: 5px;" />
        <p><strong>${item.name}</strong><br>${item.price}</p>
        <button class="place-order-btn" onclick="placeOrderItem(${index})">Place Order</button>
        <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
  });
  if (cart.length > 0) {
    cartPanel.innerHTML += `<button class="clear-cart-btn" onclick="clearCart()">Clear Cart</button>`;
  }
}

function placeOrderItem(index) {
  alert(`Order placed for ${cart[index].name}`);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function clearCart() {
  cart = [];
  updateCartUI();
}

function toggleCart() {
  const cartPanel = document.getElementById("cartPanel");
  cartPanel.classList.toggle("active");
}

function enquire() {
  alert("We'll get back to you shortly with more details.");
}

document.addEventListener('DOMContentLoaded', function () {
    const galleryImages = document.querySelectorAll('.product-tile img');
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalImg = document.createElement('img');
    const seeMoreBtn = document.createElement('button');
    seeMoreBtn.textContent = 'See More';
    seeMoreBtn.classList.add('see-more');

    const leftArrow = document.createElement('span');
    const rightArrow = document.createElement('span');
    leftArrow.textContent = '❮';
    rightArrow.textContent = '❯';
    leftArrow.classList.add('arrow', 'left');
    rightArrow.classList.add('arrow', 'right');

    let currentIndex = 0;
    let currentImages = [];
    let currentProductId = '';

    modal.append(modalImg, seeMoreBtn, leftArrow, rightArrow);
    document.body.appendChild(modal);

    const popupCard = document.createElement('div');
    popupCard.classList.add('popup-card');
    popupCard.innerHTML = `
        <h2>Product Details</h2>
        <p id="popup-desc">Description loading...</p>
        <button onclick="document.querySelector('.popup-card').style.display='none'">Close</button>
    `;
    document.body.appendChild(popupCard);

    galleryImages.forEach((img, i) => {
        img.addEventListener('click', () => {
            currentImages = [...img.closest('.tile-grid').querySelectorAll('img')];
            currentIndex = currentImages.indexOf(img);
            modalImg.src = img.src;
            currentProductId = img.closest('.product-tile').dataset.productId || '';
            modal.style.display = 'flex';
        });
    });

    leftArrow.onclick = () => {
        if (currentImages.length) {
            currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
            modalImg.src = currentImages[currentIndex].src;
            currentProductId = currentImages[currentIndex].closest('.product-tile').dataset.productId;
        }
    };

    rightArrow.onclick = () => {
        if (currentImages.length) {
            currentIndex = (currentIndex + 1) % currentImages.length;
            modalImg.src = currentImages[currentIndex].src;
            currentProductId = currentImages[currentIndex].closest('.product-tile').dataset.productId;
        }
    };

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    seeMoreBtn.onclick = () => {
        modal.style.display = 'none';
        // Dynamically update popup with content (demo version below)
        document.getElementById('popup-desc').textContent = `Details for product: ${currentProductId}`;
        popupCard.style.display = 'block';
    };
});


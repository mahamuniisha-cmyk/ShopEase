
/* ==================================
   1. SHOP EASE - PRODUCT DATA
================================== */

const products = [
    // ELECTRONICS
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1499,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 1999,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"
    },
    {
        id: 5,
        name: "Bluetooth Speaker",
        price: 1299,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600"
    },

    // FASHION
    {
        id: 3,
        name: "Running Shoes",
        price: 2499,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
    },
    {
        id: 4,
        name: "Backpack",
        price: 999,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600"
    },
    {
        id: 11,
        name: "Floral Dress",
        price: 899,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600"
    },
    {
        id: 13,
        name: "Pink Heels",
        price: 999,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600"
    },

    // ACCESSORIES
    {
        id: 6,
        name: "Sunglasses",
        price: 799,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600"
    },
    {
        id: 12,
        name: "Pink Handbag",
        price: 799,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600"
    },
    {
        id: 14,
        name: "Pearl Earrings",
        price: 399,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600"
    },

    // BEAUTY
    {
        id: 7,
        name: "Glow Face Serum",
        price: 599,
        category: "Beauty",
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600"
    },
    {
        id: 8,
        name: "Pink Lipstick",
        price: 399,
        category: "Beauty",
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600"
    },
    {
        id: 9,
        name: "Face Moisturizer",
        price: 499,
        category: "Beauty",
        image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600"
    },
    {
        id: 10,
        name: "Rose Perfume",
        price: 899,
        category: "Beauty",
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600"
    },

    // JEWELLERY
    {
        id: 15,
        name: "Gold Plated Necklace Set",
        price: 799,
        category: "Jewellery",
        image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600"
    },
    {
        id: 16,
        name: "Traditional Jhumka Earrings",
        price: 399,
        category: "Jewellery",
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600"
    },
    {
        id: 17,
        name: "Designer Bangles",
        price: 499,
        category: "Jewellery",
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600"
    },
    {
        id: 18,
        name: "Pearl Bracelet",
        price: 349,
        category: "Jewellery",
        image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600"
    }
];


/* ==================================
   2. HTML ELEMENTS
================================== */

const productList = document.getElementById("productList");
const searchInput = document.getElementById("search");

const cartItems = document.getElementById("cartItems");
const totalElement = document.getElementById("total");
const cartCount = document.getElementById("cartCount");

const orderMessage = document.getElementById("orderMessage");

const menuBtn = document.getElementById("menuBtn");
const categoryMenu = document.getElementById("categoryMenu");

const checkoutBtn = document.getElementById("checkoutBtn");


/* ==================================
   3. CART STORAGE
================================== */

function loadCart() {
    try {
        const savedCart = JSON.parse(
            localStorage.getItem("shopEaseCart")
        );

        if (!Array.isArray(savedCart)) {
            return [];
        }

        return savedCart.filter(item =>
            Number.isInteger(item.id) &&
            Number.isInteger(item.quantity) &&
            item.quantity > 0 &&
            Number.isFinite(item.price)
        );

    } catch (error) {
        console.error("Unable to load cart:", error);
        return [];
    }
}

let cart = loadCart();
let selectedCategory = "All";


function saveCart() {
    try {
        localStorage.setItem(
            "shopEaseCart",
            JSON.stringify(cart)
        );
    } catch (error) {
        console.error("Unable to save cart:", error);
    }
}


/* ==================================
   4. DISPLAY PRODUCTS
================================== */

function displayProducts(items) {

    if (!productList) return;

    productList.innerHTML = "";

    if (items.length === 0) {
        productList.innerHTML = "<p>No products found 💗</p>";
        return;
    }

    items.forEach(function(product) {

        const card = document.createElement("div");
        card.className = "product-card";

        const image = document.createElement("img");

        image.src = product.image;
        image.alt = product.name;
        image.loading = "lazy";

        image.onerror = function() {
            this.onerror = null;
            this.src =
                "https://placehold.co/600x400?text=Image+Unavailable";
        };

        const name = document.createElement("h3");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.textContent = "₹" + product.price;

        const button = document.createElement("button");
        button.textContent = "Add to Cart 💗";

        button.addEventListener("click", function() {
            addToCart(product.id);
        });

        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(price);
        card.appendChild(button);

        productList.appendChild(card);
    });
}


/* ==================================
   5. ADD TO CART
================================== */

function addToCart(id) {

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        const product = products.find(item => item.id === id);

        if (!product) return;

        cart.push({
            ...product,
            quantity: 1
        });
    }

    if (orderMessage) {
        orderMessage.textContent = "";
    }

    saveCart();
    displayCart();
}


/* ==================================
   6. DISPLAY CART
================================== */

function displayCart() {

    let total = 0;
    let count = 0;

    if (cartItems) {

        cartItems.innerHTML = "";

        if (cart.length === 0) {

            cartItems.innerHTML =
                "<p>Your cart is empty 💗</p>";

        } else {

            cart.forEach(function(item) {

                total += item.price * item.quantity;
                count += item.quantity;

                const div = document.createElement("div");
                div.className = "cart-item";

                const name = document.createElement("span");

                name.textContent =
                    item.name + " - ₹" + item.price;

                const quantity = document.createElement("span");

                quantity.textContent =
                    "Qty: " + item.quantity;

                const decreaseBtn = document.createElement("button");

                decreaseBtn.textContent = "−";

                decreaseBtn.addEventListener("click", function() {
                    changeQuantity(item.id, -1);
                });

                const increaseBtn = document.createElement("button");

                increaseBtn.textContent = "+";

                increaseBtn.addEventListener("click", function() {
                    changeQuantity(item.id, 1);
                });

                const removeBtn = document.createElement("button");

                removeBtn.textContent = "Remove";

                removeBtn.addEventListener("click", function() {
                    removeFromCart(item.id);
                });

                div.appendChild(name);
                div.appendChild(decreaseBtn);
                div.appendChild(quantity);
                div.appendChild(increaseBtn);
                div.appendChild(removeBtn);

                cartItems.appendChild(div);
            });
        }
    } else {
        cart.forEach(item => {
            total += item.price * item.quantity;
            count += item.quantity;
        });
    }

    if (totalElement) {
        totalElement.textContent = total;
    }

    if (cartCount) {
        cartCount.textContent = count;
    }
}


/* ==================================
   7. CHANGE QUANTITY
================================== */

function changeQuantity(id, change) {

    const item = cart.find(product => product.id === id);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(id);
    } else {
        saveCart();
        displayCart();
    }
}


/* ==================================
   8. REMOVE FROM CART
================================== */

function removeFromCart(id) {

    cart = cart.filter(item => item.id !== id);

    saveCart();
    displayCart();
}


/* ==================================
   9. CATEGORY FILTER
================================== */

function filterCategory(category) {

    selectedCategory = category;

    updateProducts();

    if (categoryMenu) {
        categoryMenu.classList.remove("show");
    }

    const productsSection =
        document.getElementById("products");

    if (productsSection) {
        productsSection.scrollIntoView({
            behavior: "smooth"
        });
    }
}


/* ==================================
   10. SEARCH AND FILTER
================================== */

function updateProducts() {

    if (!productList) return;

    const searchText = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    const filteredProducts = products.filter(function(product) {

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(searchText);

        return matchesCategory && matchesSearch;
    });

    displayProducts(filteredProducts);
}


if (searchInput) {
    searchInput.addEventListener("input", updateProducts);
}


/* ==================================
   11. MENU OPEN AND CLOSE
================================== */

if (menuBtn && categoryMenu) {

    menuBtn.addEventListener("click", function(event) {

        event.stopPropagation();

        categoryMenu.classList.toggle("show");
    });

    document.addEventListener("click", function(event) {

        if (
            !categoryMenu.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {
            categoryMenu.classList.remove("show");
        }
    });
}



/* ==================================
   12. CHECKOUT
================================== */

function checkout() {

    if (cart.length === 0) {
        if (orderMessage) {
            orderMessage.textContent =
                "Your cart is empty! Add products first 💗";
        }
        return;
    }

    const currentUser = localStorage.getItem("shopEaseCurrentUser");

    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }

    window.location.href = "checkout.html";
}

/* ==================================
   13. INITIAL DISPLAY
================================== */

updateProducts();
displayCart();

console.log("ShopEase loaded successfully! 💗");

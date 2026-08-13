/* ==========================================
   PULSE WEAR JAVASCRIPT
========================================== */


/* ==========================================
   STORAGE
========================================== */

let cart =
    JSON.parse(localStorage.getItem("pulseCart")) || [];

let savedProducts =
    JSON.parse(localStorage.getItem("pulseSaved")) || [];

const productCards =
    document.querySelectorAll(".product-card");


/* ==========================================
   CUSTOM PULSE NOTIFICATION
========================================== */

function showNotification(message) {

    let notification =
        document.querySelector(".pulse-notification");

    if (!notification) {

        notification =
            document.createElement("div");

        notification.className =
            "pulse-notification";

        notification.style.position =
            "fixed";

        notification.style.left =
            "50%";

        notification.style.bottom =
            "95px";

        notification.style.background =
            "#111";

        notification.style.color =
            "#fff";

        notification.style.padding =
            "14px 24px";

        notification.style.borderRadius =
            "6px";

        notification.style.fontSize =
            "14px";

        notification.style.fontWeight =
            "600";

        notification.style.zIndex =
            "99999";

        notification.style.textAlign =
            "center";

        notification.style.maxWidth =
            "calc(100% - 30px)";

        notification.style.opacity =
            "0";

        notification.style.transform =
            "translateX(-50%) translateY(20px)";

        notification.style.transition =
            "opacity 0.25s ease, transform 0.25s ease";

        notification.style.pointerEvents =
            "none";

        document.body.appendChild(
            notification
        );

    }

    notification.textContent =
        message;

    notification.style.opacity =
        "1";

    notification.style.transform =
        "translateX(-50%) translateY(0)";

    clearTimeout(
        window.pulseNotificationTimer
    );

    window.pulseNotificationTimer =
        setTimeout(() => {

            notification.style.opacity =
                "0";

            notification.style.transform =
                "translateX(-50%) translateY(20px)";

        }, 2500);

}


/* ==========================================
   ELEMENTS
========================================== */

const cartButton =
    document.querySelector(".cart-button");

const cartPanel =
    document.querySelector(".cart-panel");

const cartOverlay =
    document.querySelector(".cart-overlay");

const closeCart =
    document.querySelector(".close-cart");

const cartItemsContainer =
    document.querySelector(".cart-items");

const cartCount =
    document.querySelector(".cart-count");

const cartTotal =
    document.querySelector(".cart-total strong:last-child");

const checkoutButton =
    document.querySelector("#checkout-btn");

const checkoutPanel =
    document.querySelector(".checkout-panel");

const closeCheckout =
    document.querySelector(".close-checkout");

const checkoutForm =
    document.querySelector("#checkout-form");

const deliveryLocation =
    document.querySelector("#delivery-location");

const checkoutSubtotal =
    document.querySelector("#checkout-subtotal");

const checkoutDelivery =
    document.querySelector("#checkout-delivery");

const checkoutTotal =
    document.querySelector("#checkout-total");

const paymentMethod =
    document.querySelector("#payment-method");

const codOption =
    document.querySelector("#cod-option");

const codMessage =
    document.querySelector("#cod-message");


/* ==========================================
   MENU
========================================== */

const menuButton =
    document.querySelector(".menu-btn");

const mobileMenu =
    document.querySelector(".mobile-menu");

const closeMenu =
    document.querySelector(".close-menu");

const menuOverlay =
    document.querySelector(".menu-overlay");


function openMenu() {

    mobileMenu.classList.add("open");

    menuOverlay.classList.add("open");

}


function closeMobileMenu() {

    mobileMenu.classList.remove("open");

    menuOverlay.classList.remove("open");

}


if (menuButton) {

    menuButton.addEventListener(
        "click",
        openMenu
    );

}


if (closeMenu) {

    closeMenu.addEventListener(
        "click",
        closeMobileMenu
    );

}


if (menuOverlay) {

    menuOverlay.addEventListener(
        "click",
        closeMobileMenu
    );

}


document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });


/* ==========================================
   SEARCH
========================================== */

const searchButton =
    document.querySelector(".search-button");

const searchBox =
    document.querySelector(".search-box");

const searchInput =
    document.querySelector("#search-input");

const closeSearch =
    document.querySelector("#close-search");


if (searchButton) {

    searchButton.addEventListener(
        "click",
        () => {

            searchBox.classList.add("open");

            searchInput.focus();

        }
    );

}


if (closeSearch) {

    closeSearch.addEventListener(
        "click",
        () => {

            searchBox.classList.remove("open");

            searchInput.value = "";

            productCards.forEach(card => {

                card.style.display = "";

            });

        }
    );

}


if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            const term =
                searchInput.value
                    .toLowerCase()
                    .trim();

            productCards.forEach(card => {

                const name =
                    card
                        .querySelector("h3")
                        .textContent
                        .toLowerCase();

                card.style.display =
                    name.includes(term)
                        ? ""
                        : "none";

            });

        }
    );

}


/* ==========================================
   PRODUCT MODAL
========================================== */

const productModal =
    document.querySelector(".product-modal");

const productModalOverlay =
    document.querySelector(".product-modal-overlay");

const closeProductModal =
    document.querySelector(".close-product-modal");

const modalImage =
    document.querySelector("#modal-product-image");

const modalName =
    document.querySelector("#modal-product-name");

const modalPrice =
    document.querySelector("#modal-product-price");

const modalSizes =
    document.querySelector(".modal-sizes");

const selectedSizeText =
    document.querySelector(".selected-size");

const modalAddToCart =
    document.querySelector(".modal-add-to-cart");


let selectedProduct = null;

let selectedSize = null;


/* ==========================================
   PRODUCT SIZES
========================================== */

function getProductSizes(card) {

    if (
        card.dataset.sizeType === "shoes"
    ) {

        return [
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44",
            "45"
        ];

    }

    return [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
    ];

}


/* ==========================================
   OPEN PRODUCT MODAL
========================================== */

function openProductModal(card) {

    const image =
        card.querySelector("img").src;

    const name =
        card.querySelector("h3").textContent;

    const priceText =
        card.querySelector(".price").textContent;


    selectedProduct = {

        name: name,

        price:
            parseFloat(
                priceText
                    .replace("GH₵", "")
                    .replace(",", "")
            ),

        image: image

    };


    selectedSize = null;


    modalImage.src =
        image;

    modalImage.alt =
        name;

    modalName.textContent =
        name;

    modalPrice.textContent =
        priceText;

    selectedSizeText.textContent =
        "Select a size";

    modalSizes.innerHTML =
        "";


    getProductSizes(card)
        .forEach(size => {

            const button =
                document.createElement(
                    "button"
                );

            button.type =
                "button";

            button.className =
                "size-option";

            button.textContent =
                size;


            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".size-option"
                        )
                        .forEach(item => {

                            item.classList.remove(
                                "selected"
                            );

                        });


                    button.classList.add(
                        "selected"
                    );


                    selectedSize =
                        size;


                    selectedSizeText.textContent =
                        `Selected size: ${size}`;

                }
            );


            modalSizes.appendChild(
                button
            );

        });


    productModal.classList.add(
        "open"
    );

    productModalOverlay.classList.add(
        "open"
    );

}


/* ==========================================
   CLOSE PRODUCT MODAL
========================================== */

function closeProductModalWindow() {

    productModal.classList.remove(
        "open"
    );

    productModalOverlay.classList.remove(
        "open"
    );

}


productCards.forEach(card => {

    const productImage =
        card.querySelector(".product-image");

    if (productImage) {

        productImage.addEventListener(
            "click",
            event => {

                if (
                    event.target.closest(".heart")
                ) {

                    return;

                }

                openProductModal(card);

            }
        );

    }

});


if (closeProductModal) {

    closeProductModal.addEventListener(
        "click",
        closeProductModalWindow
    );

}


if (productModalOverlay) {

    productModalOverlay.addEventListener(
        "click",
        closeProductModalWindow
    );

}


/* ==========================================
   ADD TO CART
========================================== */

if (modalAddToCart) {

    modalAddToCart.addEventListener(
        "click",
        () => {

            if (!selectedProduct) {

                return;

            }


            /* SIZE CHECK */

            if (!selectedSize) {

                showNotification(
                    "Please select a size first."
                );

                return;

            }


            const existing =
                cart.find(item =>

                    item.name ===
                        selectedProduct.name &&

                    item.size ===
                        selectedSize

                );


            if (existing) {

                existing.quantity++;

            } else {

                cart.push({

                    name:
                        selectedProduct.name,

                    price:
                        selectedProduct.price,

                    image:
                        selectedProduct.image,

                    size:
                        selectedSize,

                    quantity:
                        1

                });

            }


            saveCart();

            updateCart();


            closeProductModalWindow();


            showNotification(
                "Added to cart"
            );


            selectedProduct =
                null;

            selectedSize =
                null;

        }
    );

}


/* ==========================================
   CART FUNCTIONS
========================================== */

function saveCart() {

    localStorage.setItem(
        "pulseCart",
        JSON.stringify(cart)
    );

}


function getCartSubtotal() {

    return cart.reduce(
        (sum, item) =>

            sum +
            (
                item.price *
                item.quantity
            ),

        0
    );

}


function updateCart() {

    if (!cartItemsContainer) {
        return;
    }

    cartItemsContainer.innerHTML =
        "";


    if (cart.length === 0) {

        cartItemsContainer.innerHTML =
            `
            <p class="empty-cart">
                Your bag is empty.
            </p>
            `;

    } else {

        cart.forEach(
            (item, index) => {

                const element =
                    document.createElement(
                        "div"
                    );


                element.className =
                    "cart-item";


                element.innerHTML = `

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                    <div class="cart-item-info">

                        <h3>
                            ${item.name}
                        </h3>

                        <p>
                            Size: ${item.size}
                        </p>

                        <p>
                            GH₵${item.price.toFixed(2)}
                            × ${item.quantity}
                        </p>

                        <button
                            class="remove-cart-item"
                            data-index="${index}"
                            type="button"
                        >
                            Remove
                        </button>

                    </div>

                `;


                cartItemsContainer.appendChild(
                    element
                );

            }
        );

    }


    document
        .querySelectorAll(
            ".remove-cart-item"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    cart.splice(
                        index,
                        1
                    );


                    saveCart();

                    updateCart();

                    updateCheckoutTotals();

                }
            );

        });


    const quantity =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );


    if (cartCount) {

        cartCount.textContent =
            quantity;

    }


    if (cartTotal) {

        cartTotal.textContent =
            `GH₵${getCartSubtotal().toFixed(2)}`;

    }

}


/* ==========================================
   OPEN / CLOSE CART
========================================== */

function openCart() {

    cartPanel.classList.add(
        "open"
    );

    cartOverlay.classList.add(
        "open"
    );

    updateCart();

}


function closeCartPanel() {

    cartPanel.classList.remove(
        "open"
    );

    cartOverlay.classList.remove(
        "open"
    );

}


if (cartButton) {

    cartButton.addEventListener(
        "click",
        openCart
    );

}


if (closeCart) {

    closeCart.addEventListener(
        "click",
        closeCartPanel
    );

}


if (cartOverlay) {

    cartOverlay.addEventListener(
        "click",
        closeCartPanel
    );

}


/* ==========================================
   SAVED PRODUCTS
========================================== */

function saveSavedProducts() {

    localStorage.setItem(
        "pulseSaved",
        JSON.stringify(savedProducts)
    );

}


function updateSavedProducts() {

    productCards.forEach(card => {

        const name =
            card
                .querySelector("h3")
                .textContent;

        const heart =
            card.querySelector(
                ".heart"
            );


        if (
            savedProducts.includes(name)
        ) {

            heart.textContent =
                "♥";

            heart.classList.add(
                "saved"
            );

        } else {

            heart.textContent =
                "♡";

            heart.classList.remove(
                "saved"
            );

        }

    });


    renderSavedProducts();

}


function renderSavedProducts() {

    const savedGrid =
        document.querySelector(
            ".saved-grid"
        );


    if (!savedGrid) {
        return;
    }


    savedGrid.innerHTML =
        "";


    if (
        savedProducts.length === 0
    ) {

        savedGrid.innerHTML =
            `
            <p class="empty-saved">
                You haven't saved any products yet.
            </p>
            `;

        return;

    }


    savedProducts.forEach(
        productName => {

            const card =
                [...productCards]
                    .find(
                        item =>
                            item
                                .querySelector(
                                    "h3"
                                )
                                .textContent ===
                            productName
                    );


            if (!card) {

                return;

            }


            const image =
                card
                    .querySelector(
                        "img"
                    )
                    .src;


            const price =
                card
                    .querySelector(
                        ".price"
                    )
                    .textContent;


            const savedCard =
                document.createElement(
                    "div"
                );


            savedCard.className =
                "saved-card";


            savedCard.innerHTML = `

                <img
                    src="${image}"
                    alt="${productName}"
                >

                <div class="saved-card-info">

                    <h3>
                        ${productName}
                    </h3>

                    <p>
                        ${price}
                    </p>

                    <button
                        class="remove-saved"
                        type="button"
                    >
                        Remove
                    </button>

                </div>

            `;


            savedGrid.appendChild(
                savedCard
            );


            savedCard
                .querySelector(
                    ".remove-saved"
                )
                .addEventListener(
                    "click",
                    () => {

                        savedProducts =
                            savedProducts.filter(
                                item =>
                                    item !==
                                    productName
                            );


                        saveSavedProducts();

                        updateSavedProducts();

                    }
                );

        }
    );

}


/* ==========================================
   HEART / SAVED BUTTONS
========================================== */

productCards.forEach(card => {

    const heart =
        card.querySelector(".heart");

    if (!heart) {
        return;
    }


    heart.addEventListener(
        "click",
        event => {

            event.stopPropagation();


            const name =
                card
                    .querySelector(
                        "h3"
                    )
                    .textContent;


            if (
                savedProducts.includes(
                    name
                )
            ) {

                savedProducts =
                    savedProducts.filter(
                        item =>
                            item !==
                            name
                    );

            } else {

                savedProducts.push(
                    name
                );

            }


            saveSavedProducts();

            updateSavedProducts();

        }
    );

});


/* ==========================================
   CHECKOUT TOTALS
========================================== */

function updateCheckoutTotals() {

    if (
        !deliveryLocation ||
        !checkoutSubtotal ||
        !checkoutDelivery ||
        !checkoutTotal
    ) {

        return;

    }


    const subtotal =
        getCartSubtotal();


    const delivery =
        deliveryLocation.value ===
        "outside"
            ? 10
            : 0;


    const total =
        subtotal +
        delivery;


    checkoutSubtotal.textContent =
        `GH₵${subtotal.toFixed(2)}`;


    checkoutDelivery.textContent =
        `GH₵${delivery.toFixed(2)}`;


    checkoutTotal.textContent =
        `GH₵${total.toFixed(2)}`;


    /* CASH ON DELIVERY */

    if (
        codOption &&
        codMessage &&
        paymentMethod
    ) {

        if (
            total <= 100
        ) {

            codOption.disabled =
                false;

            codMessage.style.display =
                "block";

        } else {

            codOption.disabled =
                true;

            codMessage.style.display =
                "none";


            if (
                paymentMethod.value ===
                "cash-on-delivery"
            ) {

                paymentMethod.value =
                    "";

            }

        }

    }

}


if (deliveryLocation) {

    deliveryLocation.addEventListener(
        "change",
        updateCheckoutTotals
    );

}


/* ==========================================
   PAYMENT CHECK
========================================== */

if (paymentMethod) {

    paymentMethod.addEventListener(
        "change",
        () => {

            const total =
                getCartSubtotal() +
                (
                    deliveryLocation.value ===
                    "outside"
                        ? 10
                        : 0
                );


            if (
                paymentMethod.value ===
                    "cash-on-delivery" &&
                total > 100
            ) {

                showNotification(
                    "Cash on Delivery is only available for orders of GH₵100 or below."
                );


                paymentMethod.value =
                    "";

            }

        }
    );

}


/* ==========================================
   CHECKOUT
========================================== */

function openCheckout() {

    /* CHECK CART */

    if (
        cart.length === 0
    ) {

        showNotification(
            "Your bag is empty."
        );

        return;

    }


    /* CLOSE CART */

    closeCartPanel();


    /* UPDATE TOTALS */

    updateCheckoutTotals();


    /* OPEN CHECKOUT */

    checkoutPanel.classList.add(
        "open"
    );

}


function closeCheckoutPanel() {

    checkoutPanel.classList.remove(
        "open"
    );

}


/* ==========================================
   CHECKOUT BUTTON
========================================== */

if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            event.stopPropagation();

            openCheckout();

        }
    );

}


/* ==========================================
   CLOSE CHECKOUT
========================================== */

if (closeCheckout) {

    closeCheckout.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            closeCheckoutPanel();

        }
    );

}


/* ==========================================
   WHATSAPP ORDER
========================================== */

if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            if (
                cart.length === 0
            ) {

                showNotification(
                    "Your bag is empty."
                );

                return;

            }


            const name =
                document
                    .querySelector(
                        "#customer-name"
                    )
                    .value
                    .trim();


            const phone =
                document
                    .querySelector(
                        "#customer-phone"
                    )
                    .value
                    .trim();


            const location =
                deliveryLocation.value;


            const address =
                document
                    .querySelector(
                        "#customer-address"
                    )
                    .value
                    .trim();


            const selectedPayment =
                paymentMethod.value;


            if (
                !name ||
                !phone ||
                !location ||
                !address
            ) {

                showNotification(
                    "Please complete all delivery details."
                );

                return;

            }


            if (
                !selectedPayment
            ) {

                showNotification(
                    "Please select a payment method."
                );

                return;

            }


            const subtotal =
                getCartSubtotal();


            const delivery =
                location === "outside"
                    ? 10
                    : 0;


            const total =
                subtotal +
                delivery;


            if (
                selectedPayment ===
                    "cash-on-delivery" &&
                total > 100
            ) {

                showNotification(
                    "Cash on Delivery is only available for orders of GH₵100 or below."
                );


                paymentMethod.value =
                    "";

                return;

            }


            const paymentName =
                selectedPayment ===
                    "cash-on-delivery"

                    ? "Cash on Delivery"

                    : "Mobile Money";


            /* ======================================
               WHATSAPP MESSAGE
            ====================================== */

            let message =
                "PULSE WEAR ORDER\n\n";


            message +=
                "CUSTOMER DETAILS\n";


            message +=
                "Name: " +
                name +
                "\n";


            message +=
                "Phone: " +
                phone +
                "\n\n";


            message +=
                "ORDER DETAILS\n";


            cart.forEach(item => {

                const itemTotal =
                    item.price *
                    item.quantity;


                message +=
                    item.name +
                    " - Size " +
                    item.size +
                    " - Quantity " +
                    item.quantity +
                    " - GH₵" +
                    itemTotal.toFixed(2) +
                    "\n";

            });


            message +=
                "\nDELIVERY DETAILS\n";


            message +=
                "Location: " +
                (
                    location === "campus"
                        ? "COHK Campus"
                        : "Outside COHK Campus"
                ) +
                "\n";


            message +=
                "Address: " +
                address +
                "\n";


            message +=
                "Delivery Fee: GH₵" +
                delivery.toFixed(2) +
                "\n\n";


            message +=
                "PAYMENT METHOD\n";


            message +=
                paymentName +
                "\n\n";


            message +=
                "Subtotal: GH₵" +
                subtotal.toFixed(2) +
                "\n";


            message +=
                "TOTAL: GH₵" +
                total.toFixed(2) +
                "\n\n";


            message +=
                "Thank you for shopping with PULSE Wear!";


            /* ======================================
               WHATSAPP NUMBER
            ====================================== */

            const whatsappNumber =
                "233XXXXXXXXX";


            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(
                    message
                );


            window.open(
                whatsappURL,
                "_blank"
            );


            /* ======================================
               CLEAR CART
            ====================================== */

            cart = [];

            saveCart();

            updateCart();

            checkoutForm.reset();

            updateCheckoutTotals();

            closeCheckoutPanel();

        }
    );

}


/* ==========================================
   BOTTOM BAG
========================================== */

const bottomBag =
    document.querySelector(
        ".bottom-nav a:nth-child(4)"
    );


if (bottomBag) {

    bottomBag.addEventListener(
        "click",
        event => {

            event.preventDefault();

            openCart();

        }
    );

}


/* ==========================================
   INITIALIZE
========================================== */

updateCart();

updateSavedProducts();

updateCheckoutTotals();

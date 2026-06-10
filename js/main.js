document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const reviewsContainer = document.querySelector('.reviews__list');
    const heroImage = document.querySelector('.hero__image');
    const heroVideo = document.querySelector('.hero__video');
    const checkoutModal = document.querySelector('.modal');
    const orderBtn = document.querySelector('.sticky-footer__btn');
    const navCartBtn = document.querySelector('.nav__cart-btn');
    
    const inputName = document.getElementById('cust-name');
    const inputPhone = document.getElementById('cust-phone');
    const inputAddress = document.getElementById('cust-address');

    // --- 1. HERO MEDIA SWITCHER ---
    const mediaSources = [
        { type: 'image', src: "assets/images/hero-image.jpeg" },
        { type: 'video', src: "assets/videos/main1.mp4" },
        { type: 'video', src: "assets/videos/main2.mp4" }
    ];
    let currentIndex = 0;
    let autoTimer;

    const updateMedia = (index) => {
        clearTimeout(autoTimer);
        const current = mediaSources[index];

        if (current.type === 'video') {
            if (heroImage) heroImage.classList.add('u-hidden');
            if (heroVideo) {
                heroVideo.classList.remove('u-hidden');
                heroVideo.src = current.src;
                heroVideo.load();
                heroVideo.play().catch(e => console.warn("Autoplay blocked:", e));
                heroVideo.onended = () => window.nextVideo();
            }
        } else {
            if (heroVideo) {
                heroVideo.pause();
                heroVideo.classList.add('u-hidden');
            }
            if (heroImage) {
                heroImage.classList.remove('u-hidden');
                heroImage.src = current.src;
            }
            autoTimer = setTimeout(() => {
                window.nextVideo();
            }, 5000);
        }
    };

    window.nextVideo = () => {
        currentIndex = (currentIndex + 1) % mediaSources.length;
        updateMedia(currentIndex);
    };

    window.prevVideo = () => {
        currentIndex = (currentIndex - 1 + mediaSources.length) % mediaSources.length;
        updateMedia(currentIndex);
    };

    if (heroVideo && heroImage) {
        updateMedia(0);
    }

    // --- 2. REVIEWS DATA RENDERING ---
    const reviewsData = [
        { initial: "B", name: "Bilal", text: "Bike bilkul new hogye meri! Matte Black ki quality aur quantity dono zabardast thin.", stars: 5, type: "video", src: "assets/videos/review_vid1.mp4" },
        { initial: "A", name: "Ahmed", text: "Quality is top class. Karachi ki garmi mein bhi matte finish solid hai.", stars: 5, type: "image", src: "assets/images/review1.webp" },
        { initial: "Z", name: "Zohaib", text: "Chrome Silver rims pe kiya, bilkul original look hai. Delivery fast thi.", stars: 5, type: "video", src: "assets/videos/review_vid2.mp4" },
        { initial: "K", name: "Kashif", text: "Price is very reasonable according to quality. Highly recommended.", stars: 5, type: "image", src: "assets/images/review2.jpg" }
    ];

    if (reviewsContainer) {
        reviewsContainer.innerHTML = '';
        reviewsData.forEach(review => {
            const reviewCard = document.createElement('div');
            reviewCard.className = "review-card";

            const mediaHtml = review.type === "video"
                ? `<div class="review-card__media">
                     <video autoplay muted loop playsinline class="review-card__media-video">
                       <source src="${review.src}" type="video/mp4">
                     </video>
                   </div>`
                : `<div class="review-card__media">
                     <img src="${review.src}" class="review-card__media-img" loading="lazy" alt="${review.name}'s review media">
                   </div>`;

            reviewCard.innerHTML = `
                <div class="review-card__avatar">${review.initial}</div>
                <div class="review-card__content">
                    <div class="review-card__header">
                        <span class="review-card__name">${review.name}</span>
                        <span class="review-card__badge">Verified Purchase</span>
                    </div>
                    <div class="review-card__rating">${"★".repeat(review.stars)}</div>
                    <p class="review-card__text">${review.text}</p>
                    ${mediaHtml}
                </div>
            `;
            reviewsContainer.appendChild(reviewCard);
        });
    }

    // --- 3. CONSTANTS ---
    const KIT_PRICE = "Rs. 1,195";

    // --- 4. MODAL ACTIONS ---
    window.openModal = () => {
        if (checkoutModal) {
            checkoutModal.classList.remove('u-hidden');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeModal = () => {
        if (checkoutModal) {
            checkoutModal.classList.add('u-hidden');
            document.body.style.overflow = 'auto';
        }
    };

    // Attach listeners
    if (orderBtn) orderBtn.addEventListener('click', window.openModal);
    if (navCartBtn) navCartBtn.addEventListener('click', window.openModal);

    // --- 5. WHATSAPP ORDER SUBMISSION ---
    window.sendOrder = () => {
        const name = inputName ? inputName.value.trim() : '';
        const phone = inputPhone ? inputPhone.value.trim() : '';
        const address = inputAddress ? inputAddress.value.trim() : '';

        if (!name || !phone || !address) {
            alert("Bhai, please provide your Name, WhatsApp Number and Karachi Address!");
            return;
        }

        const phoneNo = "923292280661";
        const msg = `*RANGSAAZ - NEW ORDER*%0A---%0A*Item:* Moto-Restore Kit (Black + Silver)%0A*Total:* ${KIT_PRICE}%0A---%0A*Customer:* ${name}%0A*Phone:* ${phone}%0A*Address:* ${address}%0A---%0A(Cash on Delivery - Karachi)`;

        window.open(`https://wa.me/${phoneNo}?text=${msg}`, '_blank');
    };
});

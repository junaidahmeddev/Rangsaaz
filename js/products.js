// Rangsaaz Product Shades Definition
const products = [
    { id: 1, name: "Matte Black", price: 699, oldPrice: 1199, code: "#121212", type: "Standard", best: true },
    { id: 2, name: "Glossy White", price: 699, oldPrice: 1199, code: "#FFFFFF", type: "Standard" },
    { id: 3, name: "Chrome Silver", price: 850, oldPrice: 1350, code: "#C0C0C0", type: "Premium" },
    { id: 4, name: "Brass Gold", price: 950, oldPrice: 1500, code: "#D4AF37", type: "Premium" },
    { id: 5, name: "Candy Red", price: 750, oldPrice: 1250, code: "#990000", type: "Standard" },
    { id: 6, name: "Electric Blue", price: 750, oldPrice: 1250, code: "#0000FF", type: "Standard" },
    { id: 7, name: "Gunmetal Grey", price: 850, oldPrice: 1350, code: "#555555", type: "Premium" },
    { id: 8, name: "Neon Orange", price: 750, oldPrice: 1250, code: "#FF5F1F", type: "Standard" }
];

// Expose globally for index/main script access
window.allProducts = products;
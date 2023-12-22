const apiEndpoint = "https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093";
let products = [];

async function fetchData() {
  try {
    const response = await fetch(apiEndpoint);
    const data = await response.json();
    products = data.data;
    renderProducts(products);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function renderProducts(products) {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    productCard.innerHTML = `
      <div class="badge">${product.product_badge}</div>
      <img src="${product.product_image}" alt="${product.product_title}">
      <h3>${product.product_title}</h3>
      <div class="variants">
        ${product.product_variants
          .map((variant) => `<span>${Object.values(variant)}</span>`)
          .join("")}
      </div>
    `;

    productList.appendChild(productCard);
  });
}

function switchLayout(layout) {
  const productList = document.getElementById("productList");
  productList.className = layout === "grid" ? "grid-view" : "";
}

document.getElementById("searchInput").addEventListener("input", function () {
  const searchKey = this.value.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.product_title.toLowerCase().includes(searchKey)
  );
  renderProducts(filteredProducts);
});

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

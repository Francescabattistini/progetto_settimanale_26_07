const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzOTJhY2YyNjBjYzAwMTVjYzBlY2IiLCJpYXQiOjE3MjE5OTU5NDgsImV4cCI6MTcyMzIwNTU0OH0.8IZeXaFmpHRB_N7REWnWtrgXEyPpr10LzDBUHyY1OV8";

const params = new URLSearchParams(window.location.search);
const id = params.get("productId");

const cardSpace = document.getElementById("card-space");

window.addEventListener("DOMContentLoaded", () => {
  const img = document.getElementById("product-img");
  const prodName = document.getElementById("head-title");
  const shop = document.getElementById("shop");
  const des = document.getElementById("description");
  const prodPrice = document.getElementById("price");
  const backBtn = document.getElementById("back");

  backBtn.onclick = () => {
    window.location.replace("./index.html");
  };

  const url = "https://striveschool-api.herokuapp.com/api/product/" + id;

  fetch(url, {
    headers: {
      Authorization: apiKey,
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw resp.status;
      }
    })
    .then((product) => {
      const { name, description, brand, imageUrl, price } = product;
      img.src = imageUrl;
      img.alt = name;
      prodName.innerText = name;
      shop.innerText = brand;
      des.innerText = description;
      prodPrice.innerText = price + "€";
    })
    .catch((err) => {
      const headTitle = document.getElementById("head-title");
      headTitle.classList.add("d-none");

      cardSpace.innerHTML = "";

      const src = "https://http.cat/" + err;
      const img = document.createElement("img");
      img.src = src;
      img.className = "col-12 col-lg-8 col-xl-6";

      cardSpace.classList.add("justify-content-center");
      cardSpace.appendChild(img);
    });
});

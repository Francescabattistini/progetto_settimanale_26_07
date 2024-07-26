const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzOTJhY2YyNjBjYzAwMTVjYzBlY2IiLCJpYXQiOjE3MjE5OTU5NDgsImV4cCI6MTcyMzIwNTU0OH0.8IZeXaFmpHRB_N7REWnWtrgXEyPpr10LzDBUHyY1OV8";

const modal = document.getElementById("errorModal");
const cardSpace = document.getElementById("card-space");

const singleCardGen = (id, name, brand, image, price) => {
  const col = document.createElement("div");
  col.className = "col-md-6 col-xl-4";

  const card = document.createElement("div");
  card.className = "card mb-4 shadow-sm";

  const img = document.createElement("img");
  img.src = image;
  img.alt = name;
  img.className = "card-img-top p-2 p-xl-3";
  img.setAttribute("role", "button");

  img.onclick = function () {
    window.location.replace("/details.html?productId=" + id);
  };

  const body = document.createElement("div");
  body.className = "card-body";

  const h5 = document.createElement("h5");
  h5.className = "card-title pointer line-clamp h4";
  h5.innerText = name;
  h5.setAttribute("role", "button");
  h5.onclick = function () {
    window.location.replace("/details.html?productId=" + id);
  };

  const shop = document.createElement("p");
  shop.className = "card-text h6";
  shop.innerText = brand;

  const flexContainer = document.createElement("div");
  flexContainer.className = "d-flex justify-content-between align-items-center";

  const btnGroup = document.createElement("div");
  btnGroup.className = "btn-group";

  const editBtn = document.createElement("button");
  editBtn.className = "btn btn-sm btn-outline-secondary";
  editBtn.innerText = "Edit";
  editBtn.type = "button";
  editBtn.onclick = () => {
    window.location.replace("/back-office.html?productId=" + id);
  };

  const small = document.createElement("small");
  small.className = "text-muted";
  small.innerText = price + "€";

  btnGroup.append(editBtn);
  flexContainer.append(btnGroup, small);
  body.append(h5, shop, flexContainer);
  card.append(img, body);
  col.append(card);
  cardSpace.append(col);
};

const get = (url) => {
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
    .then((products) => {
      const spinner = document.getElementById("spinner");
      spinner.classList.add("d-none");
      products.forEach((product) => {
        const { _id, name, brand, imageUrl, price } = product;
        singleCardGen(_id, name, brand, imageUrl, price);
      });
    })
    .catch((err) => {
      const spinner = document.getElementById("spinner");
      spinner.classList.add("d-none");

      const headTitle = document.getElementById("head-title");
      headTitle.classList.add("d-none");

      const src = "https://http.cat/" + err;
      const img = document.createElement("img");
      img.src = src;
      img.className = "col-12 col-lg-8 col-xl-6";

      cardSpace.classList.add("justify-content-center");
      cardSpace.appendChild(img);
    });
};

const cardGen = () => {
  const url = "https://striveschool-api.herokuapp.com/api/product/";
  get(url);
};

window.addEventListener("DOMContentLoaded", cardGen);

import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const container = document.querySelector(".gallery");

container.insertAdjacentHTML("afterbegin", createMarkup(galleryItems));
container.addEventListener("click", modalRun);

function createMarkup(arr) {
  return arr
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`
    )
    .join("");
}

function modalRun(evt) {
  evt.preventDefault();
  if (evt.target === evt.currentTarget) {
    return;
  }
  // const currentImg = evt.target.closest(".gallery__item");
  const currentImgUrl = evt.target.dataset.source;
  const description = evt.target.alt;
  const instance = basicLightbox.create(
    `<div class="modal">
     <img
     src="${currentImgUrl}"
      alt="${description}"
     />
</div>`,
    {
      onShow: (instance) => {
        window.addEventListener("keydown", escPress);
      },
      onClose: (instance) => {
        window.removeEventListener("keydown", escPress);
      },
    }
  );

  instance.show();

  function escPress(evt) {
    const escCode = "Escape";
    const isItEsc = evt.code === escCode;
    if (!isItEsc) return;
    instance.close();
  }
}

const allImages = document.querySelectorAll(".gallery img");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const filterBtns = document.querySelectorAll(".filters button");

let currentIndex = 0;
let visibleImages = [];

// lightbox open
function openLightbox(index) {
  lightbox.style.display = "flex";
  currentIndex = index;
  lightboxImg.src = visibleImages[currentIndex].src;
}

// image click
function attachImageClicks() {
  visibleImages.forEach((img, index) => {
    img.onclick = () => openLightbox(index);
  });
}

// inital state
visibleImages = [...allImages];
attachImageClicks();

// close
closeBtn.onclick = () => (lightbox.style.display = "none");

// next and prev
nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % visibleImages.length;
  lightboxImg.src = visibleImages[currentIndex].src;
};

prevBtn.onclick = () => {
  currentIndex =
    (currentIndex - 1 + visibleImages.length) % visibleImages.length;
  lightboxImg.src = visibleImages[currentIndex].src;
};

// filter btns

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".filters .active").classList.remove("active");
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    visibleImages = [];

    allImages.forEach((img) => {
      if (filter === "all" || img.dataset.category === filter) {
        img.style.display = "block";
        visibleImages.push(img);
      } else {
        img.style.display = "none";
      }
    });

    attachImageClicks();
  });
});

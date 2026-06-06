function openModal(img) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  modal.style.display = "flex";
  if(typeof img === "string") {
    modalImg.src = "./src/img/" + img;
  }
  else {
    modalImg.src = "./src/img/" + img.srcElement.alt;
  }
}

function closeModal() {
  document.getElementById("imageModal").style.display = "none";
}
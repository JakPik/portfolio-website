function constructCarousel(images) {
    const container = document.createElement('div')
    container.classList.add("container")

    const carousel = document.createElement('div')
    carousel.classList.add("carousel")
    carousel.dataset.slides = images.length
    carousel.dataset.currentIndex = 0

    const carousel_track = document.createElement('div')
    carousel_track.classList.add("carousel-track")
    images.forEach(img => {
        const image = BuildImage(img, 150)
        carousel_track.appendChild(image)
    })

    const prev_b = document.createElement('button')
    prev_b.classList.add("prev")
    prev_b.textContent = "<"
    prev_b.onclick = () => { spinCarousel(-1, carousel); };
    const next_b = document.createElement('button')
    next_b.classList.add("next")
    next_b.textContent = ">"
    next_b.onclick = () => { spinCarousel(1, carousel); };

    carousel.appendChild(carousel_track)
    if(images.length > 1) { container.appendChild(prev_b) }
    container.appendChild(carousel)
    if(images.length > 1) { container.appendChild(next_b) }
    carousel_track.children[0].onload = () => {
            var h = 150;
            const width = +carousel_track.children[0].width / ( +carousel_track.children[0].height / +h);
            carousel.style.width = +carousel_track.children[0].width + 'px';
        };
    return container
}

function spinCarousel(offset, carousel) {
    const totalSlides = +carousel.dataset.slides;
    let currentIndex = +carousel.dataset.currentIndex;
    let num = (currentIndex + offset + totalSlides) % totalSlides;
    carousel.dataset.currentIndex = num;
    updateCarousel(carousel);
}

function updateCarousel(carousel) {
  
  const track = carousel.getElementsByClassName('carousel-track')[0];
  const curIdx = +carousel.dataset.currentIndex;
  let width = 0;
  for(let i = 0; i < curIdx; i++) {
    width += track.children[i].clientWidth;
  }
  
  carousel.style.width = track.children[curIdx].clientWidth + 'px';
  track.style.transform = `translateX(-${width}px)`;
}
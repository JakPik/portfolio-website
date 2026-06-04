const proj = `{
    "projects": [
        {
            "title": "Digital D&D Character Sheet",
            "tags": [
                "SOFTWARE_DEV", "UI_UX", "ACADEMIC"
            ],
            "description": ["Lorem ipsu", "m dolor sit amet,"," consectetur adipiscing elit.Sed do"," eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem"," ips","um dolor, sit amet consectetur adipisicing elit. Optio eos placeat distinctio sunt repellat illo, molestias non eveniet animi voluptatem fuga aspernatur. Velit in dolorum ex, quia eos nisi? Fugiat. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste cupiditate rem commodi culpa, enim, ullam neque animi, dicta aperiam facere eveniet sit! Velit architecto voluptas sunt, porro deleniti distinctio et! Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime rerum dolorum voluptatum, fugit dolore eos praesentium obcaecati. Sit vero harum tempora accusamus ab dignissimos, veniam repudiandae ut, nobis nemo maxime. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere quisquam dolor laborum amet nesciunt impedit quis labore accusantium, eveniet, quam ratione nihil ab? Hic illo porro repudiandae voluptatem"," nemo voluptatibus?"],
            "images": ["SOFTWARE_DEV", "UI_UX", "ACADEMIC"],
            "page": "page url",
            "src": {
                "button_label": "Project on Github",
                "button_url": ""
            }
        },
        {
            "title": "Indimensiana Jones",
            "tags": [
                "GAME_DEV", "GAME_DESIGN", "LEVEL_DESIGN", "ACADEMIC"
            ],
            "description": "Long text",
            "images": ["url1", "url2"],
            "page": "page url",
            "src": {
                "button_label": "",
                "button_url": ""
            }
        },
        {
            "title": "Electrician",
            "tags": [
                "GAME_DEV", "GAME_DESIGN", "EDUCATION", "ACADEMIC"
            ],
            "description": "Long text",
            "images": ["url1", "url2"],
            "page": "page url",
            "src": {
                "button_label": "",
                "button_url": ""
            }
        },
        {
            "title": "D&D Ranger Beast Master rework",
            "tags": [
                "TABLETOP", "GAME_DESIGN", "WORLD_BUILDING"
            ],
            "description": "Long text",
            "images": ["url1", "url2"],
            "page": "page url",
            "src": {
                "button_label": null,
                "button_url": "test"
            }
        },
        {
            "title": "Worldbuilding project",
            "tags": [
                "WORLD_BUILDING", "TABLETOP"
            ],
            "description": "Long text",
            "images": ["url1", "url2"],
            "page": "page url",
            "src": {
                "button_label": null,
                "button_url": "test"
            }
        },
        {
            "title": "Geometry Dash level - Reborn",
            "tags": [
                "LEVEL_DESIGN", "GAME_DESIGN"
            ],
            "description": "Long text",
            "images": ["url1", "url2"],
            "page": "page url",
            "src": {
                "button_label": null,
                "button_url": "test"
            }
        },
        {
            "title": "Android Workout Log App",
            "tags": [
                "SOFTWARE_DEV", "UI_UX", "ACADEMIC"
            ],
            "description": "Long text",
            "images": ["url1", "url2"],
            "page": "page url",
            "src": {
                "button_label": null,
                "button_url": "test"
            }
        },
        {
            "title": "Arima",
            "tags": [
                "GAME_DEV", "SOFTWARE_DEV", "GAME_DESIGN", "ACADEMIC"
            ],
            "description": "Long text",
            "images": ["url1", "url2"],
            "page": "page url",
            "src": {
                "button_label": null,
                "button_url": "test"
            }
        },
        {
            "title": "GitHub Markdown D&D web viewer",
            "tags": [
                "TOOLING", "SOFTWARE_DEV", "WORLD_BUILDING", "TABLETOP"
            ],
            "description": "Long text",
            "images": ["url1", "url2"],
            "page": "page url",
            "src": {
                "button_label": null,
                "button_url": "test"
            }
        }
    ]
}`

const FILTERS = {
  ALL: "All",
  GAME: "Game Projects",
  SOFTWARE: "Software Projects",
  TABLETOP: "Tabletop Design",
  ART: "3D Art & Assets",
  ACADEMIC: "Academic Work"
}

const FILTER_TAGS = {
  GAME: [
    "GAME_DEV",
    "GAME_DESIGN",
    "LEVEL_DESIGN",
    "EDUCATION"
  ],

  SOFTWARE: [
    "SOFTWARE_DEV",
    "TOOLING",
    "UI_UX"
  ],

  TABLETOP: [
    "TABLETOP",
    "WORLD_BUILDING"
  ],

  ART: [
    "TD_ART"
  ],

  ACADEMIC: [
    "ACADEMIC"
  ]
}

const TAGS = {
  GAME_DEV: "Game Development",
  GAME_DESIGN: "Game Design",
  LEVEL_DESIGN: "Level Design",

  SOFTWARE_DEV: "Software Development",
  TOOLING: "Software Tools / Apps",

  UI_UX: "UI / UX Design",

  TD_ART: "3D Art / Assets",

  TABLETOP: "Tabletop / Game Systems Design",

  EDUCATION: "Educational Games",

  WORLD_BUILDING: "Worldbuilding / Narrative",

  ACADEMIC: "Academic Work"
};

let proj_json = JSON.parse(proj)

let cur_tag = ""
let cur_button


function buildCarousel(images, height) {
    const div = document.createElement('div');
    div.className = 'container';
    const carousel = document.createElement('div');
    carousel.dataset.currentIndex = 0;
    const num = +images.length;
    carousel.dataset.slides = num;
    carousel.className = 'carousel';
    const buttonPrev = document.createElement('button');
    buttonPrev.className = 'prev';
    buttonPrev.textContent = '<';
    buttonPrev.onclick = () => { spinCarousel(-1, carousel); };
    const buttonNext = document.createElement('button');
    buttonNext.className = 'next';
    buttonNext.textContent = '>';
    buttonNext.onclick = () => { spinCarousel(1, carousel); };
    const imgContainer = document.createElement('div');
    imgContainer.className = 'carousel-track';
    for(let i = 0; i < num; i++) {
        imgContainer.appendChild(BuildImage(images[i], height));
    }
    div.appendChild(buttonPrev);
    carousel.appendChild(imgContainer);
    div.appendChild(carousel);
    div.appendChild(buttonNext);

    imgContainer.children[0].onload = () => {
            var h = 300;
            if(height != undefined) {
                h = height.trim().endsWith("px") ? +height.trim().slice(0, -2) : 300;
                h = h==0 ? 300 : h;
            }
            const width = +imgContainer.children[0].width / ( +imgContainer.children[0].height / +h);
            imgContainer.style.width = width + 'px';
            //document.getElementsByClassName('carousel')[0].style.width = width + 'px';
        };
    return div;
}

function constructTags(list) {
    const tags = document.createElement('div')
        tags.classList.add("tags")
        list.forEach(tag_label => {
            const tag = document.createElement('span')
            tag.classList.add("tag")
            tag.textContent = TAGS[tag_label]
            tags.appendChild(tag)
        })
    return tags
}

function constructCarousel(images) {
    const container = document.createElement('div')
    container.classList.add("container")
    const carousel = document.createElement('div')
    carousel.classList.add("carousel")
    const carousel_track = document.createElement('div')
    carousel_track.classList.add("carousel_track")
    images.forEach(img => {
        const image = document.createElement('img')
        image.src = img
        image.alt = img
        carousel_track.appendChild(image)
    })

    const prev_b = document.createElement('button')
    prev_b.classList.add("prev")
    prev_b.textContent = "<"
    const next_b = document.createElement('button')
    next_b.classList.add("next")
    next_b.textContent = ">"

    carousel.appendChild(carousel_track)
    container.appendChild(prev_b)
    container.appendChild(carousel)
    container.appendChild(next_b)
    return container
}

function constructLinks(element) {
    const links = document.createElement('div')
    links.classList.add("links")
    if(element.src.button_url != null) {
        const link1 = document.createElement('a')
        link1.href = element.src.button_url
        link1.target = "_blank"
        link1.textContent = element.src.button_label
        links.appendChild(link1)
    }

    const link2 = document.createElement('a')
    link2.href = element.page
    link2.textContent = "View more"
    
    links.appendChild(link2)
    return links
}

function loadProjects(tag, button) {
    if(cur_tag == tag) return
    cur_tag = tag
    if(cur_button == null) {cur_button = button}
    else {cur_button.classList.remove("selected")}
    cur_button = button
    cur_button.classList.add("selected")
    const content = document.querySelector('.content')
    content.classList.add("hidden")
    content.innerHTML = "";
    let delay = 100;
    proj_json.projects.forEach(element => {
        if(tag == "ALL" || element.tags.some(_tag => FILTER_TAGS[tag].includes(_tag))) {
            const card = document.createElement('article')
            card.classList.add("card", "hidden")

            const header = document.createElement('div')
            header.classList.add("header")

            const heading = document.createElement('div')

            const title = document.createElement('h2')
            title.textContent = element.title

            heading.appendChild(title)
            heading.appendChild(constructTags(element.tags))

            const container = constructCarousel(element.images)

            header.appendChild(heading)
            header.appendChild(container)

            const divider = document.createElement('div')
            divider.classList.add("divider")

            const text = document.createElement('p')
            text.textContent = element.description

            const links = constructLinks(element)

            card.appendChild(header)
            card.appendChild(divider)
            card.appendChild(text)
            card.appendChild(links)

            content.appendChild(card)
            content.classList.remove("hidden")
            setTimeout(() => {
                card.classList.remove("hidden");
            }, delay);

            delay += 200;
        }
    });
}

async function loadJson() {
try {
    const rest = await fetch("./json/projects.json")
  .then(res => res.json())
  .then(data => {
    proj_json = data
  })
  }
catch {
    console.log("Can not load projects.json")
}
loadProjects("ALL", document.querySelector('.selected'))
}

loadJson


/*import * as CONSTANTS from "./constants.js"
import {constructCarousel} from "./carousel.js"
import {proj} from "./localJSON.js"*/

let proj_json = JSON.parse(proj)

let cur_tag = ""
let cur_button

let card_ref = []


function constructTags(list) {
    const tags = document.createElement('div')
        tags.classList.add("tags")
        list.forEach(tag_label => {
            const tag = document.createElement('span')
            tag.classList.add("tag")
            tag.textContent = /*CONSTANTS.*/TAGS[tag_label]
            tags.appendChild(tag)
        })
    return tags
}

function constructLinks(element) {
    const links = document.createElement('div')
    links.classList.add("links")
    if(element.src != null) {
        const link1 = document.createElement('a')
        link1.href = element.src.button_url
        link1.target = "_blank"
        link1.textContent = URL_LABELS[element.src.button_label]
        links.appendChild(link1)
    }

    if(element.page != null) {
        const link2 = document.createElement('a')
        link2.href = element.page
        link2.textContent = "View more"
        links.appendChild(link2)
    }
    return links
}

async function loadProjects(tag, button) {
    if(cur_tag == tag) return
    cur_tag = tag
    
    if(cur_button != null) {cur_button.classList.remove("selected")}
    cur_button = button
    cur_button.classList.add("selected")

    const content = document.querySelector('.content')
    let delay = 100;
    content.classList.add("hidden")

    card_ref.forEach(card => { card.ref.classList.add("hidden")})

    await wait(500)
    card_ref.forEach(card => { card.ref.classList.add("notDisplayed")})
    await wait(500)

    card_ref.forEach(card => {
        if(tag == "ALL" || card.tags.some(_tag => /*CONSTANTS.*/FILTER_TAGS[tag].includes(_tag))) {
            card.ref.classList.remove("notDisplayed");
            setTimeout(() => {
                card.ref.classList.remove("hidden");
            }, delay);
            delay += 300;
        }
    })
    content.classList.remove("hidden")
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}   


init()

async function init() {
    try {
        const rest = await fetch("./src/json/projects.json")
        .then(res => res.json())
        .then(data => {
            proj_json = data
        })
    }
    catch {
        console.log("Can not load projects.json")
    }
    cur_tag = "ALL"
    cur_button = document.querySelector('.content_layout button.selected')

    const content = document.querySelector('.content')
    content.classList.add("hidden")
    content.innerHTML = "";

    let delay = 100;
    const cards = Array(10).fill(null)
    let ids = 0
    proj_json.projects.forEach(async (element) => {
        try {
            const id = ids
            ids++
            const rest = await fetch("./src/json/projects/" + element + ".json")
            .then(res => res.json())
            .then(_data => {
                const data = _data
                const card = cardBuilder(data)

                cards[id] = card


            })
        }
        catch {
            const card = cardBuilder(element)

            content.appendChild(card)
            content.classList.remove("hidden")
            setTimeout(() => {
                card.classList.remove("hidden");
            }, delay);

            delay += 300;
            return;
        }
    });
    cards.forEach(card => {
            content.appendChild(card)
            content.classList.remove("hidden")
            setTimeout(() => {
                card.classList.remove("hidden");
            }, delay);

            delay += 300;
        })
}

function cardBuilder(element) {
    const card = document.createElement('article')
    card.classList.add("card", "hidden")

    const header = document.createElement('div')
    header.classList.add("header")

    const heading = document.createElement('div')

    const title = document.createElement('h2')
    title.textContent = element.title

    heading.appendChild(title)
    heading.appendChild(constructTags(element.tags))

    header.appendChild(heading)


    if(element.images.length > 0) {
        const carousel = constructCarousel(element.images)
        header.appendChild(carousel)
    }

    const divider = document.createElement('div')
    divider.classList.add("divider")

    const text = document.createElement('p')
    let text_field = ""
    try {
        element.description.forEach(sentance => {
            text_field += sentance
    })
    }
    catch {
        text_field = element.description
    }
    text.textContent = text_field

    const links = constructLinks(element)

    card.appendChild(header)
    card.appendChild(divider)
    card.appendChild(text)
    card.appendChild(links)

    card_ref.push({
        ref: card,
        tags: element.tags
    })
    return card
}
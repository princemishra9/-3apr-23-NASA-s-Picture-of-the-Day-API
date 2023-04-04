const main_Container = document.getElementById("main-image-container")
const search_Form = document.querySelector("#search-form")
const img_Container = document.getElementById("current-image-container")
const history = document.getElementById("search-history")
const input_Date = document.getElementById("search-input")
const header = document.getElementById('header')


let currentDate = new Date().toISOString().split("T")[0]

const imagee = document.createElement("img")
const titleheader = document.createElement("h3")
const description = document.createElement("p")

window.addEventListener("load", () => {
    // header of html page
    header.textContent = `NASA Picture of The Day`
    getCurrentImageOfTheDay()
})

async function getCurrentImageOfTheDay() {
    try {
        // fetching data
        const response = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=C69f7BH1LmhBm879s3dhajUu5sWCsLfWIBEXuJxN&date=${currentDate}`
        )
        const data = await response.json()
        console.log(data)

        // as per date  changes image updates
        const imgUrl = data?.url
   
        imagee.src = imgUrl
        imagee.classList.add("image")
        main_Container.appendChild(imagee)

        //as per date  changes title updates
        const title = data?.title
        titleheader.textContent = title
        img_Container.appendChild(titleheader)

        //as per date  changes content updates
        const para = data?.explanation
        description.textContent = para
        img_Container.appendChild(description)

        main_Container.appendChild(img_Container)
    } catch (error) {
        console.log("Error>>>> hai broo  " + error)
    }
}

search_Form.addEventListener("submit", (event) => {
    event.preventDefault()

    // const input_Date = search_Form.elements["search-input"]
    if (input_Date.value) {
        const selectedDate = new Date(input_Date.value)
        currentDate = selectedDate.toISOString().split("T")[0]
        header.textContent = `Picture of The Day For ${currentDate}`
        getImageOfTheDay()
        saveSearch()
        addSearchToHistory()
    }
})
// fetching a Data from API
async function getImageOfTheDay() {
   
    const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=C69f7BH1LmhBm879s3dhajUu5sWCsLfWIBEXuJxN&date=${currentDate}`
    )
    const data = await response.json()
    console.log(data)

    //------------------------ updating image on UI-----------------------
    const imgUrl = data?.url
    // console.log(imgUrl)

    imagee.src = imgUrl
    imagee.classList.add("image")
    main_Container.appendChild(imagee)

    // ---------------updating title------------------------------
    const title = data?.title

    titleheader.textContent = title
    img_Container.appendChild(titleheader)

    //---------------------------- updating content on UI-------------------------------
    const para = data?.explanation

    description.textContent = para
    img_Container.appendChild(description)

    main_Container.appendChild(img_Container)
}
// saving searchData in localstorage and UI------------------------
function saveSearch() {
    let DateArr = []
    DateArr.push(currentDate)
    localStorage.setItem(`Date ${DateArr.length}`, currentDate)
}

function addSearchToHistory() {

    const a = document.createElement("a")
    a.href = ''
    const li = document.createElement("li")
    li.textContent = currentDate;
    a.appendChild(li)
    history.appendChild(a)
// to avoid a data remove while refreshing it  
    a.addEventListener("click", (e) => {
        e.preventDefault()
        currentDate = li.textContent
        header.textContent = `Picture of The Day For ${currentDate}`;
        getImageOfTheDay();
    });
}
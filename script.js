
var f;
async function getCurrentImageOfTheDay() {
    
    const d = new Date();
    const val = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    console.log("vale ",val)
    
    try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=fRmh6Ra2cnoNlB9L4xiCgZZJQAUbPK5jRbDYWhBC&date=${val}`);
        const jsonData = await response.json();
        f=jsonData;
        console.log("jsonData", jsonData);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    
                const ele= document.getElementById('image');
                    const img = document.createElement('img');
                    img.classList.add('imgclass');
                    console.log("here before f")
                    const imgsrc = f.url;
                    console.log(imgsrc);
                    console.log('hello')
                    img.setAttribute('src',imgsrc);
                    ele.appendChild(img);
                
                    const h1 = document.createElement('h1');
                    h1.classList.add('h1');
                    h1.innerHTML = `${f.title}`
                    ele.appendChild(h1);

                    const p = document.createElement('p');
                    p.classList.add('para');
                    p.innerHTML = `${f.explanation}`
                    ele.appendChild(p);

   
}

async function getImageOfTheDay(date) {
    try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=fRmh6Ra2cnoNlB9L4xiCgZZJQAUbPK5jRbDYWhBC&date=${date}`);
        const data = await response.json();

        const imageContainer = document.getElementById('image');
        imageContainer.innerHTML = ''; // Clear previous content
        const cg=document.getElementById('chn');
        cg.innerHTML = `Picture on ${data.date}`;

        const img = document.createElement('img');
        img.classList.add('imgclass');
        img.setAttribute('src', data.url);
        imageContainer.appendChild(img);

        const title = document.createElement('h1');
        title.classList.add('h1');
        title.innerHTML = data.title;
        imageContainer.appendChild(title);

        const explanation = document.createElement('p');
        explanation.classList.add('para');
        explanation.innerHTML = data.explanation;
        imageContainer.appendChild(explanation);
        return data;
    } catch (error) {
        console.error('Error fetching APOD:', error);
    }
}

// function addSearchToHistory() {
//     const historyContainer = document.getElementById('search-history');
//     // Retrieve saved search dates from local storage
//     const savedDates = Object.keys(localStorage);
    
//     historyContainer.innerHTML="";
//     // Display search history as an unordered list in the UI
//     savedDates.forEach(date => {
       
//         const listItem = document.createElement('li');
//         const anchorTag = document.createElement('a');
//         anchorTag.textContent = date;
//         anchorTag.href = '#';
//         listItem.appendChild(anchorTag);
//         listItem.style.type = 'none';
//         listItem.classList.add('history-item');
//         historyContainer.appendChild(listItem); // Prepend the list item
//         // Handle click event on search history list items
//         anchorTag.addEventListener('click', async (event) => {
//             event.preventDefault();
//             const selectedDate = anchorTag.textContent;
//             const data = JSON.parse(localStorage.getItem(selectedDate));
//             displayImageData(data);
//         });
//     });
// }


function addSearchToHistory() {
    const historyContainer = document.getElementById('search-history');
    historyContainer.innerHTML = ''; 


    
  
    const savedDates = Object.keys(localStorage);
    savedDates.forEach(date => {
        const listItem = document.createElement('li');
        const anchorTag = document.createElement('a');
        anchorTag.textContent = date;
        anchorTag.href = '#';
        listItem.appendChild(anchorTag);
        listItem.style.type = 'none';
        listItem.classList.add('history-item');
        historyContainer.appendChild(listItem);

        // Handle click event on search history list items
        anchorTag.addEventListener('click', async (event) => {
            event.preventDefault();
            const selectedDate = anchorTag.textContent;
            const data = JSON.parse(localStorage.getItem(selectedDate));
            displayImageData(data);
        });
    });
}



function displayImageData(data) {
    const imageContainer = document.getElementById('image');
    imageContainer.innerHTML = ''; // Clear previous content

    const cg=document.getElementById('chn');
    cg.innerHTML = `Picture on ${data.date}`;

    const img = document.createElement('img');
    img.classList.add('imgclass');
    img.setAttribute('src', data.url);
    imageContainer.appendChild(img);

    const title = document.createElement('h1');
    title.classList.add('h1');
    title.innerHTML = data.title;
    imageContainer.appendChild(title);

    const explanation = document.createElement('p');
    explanation.classList.add('para');
    explanation.innerHTML = data.explanation;
    imageContainer.appendChild(explanation);
}

document.addEventListener('DOMContentLoaded',()=>{
    localStorage.clear();
    let savedSearchh = [];
    getCurrentImageOfTheDay();
    
    document.getElementById('btn').addEventListener('click',async(e)=>{
        e.preventDefault();
        const d = document.getElementById('date');
        console.log(d.value);
        const data1 = await getImageOfTheDay(d.value);
        saveSearch(data1);

        function saveSearch(date) {

            localStorage.setItem(`${date.date}`, JSON.stringify(date));
            console.log("data ",localStorage.getItem(date.date));
            savedSearchh.push(date); 

            addSearchToHistory();
        }
        
    })

})
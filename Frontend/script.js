/* BOOK DATA */

const books = [
{
 title:"JavaScript Basics",
 category:"Programming",
 img:"https://images.unsplash.com/photo-1512820790803-83ca734da794"
},
{
 title:"React Guide",
 category:"Programming",
 img:"https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
},
{
 title:"Clean Code",
 category:"Programming",
 img:"https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
},
{
 title:"Node.js Guide",
 category:"Programming",
 img:"https://images.unsplash.com/photo-1524578271613-d550eacf6090"
},
{
 title:"Motivation Book",
 category:"Motivation",
 img:"https://images.unsplash.com/photo-1519681393784-d120267933ba"
},
{
 title:"Science World",
 category:"Science",
 img:"https://images.unsplash.com/photo-1507842217343-583bb7270b66"
}
]

/* ELEMENTS */

const grid = document.getElementById("bookGrid")
const searchInput = document.getElementById("searchInput")
const suggestionsBox = document.getElementById("suggestions")

/* DISPLAY BOOKS */

function displayBooks(bookList){

 grid.innerHTML=""

 bookList.forEach(book=>{

 const card=document.createElement("div")
 card.className="book-card"

 card.innerHTML=`

 <img src="${book.img}">

 <div class="book-info">
 <h3>${book.title}</h3>
 <p>${book.category}</p>
 </div>

 <div class="book-actions">
 <button class="read-btn" onclick="openBook()">Read</button>
 <span class="favorite" onclick="toggleFavorite(this)">🤍</span>
 </div>

 `

 grid.appendChild(card)

 })

}

displayBooks(books)

/* SEARCH FILTER */

searchInput.addEventListener("input",()=>{

 const value = searchInput.value.toLowerCase()

 const filtered = books.filter(book =>
 book.title.toLowerCase().includes(value)
 )

 displayBooks(filtered)

 showSuggestions(value)

})

/* SEARCH SUGGESTIONS */

function showSuggestions(value){

 suggestionsBox.innerHTML=""

 if(value===""){
  suggestionsBox.style.display="none"
  return
 }

 const filtered = books.filter(book =>
 book.title.toLowerCase().includes(value)
 )

 filtered.forEach(book=>{

 const div=document.createElement("div")
 div.className="suggestion-item"
 div.textContent=book.title

 div.onclick=()=>{
  searchInput.value=book.title
  suggestionsBox.style.display="none"
  displayBooks([book])
 }

 suggestionsBox.appendChild(div)

 })

 suggestionsBox.style.display="block"

}

/* CATEGORY FILTER */

const categories = document.querySelectorAll(".category")

categories.forEach(cat=>{

 cat.addEventListener("click",()=>{

 const selected = cat.dataset.category

 const filtered = books.filter(book =>
 book.category === selected
 )

 displayBooks(filtered)

 })

})

/* OPEN BOOK */

function openBook(){
 window.location.href="reader.html"
}

/* FAVORITE BUTTON */

function toggleFavorite(el){
 el.textContent = el.textContent==="🤍" ? "❤️" : "🤍"
}

/* DARK MODE */

const toggle=document.getElementById("darkToggle")

toggle.onclick=()=>{
 document.body.classList.toggle("dark")
}
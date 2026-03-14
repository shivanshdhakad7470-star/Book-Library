const form = document.getElementById("bookForm")

form.addEventListener("submit", async (e)=>{

e.preventDefault()

const formData = new FormData()

formData.append("title", document.getElementById("title").value)
formData.append("author", document.getElementById("author").value)
formData.append("category", document.getElementById("category").value)

formData.append("coverImage", document.getElementById("coverImage").files[0])
formData.append("pdfFile", document.getElementById("pdfFile").files[0])

try{

const res = await fetch("http://localhost:5000/api/books",{
method:"POST",
body:formData
})

const data = await res.json()

alert("Book Uploaded Successfully")

form.reset()

}catch(err){

console.log(err)
alert("Upload Failed")

}

})
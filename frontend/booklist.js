window.addEventListener('load', async() => {

if(localStorage.getItem("tokenid")){
    const token = localStorage.getItem("tokenid")

      const response = await fetch("http://localhost:3000/books", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
          }
      }).then(res => res.json())

      const bookList = document.getElementById('booktable')
       let data = response.books
      console.log(response)
    
  
          // Loop through each book in the "books" array and create a table row with the book details
  
          response.forEach((book) => {
  
            const row = bookList.insertRow();
  
            row.innerHTML = `
  
              <td>${book.title}</td>
  
              <td>${book.author}</td>
  
              <td>${book.genre}</td>
  
              <td>${book.price}</td>
            `;
          });

  
  }
  else{
    console.log("error: token id not found")
  }

})
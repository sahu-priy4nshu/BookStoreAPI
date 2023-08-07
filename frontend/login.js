const temp=document.getElementById("login-form");

if(temp){
temp.addEventListener("submit", async function(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;


  if(!localStorage.getItem("tokenid")){

  try {
    const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    }).then(res => res.json())

    const token = response.token
    localStorage.setItem("tokenid",token);
    

  } catch (error) {
      console.error("Error during login:", error);
  }
  redirect()
}

else{
  redirect()
  
}
})

function redirect(){
  window.location.href = "bookList.html"
}
}


document.addEventListener("DOMContentLoaded", function() {
    let addbtn = document.querySelector(".add");
    let regform = document.getElementById("registration");
    let bgblack = document.querySelector(".overlay");
    let cancelbtn = document.getElementById("reset")
    let form = document.getElementById("overall_form");
    let submit = document.getElementById("submit");
    let registration = document.getElementById("registration")

    const firstname = document.getElementById("fname");
    const lastname = document.getElementById("lname");
    const fathername=document.getElementById("faname");
   const gender = document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : '';
    const dob = document.getElementById("dob");
     const age = document.getElementById("age");
    const email = document.getElementById("email");
    const qualification = document.getElementById("qualification");
  

    addbtn.addEventListener("click", function() {
        regform.style.display = "block";
        bgblack.style.display = "block";
    });

    

    cancelbtn.addEventListener("click", function()
{
      regform.style.display = "none"
      bgblack.style.display = "none"
});

   document.addEventListener("keydown", function(event){

    if(event.key == "Escape")
    {
        regform.style.display = "none"
      bgblack.style.display = "none" 
    }
   });

   submit.addEventListener("click", function()
{
    regform.style.display = "none"
    bgblack.style.display = "none"
});

submit.addEventListener("click", function(event) {
    event.preventDefault();

    if (!firstname.value || !lastname.value || !fathername.value || !dob.value || !age.value || !email.value || !qualification.value) {
        alert("Please fill all the required fields");
       
    }

  submit.addEventListener("click", function(event)
{

         event.preventDefault();

    const formData = {
        firstname: firstname.value,
        lastname: lastname.value,
        fathername: fathername.value,
        gender: gender ? gender.value : '',
        dob: dob.value,
        age: age.value,
        email: email.value,
        qualification: qualification.value
    };

    
    const formDataString = JSON.stringify(formData);

    localStorage.setItem('formData', formDataString);

    document.getElementById("form").addEventListener("submit", function(event)

    {
        event.preventDefault();
         if(firstname.vlaue ===""||lastname.value===""||fathername.value==="" || age.value === "" || emaillower ==="" || qualification ==="")
            {
            alert("Please fill the all fields");
                    
    
        }
          else if (!emaillower.checkValidity())
            {
                alert ("Please Enter valid Email")
                event.preventDefault();
            }
            else if (qualification==="")
                {
                    alert ("Please select the qualification")
                    event.preventDefault();
                }
    else{

    
    var div = document.createElement("div");
    div.setAttribute("class", "register-form");
    div.innerHTML = `
        <h3>User Info of ${firstname.value}</h3>
        <p>First Name: ${firstname.value}</p>
        <p>Last Name: ${lastname.value}</p>
        <p>Father's Name: ${fathername.value}</p>
        <p>Gender: ${gender ? gender.value : ''}</p>
        <p>DoB(YYYY/MM/DD): ${dob.value}</p>
        <p>Age: ${age.value}</p>
        <p>Email: ${email.value}</p>
        <p>Qualification: ${qualification.value}</p>
    `;
    document.body.appendChild(div);
}
    });
    // Hide the form and overlay
    regform.style.display = "none";
    bgblack.style.display = "none";
});

// Optional: Retrieve and display the stored data when the page loads
const storedDataString = localStorage.getItem('formData');
if (storedDataString) {
    const storedData = JSON.parse(storedDataString);
    var div = document.createElement("div");
    div.setAttribute("class", "register-form");
    div.innerHTML = `
        <h3>Stored User Info of ${storedData.firstname}</h3>
        <p>First Name: ${storedData.firstname}</p>
        <p>Last Name: ${storedData.lastname}</p>
        <p>Father's Name: ${storedData.fathername}</p>
        <p>Gender: ${storedData.gender}</p>
        <p>DoB(YYYY/MM/DD): ${storedData.dob}</p>
        <p>Age: ${storedData.age}</p>
        <p>Email: ${storedData.email}</p>
        <p>Qualification: ${storedData.qualification}</p>
    `;
    document.body.appendChild(div);
}
});

});
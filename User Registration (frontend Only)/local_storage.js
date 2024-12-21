document.addEventListener("DOMContentLoaded", function() {
    const firstname = document.getElementById("fname");
    const lastname = document.getElementById("lname");
    const fathername = document.getElementById("faname");
    const genderRadios = document.getElementsByName("gender");
    const dob = document.getElementById("dob");
    const age = document.getElementById("age");
    const email = document.getElementById("email");
    const qualification = document.getElementById("qualification");
    const password = document.getElementById("password");
    const regform = document.getElementById("registration");
    const bgblack = document.querySelector(".overlay");
    const addbtn = document.querySelector(".add");
    const cancelbtn = document.getElementById("reset");
    const submit = document.getElementById("submit");

    // Convert to uppercase
    firstname.addEventListener("input", function() {
        this.value = this.value.toUpperCase();
    });

    lastname.addEventListener("input", function() {
        this.value = this.value.toUpperCase();
    });

    fathername.addEventListener("input", function() {
        this.value = this.value.toUpperCase();
    });

    // DOB functions & age calculation
    dob.addEventListener("input", function() {
        const birthdate = new Date(this.value);
        const today = new Date();

        if (birthdate > today) {
            alert("Please select a correct DOB");
            dob.value = "";
            age.value = "";
            return;
        }

        let years = today.getFullYear() - birthdate.getFullYear();
        let months = today.getMonth() - birthdate.getMonth();
        if (months < 0) {
            years--;
            months += 12;
        }

        age.value = `${years} years ${months} months`;
    });

    // Email validation and conversion to lowercase
    email.addEventListener("input", function() {
        this.value = this.value.toLowerCase();
        const emailpattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailpattern.test(this.value)) {
            email.setCustomValidity("Please enter a valid email");
        } else {
            email.setCustomValidity("");
        }
    });

    // Open form
    addbtn.addEventListener("click", function() {
        regform.style.display = "block";
        bgblack.style.display = "block";
    });

    // Cancel button function
    cancelbtn.addEventListener("click", function() {
        regform.style.display = "none";
        bgblack.style.display = "none";
    });

    // Esc button function
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            regform.style.display = "none";
            bgblack.style.display = "none";
        }
    });

    // Submit button function
    submit.addEventListener("click", function(event) {
        event.preventDefault();

        let genderSelected = false;
        let genderValue = '';
        genderRadios.forEach(radio => {
            if (radio.checked) {
                genderSelected = true;
                genderValue = radio.value;
            }
        });

        // Validate input fields
        if (firstname.value === "" || lastname.value === "" || fathername.value === "" || dob.value === "" || !genderSelected || age.value === "" || email.value === "" || qualification.value === "" || password.value === "") {
            alert("Please fill out all fields");
        } else if (!email.checkValidity()) {
            alert("Please enter a valid email");
        } else {
            const userData = {
                id: Date.now(), // Unique identifier for each user
                firstname: firstname.value,
                lastname: lastname.value,
                fathername: fathername.value,
                gender: genderValue,
                dob: dob.value,
                age: age.value,
                email: email.value,
                qualification: qualification.value,
                password: password.value
            };

            // Get existing user data
            let users = JSON.parse(localStorage.getItem("userData")) || [];
            users.push(userData);
            localStorage.setItem("userData", JSON.stringify(users));

            displayUserData();

            regform.style.display = "none";
            bgblack.style.display = "none";
        }
    });

    // Function to display user data
    function displayUserData() {
        const users = JSON.parse(localStorage.getItem("userData")) || [];
        document.body.querySelectorAll('.register-form').forEach(el => el.remove()); //doubt

        users.forEach(userData => {
            var div = document.createElement("div");
            div.setAttribute("class", "register-form");
            div.setAttribute("data-id", userData.id);
            div.innerHTML = `
                <h3><b>User Info of ${userData.firstname}</b></h3>
                <p><b>First Name:</b> ${userData.firstname}</p>
                <p><b>Last Name:</b> ${userData.lastname}</p>
                <p><b>Father's Name:</b> ${userData.fathername}</p>
                <p><b>Gender:</b> ${userData.gender}</p>
                <p><b>DoB(YYYY/MM/DD):</b> ${userData.dob}</p>
                <p><b>Age:</b> ${userData.age}</p>
                <p><b>Email:</b> ${userData.email}</p>
                <p><b>Qualification:</b> ${userData.qualification}</p>
                <button class="deluser" onclick="deluser(${userData.id})">Delete User</button>
            `;
            document.body.appendChild(div);
        
        });
    }

    // Function to delete user
    window.deluser = function(id) {
        let users = JSON.parse(localStorage.getItem("userData")) || [];
        users = users.filter(user => user.id !== id);
        localStorage.setItem("userData", JSON.stringify(users));

        displayUserData();
    };

    // Load saved data on page load
    displayUserData();
});

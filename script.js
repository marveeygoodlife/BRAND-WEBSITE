"use strict"
/* get elements */
/* add event listener */
/* calculate height and fix it to nav */
const myDate = document.getElementById("myDate");
const ul = document.querySelector('.links');
const btn = document.querySelector(".togglebutton");
const linksContainer = document.querySelector(".links-container");
const nav = document.querySelector("#nav");
const topScroll = document.querySelector("#top-link");
const body = document.documentElement;
let valid = true;
 /* set date */
myDate.innerHTML = new Date().getFullYear();

/* check for user theme preference in local storage */
const themeToggle = document.getElementById("themeToggle");  
const currentTheme = localStorage.getItem('theme');
   if (currentTheme) {
      body.classList.add(currentTheme);
   }
 
window.addEventListener('DOMContentLoaded', () => { 
   
 themeToggle.addEventListener("click", ()=>{
   body.classList.toggle('dark-mode');
   /* save user prefered color scheme to local storage
    */
   if (body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark-mode")
   } else {
      localStorage.setItem("theme", "");
   }
 })
 /* dynamic nav height */
btn.addEventListener('click', ()=>{
    const linksHeight = ul.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;

     if (containerHeight === 0) {
linksContainer.style.height =`${linksHeight}px`;
     } else {
   linksContainer.style.height = 0;
       }
});
})
/* scroll to top */
window.addEventListener("scroll", ()=>{
   const scrollHeight = window.pageYOffset;
  const navheight = nav.getBoundingClientRect().height;
 

  if (scrollHeight > 1000) {
     topScroll.classList.add("show-link")
   } else {
    topScroll.classList.remove("show-link")
  }

 /* add fixed nav bar */
 if (scrollHeight > navheight) {
   nav.classList.add('fixed-navbar');
 } else {
   nav.classList.remove('fixed-navbar');
 }
})


/* enrollment form validation */
const enrolForm = document.getElementById("myform");
const submitBtn = document.querySelector("button");
 
if (enrolForm) {
document.getElementById("myform").addEventListener("submit", (e)=>{
e.preventDefault();
/* fieldset 1 (user details) */
const firstname = document.querySelector("#firstname").value.trim(); const firstnameError = document.getElementById("firstnameError");

const lastname = document.querySelector("#lastname").value.trim(); const lastnameError = document.getElementById("lastnameError");

const email = document.querySelector("#email").value.trim(); const emailError = document.getElementById("emailError");

const phonenumber = document.querySelector("#telephone").value.trim(); const telephoneError = document.getElementById("telephoneError");

/* fieldset 2 (work experience) */
const selectstudent = document.querySelector("#studentoption").value.trim();
const companyname = document.querySelector("#companyname").value.trim();
const role = document.querySelector("#role").value.trim();
const jobyears = document.querySelector("#jobyears").value.trim();

/* fieldset 3(schedule program) */
const dateinput = document.querySelector("#date").value.trim();

/* fieldset 4 (register program) */
const registerprogram = document.querySelector("#registerprogram").value.trim(); const registerError = document.getElementById("registerError");

const internshipduration = document.querySelector("#duration").value.trim(); const internError = document.getElementById("internError");

const country = document.querySelector("#country").value.trim(); const countryError = document.getElementById("countryError");

/* fieldset 5 (find us) */
const knowus = document.querySelector("#connect").value.trim();

const checkbox = document.querySelector("#terms").checked; const checkError = document.getElementById("checkError"); 

/* clear box */
firstnameError.textContent = "";
lastnameError.textContent = "";
emailError.textContent = "";
telephoneError.textContent = "";
registerError.textContent = "";
internError.textContent = "";
countryError.textContent = "";
checkError.textContent = "";

/* validate all inputs */
if (!firstname) {
firstnameError.textContent = "Enter firstname";
  valid = false;
  return;
 }
if (!lastname) {
lastnameError.textContent ="Enter Lastname";
   valid = false;
   return;
}
if (!email) {
emailError.textContent = "Enter Email";
   valid = false;
   return;
}
if (!phonenumber) {
telephoneError.textContent = "Enter Telephone  Number";
   valid = false;
   return;
}
if (!selectstudent) {
   console.log("select option")
   valid = false;
   return;
}
if (!registerprogram) {
registerError.textContent = "choose program";
   valid = false;
   return;
}
if (!internshipduration) {
internError.textContent = "Select duration";
   valid = false;
   return;
}
if (!country) {
countryError.textContent = "Select Country";
   valid = false;
   return;
}
if (!checkbox) {
checkError.textContent = "Select terms";
   valid = false;
   return;
}

const userData = {
   firstname,
   lastname,
   email,
   phonenumber,
   selectstudent,
   companyname,
   role,
   jobyears,
   internshipduration,
   dateinput,
   registerprogram,
   country,
   knowus,
   checkbox
}
console.log("userData", userData)
if (valid) {
   enrolForm.submit();
}

});
} 
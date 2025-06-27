"use strict"
/* get elements */
/* add event listener */
/* calculate height and fix it to nav */
console.log("Javascript Connected")
const myDate = document.querySelector("#myDate");
const ul = document.querySelector('.links');
const btn = document.querySelector(".togglebutton");
const linksContainer = document.querySelector(".links-container");
const nav = document.querySelector("#nav");
const topScroll = document.querySelector("#top-link");
const body = document.documentElement;
const smoothScrollLinks = document.querySelectorAll(".scroll-link");

const scrollHeight = window.pageYOffset;
let valid = true;

 /* DYNAMICALLY UPDATE DATE */
myDate.innerHTML = new Date().getFullYear();

/* CHECK FOR USE THEME PREFERENCE IN LOCAL STORAGE */
const themeToggle = document.getElementById("themeToggle");  
const currentTheme = localStorage.getItem('theme');
   if (currentTheme) {
      body.classList.add(currentTheme);
   }
 /* DARK MODE & NAV HEIGHT */
window.addEventListener('DOMContentLoaded', () => { 
   /* DARK MODE TOGGLE */
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
 /* DYNAMIC NAVIGATION HEIGHT */
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
/* SCROLL TO TOP  */
window.addEventListener("scroll", ()=>{
 const scrollHeight = window.pageYOffset;
const navheight = nav.getBoundingClientRect().height;

  if (scrollHeight > 500) {
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


/* CONTACT FORM VALIDATION */
const contactform = document.getElementById("contactform");
const contactbutton = document.getElementById("contactbutton");
if (contactform) {
document.getElementById("contactform").addEventListener("submit", (e)=>{
   e.preventDefault();


  const fullname = document.getElementById("fullname").value.trim(); const fullnameError = document.getElementById("fullnameError"); 

  const contactemail = document.getElementById("contactemail").value.trim(); const contactemailError = document.getElementById("contactemailError"); 

  const contactmessage = document.getElementById("contactmessage").value.trim(); 
  const contactmessageError = document.getElementById("contactmessageError");

  /* blank display */   
  contactemailError.textContent = ""
; contactmessageError.textContent=""; fullnameError.textContent = "";

if (!fullname) {
   fullnameError.textContent = "Please enter your fullname"
   valid = false;
   return;
}
if (!contactemail) {
   contactemailError.textContent = "Please enter your email address"
   valid = false;
   return;
}
if (!contactmessage) {
   contactmessageError.textContent = "Please include a short message"
   valid = false;
   return;
}
 const contactData = {
   fullname,
   contactemail,
   contactmessage,
 }
 console.log("contactData", contactData);
 if (valid) {
   contactform.submit();
 }

   })
}
/* SMOOTH SCROLL */
smoothScrollLinks.forEach((link) => {
link.addEventListener("click", (e) => {
   e.preventDefault();
   //navigate to scroll spot
   const id = e.currentTarget.getAttribute("href").slice(1);
   const element = document.getElementById(id);
   const navHeight = nav.getBoundingClientRect().height;
   const containerHeight = linksContainer.getBoundingClientRect().height;
   const fixedNav = nav.classList.contains("fixed-nav");
   let position = element.offsetTop - navHeight;

   if (!fixedNav) {
      position = position - navHeight;
   };
   if (navHeight > 82) {
      position = position + containerHeight;
   };

   window.scrollTo({
      left: 0,
      top: position,
   });

   //close nav bar
   linksContainer.style.height = 0;

  });
});

/* faq toggle */
const questions = document.querySelectorAll(".question");

questions.forEach(  (question)=> {
   const button = question.querySelector(".question-btn");

   button.addEventListener("click", ()=>{
      questions.forEach((item)=>{
         if (item !== question) {
            item.classList.remove("show-text")
         }
      })
 question.classList.toggle("show-text");
   })
})

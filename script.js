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
 /* scroll to top */
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

window.addEventListener("scroll", ()=>{
   const scrollHeight = window.pageYOffset;
  const navheight = nav.getBoundingClientRect().height;
 

  if (scrollHeight > 1000) {
     topScroll.classList.add("show-link")
   } else {
        topScroll.classList.remove("show-link")
  }

 /* add fixed nav */
 if (scrollHeight > navheight) {
   nav.classList.add('fixed-navbar');
 } else {
   nav.classList.remove('fixed-navbar');
 }
})



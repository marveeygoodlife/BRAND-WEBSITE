"use strict"
/* get elements */
/* add event listener */
/* calculate height and fix it to nav */
const date = document.getElementById("date");
const ul = document.querySelector('.links');
const btn = document.querySelector(".togglebutton");
const linksContainer = document.querySelector(".links-container");
const nav = document.querySelector("#nav");
const topScroll = document.querySelector(".top-link");
 console.log(topScroll)
 console.log(nav)
/* set date */
date.innerHTML = new Date().getFullYear();
/* nav toggle */
btn.addEventListener('click', ()=>{
    const linksHeight = ul.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;

     if (containerHeight === 0) {
        linksContainer.style.height =`${linksHeight}px`;
     } else {
         linksContainer.style.height = 0;
       }
});

/* scroll to top */
//listen for scroll on windows
// get window height
//get nav height
// show link if height > 500

window.addEventListener("scroll", ()=>{
  const scrollHeight = window.pageYOffset;
  const navheight = nav.getBoundingClientRect().height;


  if (scrollHeight > 500) {
     topScroll.classList.add("show-link")
  } else {
        topScroll.classList.remove("show-link")
  }
})
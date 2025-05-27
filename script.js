"use strict"
/* get elements */
/* add event listener */
/* calculate height and fix it to nav */
const date = document.getElementById("date");
const ul = document.querySelector('.links');
const btn = document.querySelector(".togglebutton");
const linksContainer = document.querySelector(".links-container");
 
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
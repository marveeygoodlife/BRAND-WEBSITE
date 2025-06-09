 const whatsapp = document.querySelector(".whatsappBtn");
console.log(whatsapp)

 window.addEventListener("scroll", ()=>{
   const scrollHeight = window.pageYOffset;
  const navheight = nav.getBoundingClientRect().height;
  
  if (scrollHeight > 500) {
   whatsapp.classList.add('show-whatsapp')
  } else {
      whatsapp.classList.remove('show-whatsapp')
  }
})
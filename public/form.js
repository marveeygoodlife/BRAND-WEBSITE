const whatsapp = document.getElementById("whatsappBtn");
 window.addEventListener("scroll", () => {
    const scrollHeight = window.pageYOffset;
    /* WHATSAPP BUTTON */
  if (scrollHeight > 500) {
   whatsapp.classList.add('show-whatsapp')
  } else {
      whatsapp.classList.remove('show-whatsapp')
  }
})





 
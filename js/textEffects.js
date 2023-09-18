const typewriterText = document.querySelectorAll('.js-effect-typewriter')

const timer = ms => new Promise(res => setTimeout(res, ms))

typewriterText.forEach(async (element)=>{
  const text = element.innerText
  const speed = element.getAttribute('js-effect-speed') || 150
  element.innerHTML = ''
  for(let char of text){
    element.innerHTML+=char
    await timer(speed)
  }
})

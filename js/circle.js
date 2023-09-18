const arrangeCircle = document.querySelector(".js-arrange-circle")
const contentInsert = document.querySelector(".js-content-insert")
const pageIdentifier = document.querySelector(".js-page-identifier")

const routes = [
  {name:"portfolio", content_url:"routes/projects.html"},
  {name:"contact", content_url:"routes/contact.html"},
  {name:"playlist", content_url:"routes/playlist.html"},
  {name:"blog", content_url:"routes/blog.html"},
  {name:"about me", content_url:"routes/aboutme.html"}
]

routes.forEach(route => {
  const element = document.createElement("a")
  element.innerText = route.name
  arrangeCircle.appendChild(element)
});

const setCircle = (circle) => {
  const children = Array.from(circle.children)
  let fontSize = window.getComputedStyle(circle).getPropertyValue('font-size').replace('px',"")
  let radius = circle.getAttribute("radius") * fontSize
  let lastSelected = children[0];
  let currentOffset = 0

  const selectedOption = (index) => {
    lastSelected.classList.remove("text-highlight")
    children[index].classList.add("text-highlight")
    updateCircle(index*Math.PI/children.length*2)

    lastSelected = children[index]
    currentOffset = index

    pageIdentifier.innerText = children[index].innerText
 
    fetch(routes[index].content_url)
    .then((response)=>response.text())
    .then((text)=>{
        contentInsert.innerHTML = text;
      })
  }

  const updateCircle = (offset = 0) => {
    fontSize = window.getComputedStyle(circle).getPropertyValue('font-size').replace('px',"");
    radius = circle.getAttribute("radius") * fontSize
    children.forEach((element,index) => {
      let step = index*Math.PI/children.length*2 // i have no fucking idea why it works but i guess there is some magical math formula that makes this work.
      element.style.left = `${(Math.sin(step-offset)*radius-element.clientWidth/2)}px`  // x = sine
      element.style.bottom = `${(Math.cos(step-offset)*-radius-element.clientHeight/2)}px` // y = cosine
    });
  }
  
  children.forEach((element, index)=>element.addEventListener("click",()=>selectedOption(index)))
  window.addEventListener('resize',()=>updateCircle(currentOffset))
  selectedOption(0)
}

setCircle(arrangeCircle);

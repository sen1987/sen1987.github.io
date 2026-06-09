

/* Carousel stages */

const carousel_stages = {
  BtnPrev: document.querySelector("#stages .carousel_btns #prev"),
  BtnNext: document.querySelector("#stages .carousel_btns #next"),
  BtnDots: document.querySelector("#stages .carousel_btns div"),
  List: document.querySelector("#stages #carousel"),
  Blocks: document.querySelectorAll('#stages #carousel > div'),
  sel: 0
}

function stagesSelect(i){
  if(i < 0 || i >= carousel_stages.Blocks.length) return;
  
  carousel_stages.Blocks.forEach((e, index) => {
     carousel_stages.BtnDots.children[index].className = e.className = (i === index) ? 'sel' : '';
  });
  carousel_stages.BtnPrev.className = (i == 0)?'off':''; 
  carousel_stages.BtnNext.className = (i == carousel_stages.Blocks.length-1)?'off':''; 
  carousel_stages.sel = i;
}

carousel_stages.Blocks.forEach((b, index) => {
  carousel_stages.BtnDots.insertAdjacentHTML('beforeend',`<a><span></span></a>`);
  const dot = carousel_stages.BtnDots.lastElementChild;
   dot.addEventListener('click', ()=> {
         stagesSelect(index);
    });
});

carousel_stages.BtnPrev.addEventListener("click", ()=>{stagesSelect(carousel_stages.sel - 1); });
carousel_stages.BtnNext.addEventListener("click", ()=>{stagesSelect(carousel_stages.sel + 1); });
stagesSelect(carousel_stages.sel);


/* Carousel participants */

const carousel_part = {
  BtnPrev: document.querySelector("#participants .carousel_btns #prev"),
  BtnNext: document.querySelector("#participants .carousel_btns #next"),
  BtnIndicator: document.querySelector("#participants .carousel_btns p"),
  List: document.querySelector("#participants #carousel"),
  blockWidth(){ return document.querySelector("#participants #carousel > div").offsetWidth +  parseInt(window.getComputedStyle(this.List).gap)},
  pos: 1,
  isRoll: false,
  autoRollInterval: null
}

function carouselIndicatorUpd(){
    carousel_part.BtnIndicator.innerHTML = `${carousel_part.pos}<span> / ${carousel_part.List.children.length}</span>`;
}

function carouselRoll(direction) {
  if (carousel_part.isRoll) return;
  if(direction){
    carousel_part.pos++;
    carousel_part.List.style.transition = "transform 0.3s ease";
    carousel_part.List.style.transform = `translateX(-${carousel_part.blockWidth()}px)`;
    carousel_part.List.addEventListener("transitionend", () => {
        carousel_part.List.style.transition = "none";
        carousel_part.List.style.transform = "translateX(0)";
        carousel_part.List.appendChild(carousel_part.List.firstElementChild); 
        carousel_part.isRoll = false;
    }, {once: true});
  }else{
    carousel_part.pos--;
    carousel_part.List.prepend(carousel_part.List.lastElementChild);
    carousel_part.List.style.transform = `translateX(-${carousel_part.blockWidth()}px)`;
    carousel_part.List.offsetWidth;
    carousel_part.List.style.transition = "transform 0.3s ease";
    carousel_part.List.style.transform = "translateX(0)";
    carousel_part.List.addEventListener("transitionend", () => {
        carousel_part.List.style.transition = "none";
        carousel_part.isRoll = false;
    }, {once: true});
  }
  if(carousel_part.pos > carousel_part.List.children.length) carousel_part.pos = 1;
  if(carousel_part.pos < 1) carousel_part.pos = carousel_part.List.children.length;
  carouselIndicatorUpd();
  carousel_part.isRoll = true;
}

function resetAutoRollInterval() {
  if(carousel_part.autoRollInterval) clearInterval(carousel_part.autoRollInterval);
  carousel_part.autoRollInterval = window.setInterval(()=>{carouselRoll(1)}, 4000);
}

carousel_part.BtnPrev.addEventListener("click", ()=>{carouselRoll(0); resetAutoRollInterval()});
carousel_part.BtnNext.addEventListener("click", ()=>{carouselRoll(1); resetAutoRollInterval()});
carouselIndicatorUpd();
resetAutoRollInterval();
//  main.js
import { Pquery } from "/web/scripts/main.js";
// import { Pres } from "/static/main.js";

// screes.js
import { audioS } from "/web/scripts/screens.js";
import { sectencesS } from "/web/scripts/screens.js";

// declaring VAR
let Pres = [];

// screen funcs----------------------------------------------------------------------
// screen 1 to screen 2
export async function  s1tos2(){
    navBack.disabled = false;
    //  making Pquery
    let form = document.querySelector("#form");
    Pquery.gender = form.gender.value;
    Pquery.age = form.age.value;
    Pquery.city = form.city.value;
    Pquery.education = form.edu.value;
    
    let q= JSON.stringify(Pquery)  
    console.log(q) // fremove later

    // chaning map
    changeMap(Pquery.city)

    // making req
    Pres = await personReq(Pquery);

    
    console.log(Pres) // remove later
  
    sectencesS.statefunc();

    let pplNum = document.querySelector("#peopleN")   
    pplNum.innerHTML = `People Found: <span id='Pnum'>${Pres.length}</span> `;
    
    return Pres
  }

//   screen 2 to screen 3
  export async function s2tos3 (){
  
    // func to retriv from persons
    let retvRvalue = function (){
      let allRadio = document.getElementsByName("sen")
        // checking the value of each radio button
      for (let i=0;i <allRadio.length;i++){
        // console.log(i) // remove later  
        if (allRadio[i].checked === true){
            console.log(`donee ${i}`) //remove later
            return allRadio[i].value;
                }
            }
        } // retrv
    // console.log(retvRvalue()) // remove later
    
    let aud = await retvRvalue()
    //checking value
    if(aud === undefined){
      return;
    }
    await audioS.statefunc()
  
    let audRes = document.querySelector("#AudRes")
    audRes.innerHTML = ``
    for (let i = 0 ; i < Pres.length; i++  ){
      console.log(Pres[i].age) //remove alter
      audRes.innerHTML = audRes.innerHTML.concat(
        `<div class="audCard">
        <h4><span>Speaks Punjabi:</span> ${Pres[i].punjabi}</h4>
        <h4><span>Origin City:</span> ${Pres[i].origin_city}</h4>
    <audio controls  >
    <source src="/audios/${Pres[i].id}/${aud}.ogg" type="audio/ogg">
    </audio>
    </div>
    `)  // concat
    } 
 } // s2tos3

// Other funcs------------------------------------------------------------------------
// person REQ
const personReq = async (qur) => {
    let options = {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(qur),
    }
    let q = await fetch("/persons", options)
    let response = q.json()
    return response
   }
   

  // Animations -----------------------------------------------

  export var t1 = anime.timeline({
    easing: 'easeOutExpo',
    duration: 1500,
    autoplay: false
  })
  t1.add({
  targets:'.city',
  scale:[0.8,1],
  opacity:[0,1],
  easing: 'spring(1, 80, 10, 0)',
  delay: anime.stagger(150)
  },-300).add({
    targets: '.city',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 1000,
    delay: function(el, i) { return i * 250 },
    direction: 'alternate',
  },-200).add({
    targets: '.pin',
    easing: 'easeInOutSine',
    opacity:[0,1],
    translateY:[-20,0],
    duration: 500,
    delay: function(el, i) { return i * 250 },
    direction: 'alternate',
  },-100).add({
    targets:'.ttt',
  scale:[0.8,1],
  opacity:[0,1],
  easing: 'spring(1, 80, 10, 0)',
  delay: anime.stagger(150)

  },-100).add({
    targets: '#lines path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 500,
    delay: function(el, i) { return i * 550 },
    direction: 'alternate',
    loop: 1
  },)
  



  // hoveringggg animationnn ----------------------------------
  let map = document.querySelector("#map")
  let cities = document.querySelectorAll(".city")
  let lines = document.querySelector('#lines')
  let pinG = document.querySelectorAll(".pg")

  export let HoverMap = function(){
    map.addEventListener('mouseenter', MapIn);
    map.addEventListener('mouseleave', MapOut)
    
    CityHover()
  }
//  functions for hoveringggg
  function MapIn(){
    cities.forEach(city => city.style.opacity = '0.5' )
    lines.style.transition = "all 1s"
    lines.style.opacity = 0

    
    pinG.forEach(pinG=>{
      const pinElement = pinG.querySelector('.pin');
      const textElement = pinG.querySelector('.ttt');
            // Set the initial opacity
      pinElement.style.opacity = '0.5';
      pinElement.style.transition = 'all 0.5s';
      textElement.style.opacity = '0';
      textElement.style.transition = 'all .3s';
    
      // Add event listeners for hover
      pinElement.addEventListener('mouseenter', () => {
        pinElement.style.opacity = '1';
        textElement.style.opacity = '1';
      });
    
      pinElement.addEventListener('mouseleave', () => {
        pinElement.style.opacity = '0.5';
        textElement.style.opacity = '0';
      });
    })
      
    
    
  }
  function MapOut(){
    cities.forEach(city => city.style.opacity = '1' )
    lines.style.opacity = 1

    pinG.forEach(pinG=>{
      const pinElement = pinG.querySelector('.pin');
      const textElement = pinG.querySelector('.ttt');
            // Set the initial opacity
      pinElement.style.opacity = '1';
      textElement.style.opacity = '0';})
  }

  function CityHover(){
    for (var i = 0; i < cities.length; i++) {
      cities[i].addEventListener("mouseenter", function() {
          this.style.transition = 'all .5s'
          this.style.opacity = 1; // Change opacity to 1 on mouse enter
      });
    }
  }

// changing map to city
 async function changeMap(city){

  map.removeEventListener('mouseenter', MapIn);
    map.removeEventListener('mouseleave', MapOut)

  let cityVAL;
  let pinVal;
  let textVal;

  let BIGANIME;

  if (city === 'Lahore'){
    cityVAL = 4
    pinVal = 'lhr'
    textVal = 'Lahore'

    BIGANIME = anime({
      duration:1000,
      targets: `#p-${pinVal},#p${cityVAL},#${textVal}`,
      scale:1.35,
      translateX:'-25%',
      translateY:'-20%',
    })

    
  }
  else if(city==='Gujrawala'){
    cityVAL = 8
    pinVal = 'grt'
    textVal='Gujrat'

    BIGANIME = anime({
      duration:1000,
      targets: `#p-${pinVal},#p${cityVAL},#${textVal}`,
      scale:1.35,
      translateX:'-25%',
      translateY:'10%',
    })
  }
  else{
    cityVAL = 6
    pinVal = 'sgd'
    textVal='Sargodha'

    BIGANIME = anime({
      duration:1000,
      targets: `#p-${pinVal},#p${cityVAL},#${textVal}`,
      scale:1.35,
      translateX:'-25%',
      translateY:'-10%',
    })
  }

  lines.style.opacity = 0
  let cityAnime = anime.timeline({
    duration: 300
  })

  cityAnime.add({
    targets: `.pin:not(#p-${pinVal})`,
    easing: 'easeInOutSine',
    opacity:[1,0],
    scale:[1,0],
    translateY:[0,-20],
    duration: 500,
    delay: function(el, i) { return i * 250 },
    direction: 'alternate',
  },-300).add({
    targets:`.ttt:not(#${textVal})`,
  scale:[1,0],
  opacity:[1,0],
  easing: 'spring(1, 80, 10, 0)',
  delay: anime.stagger(150)

  },-150).add({
    targets: `.city:not(#p${cityVAL})`,
    scale: [1,0.5, 0],
    opacity: [1, 0],
    autoplay: false,
    delay: anime.stagger(150),
    duration:500,
  },-100)
  
  cityAnime.play();

    
 }

 
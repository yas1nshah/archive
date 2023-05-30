// main.js
import { canvas } from "/web/scripts/main.js";
import { navTitle } from "/web/scripts/main.js";
import { navBack } from "/web/scripts/main.js";

// func.js
import { s1tos2 } from "/web/scripts/functions.js";
import { s2tos3 } from "/web/scripts/functions.js";

// animations
import { t1 } from "/web/scripts/functions.js";
import { HoverMap } from "/web/scripts/functions.js";

//  Screen Class--------------------------------------------------------------------
export class Screen {
  constructor(html, screen, statefunc, backfunc){
    this.html = html;
    this.screen = screen;
    this.back = backfunc
    this.statefunc = function State() {
      canvas.innerHTML = this.html;
      console.log(this.screen)
      navTitle.innerHTML = this.screen;
      statefunc();
      this.backfunc()
    },
    this.backfunc = function Back(){
      
      navBack.addEventListener("click", this.back)
    }
  };

};

// Home Screeen--------------------------------------------------
export let homeS = new Screen(
  `     <div id='frmC'>
        <form id="form">
          <select class='fm1' id="gender" name="gender">
            <option value="M">Male</option>
            <option value="F" selected>Female</option>     
          </select>

          <select class='fm1' id="age" name="age">
            <option value="18">18-25</option>
            <option value="26">26-35</option>
            <option value="36">36-45</option>
            <option value="46">46-55</option>
          </select>

          <select class='fm1' id="city" name="city">
            <option value="Lahore">Lahore</option>
            <option value="Gujrawala">Gujrawala</option>
            <option value="Sargodha">Sargodha</option>
          </select>

          <select class='fm1' id="edu" name="edu">
            <option value="LTHS">Less than high school</option>
            <option value="SCHL">School</option>
            <option value="CLG" selected>College</option>
            <option value="BD">Bachelor's Degree</option>
            <option value="MD">Master's Degree</option>
          </select>
       
        </form>
      <button id="submit-btn">Submit</button></div>
    `, 
      `Home`,
  
  async function screen1(){
    console.log("screen1");
    navBack.disabled = true;
    let button = document.querySelector("#submit-btn");
    button.disabled = true
    button.addEventListener("click", s1tos2);
    console.log("starting animation")

    // t1.children.forEach((child, index) => {
    //   if (index % 2 === 1) {
    //     child.offset = '-=750'; // Adjust the offset based on your desired timing
    //   }
    // });
    await t1.play();
    setTimeout(HoverMap,3500)
    setTimeout(function(){button.disabled = false},3500)
    
  },
  function back1(){
    console.log("bacl")
  }
);



// Sentence Screen---------------------------------------------
export let sectencesS = new Screen(
  `<h4 id='peopleN'></h4>
  
  
    <h3 id='CAS'>Choose a Sentence:</h3>
    <div class="radio-group">
      <div class='mdiv'>
      <input type="radio" id="r1" value="1" name="sen">
      <div class='ldiv'>
      <label for="r1"> You go ahead, don't worry about us.</label>
      </div></div><br>
      
      <div class='mdiv'>
      <input type="radio" id="r2" value="2" name="sen">
      <div class='ldiv'>
      <label for="r2"> Maintain distance, lest you perish.</label>
      </div></div><br>
      
      <div class='mdiv'>
      <input type="radio" id="r3" value="3" name="sen">
      <div class='ldiv'>
      <label for="r3"> It's raining, make Pakoras!</label>
      </div></div><br>
      
      <div class='mdiv'>
      <input type="radio" id="r4" value="4" name="sen">
      <div class='ldiv'>
      <label for="r4"> My heart was broken but biryani won it back!</label>
      </div></div><br>
      
      <div class='mdiv'>
      <input type="radio" id="r5" value="5" name="sen">
      <div class='ldiv'>
      <label for="r5"> In the present era, only the person who doesn't have a mobile can walk away with their head held high.</label>
      </div></div><br>
      
      <div class='mdiv'>
      <input type="radio" id="r6" value="6" name="sen">
      <div class='ldiv'>
      <label for="r6"> When no one understands, it is better to remain silent; arguments only render words meaningless.</label>
      </div></div><br>

      <div class='mdiv'>
      <input type="radio" id="r7" value="7" name="sen">
      <div class='ldiv'>
      <label for="r7"> One should always follow the path of goodness, even though it is difficult. Despite the challenges it presents, the outcome is always positive.</label>
      </div></div><br>
      
      <div class='mdiv'>
      <input type="radio" id="r8" value="8" name="sen">
      <div class='ldiv'>
      <label for="r8"> Nowadays, it is hard to find loyal people. Mostly, you will encounter selfish individuals who, for their own gain, would destroy everything of others.</label>
      </div></div><br>
      
      <div class='mdiv'>
      <input type="radio" id="r9" value="9" name="sen">
      <div class='ldiv'>
      <label for="r9"> Let's leave the love story, tell me either Lays is better or Kurkure?</label>
      </div></div><br>
      
      <div class='mdiv'>
      <input type="radio" id="r10" value="10" name="sen">
      <div class='ldiv'>
      <label for="r10"> Speak less and show more, because people are impressed by actions over words.</label>
      </div></div><br>
    </div>

  
  <button id="submit-btn2">Go</button>
  `,

  'Audio Selection',

  function screen2(){
    console.log('screen2'); // remove later
    navBack.removeEventListener("click", homeS.back)
    
    let subbtn2 = document.querySelector("#submit-btn2")
    subbtn2.addEventListener("click", s2tos3)
    
  },function back2(){
    homeS.statefunc()
    console.log("bac2")
  }
)

// audio screen--------------------------------------------
export let audioS = new Screen(
  `<div id='AudRes'></div>`,
   "Audio Results",
  function screen3(){
    console.log("screen3");
    navBack.removeEventListener("click", sectencesS.back)
  },
  function back3(){
    sectencesS.statefunc();
    console.log("back3")
  }
)
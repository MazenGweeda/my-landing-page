//declaring  global variables........................................................................................................................

const navBar     = document.querySelector("#navigationBar"); 
const sections   = document.querySelectorAll(".section");
const buttonUp   = document.querySelector("#button_up"); 
const myViewport = document.querySelector('#pageViewport');
let mouseInsideBar; //track if the mouse is inside navigation bar or not.
let navButton;

//declaring page functions........................................................................................................................

//dynamically add navigation bar elements according to number of sections of the page........
function addNavigationElements(){
    
    const fragment=document.createDocumentFragment(); //using fragment to improve performance.

    for(let i = 1 ; i <= sections.length ; i++ )
    {
        const element = document.createElement('li');
        element.id = "nav_s"+i;
        element.className = "nav_sections"
        element.innerText = "Section"+i;

        element.style.backgroundImage = "url('resources/highlight.png')";
        element.style.backgroundSize= '100% 100%';

        //navigate to corresponding section upon click...........
        element.addEventListener('click',function(event){
            event.preventDefault();

           const selectedSection = document.querySelector("#section"+i);

           window.scrollTo({
            top: selectedSection.getBoundingClientRect().top-document.body.getBoundingClientRect().top+50,
            left: 0,
            behavior: 'smooth'
           });
        });

        //increase size of element on mouse enter...........
        element.addEventListener('mouseenter',function(){
            this.className='nav_sections_selected';
        });


        //decrease size of element on mouse exit(only if its section is not active)...........
        element.addEventListener('mouseleave',function(){
            const correspondindSecImg = sections[parseInt(element.innerText[7])-1].style.backgroundImage;
            if(correspondindSecImg == 0 || correspondindSecImg=='none')
            {
                this.className='nav_sections';
            }
            
        });


        fragment.appendChild(element);
    }

    navBar.appendChild(fragment);

    navButton=document.querySelectorAll('li');
}




//calling the required functions.............................................................................................................................

addNavigationElements();




//adding events listeners....................................................................................................................................

//make the up button scroll to navigation bar on press........................
buttonUp.addEventListener("click",function(event){
    event.preventDefault();
    
     window.scrollTo({
         top: 0,
         left: 0,
         behavior: 'smooth'
        });

        //remove background from all sections (none is selected)...........
        for(let j = 1 ; j <= sections.length ; j++)
            {
                sections[j-1].style.backgroundImage = 'none';
            }
    });

    //mouse hover effect..............................................
    buttonUp.addEventListener('mouseenter',function(){
        buttonUp.style.backgroundColor="yellow";
    });

    buttonUp.addEventListener('mouseleave',function(){
        buttonUp.style.backgroundColor="transparent";
    });



 //make navigation bar sticky on scrolling then hide it if not scrolling.....................
let scrolling;
window.onscroll=function(){
    navBar.className = "sticky";

    window.clearTimeout(scrolling); //stop the 'scrolling' function if we are still scrolling.

    //hide navigation bar upon stop scrolling..
    scrolling = window.setTimeout(function(){

        if(document.documentElement.scrollTop == 0){
            navBar.className = "sticky";
        }
        else
        {
            if(!mouseInsideBar)
                navBar.className = "hidden";
        }
        

    },1000);

    //style the section when scrolling into it................

    const totalScroll = window.innerHeight+window.scrollY; //detect how much scroll with respect to viewport height.

    if(totalScroll >= document.body.offsetHeight) //this is a fail-safe in case of the viewport height is way bigger than section height(the last section can't reach the top of viewport)
    {
        sections.forEach((elem,index,array)=>{
            if(index===array.length-1) //the last section in page
            {
                elem.style.backgroundImage = "url('resources/highlight.png')";
                elem.style.backgroundSize= '100% 100%';
    
              navButton[index].className='nav_sections_selected';
    
            }else{
                elem.style.backgroundImage = 'none';
                navButton[index].className='nav_sections';
            }
        });
    }
    else
    {
        sections.forEach((elem,index,array)=>{
            if(elem.getBoundingClientRect().bottom > window.innerHeight*0.25 && elem.getBoundingClientRect().top < window.innerHeight*0.35){
                elem.style.backgroundImage = "url('resources/highlight.png')";
                elem.style.backgroundSize= '100% 100%';
    
              navButton[index].className='nav_sections_selected';
    
            }else{
                elem.style.backgroundImage = 'none';
                navButton[index].className='nav_sections';
            }
        });
    }

};

//detect entrance and exit of mouse into navigation bar...........................................
navBar.addEventListener('mouseenter',function(){
    mouseInsideBar = true;
    navBar.className="sticky"; //prevent hiding navigation bar if the mouse is inside.
});

navBar.addEventListener('mouseleave',function(){
    mouseInsideBar = false;

    if(document.documentElement.scrollTop == 0){
        navBar.className = "sticky";
    }else{
        navBar.className = "hidden";
    }
});

//check if the device width is too narrow sets the viewport to fixed value.
window.onload= function(){
    if(screen.width < 700){
            myViewport.setAttribute("content","width=700, initialScale=1, user-scalable=no");
            console.log("viewport set");
    }
}

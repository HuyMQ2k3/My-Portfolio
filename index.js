//Scroll Function

function goToP(paragraphId) {
    var paragraph = document.getElementById(paragraphId);
    
    if (paragraph) {
        paragraph.scrollIntoView({behavior: 'smooth'});
    }
}

//Slider function
    //Getting the number of projects
var Projectlist = document.getElementById('projects-list') ;
var NumberofProjects = Projectlist.getElementsByTagName('li').length;

let currentProject = 0;

const dots = document.querySelectorAll('.dots button')
const projectsImage = document.querySelectorAll('.Project-list li');

function showSlide(index){
    projectsImage.forEach(li => li.style.display = "none")
    dots.forEach(button => button.style.backgroundColor = "white");

    projectsImage[index].style.display = "block";
    dots[index].style.backgroundColor = "#af8cef";
}

function gotoSlide(index){
    currentProject = (NumberofProjects + index) % NumberofProjects;
    showSlide(currentProject);
}

function nextslide(){
    gotoSlide(currentProject + 1);
}

function prevslide(){
    gotoSlide(currentProject - 1);
}

function dotClicked(index){
    gotoSlide(index);
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => dotClicked(index))  
});
import NoteApp from '../scripts/noteApp.js';

let addBtn = document.querySelector('#app-btn');
let addMenu = document.querySelector('.add-menu');
let clickCount = 0;
let addNoteBtn=document.querySelector('#add-note');
addBtn.addEventListener('click',displayAddMenu);
addNoteBtn.addEventListener('click',addNote);

let notes= new NoteApp();
notes.displayAllNote();

function displayAddMenu(){
    if(clickCount == 0){
        addBtn.innerText='-';
        addMenu.style.display='block';
        clickCount++;
    }
    else{
        addBtn.innerText='+';
        addMenu.style.display='none';
        clickCount--;
    }
}

function addNote(e){
    e.preventDefault();
    notes.storeNote();
    addBtn.innerText='+';
    addMenu.style.display='none';
    clickCount--;
}
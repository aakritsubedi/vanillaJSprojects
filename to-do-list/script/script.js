import ToDoListApp from '../script/toDoList.js';
let date= document.querySelector('#date');
let lists= document.querySelector('.lists');
let activity= document.querySelector('#activity');
let description= document.querySelector('#description');
let addItem= document.querySelector('#add-items');
date.innerHTML=new Date();
let activities = new ToDoListApp(lists,activity,description);
activities.addTitle();
activities.displayLists();

addItem.addEventListener('click',activities.addItems);
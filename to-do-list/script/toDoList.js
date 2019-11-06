class ToDoListApp{
  constructor(lists,activity,description){
    console.log("ToDoListApp");
    this.lists=null;
    this.tasks=null;
    this.newTask=null;
    this.activity=null;
    this.description=null;
    this.init(lists,activity,description)
  }
  init(lists,activity,description){
    this.lists=lists;
    this.activity=activity;
    this.description=description;
    this.tasks=[];
    this.newTask=[];
    this.addItems = this.addItems.bind(this);
    // this.changeStatus = this.changeStatus.bind(this);
  }
  addTitle(){
    let h2=document.createElement('h2');
    h2.style.fontSize='18px';
    h2.innerText='Your Activity List';
    this.lists.prepend(h2);
  }
  fetchData(){
    let tasks = localStorage.getItem("tasks");
    if(tasks==null){
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      return false;
    }
    else{
      return JSON.parse(tasks);
    }
  }
  displayLists(){
    let task=this.fetchData();
    let ul = document.querySelector('.lists ul');    
    if(ul.children.length>0){
      ul.innerHTML="";
    }
    let that = this;
    addActivity();
    function addActivity(){
      for(let i=0;i<task.length;i++){
        that.tasks[i]=task[i];
        let li = document.createElement('li');
        li.style.listStyle='none';
        li.style.marginTop='5px';
        let link=document.createElement('a');
        link.style.textDecoration='none';
        link.style.color='#ffffff';
        let kbd=document.createElement('kbd');
        if(task[i]['status']=='complete'){
          kbd.style.backgroundColor='#f4f4f4';
          link.style.color='#000000';
        }
        let checkBox=document.createElement('input');
        link.innerText=task[i]['title'];
        link.href='#';
        link.addEventListener('click',()=>that.displayDetail(task[i]['id']));
        kbd.prepend(link);
        li.prepend(kbd);
        checkBox.type='checkbox';
        if(task[i]['status']=='complete'){
          checkBox.setAttribute('checked',true);
        }
        checkBox.classList.add('float-right');
        checkBox.classList.add('m-1');
        checkBox.addEventListener('change',()=> that.changeStatus(task[i]['id']));
        li.appendChild(checkBox);
        ul.appendChild(li);
      }
    }
    this.lists.appendChild(ul);
  }
  addItems(e){
    e.preventDefault();
    let id=this.tasks.length;
    let task=this.activity.value;
    let desc=this.description.value;
    let item={
      id:id+1,
      title:task,
      desc:desc,
      status:'incomplete'
    }
    this.activity.value=null;
    this.description.value=null;
    this.tasks.push(item);
    localStorage.removeItem("tasks");
    localStorage.setItem("tasks",JSON.stringify(this.tasks));
    this.displayLists();
  }
  changeStatus(id){
    id=id++;
    for(let i=0;i<this.tasks.length;i++){
      if(this.tasks[i]['id']==id){
        if(this.tasks[i]['status']=='complete'){
          this.tasks[i]['status']='incomplete';
        }
        else{
          this.tasks[i]['status']='complete';
        }
      }
    }
    localStorage.removeItem("tasks");
    localStorage.setItem("tasks",JSON.stringify(this.tasks));
    this.displayLists();
  }
  displayDetail(id){
    let editMenu = document.querySelector('#edit-menu');
    let editTitle = document.querySelector('#edit-title');
    let editDescription=document.querySelector('#edit-description');
    let editStatus=document.querySelector('#edit-status');
    id=id++;
    editMenu.style.display='block';
    for(let i=0;i<this.tasks.length;i++){
      if(this.tasks[i]['id']==id){
        console.log(this.tasks[i]);
        editTitle.setAttribute('value',this.tasks[i]['title']);
        editDescription.innerText=this.tasks[i]['desc'];
        editStatus.setAttribute('value',this.tasks[i]['status']);
      }
    }
    let editBtn=document.querySelector('#edit-btn');
    let deleteBtn=document.querySelector('#delete-btn');

    editBtn.addEventListener('click',()=>this.editActivity(id));
    deleteBtn.addEventListener('click',()=>this.deleteActivity(id));
  }
  editActivity(id){
    let editMenu = document.querySelector('#edit-menu');
    let task=document.querySelector('#edit-title');
    let desc=document.querySelector('#edit-description');
    let status=document.querySelector('#edit-status');
    let item={
      id:id,
      title:task.value,
      desc:desc.value,
      status:status.value
    }
    id=id++;
    for(let i=0;i<this.tasks.length;i++){
      if(this.tasks[i]['id']==id){
        this.tasks.splice(i,1);
        this.tasks[i]=item;
      }
    }
    editMenu.style.display='none';
    localStorage.removeItem("tasks");
    localStorage.setItem("tasks",JSON.stringify(this.tasks));
    this.displayLists();
  }
  deleteActivity(id){
    let editMenu = document.querySelector('#edit-menu');
    id=id++;
    for(let i=0;i<this.tasks.length;i++){
      if(this.tasks[i]['id']==id){
        this.tasks.splice(i,1);
      }
    }
    editMenu.style.display='none';
    localStorage.removeItem("tasks");
    localStorage.setItem("tasks",JSON.stringify(this.tasks));
    this.displayLists();
  }
}   
export default ToDoListApp
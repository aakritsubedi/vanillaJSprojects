function getRandomInt(min,max) {
    return Math.floor(Math.random() * (max - min)+1) + min;
}
class NoteApp{
    constructor(){
        this.notes=null;
        this.colorSet = null;
        this.noteBox=document.querySelector('#note-box');
        this.init();
    }
    init(){
        this.colorSet=['#7CEC9F','#6ab04c','#E84342','#FF4848','#FAC42F','#E1DA00'];
        this.deleteNote =this.deleteNote.bind(this);
        this.editable =this.editable.bind(this);
        this.createLocalStorage();
    }
    createLocalStorage(){
        if(localStorage.getItem('notes') == null){
            localStorage.setItem('notes',JSON.stringify([]));
        }
    }
    createNote(noteData){
        let div=document.createElement('div');
        div.classList.add('col-lg-3');
        div.classList.add('col-md-4');
        div.classList.add('col-sm-6');
        div.classList.add('col-xs-12');
        div.title='Note Id: '+noteData['id'];
        div.id='note-container-'+noteData['id'];
        let note=document.createElement('div');
        note.setAttribute('id','note');
        note.style.backgroundColor=this.colorSet[getRandomInt(0,5)];
        note.innerText=noteData['content'];
        note.addEventListener('click',this.editable);
        let button= document.createElement('span');
        button.innerHTML='&#128465;';
        button.style.border='none';
        button.style.fontWeight='bolder';
        let date= document.createElement('span');
        let time=new Date(noteData['time']).getDate()+'/'+new Date(noteData['time']).getMonth()+'/'+new Date(noteData['time']).getUTCFullYear()+'('+new Date(noteData['time']).getHours()+':'+new Date(noteData['time']).getMinutes()+')';
        date.innerText=time;
        div.appendChild(note);    
        div.prepend(date);
        div.appendChild(button);
        this.notes=this.noteBox.prepend(div);
        button.addEventListener('click',this.deleteNote);
    }
    storeNote(){
        let noteContent = document.querySelector('#note-desc').value;
        let allNotes=localStorage.getItem('notes');
        allNotes=JSON.parse(allNotes);
        let note = {
            id: (allNotes.length>0)  ? allNotes[allNotes.length-1]['id']+1: 1,
            content: noteContent,
            time: Date.now()
        }
        this.createNote(note);
        allNotes.push(note);
        localStorage.removeItem('notes');
        localStorage.setItem('notes',JSON.stringify(allNotes));
    }
    deleteNote(e){
        let noteContainer = e.target.parentElement
        let id= noteContainer.id;
        id=parseInt(id.substring(15));
        let allNotes=localStorage.getItem('notes');
        allNotes=JSON.parse(allNotes);
        for(let i=0;i<allNotes.length;i++){
            if(allNotes[i]['id']==id){
                allNotes.splice(i,1);
            }
        }
        localStorage.removeItem('notes');
        localStorage.setItem('notes',JSON.stringify(allNotes));
        this.noteBox.removeChild(e.target.parentElement);
    }
    displayAllNote(){
        let allNotes=localStorage.getItem('notes');
        allNotes=JSON.parse(allNotes);
        for(let i=0;i<allNotes.length;i++){
            this.createNote(allNotes[i]);
        }
    }
    editable(e){
       let noteSection = e.target;
       noteSection.contentEditable = true;
       noteSection.addEventListener('blur',this.saveChanges);
    }
    saveChanges(e){
        let noteSection = e.target;
        let noteContainer = e.target.parentElement
        let id= noteContainer.id;
        id=parseInt(id.substring(15));
        console.log(id);
        let allNotes=localStorage.getItem('notes');
        allNotes=JSON.parse(allNotes);
        for(let i=0;i<allNotes.length;i++){
            if(allNotes[i]['id']==id){
                let note={
                    id:id,
                    content:noteSection.innerText,
                    time:allNotes[i]['time']
                }
                allNotes[i]=note;
            }
        }
        localStorage.removeItem('notes');
        localStorage.setItem('notes',JSON.stringify(allNotes));
    }
}
export default NoteApp; 
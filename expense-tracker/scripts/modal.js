let addBtn = document.getElementById('app-btn');
let wrapper = document.querySelector('#wrapper');
let modal = document.querySelector('.modal');
addBtn.addEventListener('click',displayModel);

function displayModel(){
    modal.style.display='block';
    wrapper.classList.add('bg-dark');
}
let closeModalIc = document.querySelector('#close-modal');
closeModalIc.addEventListener('click',closeModal);

let closeModalBtn = document.querySelector('#close-modal-btn');
closeModalBtn.addEventListener('click',closeModal);

function closeModal(){
    modal.style.display='none';
    wrapper.classList.remove('bg-dark');
}
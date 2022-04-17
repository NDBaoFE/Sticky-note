const addBtn=document.querySelector('.button');
const addBtnContainer=document.querySelector('.note-btn');
const noteContainer=document.querySelector('.notes-wall');
const trashcanBTn=document.querySelector('.trash-can');


getNotes().forEach((note)=>{
    const noteElement=createNoteElement(note.id,note.content);
    noteContainer.insertBefore(noteElement, addBtnContainer);
})
 addBtn.addEventListener('click',function(){
     addNote();
 })
function getNotes(){
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function saveNotes(notes) {
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
  }



  function createNoteElement(id,content){
      const element=document.createElement("textarea");
      element.classList.add('note');
      element.setAttribute('id','draggable');
      element.setAttribute('id',id);
      element.value=content;
      element.placeholder="Write something here <3 ";

      element.addEventListener('change',()=>{
          updateNote(id,element.value);
      })


      element.addEventListener("dblclick", () => {
        const doDelete = confirm(
          "Are you sure you wish to delete this sticky note?"
        );
    
        if (doDelete) {
          deleteNote(id, element);
        }
      })

      return element;
  }

  function addNote(){
      const notes=getNotes();
      const noteObject ={
          id: Math.floor(Math.random()*1000),
          content:''
      }
      const noteElement=createNoteElement(noteObject.id,noteObject.content);
      noteContainer.insertBefore(noteElement, addBtnContainer);
      notes.push(noteObject);
      saveNotes(notes);
      addColor();
      }
function updateNote(id,newContent){
    const notes=getNotes();
        const selectedNote=notes.filter((note)=>note.id==id)[0];
        selectedNote.content=newContent;
        saveNotes(notes);
}
function deleteNote(id, element) {
    const notes = getNotes().filter((note) => note.id != id);
  
    saveNotes(notes);
    addColor();
    noteContainer.removeChild(element);
  }




var colors=["#ff7eb9","#ff65a3","#7afcff","#feff9c","#fff740","#F35F6D"]

  function addColor(){


  const noteElements=document.querySelectorAll('.note');
  noteElements.forEach((note)=>{
      note.style.backgroundColor = colors[Math.floor(Math.random() * 6)];

  })
}
addColor();



//delete all element
trashcanBTn.addEventListener('click',function(){
    const doDelete = confirm(
        "Are you sure you wish to delete all sticky notes?"
      );
      if(doDelete){
          const filtered=[];
          const noteElements=document.querySelectorAll('.note');
          noteElements.forEach((note)=>{
              noteContainer.removeChild(note);
          })
        localStorage.setItem('stickynotes-notes', JSON.stringify(filtered));
      }
})

//dragable element

$(function() {
    const notes=getNotes();
    $(".note").draggable({
    cancel:'',
    });

    $('#trash').droppable({
        over: function(event, ui) {
            const doDelete = confirm(
                "Are you sure you wish to delete this sticky note?"
              );
              if(doDelete){
            ui.draggable.remove();
            console.log($(ui.draggable));
            const id=$(ui.draggable).attr("id");
            console.log(id);
            const filtered = notes.filter(note => note.id!=id);
            console.log(filtered);
            localStorage.setItem('stickynotes-notes', JSON.stringify(filtered));
              }
        }
    });
});


if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("./serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}
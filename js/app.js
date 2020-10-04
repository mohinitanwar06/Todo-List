// CODE EXPLAINED channel
 //jshint eversion:6
 // CODE EXPLAINED channel
 const clear =document.querySelector(".clear");
 const dateElement=document.getElementById("date");
 const list=document.getElementById("list");
 const input=document.getElementById("input");
 //classes name
 const CHECK="fa-check-circle";
 const UNCHECK="fa-circle-thin";
 const LINE_THROUGH="lineThrough";

 let LIST,id=0;
 //get item from localstorage
 let data=localStorage.getItem("TODO");
 //check if data is not empty
 if (data){
     LIST=JSON.parse(data);//when data is fetched from thw web server
     id=LIST.length;//set the id to the last one in the list
     loadList(LIST);//load the list to the user interaface
 }else{
     LIST=[];
     id=0;
 }

 //load  item to localstorage
 function loadList(array){
     array.forEach(function(item){
         addtoDo(item.name,item.id,item.done,item.trash);
     });
 }
 clear.addEventListener("click",function(){
     localStorage.clear();
     location.reload();
 });


 
 const options={weekday:"long",month:"short",day:"numeric"};
 const today=new Date();


  dateElement.innerHTML=today.toLocaleDateString("en-IN",options);

  //add to do function
  function addtoDo(toDo,id,done,trash){
      if(trash){return;}
      const DONE=done?CHECK:UNCHECK;
      const LINE=done?LINE_THROUGH:" ";
      const itemno= `<li class="item">
      <i class="fa ${DONE} co" job="complete" id="${id}"></i>
      <p class="text${LINE}">${toDo}</p>
      <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
  </li>`;
                   
   

   const position="beforeend";
   list.insertAdjacentHTML(position,itemno);
  }
  const add=document.querySelector(".fa-plus-circle");
  add.addEventListener("click",function(event){
  const toDo=input.value;
   if(toDo){
  addtoDo(toDo,id,false,false);
  LIST.push({
      name:toDo,
      id:id,
      done:false,
      trash:false
  });

  //add item to localstorage (this code must be added where the list array is updated)
  localStorage.setItem("TODO",JSON.stringify(LIST));
  //when data goes to server then json.stringify as it goes as string

  
  id++;
   }
   input.value="";
  }
);
add.addEventListener("touchstart",function(event){
    const toDo=input.value;
     if(toDo){
    addtoDo(toDo,id,false,false);
    LIST.push({
        name:toDo,
        id:id,
        done:false,
        trash:false
    });
  
    //add item to localstorage (this code must be added where the list array is updated)
    localStorage.setItem("TODO",JSON.stringify(LIST));
    //when data goes to server then json.stringify as it goes as string
  
    
    id++;
     }
     input.value="";
    }
  );


//COMPLETE TODO
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done=LIST[element.id].done? false :true;

}

//to remove when trash is clicked
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash=true;
}

list.addEventListener("click",function(event){
    
    const element=event.target;
    console.log(event.target);//return the clicked element inside the list
    const elementJob=element.attributes.job.value;

    if(elementJob=="complete"){
        completeToDo(element);

    }else if(elementJob=="delete"){
        removeToDo(element);

    }
});
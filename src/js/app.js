let pagina=1;
document.addEventListener('DOMContentLoaded',function(){
    Appinicio();
});

function Appinicio(){
//Funcion para obtener los datos 
    obtenerDatos();

 //Mostrar seccionactual
    mostrarSeccion();  

 //Funcion para cambiar la pagina    
    cambiarPagina();

 //Funcion Paginaci
  paginacion();  

  //Funcion para comprobar en que pagina se encuentra para mostrar botones paginacion
  comprobarPagina();
}


//notones paginador
function comprobarPagina(){
    const anterior=document.querySelector('#anterior');
    const siguiente=document.querySelector('#siguiente');

    if (pagina===1){
        anterior.classList.add('ocultar');
        siguiente.classList.remove('ocultar');
    }else if(pagina===3){
        siguiente.classList.add('ocultar');
        anterior.classList.remove('ocultar');
       
    }else{
        anterior.classList.remove('ocultar');
        siguiente.classList.remove('ocultar');
    }

    mostrarSeccion();//cambia la seccion que se muestra

}

//botones
function paginacion(){
    const anterior=document.querySelector('#anterior').addEventListener("click",function(){
        pagina--;
        console.log(pagina);
        comprobarPagina();
    });

    const siguiente=document.querySelector('#siguiente').addEventListener("click",function(){
        pagina++;
        console.log(pagina);
        comprobarPagina();
  
    });

 
}

function mostrarSeccion(){
    //Eliminamos la seccion actual 
    const seccionAnterior=document.querySelector('.mostrar-seccion');
    if(seccionAnterior){
        seccionAnterior.classList.remove('mostrar-seccion');  
    }
      
    //Mostramos la seccion en la que estamos
    const seccionactual=document.querySelector(`#pagina-${pagina}`);
          seccionactual.classList.add('mostrar-seccion'); 
          
  //eliminar el tab anterior
   const tabAnterior=document.querySelector('.tab_actual');
      console.log(tabAnterior);
         if(tabAnterior){
             tabAnterior.classList.remove('tab_actual');  
         }
            
     //Se resalta el tab actual
    const tab=document.querySelector(`[data-menu="${pagina}"]`);
    tab.classList.add('tab_actual');
     

}

//Funcion para moverse entre paginas
function cambiarPagina(){
    const tabs= document.querySelectorAll(".tabs button");
      
    tabs.forEach(tab => {
        tab.addEventListener('click',function(e){
             e.preventDefault;   
            pagina=parseInt(e.target.dataset.menu);
           

    //Se muestra la seccion seleccionada        
    //const seccion=document.querySelector(`#pagina-${pagina}`);
          //seccion.classList.add("mostrar-seccion");  
         
    
     //Se activa el nuevo tab seleccionado
     //const tabActual=document.querySelector(`[data-menu="${pagina}"]`);
     //tabActual.classList.add('tab_actual');  

     mostrarSeccion();
     comprobarPagina();

        });
    });
}







//Obteniendo los datos
async function obtenerDatos(){

    //Promise
/*fetch("../../servicios.json")
    .then(resultado =>{
        //console.log(resultado);
        return resultado.json()
    })
    .then (datos=>{
        console.log(datos.servicios)
    })*/

    try {

   const resultado=await fetch("../../servicios.json");
   const datos= await resultado.json();
    // console.log(datos);
    const { servicios }=datos; 

    //Generar Html
    servicios.forEach(servicio => {  
     const { id,nombre,precio } =servicio;  
     
    //DOM Scripting

    //Se agrega el nombre
    const nombre_servicio=document.createElement('P');
          nombre_servicio.textContent=nombre;
          nombre_servicio.classList.add("titulo_servicio");

    //Se agrega el Precio
    const precio_servicio=document.createElement('P');
          precio_servicio.textContent="$"+precio;
          precio_servicio.classList.add('precio_ser');

    //Se crea el div 
    const div_servicio=document.createElement('DIV');
          div_servicio.classList.add('divServicio');
          div_servicio.dataset.idServicio=id;
          
          

   //Inyectamos el nombre y precio al div
   div_servicio.appendChild(nombre_servicio);    
   div_servicio.appendChild(precio_servicio);

   //Inyectamos el div en el html
   
    const MostrarSer=document.querySelector('#servicios');
        MostrarSer.appendChild(div_servicio);

     //Selecionamos un servicio para la cita   
        div_servicio.onclick=seleccionarDiv;
    
        

   });
        
    } catch (error) {
        console.log(error)
    }
}

//Funcion para seleccionar una cita
function seleccionarDiv(e){
let elemento;

//Forzamos que el elemento al que damos click sea el div
  if (e.target.tagName===('P')){
      elemento=e.target.parentElement;
  }else{
      elemento=e.target;  
  }

   if(elemento.classList.contains("seleccionado")){
       elemento.classList.remove("seleccionado");

   }else{
        elemento.classList.add("seleccionado")
   }
    console.log(elemento);
 }
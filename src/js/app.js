let pagina=1;

const cita={
    nombre:"",
    fecha:"",
    hora:"",
    servicios:[]
}

document.addEventListener('DOMContentLoaded',function(){
    Appinicio();
});

function Appinicio(){
  //Funcion para obtener los datos 
    obtenerDatos();

  //Mostrar seccion actual  
    mostrarSeccion();  

  //Funcion que oculta o muestra una secicon segun el tab al que se presiona    
    cambiarPagina();

  //Funcion paginacion siguiente y anterior
  paginacion();  

  //Funcion para comprobar en que pagina se encuentra para mostrar botones paginacion
  comprobarPagina();

  //Funcion que muestra error si no se han completado correctamente la cita
  resumenCita();

  //Funcion que valida el nombre en la cita
  nombreCita();

  //Funcion para validar la fecha
  fechaCita();

  //Desahabilitat dias anteriores 
  deshabilitarFechaAnterior();

  //Validar hora
  horaCita();
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

        resumenCita();//Estamos en la pagina 3 mostramos el resumen de la cita
       
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
        //console.log(pagina);
        comprobarPagina();
    });

    const siguiente=document.querySelector('#siguiente').addEventListener("click",function(){
        pagina++;
        //console.log(pagina);
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
      //console.log(tabAnterior);
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
      
    //Deseleccionamos cita
       elemento.classList.remove("seleccionado");
     
     //Identificamos el id de servicio a eliminar   
     const EliminarId=(parseInt(elemento.dataset.idServicio));      
        EliminarServicio(EliminarId); 

   }else{
        //Seleccionamos cita
        elemento.classList.add("seleccionado")

        //console.log(elemento.firstChild.nextSibling.textContent);
       //Creamos el objeto con los datos del servicio seleccionado
        const SerObj={
            id:parseInt(elemento.dataset.idServicio),
            nombre:elemento.firstElementChild.textContent,
            precio:elemento.firstElementChild.nextElementSibling.textContent
        }   
        //console.log(SerObj);  
        AgregarServicio(SerObj);
   }
    //console.log(elemento);
 }


//Mostrar resumen
function resumenCita(){
    //Destructuring
    const {nombre,fecha,hora,servicios}=cita;

    //Seleccionamos el div
    const ConRes=document.querySelector(".contenedor-resumen");

    //Limpiamos html
    while(ConRes.firstChild){
        ConRes.removeChild(ConRes.firstChild);
    }

    //Validacion de objeto
    if(Object.values(cita).includes("")){

        //Creamos el mensaje
        const MenRes=document.createElement('P');
            MenRes.textContent="Faltan datos de Servicios,hora,fecha o nombre";
            MenRes.classList.add("mensaje_resumen");

            ConRes.appendChild(MenRes); 

    }else{

        //heading cita
        const heading_cita= document.createElement('H3');
              heading_cita.textContent='Resumen cita';

        //Agregamos los campos de la cita
        const nombreCita=document.createElement("P");
              nombreCita.innerHTML=`<span>Nombre:</span>${nombre}`;

        const fechaCita=document.createElement("P");
              fechaCita.innerHTML=`<span>Fecha:</span>${fecha}`;
        
        const horaCita=document.createElement("P");
              horaCita.innerHTML=`<span>Hora:</span>${hora}`;  
              
        const ServiciosCita=document.createElement('DIV');
              ServiciosCita.classList.add('resumen-servicios');
              
        const heading_servicios=document.createElement('H3');
              heading_servicios.textContent="Resumen Servicios";      

         ServiciosCita.appendChild(heading_servicios);
        //Destructuring del arreglo en el objeto
        //const {nombre,precio}=servicios;

        //Creamos los servicios al html
        servicios.forEach(servicio => {
             
           //Creamos div para los servicios
          const Contenedor_Servicios=document.createElement('DIV'); 
                Contenedor_Servicios.classList.add('contenedor-servicio');  

          const textoServicio=document.createElement('P');
                textoServicio.textContent=servicio.nombre;
               // console.log(servicioNombre);

          const precioServicio=document.createElement('P');
                precioServicio.textContent=servicio.precio;
                precioServicio.classList.add('precio');
               // console.log(servicioPrecio);

            Contenedor_Servicios.appendChild(textoServicio);
            Contenedor_Servicios.appendChild(precioServicio);  
            
            ServiciosCita.appendChild(Contenedor_Servicios);

        }); 

            
               //Inyectamos html
               ConRes.appendChild(heading_cita);
               ConRes.appendChild(nombreCita);
               ConRes.appendChild(fechaCita);
               ConRes.appendChild(horaCita);   
               
               ConRes.appendChild(ServiciosCita);
                
               
        console.log(cita);
    }
}


function AgregarServicio(Objeto){

  //Destructuring
 const { servicios }=cita;

 //Combinamos el objeto con el servicio al servicios de la cita
 cita.servicios= [...servicios,Objeto];

    console.log(cita);
    //console.log("Se agrega un servicio");

}

function EliminarServicio(id){
//Destructuring   
const { servicios }=cita;

cita.servicios=servicios.filter(item => item.id !==id); 
console.log(cita);

}

function nombreCita(){
    const nombre=document.querySelector('#nombre');
            nombre.addEventListener('input',(e)=> {
             const nombreTexto=e.target.value.trim();       

                if(nombreTexto==="" || nombreTexto.length <3){
                    e.preventDefault();
                    alertaError("Error en nombre","error");
                }else{
                     const alerta=document.querySelector(".alerta");   
                     if(alerta){
                         alerta.remove();
                     }    

                    //console.log("Correcto");
                    cita.nombre=e.target.value.trim();
                }
               
                  //console.log(cita);
            });
}



function alertaError(mensaje,tipo){  
    
    //Si hay una alerta anterior no crea otra
    const alertaPrevia=document.querySelector(".alerta");
            if(alertaPrevia){
                return;
            }

        //console.log(mensaje);
    //Creamos la alertaa 
    const alerta=document.createElement('DIV');
          alerta.textContent=mensaje;
          alerta.classList.add('alerta');

            if(tipo=="error"){
                alerta.classList.add('error');
            }
    //insertar al html
    const formulario=document.querySelector(".formulario");
          formulario.appendChild(alerta);

    //Borrar la alerta a los tres segundos
    setTimeout(() => {
            alerta.remove();
    }, 3000);


}



function fechaCita(){
    const fecha=document.querySelector("#fecha");
          fecha.addEventListener("input", (e) =>{
            const dia= new Date(e.target.value).getUTCDay(); 

            if([0,6].includes(dia)){
                alertaError("No puedes seleccionar fines de semana","error");
                e.preventDefault();
                fecha.value="";
            }else{
                //console.log(Fecha);
                cita.fecha=fecha.value;
            }
               
          });
}


function deshabilitarFechaAnterior(){

    const fecha=document.querySelector("#fecha");

    const FechaActual= new Date();

    //Formato requerido AAAA-MM-DD

    const year=FechaActual.getFullYear();
    const mes=FechaActual.getMonth()+1;
    const dia=FechaActual.getDate()+1;

    const FechaDeshabilitar=`${year}-${mes < 10 ? `0${mes}` : mes}-${dia < 10 ? `0${dia}` : dia}`
    //`${year}-${mes < 10 ? `0${mes}` : mes}-${dia}`;

    //console.log(FechaDeshabilitar);

    fecha.min=FechaDeshabilitar;
}


function horaCita(){

    const hora=document.querySelector("#hora");
          hora.addEventListener("input",e =>{
           
            const Hora=e.target.value;
            const HORA=Hora.split(":");


            if(HORA[0]<10 || HORA[0]>18){
                alertaError("Seleciona una hora correcta","error");
                hora.value="";  
            }else{
                cita.hora=Hora;
                console.log(cita);
            }   
    });    



}



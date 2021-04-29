document.addEventListener('DOMContentLoaded',function(){
    Appinicio();
});

function Appinicio(){
   obtenerDatos();
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
    console.log(servicios);

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
          div_servicio.classList.add('divServicio')   

   //Unir los valores al div
   div_servicio.appendChild(nombre_servicio);    
   div_servicio.appendChild(precio_servicio);

   //Mostrar en html
   
    const MostrarSer=document.querySelector('#servicios');
        MostrarSer.appendChild(div_servicio);

    console.log(div_servicio);

   });
        
    } catch (error) {
        console.log(error)
    }
       
     
    
}
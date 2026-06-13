document.addEventListener('DOMContentLoaded', () => {

    const boton1 = document.querySelector('.boton1');
    const cuadroI = document.querySelector('.cuadro-inicio');
    const btnIngresar = document.getElementById('btn-ingresar');
    const inputUsuario = document.getElementById('input-usuario');
    const cerrar = document.querySelector('.icono-cerrar');
    const btnInvitado = document.getElementById('btn-invitado')
    const mensajeError = document.getElementById('mensaje-error')
    if (boton1 && cuadroI) {
        
        boton1.addEventListener('click', () => {
            cuadroI.classList.add('activar-inicio');
            mensajeError.textContent = "";
        });
        if (cerrar) {
            cerrar.addEventListener('click', () => {
                cuadroI.classList.remove('activar-inicio');
            });
        }
        btnIngresar.addEventListener('click', (evento) => {
            const nombreEscrito = inputUsuario.value.trim();
            
            if (nombreEscrito !== ""){
                sessionStorage.setItem('usuarioClancy', nombreEscrito);
            }else{
                evento.preventDefault();
                mensajeError.textContent = "Por favor, introduce tu nombre de usuario para continuar.";
            }
        });

        btnInvitado.addEventListener('click', () => {
            sessionStorage.removeItem('usuarioClancy');
        });
    }
});

 

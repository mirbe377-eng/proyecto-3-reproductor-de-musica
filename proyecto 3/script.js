const imagen = document.querySelector ('.contenedor-img img');
const titulo = document.getElementById ('titulo');
const progresoContenedor = document.getElementById ('progresoBarra');
const progreso = document.getElementById ('progreso');
const tiempoActual = document.getElementById ('tiempoActual');
const duracion = document.getElementById ('tiempoDuracion');
const musica = document.querySelector ('audio');
const anteriorBtn = document.getElementById ('prev');
const playBtn = document.getElementById ('play');
const siguienteBtn = document.getElementById ('next');

const cancion =[
    {
        name:'Heavydirtysoul',
        displayName:'Heavydirtysoul',
       
    },
    {
        name:'StressedOut',
        displayName:'Stressed Out',
    },
    {
        name:'Ride',
        displayName:'Ride',
    },
    {
        name:'FairlyLocal',
        displayName:'Fairly Local',
    },
   {
        name:'TearinMyHeart',
        displayName:'Tear in My Heart',
    },
    {
        name:'LaneBoy',
        displayName:'Lane Boy',
    },
   {
        name:'TheJudge',
        displayName:'The Judge',
    },
    {
        name:'Doubt',
        displayName:'Doubt',
    },
   {
        name:'Polarize',
        displayName:'Polarize',
    },
    {
        name:'WeDontBelieveWhatsOnTv',
        displayName:"We Don't Believe What's On Tv",
    },
    {
        name:'MassageMan',
        displayName:'Massage Man',
    },
    {
        name:'Hometown',
        displayName:'Hometown',
       
    },
    {
        name:'NotToday',
        displayName:'Not Today',
    },
    {
        name:'Goner',
        displayName:'Goner',
    },
];

let sonando = false;

function playcancion() {
    sonando = true;
    playBtn.setAttribute('name', 'pause');
    musica.play();
}

function pausecancion() {
    sonando = false;
    playBtn.setAttribute('name', 'play');
    musica.pause();
}

playBtn.addEventListener('click', () => (sonando ? pausecancion() : playcancion()));

function cargarcancion(song) {
    titulo.textContent = song.displayName;
    musica.src = `Musica/${song.name}.mp3`;
    imagen.src = `imagenes/${song.name}.jfif`;
}

let cancionIndice = 0;

function anteriorcancion() {
    cancionIndice--;
    if (cancionIndice < 0) {
        cancionIndice = cancion.length - 1;
    }
    cargarcancion(cancion[cancionIndice]);
    playcancion();
}

function siguientecancion() {
    cancionIndice++;
    if (cancionIndice > cancion.length - 1) {
        cancionIndice = 0;
    }
    cargarcancion(cancion[cancionIndice]);
    playcancion();
}


cargarcancion(cancion[cancionIndice]);

function actualizarProgreso(e) {
    if (sonando) {
        const { duration, currentTime } = e.srcElement;
        
       
        const progresoPorcentaje = (currentTime / duration) * 100;
        progreso.style.width = `${progresoPorcentaje}%`;
        
        
        const duracionMinutos = Math.floor(duration / 60);
        let duracionSegundos = Math.floor(duration % 60);
        if (duracionSegundos < 10) {
            duracionSegundos = `0${duracionSegundos}`;
        }
        
        if (duracionSegundos) {
            duracion.textContent = `${duracionMinutos}:${duracionSegundos}`;
        }
        
        
        const corretMinutos = Math.floor(currentTime / 60);
        let correSegundos = Math.floor(currentTime % 60);
        if (correSegundos < 10) {
            correSegundos = `0${correSegundos}`;
        }
        
        tiempoActual.textContent = `${corretMinutos}:${correSegundos}`;
    }
}

function establecerProgreso(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = musica; 
    musica.currentTime = (clickX / width) * duration;
}

anteriorBtn.addEventListener('click', anteriorcancion);
siguienteBtn.addEventListener('click', siguientecancion);
musica.addEventListener('ended', siguientecancion);
musica.addEventListener('timeupdate', actualizarProgreso);
progresoContenedor.addEventListener('click', establecerProgreso);

const tarjetasCanciones = document.querySelectorAll('.cancion');

tarjetasCanciones.forEach((tarjeta) => {
    tarjeta.addEventListener('click', () => {
      
        const indiceSeleccionado = parseInt(tarjeta.getAttribute('data-index'));
        
       
        cancionIndice = indiceSeleccionado;
        
        
        cargarcancion(cancion[cancionIndice]);
        playcancion();
    });
});


window.addEventListener('load', () => {
    
    const perfilContenedor = document.getElementById('perfil-contenedor-barra');
    const nombrePantalla2 = document.getElementById('nombre-pantalla2');

   
    const usuarioGuardado = sessionStorage.getItem('usuarioClancy');

    if (usuarioGuardado) {
       
        perfilContenedor.classList.remove('oculto');
        nombrePantalla2.textContent = usuarioGuardado;
    } else {
       
        perfilContenedor.classList.add('oculto');
        nombrePantalla2.textContent = "";
    }
});

const buscador = document.getElementById('buscador-canciones');
const listaResultados = document.getElementById('lista-resultados');

function renderizarResultados(listaFiltrada) {
    listaResultados.innerHTML = "";

    if (listaFiltrada.length === 0) {
        listaResultados.innerHTML = `<div class="resultado-item" style="cursor:default; color: #b3b3b3;">No se encontraron canciones</div>`;
        return;
    }

    listaFiltrada.forEach(song => {
  
        const indiceReal = cancion.findIndex(c => c.name === song.name);

        const item = document.createElement('div');
        item.classList.add('resultado-item');
        item.innerHTML = `
            <img src="imagenes/${song.name}.jfif" class="resultado-img">
            <div class="resultado-info">
                <span class="resultado-titulo">${song.displayName}</span>
                <span class="resultado-artista">Twenty One Pilots</span>
            </div>
        `;

        item.addEventListener('click', () => {
            cancionIndice = indiceReal;
         
            cargarcancion(cancion[cancionIndice]);
            playcancion();
         
            listaResultados.classList.add('oculto');
            buscador.value = "";
        });

        listaResultados.appendChild(item);
    });
}

buscador.addEventListener('focus', () => {
    listaResultados.classList.remove('oculto');
    const texto = buscador.value.toLowerCase().trim();

    const filtradas = cancion.filter(c => c.displayName.toLowerCase().includes(texto));
    renderizarResultados(filtradas);
});

buscador.addEventListener('input', (e) => {
    const texto = e.target.value.toLowerCase().trim();
    const filtradas = cancion.filter(c => c.displayName.toLowerCase().includes(texto));
    renderizarResultados(filtradas);
});


document.addEventListener('click', (e) => {
    if (!buscador.contains(e.target) && !listaResultados.contains(e.target)) {
        listaResultados.classList.add('oculto');
    }
});
function loadCards() {
    const url = 'http://localhost:3000/api/parkings';  // Asegúrate de que el puerto coincida con el de tu servidor

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('parking-container');
            container.innerHTML = '';  // Limpiar el contenedor antes de añadir nuevas tarjetas

            let cardsHtml = '';
            data.forEach(parking => {
                cardsHtml += `
                <div class="swiper-slide">
                    <div class="card">
                        <div class="parking-image" style="background-image: url('${parking.imagenURL}');" role="img" aria-label="Imagen del parking ${parking.nombre}"></div>
                        <div class="card-content">
                            <h1 class="card-title">${parking.nombre}</h1>
                            <div class="subtitle-wrapper">
                                <h2 class="card-subtitle">${parking.direccion}</h2>
                                <a><span class="icon-diamond"><i class="fa-solid fa-diamond-turn-right fa-2xl"></i></span></a>
                            </div>
                            <p class="card-description">${parking.descripcion}</p>
                            <section class="info-wrapper">
                                <div class="info-text distance" aria-label="Distancia al centro">${parking.distancia}
                                    <span class="icon-walking"><i class="fas fa-walking"></i>
                                    </span>
                                </div>
                                <div class="info-text capacidad" aria-label="Vehículos">${parking.capacidad}
                                    <span class="icon-car"><i class="fa-solid fa-car"></i><i class="fa-solid fa-car"></i></span>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            `;
            });
            container.innerHTML = cardsHtml;

           


        })
        .catch(error => {
            console.error('Error fetching data: ', error);
            alert('Error al cargar los datos de los parkings.');
        });
}


document.addEventListener('DOMContentLoaded', function () {
    loadCards();  // Carga las tarjetas cuando el documento esté completamente cargado
});

// Asegúrate de que Swiper se inicialice después de que las tarjetas estén en el DOM
window.addEventListener('load', function () {
    new Swiper('.swiper-container', {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
    });
});
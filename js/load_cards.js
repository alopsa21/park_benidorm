document.addEventListener('DOMContentLoaded', async function () {
    const url = 'http://192.168.1.28:3000/api/parkings';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`No se pudo cargar la lista de parkings: ${response.statusText}`);
        }

        const data = await response.json();
        if (!data.length) {
            throw new Error('No se encontraron parkings para mostrar.');
        }

        updateParkingList(data);
    } catch (error) {
        console.error('Error al cargar la lista de parkings:', error);
    }
});

function updateParkingList(parkings) {
    const parkingList = document.getElementById('parkingList');
    const olElement = document.createElement('ol');
    olElement.style.setProperty('--length', parkings.length);
    olElement.role = 'list';

    parkings.forEach((parking, index) => {
        const liElement = document.createElement('li');
        liElement.style.setProperty('--i', index + 1);
        liElement.innerHTML = `<h3>${parking.nombre}</h3><p>${parking.descripcion}</p>`;
        olElement.appendChild(liElement);
    });

    parkingList.appendChild(olElement);
}

const cafeUrl = "https://apexapp.tech/nextlevel_exercise18/api.php";

function createCafe() {
    const name = document.getElementById('name').value;
    const location = document.getElementById('location').value;
    const rating = document.getElementById('rating').value;
    const capacity = document.getElementById('capacity').value;
    const open_hours = document.getElementById('open_hours').value;

    fetch(cafeUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            location: location,
            rating: rating,
            capacity: capacity,
            open_hours: open_hours,
        }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        readCafes();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function readCafes() {
    fetch(cafeUrl, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(cafes => {
        const cafeBody = document.getElementById('cafeBody');
        cafeBody.innerHTML = '';

        cafes.forEach(cafe => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${cafe.id}</td>
                <td>${cafe.name}</td>
                <td>${cafe.location}</td>
                <td>${cafe.rating}</td>
                <td>${cafe.capacity}</td>
                <td>${cafe.open_hours}</td>
            `;
            cafeBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function updateCafe() {
    const id = prompt('Enter the ID of the Cafe to update:');
    if (id === null) return;

    const name = prompt('Enter the new name:');
    const location = prompt('Enter the new location:');
    const rating = prompt('Enter the new rating:');
    const capacity = prompt('Enter the new capacity:');
    const open_hours = prompt('Enter the new open hours:');

    fetch(cafeUrl, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `id=${id}&name=${name}&location=${location}&rating=${rating}
            &capacity=${capacity}&open_hours=${open_hours}`,
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        readCafes();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function deleteCafe() {
    const id = prompt('Enter the ID of the Cafe to delete:');
    if (id === null) return;

    fetch(cafeUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `id=${id}`,
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        readCafes();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Initial load of Cafes
readCafes();

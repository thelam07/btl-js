const token = localStorage.getItem('token');
if (!token) {
    window.location.href = 'login-adm.html';
}

fetch('https://btl-js-server.onrender.com/api/contacts', {
    headers: {
        'Authorization': token
    }
})
    .then(res => res.json())
    .then(data => {
        const tbody = document.querySelector('tbody');
        data.forEach((contact, index) => {
            tbody.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${contact.name}</td>
                    <td>${contact.email}</td>
                    <td>${contact.phone}</td>
                    <td>${contact.message}</td>
                </tr>
            `;
        });
    })
    .catch(err => {
        console.error('Error:', err);
    });


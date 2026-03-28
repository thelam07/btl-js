document.querySelector('form')
    .addEventListener('submit', function (e) {
        e.preventDefault();
        console.log('Form submitted');
        const username = document.querySelector('input[name="username"]').value;
        const password = document.querySelector('input[name="password"]').value;

        if (!username || !password) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }

        fetch('https://btl-js-server.onrender.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert('Đăng nhập thành công');
                    localStorage.setItem('token', data.token);
                    window.location.href = 'admin.html';
                } else {
                    alert('Đăng nhập thất bại: ' + data.message);
                }
            })
            .catch(err => {
                console.error('Error:', err);
                alert('Có lỗi xảy ra');
            });
    });
document.querySelector('form')
    .addEventListener('submit', function (e) {
        e.preventDefault();
        console.log('Form submitted');
        const name = document.querySelector('input[name="name-user"]').value;
        const email = document.querySelector('input[name="email-user"]').value;
        const phone = document.querySelector('input[name="phone-user"]').value;
        const message = document.querySelector('textarea[name="message-user"]').value;
        const turnstileToken = document.querySelector('[name="cf-turnstile-response"]').value;

        if (!name || !email || !phone || !message) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }
        if (!email.includes('@')) {
            alert('Vui lòng nhập email hợp lệ');
            return;
        }
        fetch('https://btl-js-server.onrender.com/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                message,
                turnstileToken
            })
        })
            .then(res => res.text())
            .then(data => {
                alert('Gửi thành công');
                document.querySelector('form').reset();
            })
            .catch(err => {
                console.log(err);
            })
    });
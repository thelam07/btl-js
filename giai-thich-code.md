# Giải thích toàn bộ code JavaScript trong project

---

## FILE 1: script.js — Frontend trang chính

### Phần 1: Xử lý gửi form liên hệ (dòng 1-40)

```js
document.querySelector('form')
    .addEventListener('submit', function (e) {
```
- `document.querySelector('form')` → tìm thẻ `<form>` đầu tiên trong HTML
- `.addEventListener('submit', function(e) {...})` → lắng nghe sự kiện "submit" (khi user bấm nút Gửi)
- `e` là object chứa thông tin về sự kiện

```js
        e.preventDefault();
```
- Chặn hành vi mặc định của form (mặc định form sẽ reload trang và gửi data lên URL). Ta chặn lại để tự xử lý bằng `fetch()`

```js
        const name = document.querySelector('input[name="name-user"]').value;
        const email = document.querySelector('input[name="email-user"]').value;
        const phone = document.querySelector('input[name="phone-user"]').value;
        const message = document.querySelector('textarea[name="message-user"]').value;
        const turnstileToken = document.querySelector('[name="cf-turnstile-response"]').value;
```
- Lấy giá trị người dùng nhập từ các input bằng `.value`
- `turnstileToken` là token do Cloudflare Turnstile tự tạo sau khi user tick "Tôi không phải robot"

```js
        if (!name || !email || !phone || !message) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }
```
- **Validate**: kiểm tra nếu bất kỳ trường nào trống (`!name` = name rỗng = false → `!false` = true)
- `return` → dừng function, không chạy tiếp xuống dưới

```js
        if (!email.includes('@')) {
            alert('Vui lòng nhập email hợp lệ');
            return;
        }
```
- Kiểm tra email có chứa ký tự `@` không. `includes()` trả về true/false

```js
        fetch('https://btl-js-server.onrender.com/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, email, phone, message, turnstileToken
            })
        })
```
- `fetch()` → gửi HTTP request đến server
- `method: 'POST'` → gửi dữ liệu lên (không phải lấy về)
- `headers` → báo server: "dữ liệu tôi gửi là JSON"
- `body: JSON.stringify({...})` → chuyển object JS thành chuỗi JSON để gửi đi
- `{ name, email, phone, message, turnstileToken }` là viết tắt của `{ name: name, email: email, ... }`

```js
            .then(res => res.text())
            .then(data => {
                alert('Gửi thành công');
                document.querySelector('form').reset();
            })
            .catch(err => {
                console.log(err);
            })
```
- `.then()` → chạy khi server trả kết quả về thành công
- `res.text()` → đọc response dưới dạng text
- `.then(data => {...})` → xử lý data nhận được: hiện thông báo + xóa form
- `.reset()` → xóa sạch tất cả input trong form về giá trị ban đầu
- `.catch()` → chạy khi có lỗi (server không phản hồi, mất mạng...)

---

### Phần 2: Hamburger menu (dòng 42-50)

```js
document.querySelector('.menu-hamburger').addEventListener('click', function () {
    document.querySelector('.danh-sach-menu').classList.toggle('active');
});
```
- Lấy nút hamburger → khi click → toggle class `active` trên menu
- `classList.toggle('active')` → nếu chưa có class `active` thì thêm vào, nếu có rồi thì xóa đi
- CSS đã định nghĩa: `.danh-sach-menu.active { display: flex }` → menu hiện ra

```js
document.querySelectorAll('.danh-sach-menu a').forEach(function (link) {
    link.addEventListener('click', function () {
        document.querySelector('.danh-sach-menu').classList.remove('active');
    });
});
```
- `querySelectorAll()` → lấy TẤT CẢ link trong menu (khác `querySelector` chỉ lấy 1 cái)
- `.forEach()` → lặp qua từng link, thêm event listener cho mỗi cái
- Khi click link → `classList.remove('active')` → xóa class active → menu đóng lại

---

### Phần 3: Scroll active menu (dòng 52-68)

```js
const sections = document.querySelectorAll('#home, #about, #services, #projects, #contact');
const menuLinks = document.querySelectorAll('.danh-sach-menu a');
```
- Lấy tất cả section và tất cả link menu

```js
window.addEventListener('scroll', function () {
```
- Lắng nghe sự kiện scroll trên cửa sổ trình duyệt — mỗi khi user cuộn trang, function này chạy

```js
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
```
- Lặp qua từng section
- `offsetTop` → khoảng cách từ section đến đầu trang (px)
- `clientHeight` → chiều cao của section (px)

```js
        if (window.scrollY >= sectionTop - sectionHeight / 2) {
```
- `window.scrollY` → vị trí cuộn hiện tại
- Nếu đã cuộn qua nửa section trước đó → section này đang active

```js
            menuLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + section.id) {
                    link.classList.add('active');
                }
            });
```
- Xóa class `active` khỏi tất cả link
- Link nào có `href` trùng với `id` section đang active → thêm class `active`
- Ví dụ: section `id="services"` → link `href="#services"` được highlight

---

## FILE 2: server.js — Backend (Node.js + Express)

### Phần 1: Import và khởi tạo (dòng 1-10)

```js
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
```
- `require()` → import thư viện vào sử dụng (giống `#include` trong C)
- `express` → framework tạo server
- `cors` → cho phép frontend khác domain gọi đến server
- `createClient` → hàm tạo kết nối Supabase (dùng destructuring `{ }` để lấy ra)

```js
const app = express();
```
- Tạo một ứng dụng server Express

```js
app.use(cors());
app.use(express.json());
```
- `app.use()` → đăng ký middleware (code chạy trước mỗi request)
- `cors()` → cho phép frontend từ domain khác (Vercel) gọi đến server (Render)
- `express.json()` → tự động parse body JSON thành object JS (để dùng `req.body`)

```js
const supabase = createClient('url', 'key');
```
- Tạo kết nối đến database Supabase bằng URL và anon key

---

### Phần 2: API endpoint gửi form (dòng 12-41)

```js
app.post('/api/contact', async (req, res) => {
```
- `app.post()` → tạo endpoint nhận request POST tại đường dẫn `/api/contact`
- `async` → cho phép dùng `await` bên trong (chờ thao tác bất đồng bộ)
- `req` (request) → chứa dữ liệu client gửi lên
- `res` (response) → dùng để trả kết quả về cho client

```js
    const turnstileToken = req.body.turnstileToken
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            secret: 'SECRET_KEY',
            response: turnstileToken
        })
    })
    const verifyData = await verifyRes.json()
    if (!verifyData.success) {
        res.status(403).send('Bot detected')
        return
    }
```
- Lấy token Turnstile từ body request
- Gửi token đến Cloudflare để xác minh (kiểm tra user có phải bot không)
- `await` → chờ Cloudflare trả kết quả rồi mới tiếp tục
- Nếu verify fail → trả status 403 (Forbidden) + dừng, không insert database

```js
    const { data, error } = await supabase.from('contacts').insert({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message
    })
```
- `supabase.from('contacts')` → chọn table `contacts`
- `.insert({...})` → thêm 1 dòng mới vào table
- `await` → chờ database xử lý xong
- `{ data, error }` → destructuring kết quả: `data` chứa dữ liệu, `error` chứa lỗi (nếu có)

```js
    if (error) {
        res.status(500).send('Error');
    } else {
        res.send('Thanh cong');
    }
```
- Nếu có lỗi → trả status 500 (Server Error)
- Nếu ok → trả "Thanh cong"

---

### Phần 3: API endpoint đăng nhập (dòng 43-51)

```js
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
```
- Endpoint POST `/api/login` — nhận username và password từ client
- `{ username, password } = req.body` → destructuring: lấy 2 giá trị từ body

```js
    const { data, error } = await supabase
        .from('admin')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();
```
- Truy vấn table `admin` trong Supabase
- `.select('*')` → lấy tất cả cột
- `.eq('username', username)` → WHERE username = giá trị nhập
- `.eq('password', password)` → AND password = giá trị nhập
- `.single()` → chỉ lấy 1 dòng (vì chỉ có 1 admin match)

```js
    if (error || !data) {
        res.status(401).json({ success: false, message: 'Sai tài khoản hoặc mật khẩu' })
    } else {
        res.json({ success: true, token: data.token })
    }
```
- Nếu sai hoặc không tìm thấy → trả 401 (Unauthorized)
- Nếu đúng → trả token để client lưu lại (dùng cho các request sau)

---

### Phần 4: API endpoint lấy danh sách contacts (dòng 53-68)

```js
app.get('/api/contacts', async (req, res) => {
    const token = req.headers.authorization
```
- Endpoint GET `/api/contacts` — lấy danh sách liên hệ
- `req.headers.authorization` → lấy token từ header request (client gửi kèm)

```js
    const { data, error } = await supabase
        .from('admin')
        .select('*')
        .eq('token', token)
        .single();
    if (error || !data) {
        res.status(401).send('Unauthorized');
    }
```
- Kiểm tra token có hợp lệ không (tìm trong table admin)
- Nếu token sai → 401 Unauthorized, chặn truy cập

```js
    else {
        const { data: contacts, error: contactsError } = await supabase
            .from('contacts')
            .select('*');
        res.send(contacts);
    }
```
- Nếu token đúng → query tất cả dữ liệu từ table `contacts`
- `data: contacts` → đổi tên biến `data` thành `contacts` (vì `data` đã dùng ở trên)
- Trả danh sách contacts về cho client

---

### Phần 5: Khởi chạy server (dòng 70-72)

```js
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```
- Bật server lắng nghe tại port 3000
- Giống "mở cửa hàng" — server sẵn sàng nhận request từ client

---

## FILE 3: login.js — Xử lý đăng nhập admin

```js
document.querySelector('form')
    .addEventListener('submit', function (e) {
        e.preventDefault();
```
- Giống script.js: lấy form → lắng nghe submit → chặn reload trang

```js
        const username = document.querySelector('input[name="username"]').value;
        const password = document.querySelector('input[name="password"]').value;

        if (!username || !password) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }
```
- Lấy giá trị username, password → validate không được trống

```js
        fetch('https://btl-js-server.onrender.com/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
```
- Gửi POST request đến endpoint `/api/login` trên server

```js
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
```
- `res.json()` → parse response thành object JS (khác `res.text()` ở script.js)
- Nếu `data.success` = true:
  - `localStorage.setItem('token', data.token)` → lưu token vào bộ nhớ trình duyệt (tồn tại sau khi đóng tab)
  - `window.location.href = 'admin.html'` → chuyển hướng sang trang admin
- Nếu false → hiện thông báo lỗi

---

## FILE 4: admin.js — Trang quản trị hiển thị contacts

```js
const token = localStorage.getItem('token');
if (!token) {
    window.location.href = 'login-adm.html';
}
```
- `localStorage.getItem('token')` → lấy token đã lưu khi đăng nhập
- Nếu không có token (chưa đăng nhập) → tự động chuyển về trang login
- Đây là cách **bảo vệ trang admin** — không đăng nhập thì không vào được

```js
fetch('https://btl-js-server.onrender.com/api/contacts', {
    headers: {
        'Authorization': token
    }
})
```
- Gửi GET request đến `/api/contacts` để lấy danh sách liên hệ
- `Authorization: token` → gửi kèm token trong header để server xác minh quyền truy cập

```js
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
```
- `data` là mảng (array) các object contact nhận từ server
- `.forEach((contact, index) => {...})` → lặp qua từng contact, `index` là số thứ tự (bắt đầu từ 0)
- `tbody.innerHTML += ...` → thêm HTML vào bảng
- `` `...` `` → template literal (chuỗi đặc biệt cho phép nhúng biến bằng `${...}`)
- `${index + 1}` → STT (cộng 1 vì index bắt đầu từ 0)
- Kết quả: mỗi contact thành 1 dòng trong bảng HTML

---

## Tóm tắt luồng hoạt động

### Luồng 1: User gửi form liên hệ
```
User điền form → script.js validate → fetch POST /api/contact
→ server.js verify Turnstile → insert vào Supabase → trả kết quả
→ script.js hiện alert + reset form
```

### Luồng 2: Admin xem dữ liệu
```
Admin vào login-adm.html → nhập username/password → login.js fetch POST /api/login
→ server.js kiểm tra trong table admin → trả token
→ login.js lưu token vào localStorage → chuyển sang admin.html
→ admin.js lấy token → fetch GET /api/contacts (kèm token trong header)
→ server.js kiểm tra token → query table contacts → trả data
→ admin.js render dữ liệu vào bảng HTML
```

---

## Các khái niệm quan trọng

| Khái niệm | Giải thích |
|-----------|-----------|
| `querySelector` | Tìm 1 phần tử HTML trong trang |
| `querySelectorAll` | Tìm TẤT CẢ phần tử match selector |
| `addEventListener` | Lắng nghe sự kiện (click, submit, scroll...) |
| `preventDefault()` | Chặn hành vi mặc định của trình duyệt |
| `classList.toggle/add/remove` | Thêm/xóa/bật-tắt class CSS trên phần tử |
| `fetch()` | Gửi HTTP request đến server |
| `async/await` | Chờ thao tác bất đồng bộ hoàn thành rồi mới tiếp tục |
| `.then()/.catch()` | Xử lý kết quả thành công/thất bại của Promise |
| `JSON.stringify()` | Object JS → chuỗi JSON (để gửi đi) |
| `res.json()` | Chuỗi JSON → Object JS (để sử dụng) |
| `localStorage` | Bộ nhớ trình duyệt, tồn tại sau khi đóng tab |
| `require()` | Import thư viện trong Node.js |
| `app.get/post()` | Tạo endpoint API trong Express |
| `req.body` | Dữ liệu client gửi lên server |
| `res.send/json()` | Server trả kết quả về cho client |
| `supabase.from().insert/select()` | Thao tác database (thêm/lấy dữ liệu) |

---

## Ví dụ minh họa từng khái niệm

### 1. querySelector vs querySelectorAll

```js
// querySelector → lấy 1 phần tử ĐẦU TIÊN match
document.querySelector('h1')           // → lấy thẻ <h1> đầu tiên
document.querySelector('.logo')        // → lấy phần tử có class="logo"
document.querySelector('#home')        // → lấy phần tử có id="home"
document.querySelector('input[name="email"]')  // → lấy input có name="email"

// querySelectorAll → lấy TẤT CẢ match, trả về danh sách
document.querySelectorAll('a')         // → tất cả thẻ <a> trong trang
document.querySelectorAll('.the-dich-vu')  // → tất cả phần tử có class "the-dich-vu"
```

**Ví dụ thực tế**: Em có 3 card dịch vụ. `querySelector('.the-dich-vu')` chỉ lấy card đầu tiên. `querySelectorAll('.the-dich-vu')` lấy cả 3 card.

---

### 2. addEventListener — Lắng nghe sự kiện

```js
// Cấu trúc: phầnTử.addEventListener('tênSựKiện', function)

// Click vào nút
nutBam.addEventListener('click', function() {
    alert('Bạn vừa click!')
})

// Submit form
form.addEventListener('submit', function(e) {
    e.preventDefault()  // chặn reload trang
    // xử lý dữ liệu...
})

// Cuộn trang
window.addEventListener('scroll', function() {
    console.log('Đang cuộn trang, vị trí:', window.scrollY)
})
```

**Các sự kiện hay gặp**:
- `'click'` → khi click chuột
- `'submit'` → khi gửi form
- `'scroll'` → khi cuộn trang
- `'keydown'` → khi bấm phím
- `'mouseover'` → khi di chuột vào phần tử

---

### 3. preventDefault() — Chặn hành vi mặc định

```js
// KHÔNG CÓ preventDefault:
// Bấm Gửi → form tự gửi data lên URL → trang reload
// URL thành: localhost:5500?name=Lam&email=lam@gmail.com

// CÓ preventDefault:
// Bấm Gửi → form KHÔNG tự gửi → trang KHÔNG reload
// Ta tự xử lý bằng fetch()

form.addEventListener('submit', function(e) {
    e.preventDefault()  // "Đừng làm theo mặc định, để tôi xử lý"
    // ... tự xử lý bằng fetch()
})
```

**Ví dụ khác**: thẻ `<a href="google.com">` mặc định chuyển trang. Nếu `preventDefault()` thì click vào nhưng không chuyển trang.

---

### 4. classList — Thao tác class CSS

```js
const menu = document.querySelector('.danh-sach-menu')

menu.classList.add('active')      // Thêm class → <div class="danh-sach-menu active">
menu.classList.remove('active')   // Xóa class  → <div class="danh-sach-menu">
menu.classList.toggle('active')   // Bật/tắt    → có thì xóa, không có thì thêm
menu.classList.contains('active') // Kiểm tra   → true hoặc false
```

**Ví dụ thực tế**: hamburger menu
- Lần 1 click: `toggle('active')` → thêm class `active` → CSS `display: flex` → menu hiện
- Lần 2 click: `toggle('active')` → xóa class `active` → CSS `display: none` → menu ẩn

---

### 5. fetch() — Gửi request đến server

```js
// GET — lấy dữ liệu (mặc định)
fetch('https://server.com/api/contacts')
    .then(res => res.json())
    .then(data => console.log(data))
// Tưởng tượng: gọi điện đến nhà hàng hỏi "menu có gì?"

// POST — gửi dữ liệu lên
fetch('https://server.com/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Lâm', email: 'lam@gmail.com' })
})
// Tưởng tượng: gọi điện đến nhà hàng nói "tôi đặt bàn, tên Lâm, email này"
```

**Phân biệt `res.text()` vs `res.json()`**:
```js
// Server trả về: "Thanh cong" (chuỗi text)
.then(res => res.text())   // → "Thanh cong"

// Server trả về: {"success": true, "token": "abc123"} (JSON)
.then(res => res.json())   // → { success: true, token: "abc123" }  (object JS)
```

---

### 6. .then() và .catch() — Xử lý Promise

```js
// Ví dụ đời thường: đặt đồ ăn online
datDoAn('pizza')
    .then(doAn => {          // Giao hàng thành công
        console.log('Nhận được:', doAn)
    })
    .catch(loi => {          // Giao hàng thất bại
        console.log('Lỗi:', loi)
    })

// Trong code thực:
fetch('/api/contact', { ... })
    .then(res => res.text())      // Bước 1: đọc response
    .then(data => {               // Bước 2: xử lý data
        alert('Thành công!')
    })
    .catch(err => {               // Nếu bất kỳ bước nào lỗi
        alert('Có lỗi xảy ra')
    })
```

**Chuỗi .then()**: mỗi `.then()` nhận kết quả từ `.then()` trước đó, chạy tuần tự.

---

### 7. async/await — Cách viết khác của .then()

```js
// Cách 1: dùng .then() (callback)
fetch('/api/contacts')
    .then(res => res.json())
    .then(data => console.log(data))

// Cách 2: dùng async/await (dễ đọc hơn)
async function layContacts() {
    const res = await fetch('/api/contacts')  // chờ fetch xong
    const data = await res.json()             // chờ parse xong
    console.log(data)                         // rồi mới dùng
}
```

**Tại sao cần async/await?** Vì thao tác với server/database mất thời gian. `await` = "đợi xong rồi hãy chạy dòng tiếp theo". Không có `await` thì code chạy tiếp mà chưa có kết quả → lỗi.

---

### 8. JSON.stringify() vs JSON.parse()

```js
// Object JS → chuỗi JSON (để gửi đi)
const user = { name: 'Lâm', age: 19 }
JSON.stringify(user)   // → '{"name":"Lâm","age":19}'

// Chuỗi JSON → Object JS (để sử dụng)
const chuoi = '{"name":"Lâm","age":19}'
JSON.parse(chuoi)      // → { name: 'Lâm', age: 19 }
```

**Tại sao cần stringify?** Vì HTTP chỉ gửi được text, không gửi được object JS. Nên phải chuyển object → chuỗi JSON → gửi đi → server nhận chuỗi → parse lại thành object.

---

### 9. localStorage — Lưu dữ liệu trên trình duyệt

```js
// Lưu vào (key - value, đều là string)
localStorage.setItem('token', 'abc123')
localStorage.setItem('username', 'admin')

// Lấy ra
localStorage.getItem('token')      // → 'abc123'
localStorage.getItem('username')   // → 'admin'

// Xóa
localStorage.removeItem('token')

// Xóa hết
localStorage.clear()
```

**Khác gì biến thường?** Biến JS mất khi reload trang. `localStorage` tồn tại vĩnh viễn (cho đến khi xóa hoặc xóa cache trình duyệt). Dùng để nhớ trạng thái đăng nhập.

---

### 10. Destructuring — Rút gọn code

```js
// Không dùng destructuring:
const data = req.body
const username = data.username
const password = data.password

// Dùng destructuring (ngắn gọn hơn):
const { username, password } = req.body
// Tự động lấy req.body.username gán vào biến username
// Tự động lấy req.body.password gán vào biến password

// Ví dụ khác:
const { data, error } = await supabase.from('contacts').insert({...})
// Supabase trả về object { data: ..., error: ... }
// Destructuring tách ra thành 2 biến riêng
```

---

### 11. Arrow function — Cách viết function ngắn gọn

```js
// Cách 1: function thường
function congHaiSo(a, b) {
    return a + b
}

// Cách 2: arrow function (viết tắt)
const congHaiSo = (a, b) => {
    return a + b
}

// Cách 3: arrow function siêu ngắn (1 dòng thì bỏ {} và return)
const congHaiSo = (a, b) => a + b

// Trong project:
sections.forEach(section => { ... })
// Tương đương:
sections.forEach(function(section) { ... })
```

---

### 12. forEach — Lặp qua mảng

```js
const fruits = ['Táo', 'Cam', 'Xoài']

// forEach: lặp qua từng phần tử
fruits.forEach(function(fruit, index) {
    console.log(index, fruit)
})
// Kết quả:
// 0 "Táo"
// 1 "Cam"
// 2 "Xoài"

// Trong project — lặp qua danh sách contacts từ database:
data.forEach((contact, index) => {
    // contact = { name: 'Lâm', email: 'lam@gmail.com', ... }
    // index = 0, 1, 2, ...
    tbody.innerHTML += `<tr><td>${contact.name}</td></tr>`
})
```

---

### 13. Template Literal — Chuỗi có nhúng biến

```js
const name = 'Lâm'
const age = 19

// Cách cũ: nối chuỗi bằng +
const msg1 = 'Tôi tên ' + name + ', ' + age + ' tuổi'

// Cách mới: template literal (dùng backtick ` ` và ${})
const msg2 = `Tôi tên ${name}, ${age} tuổi`

// Cả hai đều ra: "Tôi tên Lâm, 19 tuổi"

// Trong project — tạo HTML động:
tbody.innerHTML += `
    <tr>
        <td>${index + 1}</td>
        <td>${contact.name}</td>
        <td>${contact.email}</td>
    </tr>
`
// ${index + 1} → tính toán rồi nhúng kết quả vào chuỗi
```

---

### 14. HTTP Status Codes — Mã trạng thái

```
200 — OK (thành công)
201 — Created (tạo mới thành công)
204 — No Content (thành công nhưng không có dữ liệu trả về)

400 — Bad Request (request sai format)
401 — Unauthorized (chưa đăng nhập / token sai)
403 — Forbidden (không có quyền, bị cấm)
404 — Not Found (không tìm thấy endpoint)

500 — Internal Server Error (server bị lỗi)
```

**Trong project**:
- `res.status(401)` → sai đăng nhập
- `res.status(403)` → bị Turnstile chặn (bot)
- `res.status(500)` → lỗi database

---

### 15. Express Middleware — Code chạy trước mỗi request

```js
// Middleware giống "bảo vệ cửa hàng" — kiểm tra trước khi vào

app.use(cors())           // Bảo vệ 1: cho phép khách từ domain khác vào
app.use(express.json())   // Bảo vệ 2: tự động đọc JSON từ body request

// Thứ tự: Request đến → cors() kiểm tra → express.json() parse body → endpoint xử lý

// Ví dụ tự tạo middleware:
app.use(function(req, res, next) {
    console.log('Có request đến:', req.method, req.url)
    next()  // cho đi tiếp vào endpoint
})
```

---

### 16. req và res — Request và Response

```js
app.post('/api/contact', (req, res) => {
    // req (request) — thông tin CLIENT gửi lên:
    req.body              // → { name: 'Lâm', email: '...' }  (dữ liệu)
    req.headers           // → { 'Content-Type': 'application/json', ... }
    req.method            // → 'POST'
    req.url               // → '/api/contact'

    // res (response) — SERVER trả về cho client:
    res.send('OK')                        // trả text
    res.json({ success: true })           // trả JSON
    res.status(404).send('Not found')     // trả kèm status code
})
```

**Tưởng tượng**: `req` = "thư khách gửi đến", `res` = "thư mình gửi lại"

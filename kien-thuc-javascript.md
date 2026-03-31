# Tổng Hợp Kiến Thức JavaScript Cơ Bản

---

## 1. Biến (Variables)

Có 3 cách khai báo biến:

```js
var ten = "Lam";      // cách cũ, ít dùng
let tuoi = 20;        // biến có thể thay đổi
const PI = 3.14;      // hằng số, không thay đổi được
```

### Phân biệt let và const

```js
let x = 10;
x = 20;       // OK, let cho phép gán lại

const y = 10;
y = 20;       // LỖI! const không cho phép gán lại
```

### Các kiểu dữ liệu (Data Types)

```js
// String - chuỗi
let ten = "Nguyen Van A";

// Number - số
let tuoi = 21;
let diem = 9.5;

// Boolean - đúng/sai
let daLogin = true;
let coLoi = false;

// Null - giá trị rỗng (chủ động gán)
let ketQua = null;

// Undefined - chưa gán giá trị
let x;
console.log(x); // undefined

// Array - mảng
let monHoc = ["Toan", "Ly", "Hoa"];

// Object - đối tượng
let sinhVien = {
  ten: "Lam",
  tuoi: 20,
  lop: "CNTT1"
};
```

---

## 2. Toán Tử (Operators)

### Toán tử so sánh

```js
==    // so sánh giá trị (không so sánh kiểu)
===   // so sánh cả giá trị VÀ kiểu (NÊN DÙNG)
!=    // khác giá trị
!==   // khác giá trị HOẶC khác kiểu
>     // lớn hơn
<     // nhỏ hơn
>=    // lớn hơn hoặc bằng
<=    // nhỏ hơn hoặc bằng
```

```js
// Ví dụ:
5 == "5"    // true  (chỉ so sánh giá trị)
5 === "5"   // false (khác kiểu: number vs string)
5 !== "5"   // true
```

### Toán tử logic

```js
&&    // VÀ (and) - cả 2 điều kiện đều đúng
||    // HOẶC (or) - 1 trong 2 điều kiện đúng
!     // PHỦ ĐỊNH (not) - đảo ngược
```

```js
let tuoi = 20;
let coCCCD = true;

if (tuoi >= 18 && coCCCD) {
  console.log("Đủ điều kiện");
}
```

---

## 3. Cấu Trúc Điều Kiện (Conditionals)

### if / else if / else

```js
let diem = 7.5;

if (diem >= 8.5) {
  console.log("Giỏi");
} else if (diem >= 7) {
  console.log("Khá");
} else if (diem >= 5) {
  console.log("Trung bình");
} else {
  console.log("Yếu");
}
```

### Toán tử 3 ngôi (Ternary)

```js
let tuoi = 20;
let ketQua = tuoi >= 18 ? "Người lớn" : "Trẻ em";
// Tương đương với if/else nhưng ngắn gọn hơn
```

### switch

```js
let ngay = "Thứ 2";

switch (ngay) {
  case "Thứ 2":
    console.log("Đầu tuần");
    break;
  case "Thứ 7":
  case "Chủ nhật":
    console.log("Cuối tuần");
    break;
  default:
    console.log("Giữa tuần");
}
```

---

## 4. Vòng Lặp (Loops)

### for

```js
// In số từ 1 đến 5
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

### while

```js
let dem = 1;
while (dem <= 5) {
  console.log(dem);
  dem++;
}
```

### for...of (duyệt mảng)

```js
let monHoc = ["Toán", "Lý", "Hóa"];

for (let mon of monHoc) {
  console.log(mon);
}
// Toán
// Lý
// Hóa
```

### for...in (duyệt object)

```js
let sv = { ten: "Lam", tuoi: 20, lop: "CNTT1" };

for (let key in sv) {
  console.log(key + ": " + sv[key]);
}
// ten: Lam
// tuoi: 20
// lop: CNTT1
```

---

## 5. Hàm (Functions)

### Cách khai báo hàm

```js
// Cách 1: Function declaration
function chao(ten) {
  return "Xin chào " + ten;
}

// Cách 2: Function expression
const chao = function(ten) {
  return "Xin chào " + ten;
};

// Cách 3: Arrow function (ES6) - ngắn gọn
const chao = (ten) => {
  return "Xin chào " + ten;
};

// Arrow function rút gọn (1 dòng)
const chao = (ten) => "Xin chào " + ten;
```

### Gọi hàm

```js
function tinhTong(a, b) {
  return a + b;
}

let kq = tinhTong(3, 5);
console.log(kq); // 8
```

### Tham số mặc định (Default Parameters)

```js
function chao(ten = "bạn") {
  return "Xin chào " + ten;
}

chao();       // "Xin chào bạn"
chao("Lam");  // "Xin chào Lam"
```

---

## 6. Mảng (Arrays)

### Tạo mảng

```js
let fruits = ["Táo", "Cam", "Chuối"];
```

### Truy cập phần tử

```js
fruits[0]          // "Táo" (chỉ số bắt đầu từ 0)
fruits[2]          // "Chuối"
fruits.length      // 3
```

### Các method quan trọng của mảng

```js
let arr = [1, 2, 3];

// Thêm/xóa phần tử
arr.push(4);        // Thêm vào cuối  → [1, 2, 3, 4]
arr.pop();          // Xóa phần tử cuối → [1, 2, 3]
arr.unshift(0);     // Thêm vào đầu  → [0, 1, 2, 3]
arr.shift();        // Xóa phần tử đầu → [1, 2, 3]

// Tìm kiếm
arr.includes(2);    // true
arr.indexOf(3);     // 2 (vị trí của phần tử 3)

// Nối mảng
arr.join(", ");     // "1, 2, 3" (thành chuỗi)
```

### Các method lặp qua mảng (rất hay dùng)

```js
let numbers = [1, 2, 3, 4, 5];

// forEach - lặp qua từng phần tử
numbers.forEach(function(num) {
  console.log(num);
});

// map - tạo mảng mới từ mảng cũ
let nhanDoi = numbers.map(function(num) {
  return num * 2;
});
// [2, 4, 6, 8, 10]

// filter - lọc phần tử thỏa điều kiện
let chanNumbers = numbers.filter(function(num) {
  return num % 2 === 0;
});
// [2, 4]

// find - tìm phần tử đầu tiên thỏa điều kiện
let timDuoc = numbers.find(function(num) {
  return num > 3;
});
// 4
```

### Ví dụ thực tế: Dùng method mảng với dữ liệu thật

```js
// Giả sử có danh sách sản phẩm
let sanPham = [
  { ten: "Laptop", gia: 15000000, tonKho: 5 },
  { ten: "Chuột", gia: 200000, tonKho: 0 },
  { ten: "Bàn phím", gia: 500000, tonKho: 12 },
  { ten: "Màn hình", gia: 8000000, tonKho: 3 }
];

// Lọc sản phẩm còn hàng
let conHang = sanPham.filter(function(sp) {
  return sp.tonKho > 0;
});
// → [{Laptop...}, {Bàn phím...}, {Màn hình...}]

// Lấy danh sách tên sản phẩm
let danhSachTen = sanPham.map(function(sp) {
  return sp.ten;
});
// → ["Laptop", "Chuột", "Bàn phím", "Màn hình"]

// Tìm sản phẩm rẻ nhất
let reNhat = sanPham.find(function(sp) {
  return sp.gia < 300000;
});
// → { ten: "Chuột", gia: 200000, tonKho: 0 }

// Kết hợp: lọc còn hàng rồi lấy tên
let tenConHang = sanPham
  .filter(function(sp) { return sp.tonKho > 0; })
  .map(function(sp) { return sp.ten; });
// → ["Laptop", "Bàn phím", "Màn hình"]
```

---

## 7. Object

### Tạo object

```js
let sinhVien = {
  ten: "Lam",
  tuoi: 20,
  lop: "CNTT1",
  diemTB: 7.5
};
```

### Truy cập thuộc tính

```js
sinhVien.ten         // "Lam"
sinhVien["tuoi"]     // 20

// Thêm thuộc tính mới
sinhVien.email = "lam@email.com";

// Xóa thuộc tính
delete sinhVien.diemTB;
```

### Object có method (hàm bên trong)

```js
let mayTinh = {
  hang: "Dell",
  gia: 15000000,
  moTa: function() {
    return "Máy " + this.hang + " giá " + this.gia;
  }
};

mayTinh.moTa(); // "Máy Dell giá 15000000"
```

---

## 8. DOM Manipulation (Thao Tác Với HTML)

### Chọn phần tử

```js
// Chọn theo ID
let header = document.getElementById("header");

// Chọn theo class (trả về 1 phần tử đầu tiên)
let btn = document.querySelector(".nut-gui");

// Chọn nhiều phần tử
let items = document.querySelectorAll(".item");
```

### Thay đổi nội dung

```js
let title = document.querySelector("h1");

title.textContent = "Tiêu đề mới";            // Chỉ text
title.innerHTML = "<span>Tiêu đề mới</span>"; // Có thể chứa HTML
```

### Thay đổi style và class

```js
let box = document.querySelector(".box");

// Thay đổi trực tiếp style
box.style.color = "red";
box.style.backgroundColor = "#2af598";

// Thêm/xóa class (NÊN DÙNG cách này hơn)
box.classList.add("active");
box.classList.remove("hidden");
box.classList.toggle("open");    // có thì xóa, không có thì thêm
box.classList.contains("active"); // true/false
```

### Tạo và xóa phần tử

```js
// Tạo phần tử mới
let p = document.createElement("p");
p.textContent = "Đoạn văn mới";

// Thêm vào trang
document.body.appendChild(p);
// Hoặc thêm vào 1 phần tử cụ thể
let container = document.querySelector(".container");
container.appendChild(p);

// Xóa phần tử
p.remove();
```

### Ví dụ thực tế: Hiển thị danh sách lên trang web

Giả sử HTML có:
```html
<ul id="danh-sach-sv"></ul>
```

```js
let sinhViens = ["Lam", "Hùng", "Mai", "Trang"];

let ul = document.querySelector("#danh-sach-sv");

// Lặp qua mảng, tạo <li> cho từng sinh viên, thêm vào <ul>
sinhViens.forEach(function(ten) {
  let li = document.createElement("li");
  li.textContent = ten;
  ul.appendChild(li);
});
// Kết quả trên trang:
// • Lam
// • Hùng
// • Mai
// • Trang
```

### Ví dụ thực tế: Ẩn/hiện phần tử

```html
<button id="btn-toggle">Hiện nội dung</button>
<div id="noi-dung" class="an">Đây là nội dung ẩn</div>
```

```css
.an { display: none; }
```

```js
let btn = document.querySelector("#btn-toggle");
let noiDung = document.querySelector("#noi-dung");

btn.addEventListener("click", function() {
  // toggle: nếu có class "an" thì xóa, nếu không có thì thêm
  noiDung.classList.toggle("an");

  // Đổi text nút theo trạng thái
  if (noiDung.classList.contains("an")) {
    btn.textContent = "Hiện nội dung";
  } else {
    btn.textContent = "Ẩn nội dung";
  }
});
```

---

## 9. Events (Sự Kiện)

### addEventListener

```js
let btn = document.querySelector("#nut-gui");

btn.addEventListener("click", function() {
  console.log("Đã click!");
});
```

### Các event thường gặp

```js
// Click
element.addEventListener("click", handler);

// Submit form
form.addEventListener("submit", handler);

// Nhập liệu
input.addEventListener("input", handler);   // khi đang gõ
input.addEventListener("change", handler);  // khi gõ xong (blur)

// Chuột
element.addEventListener("mouseover", handler);  // rê chuột vào
element.addEventListener("mouseout", handler);    // rê chuột ra

// Bàn phím
document.addEventListener("keydown", handler);
document.addEventListener("keyup", handler);
```

### Event object và preventDefault

```js
let form = document.querySelector("form");

form.addEventListener("submit", function(event) {
  event.preventDefault(); // Ngăn form gửi mặc định (reload trang)

  // Xử lý form ở đây...
  console.log("Form đã được submit!");
});
```

### Lấy giá trị từ form

```js
form.addEventListener("submit", function(e) {
  e.preventDefault();

  let ten = document.querySelector("#input-ten").value;
  let email = document.querySelector("#input-email").value;

  console.log(ten, email);
});
```

### Ví dụ thực tế: Form liên hệ hoàn chỉnh (validate + hiển thị kết quả)

Giả sử HTML có:
```html
<form id="form-lien-he">
  <input type="text" id="ho-ten" placeholder="Họ tên">
  <input type="email" id="email" placeholder="Email">
  <textarea id="tin-nhan" placeholder="Nội dung"></textarea>
  <button type="submit">Gửi</button>
  <p id="thong-bao"></p>
</form>
```

```js
let form = document.querySelector("#form-lien-he");
let thongBao = document.querySelector("#thong-bao");

form.addEventListener("submit", function(e) {
  e.preventDefault(); // Ngăn trang reload

  // Bước 1: Lấy giá trị từ các input
  let hoTen = document.querySelector("#ho-ten").value;
  let email = document.querySelector("#email").value;
  let tinNhan = document.querySelector("#tin-nhan").value;

  // Bước 2: Validate - kiểm tra rỗng
  if (hoTen === "" || email === "" || tinNhan === "") {
    thongBao.textContent = "Vui lòng điền đầy đủ thông tin!";
    thongBao.style.color = "red";
    return; // Dừng lại, không chạy tiếp code bên dưới
  }

  // Bước 3: Kiểm tra email hợp lệ (có @ và có dấu chấm sau @)
  if (!email.includes("@") || !email.includes(".")) {
    thongBao.textContent = "Email không hợp lệ!";
    thongBao.style.color = "red";
    return;
  }

  // Bước 4: Nếu hợp lệ → hiển thị thành công
  thongBao.textContent = "Gửi thành công! Cảm ơn " + hoTen;
  thongBao.style.color = "green";

  // Bước 5: Xóa dữ liệu form sau khi gửi
  form.reset();
});
```

### Ví dụ thực tế: Đếm ký tự khi gõ (event "input")

```html
<textarea id="noi-dung" maxlength="200"></textarea>
<p id="dem-ky-tu">0 / 200</p>
```

```js
let textarea = document.querySelector("#noi-dung");
let demKyTu = document.querySelector("#dem-ky-tu");

// Event "input" chạy MỖI KHI người dùng gõ 1 ký tự
textarea.addEventListener("input", function() {
  let soKyTu = textarea.value.length;
  demKyTu.textContent = soKyTu + " / 200";

  // Đổi màu khi gần đầy
  if (soKyTu > 180) {
    demKyTu.style.color = "red";
  } else {
    demKyTu.style.color = "black";
  }
});
```

---

## 10. Fetch API (Gọi API)

### Fetch cơ bản với GET

```js
fetch("https://api.example.com/data")
  .then(function(response) {
    return response.json(); // chuyển response thành JSON
  })
  .then(function(data) {
    console.log(data);
  })
  .catch(function(error) {
    console.log("Lỗi: " + error);
  });
```

### Fetch với async/await (dễ đọc hơn)

```js
async function layDuLieu() {
  try {
    let response = await fetch("https://api.example.com/data");
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Lỗi: " + error);
  }
}

layDuLieu();
```

### Fetch với POST (gửi dữ liệu)

```js
async function guiLienHe(ten, email, tinNhan) {
  try {
    let response = await fetch("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ten: ten,
        email: email,
        tinNhan: tinNhan
      })
    });

    let data = await response.json();

    if (response.ok) {
      console.log("Thành công!", data);
    } else {
      console.log("Thất bại!", data);
    }
  } catch (error) {
    console.log("Lỗi kết nối: " + error);
  }
}
```

### Ví dụ thực tế: Gửi form liên hệ đến server bằng fetch POST

```js
// Giả sử đã có form và đã validate xong, bây giờ gửi lên server

async function guiForm() {
  // Lấy dữ liệu từ form
  let hoTen = document.querySelector("#ho-ten").value;
  let email = document.querySelector("#email").value;
  let tinNhan = document.querySelector("#tin-nhan").value;
  let thongBao = document.querySelector("#thong-bao");

  try {
    // Gửi dữ liệu lên server
    let response = await fetch("http://localhost:3000/api/contact", {
      method: "POST",                        // Phương thức POST = gửi dữ liệu
      headers: {
        "Content-Type": "application/json"   // Báo cho server biết gửi JSON
      },
      body: JSON.stringify({                 // Chuyển object thành chuỗi JSON
        hoTen: hoTen,
        email: email,
        tinNhan: tinNhan
      })
    });

    // Đọc phản hồi từ server
    let data = await response.json();

    // Kiểm tra server trả về thành công hay lỗi
    if (response.ok) {                       // ok = status 200-299
      thongBao.textContent = "Gửi thành công!";
      thongBao.style.color = "green";
    } else {
      thongBao.textContent = "Lỗi: " + data.message;
      thongBao.style.color = "red";
    }
  } catch (error) {
    // catch chạy khi KHÔNG kết nối được server (server tắt, mất mạng...)
    thongBao.textContent = "Không thể kết nối server!";
    thongBao.style.color = "red";
  }
}
```

**Luồng hoạt động của đoạn code trên:**
1. Lấy dữ liệu từ form → đóng gói thành JSON
2. `fetch()` gửi request POST đến server
3. `await` = **đợi** server xử lý xong và trả kết quả
4. Kiểm tra `response.ok` → hiển thị thông báo phù hợp
5. Nếu server tắt/mất mạng → nhảy vào `catch`

---

## 11. Template Literals (Chuỗi Mẫu)

```js
let ten = "Lam";
let tuoi = 20;

// Cách cũ - nối chuỗi bằng +
let msg1 = "Xin chào " + ten + ", bạn " + tuoi + " tuổi";

// Cách mới - dùng backtick ` và ${} (NÊN DÙNG)
let msg2 = `Xin chào ${ten}, bạn ${tuoi} tuổi`;

// Có thể viết nhiều dòng
let html = `
  <div class="card">
    <h2>${ten}</h2>
    <p>Tuổi: ${tuoi}</p>
  </div>
`;
```

### Ví dụ thực tế: Dùng template literal để tạo HTML động

```js
let sanPham = [
  { ten: "Laptop Dell", gia: 15000000, hinh: "laptop.jpg" },
  { ten: "Chuột Logitech", gia: 200000, hinh: "chuot.jpg" }
];

let container = document.querySelector("#danh-sach-sp");

// Dùng template literal để tạo HTML cho từng sản phẩm
sanPham.forEach(function(sp) {
  // Dấu ` (backtick) cho phép viết HTML nhiều dòng + chèn biến ${...}
  let html = `
    <div class="card">
      <img src="${sp.hinh}" alt="${sp.ten}">
      <h3>${sp.ten}</h3>
      <p>Giá: ${sp.gia.toLocaleString()} VND</p>
    </div>
  `;
  container.innerHTML += html;
});
// Kết quả: tạo ra 2 card sản phẩm trên trang
```

---

## 12. Destructuring (Tách Giá Trị)

### Tách từ Object

```js
let sv = { ten: "Lam", tuoi: 20, lop: "CNTT1" };

// Thay vì:
// let ten = sv.ten;
// let tuoi = sv.tuoi;

// Viết gọn:
let { ten, tuoi, lop } = sv;
console.log(ten);  // "Lam"
console.log(tuoi); // 20
```

### Tách từ Array

```js
let colors = ["đỏ", "xanh", "vàng"];

let [mau1, mau2, mau3] = colors;
console.log(mau1); // "đỏ"
console.log(mau2); // "xanh"
```

---

## 13. Spread và Rest (...)

### Spread - trải ra

```js
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let gop = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

let obj1 = { a: 1, b: 2 };
let obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }
```

### Rest - gom lại

```js
function tinhTong(...cacSo) {
  let tong = 0;
  for (let so of cacSo) {
    tong += so;
  }
  return tong;
}

tinhTong(1, 2, 3, 4); // 10
```

---

## 14. LocalStorage (Lưu Trữ Trên Trình Duyệt)

```js
// Lưu dữ liệu
localStorage.setItem("ten", "Lam");
localStorage.setItem("config", JSON.stringify({ theme: "dark" }));

// Lấy dữ liệu
let ten = localStorage.getItem("ten"); // "Lam"
let config = JSON.parse(localStorage.getItem("config")); // { theme: "dark" }

// Xóa
localStorage.removeItem("ten");

// Xóa hết
localStorage.clear();
```

---

## 15. Xử Lý Lỗi (Error Handling)

### try / catch / finally

```js
try {
  // Code có thể gây lỗi
  let data = JSON.parse("đây không phải JSON");
} catch (error) {
  // Xử lý khi có lỗi
  console.log("Có lỗi xảy ra: " + error.message);
} finally {
  // Luôn chạy, dù có lỗi hay không
  console.log("Đã xử lý xong");
}
```

---

## 16. Một Số Mẹo Nhỏ

### Console để debug

```js
console.log("Giá trị:", bien);     // In giá trị
console.table(arrayOrObject);      // In dạng bảng
console.error("Lỗi gì đó");       // In màu đỏ
console.warn("Cảnh báo");          // In màu vàng
```

### Kiểm tra kiểu dữ liệu

```js
typeof "hello"     // "string"
typeof 42          // "number"
typeof true        // "boolean"
typeof undefined   // "undefined"
typeof null        // "object" (đây là bug của JS!)
typeof []          // "object"
Array.isArray([])  // true (cách đúng để kiểm tra array)
```

### Chuyển đổi kiểu

```js
// Chuỗi -> Số
Number("123")       // 123
parseInt("123")     // 123
parseFloat("12.5")  // 12.5

// Số -> Chuỗi
String(123)         // "123"
(123).toString()    // "123"

// Bất kỳ -> Boolean
Boolean(0)          // false
Boolean("")         // false
Boolean(null)       // false
Boolean("hello")    // true
Boolean(42)         // true
```

---

## Tài Liệu Tham Khảo

- **MDN Web Docs**: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- **JavaScript.info**: https://javascript.info
- **W3Schools JS**: https://www.w3schools.com/js/

---

> **Ghi chú:** File này là tài liệu học tập tổng hợp. Hãy thực hành từng phần bằng cách tự viết code và chạy thử trên trình duyệt (F12 > Console).

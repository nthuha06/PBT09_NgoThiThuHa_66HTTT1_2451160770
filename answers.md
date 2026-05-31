# PHẦN A

## Câu A1 — DOM Tree

### 1. DOM Tree

```text
div#app
│
├── header
│   ├── h1
│   │   └── "Todo App"
│   │
│   └── nav
│       ├── a.active
│       │   └── "All"
│       ├── a
│       │   └── "Active"
│       └── a
│           └── "Completed"
│
└── main
    ├── form#todoForm
    │   ├── input#todoInput
    │   └── button
    │       └── "Add"
    │
    └── ul#todoList
        ├── li.todo-item
        │   └── "Learn HTML"
        │
        └── li.todo-item.completed
            └── "Learn CSS"
```

### 2. querySelector cho từng yêu cầu

#### Chọn thẻ h1

```javascript
document.querySelector("h1");
```

#### Chọn input trong form

```javascript
document.querySelector("#todoForm input");
```

#### Chọn tất cả .todo-item

```javascript
document.querySelectorAll(".todo-item");
```

#### Chọn link đang active

```javascript
document.querySelector(".active");
```

#### Chọn li đầu tiên trong #todoList

```javascript
document.querySelector("#todoList li");
```

#### Chọn tất cả a bên trong nav

```javascript
document.querySelectorAll("nav a");
```

---

## Câu A2 — innerHTML vs textContent

### 1. Sự khác nhau giữa innerHTML và textContent

| innerHTML | textContent |
|---|---|
| Đọc hoặc ghi nội dung HTML bên trong element | Chỉ đọc hoặc ghi text thuần |
| Có thể render HTML tags | Không render HTML tags |
| Chậm hơn do phải parse HTML | Nhanh hơn |
| Có nguy cơ bị XSS | An toàn hơn |

---

### 2. Khi nào dùng mỗi cái

#### Dùng innerHTML

Khi muốn thêm HTML động vào trang web.

Ví dụ:

```javascript
document.querySelector("#box").innerHTML = "<h1>Hello</h1>";
```

Kết quả:

```html
<h1>Hello</h1>
```

sẽ được render thành heading thật.

---

#### Dùng textContent

Khi chỉ muốn hiển thị text từ user hoặc dữ liệu thông thường.

Ví dụ:

```javascript
document.querySelector("#box").textContent = "<h1>Hello</h1>";
```

Kết quả hiển thị nguyên văn:

```text
<h1>Hello</h1>
```

không render HTML.

---

### 3. Tại sao innerHTML có thể gây lỗ hổng XSS?

Vì innerHTML sẽ render và thực thi mã HTML/JavaScript mà user nhập vào.

Nếu hacker nhập mã độc chứa script hoặc event như onerror thì code JavaScript có thể chạy trực tiếp trên trình duyệt người dùng.

Điều này gây ra lỗ hổng Cross Site Scripting (XSS).

---

### 4. Ví dụ code XSS

#### Code nguy hiểm

```javascript
// User nhập:
<img src=x onerror="alert('Hacked!')">

const userInput = document.querySelector("#search").value;

document.querySelector("#result").innerHTML = userInput;
```

Khi render:

```html
<img src=x onerror="alert('Hacked!')">
```

event `onerror` sẽ chạy JavaScript → hiện alert.

---

### 5. Cách sửa an toàn

Dùng `textContent` thay cho `innerHTML`.

```javascript
const userInput = document.querySelector("#search").value;

document.querySelector("#result").textContent = userInput;
```

Khi đó:

```text
<img src=x onerror="alert('Hacked!')">
```

chỉ hiển thị như text bình thường và không thực thi JavaScript.
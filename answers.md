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

---

## Câu A3 — Event Bubbling

### 1. Khi click vào button

HTML:

```html
<div id="outer">
    <div id="inner">
        <button id="btn">Click me</button>
    </div>
</div>
```

JavaScript:

```javascript
document.querySelector("#outer").addEventListener("click", () => {
    console.log("OUTER");
});

document.querySelector("#inner").addEventListener("click", () => {
    console.log("INNER");
});

document.querySelector("#btn").addEventListener("click", (e) => {
    console.log("BUTTON");
});
```

---

### 2. Output khi click button

```text
BUTTON
INNER
OUTER
```

---

### 3. Giải thích

Khi click vào button:

1. Event xảy ra tại button trước
2. Sau đó event bubbling nổi dần lên phần tử cha
3. Event đi từ:
   - button
   - inner
   - outer

Đây gọi là Event Bubbling.

---

### 4. Nếu uncomment stopPropagation()

```javascript
document.querySelector("#btn").addEventListener("click", (e) => {
    console.log("BUTTON");

    e.stopPropagation();
});
```

---

### 5. Output mới

```text
BUTTON
```

---

### 6. Giải thích

`e.stopPropagation()` sẽ chặn event bubbling.

Event chỉ chạy ở button và không truyền tiếp lên:

- inner
- outer

nên console chỉ in ra:

```text
BUTTON
```

---

# PHẦN C

## Câu C1 — Debug DOM Code

### 1. Các lỗi trong code

---

### ❌ Lỗi 1 — Sai event name

Code sai:

```javascript
addEventListener("onclick", ...)
```

Phải sửa:

```javascript
addEventListener("click", ...)
```

Giải thích:

`addEventListener()` chỉ nhận tên event:

- click
- input
- submit

KHÔNG dùng:

```javascript
"onclick"
```

---

### ❌ Lỗi 2 — countDisplay là const nhưng bị gán lại

Code sai:

```javascript
countDisplay = count;
```

Phải sửa:

```javascript
countDisplay.textContent = count;
```

Giải thích:

`countDisplay` là DOM element nên phải cập nhật nội dung bằng:

```javascript
textContent
```

---

### ❌ Lỗi 3 — historyList.innerHTML = null

Code sai:

```javascript
historyList.innerHTML = null;
```

Phải sửa:

```javascript
historyList.innerHTML = "";
```

Giải thích:

`innerHTML` phải nhận string.

---

### ❌ Lỗi 4 — item.remove thiếu ()

Code sai:

```javascript
item.remove;
```

Phải sửa:

```javascript
item.remove();
```

Giải thích:

`remove` là function nên cần gọi bằng `()`.

---

### ❌ Lỗi 5 — Không load history từ localStorage

Code hiện tại chỉ load count:

```javascript
count = localStorage.getItem("count");
```

Cần thêm:

```javascript
historyList.innerHTML =
    localStorage.getItem("history");
```

---

### ❌ Lỗi 6 — localStorage trả về string

Code:

```javascript
count = localStorage.getItem("count");
```

Phải sửa:

```javascript
count = Number(localStorage.getItem("count")) || 0;
```

Giải thích:

localStorage luôn lưu string.

---

### ❌ Lỗi 7 — Có thể decrement xuống số âm

Code hiện tại:

```javascript
count--;
```

Nên sửa:

```javascript
if(count > 0){
    count--;
}
```

Giải thích:

Tránh counter âm.

---

### ❌ Lỗi 8 — innerHTML không cần thiết

Code:

```javascript
countDisplay.innerHTML = count;
```

Nên sửa:

```javascript
countDisplay.textContent = count;
```

Giải thích:

Chỉ hiển thị text nên dùng `textContent`
an toàn và nhanh hơn.

---

### ❌ Lỗi 9 — Event listener bind riêng cho từng li

Code:

```javascript
li.addEventListener("click", ...)
```

Không tối ưu.

Nên dùng Event Delegation:

```javascript
historyList.addEventListener("click", ...)
```

Giải thích:

Giảm số lượng event listeners khi có nhiều items.

---

### ❌ Lỗi 10 — beforeunload không phải lúc nào cũng đáng tin

Code:

```javascript
window.addEventListener("beforeunload", ...)
```

Có thể không chạy trong một số trường hợp.

Tốt hơn nên save ngay sau khi update count/history.

---

## 2. Code đã sửa hoàn chỉnh

```javascript
const countDisplay =
    document.querySelector(".count");

const historyList =
    document.getElementById("history");

let count =
    Number(localStorage.getItem("count")) || 0;

countDisplay.textContent = count;





// LOAD HISTORY
historyList.innerHTML =
    localStorage.getItem("history") || "";





// INCREMENT
document.querySelector("#incrementBtn")
    .addEventListener("click", () => {

        count++;

        countDisplay.textContent = count;





        const li =
            document.createElement("li");

        li.textContent =
            "Count changed to " + count;





        historyList.append(li);

        saveData();

    });





// DECREMENT
document.querySelector("#decrementBtn")
    .addEventListener("click", () => {

        if(count > 0){

            count--;

            countDisplay.textContent = count;

            saveData();

        }

    });





// RESET
document.querySelector("#resetBtn")
    .addEventListener("click", () => {

        count = 0;

        countDisplay.textContent = count;

        historyList.innerHTML = "";

        saveData();

    });





// EVENT DELEGATION DELETE HISTORY
historyList.addEventListener("click", (e) => {

    if(e.target.tagName === "LI"){

        e.target.remove();

        saveData();

    }

});





// CLEAR HISTORY
document.querySelector("#clearHistory")
    .addEventListener("click", () => {

        historyList.innerHTML = "";

        saveData();

    });





// SAVE LOCALSTORAGE
function saveData(){

    localStorage.setItem("count", count);

    localStorage.setItem(
        "history",
        historyList.innerHTML
    );

}
```
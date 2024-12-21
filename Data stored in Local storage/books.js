class BookManager {
    constructor() {
        this.popoverlay = document.querySelector(".pop-overlay");
        this.popbox1 = document.querySelector(".pop-box");
        this.plusbtn = document.getElementById("pop");
        this.delbtn = document.querySelector(".del");
        this.cancelbtn = document.getElementById("cancel-book");
        this.bookcontainer = document.querySelector(".container");
        this.addbook = document.getElementById("add-book");
        this.booktitle = document.getElementById("book-title");
        this.bookauthor = document.getElementById("book-author");
        this.bookdescription = document.getElementById("book-description");
        this.time = document.getElementById("time");
        this.initializeEventListeners();
        this.startCountdown();
    }
    initializeEventListeners() {
        if (this.plusbtn) {
            this.plusbtn.addEventListener("click", () => this.showPopup());
        }
        if (this.cancelbtn) {
            this.cancelbtn.addEventListener("click", (event) => this.hidePopup(event));
        }
        if (this.addbook) {
            this.addbook.addEventListener('click', (event) => this.addBook(event));
        }
        document.addEventListener("keydown", (event) => this.escapeKey(event));
    }
    startCountdown() {
        this.updateTime();
        setInterval(() => {
            this.decrementTime();
            this.updateTime();
        }, 1000);
    }
    decrementTime() {
        const now = new Date();
        const currentTime = new Date(now.getTime());
        now.setHours(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds());
    }
    updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        if (this.time) {
            this.time.innerHTML = `<i class="fa-duotone fa-solid fa-clock"> ${hours}:${minutes}:${seconds}`;
        }
    }
    showPopup() {
        if (this.popoverlay && this.popbox1 && this.delbtn) {
            this.popoverlay.style.display = "block";
            this.popbox1.style.display = "block";
            this.delbtn.style.outline = "none";
        }
    }
    hidePopup(event) {
        if (event)
            event.preventDefault();
        if (this.popoverlay && this.popbox1) {
            this.popoverlay.style.display = "none";
            this.popbox1.style.display = "none";
        }
    }
    escapeKey(event) {
        if (event.key === "Escape") {
            this.hidePopup();
        }
    }
    addBook(event) {
        var _a, _b, _c;
        event.preventDefault();
        const title = (_a = this.booktitle) === null || _a === void 0 ? void 0 : _a.value;
        const author = (_b = this.bookauthor) === null || _b === void 0 ? void 0 : _b.value;
        const description = ((_c = this.bookdescription) === null || _c === void 0 ? void 0 : _c.value) || "";
        if (title === "" || author === "") {
            alert("Missing Book Title or Book Author");
        }
        else {
            const bookData = {
                title: title,
                author: author,
                description: description,
            };
            this.addBookToDOM(bookData);
            this.hidePopup();
            const form = document.querySelector('form');
            if (form) {
                form.reset();
            }
        }
    }
    addBookToDOM(bookData) {
        if (this.bookcontainer) {
            const div = document.createElement("div");
            div.setAttribute("class", "book-container");
            div.innerHTML = `
                <h2>${bookData.title}</h2>
                <h5>${bookData.author}</h5>
                <p>${bookData.description}</p>
                <button class="del-btn">Delete</button>`;
            const delButton = div.querySelector(".del-btn");
            if (delButton) {
                delButton.addEventListener('click', (event) => this.delbook(event));
            }
            this.bookcontainer.append(div);
        }
    }
    delbook(event) {
        const target = event.target;
        const parentElement = target.parentElement;
        if (parentElement) {
            parentElement.remove();
        }
    }
}
document.addEventListener("DOMContentLoaded", () => {
    new BookManager();
});

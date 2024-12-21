class BookManager {
    private popoverlay: Element | null;
    private popbox1: Element | null;
    private plusbtn: Element | null;
    private delbtn: Element | null;
    private cancelbtn: Element | null;
    private bookcontainer: Element | null;
    private addbook: Element | null;
    private booktitle: Element | null;
    private bookauthor: Element | null;
    private bookdescription: Element | null;
    private time: Element | null;

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

    private initializeEventListeners() {
        if (this.plusbtn) {
            this.plusbtn.addEventListener("click", () => this.showPopup());
        }
        if (this.cancelbtn) {
            this.cancelbtn.addEventListener("click", (event: MouseEvent) => this.hidePopup(event));
        }
        if (this.addbook) {
            this.addbook.addEventListener('click', (event: MouseEvent) => this.addBook(event));
        }
        document.addEventListener("keydown", (event: KeyboardEvent) => this.escapeKey(event));
    }

    private startCountdown() {
        this.updateTime();
        setInterval(() => {
            this.decrementTime();
            this.updateTime();
        }, 1000);
    }

    private decrementTime() {
        const now = new Date();
        const currentTime = new Date(now.getTime()); 
        now.setHours(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds());
    }

    private updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        if (this.time) {
            
            this.time.innerHTML = `<i class="fa-duotone fa-solid fa-clock"> ${hours}:${minutes}:${seconds}`;
            
        }       
    }

    private showPopup() {
        if (this.popoverlay && this.popbox1 && this.delbtn) {
            (this.popoverlay as HTMLElement).style.display = "block";
            (this.popbox1 as HTMLElement).style.display = "block";
            (this.delbtn as HTMLElement).style.outline = "none";
        }
    }

    private hidePopup(event?: MouseEvent) {
        if (event) event.preventDefault();
        if (this.popoverlay && this.popbox1) {
            (this.popoverlay as HTMLElement).style.display = "none";
            (this.popbox1 as HTMLElement).style.display = "none";
        }
    }

    private escapeKey(event: KeyboardEvent) {
        if (event.key === "Escape") {
            this.hidePopup();
        }
    }

    private addBook(event: MouseEvent) {
        event.preventDefault();
        const title = (this.booktitle as HTMLInputElement)?.value;
        const author = (this.bookauthor as HTMLInputElement)?.value;
        const description = (this.bookdescription as HTMLTextAreaElement)?.value || "";
        if (title === "" || author === "") {
            alert("Missing Book Title or Book Author");
        } else {
            const bookData: Book = {
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

    private addBookToDOM(bookData: Book) {
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
                delButton.addEventListener('click', (event: MouseEvent) => this.delbook(event));
            }

            this.bookcontainer.append(div);
        }
    }

    private delbook(event: MouseEvent) {
        const target = event.target as HTMLElement;
        const parentElement = target.parentElement;
        if (parentElement) {
            parentElement.remove();
        }
    }
}

interface Book {
    title: string;
    author: string;
    description: string;
}

document.addEventListener("DOMContentLoaded", () => {
    new BookManager();
});
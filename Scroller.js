class Scroller {
    constructor(rootSelector) {
        const rootElement = document.querySelector(rootSelector);
        this.sections = [...document.querySelectorAll("section")];
        const currentSectionIndex = this.sections.findIndex(element => {
            this.isScrolledIntoView(element);
        });

        this.currentSectionIndex = Math.max(currentSectionIndex, 0);

        this.isThrottled = false;

        this.drawNavigation();
    }

    isScrolledIntoView(element) {
        const rect = element.getBoundingClientRect();
        const elemTop = rect.top;
        const elemBottom = Math.floor(rect.bottom);

        const isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;

        return isVisible;
    }

    listenScroll(event) {
        if (this.isThrottled) return;
        this.isThrottled = true;

        setTimeout(() => {
            this.isThrottled = false;
        }, 500);

        const direction = event.deltaY < 0 ? -1 : 1;

        this.scroll(direction);
    }

    scroll(direction) {
        if (direction === 1) {
            const isLastSection =
                this.currentSectionIndex === this.sections.length - 1;
            if (isLastSection) return;
        } else if (direction === -1) {
            const isFirstSection = this.currentSectionIndex === 0;
            if (isFirstSection) return;
        }

        this.currentSectionIndex = this.currentSectionIndex + direction;

        this.scrollToCurrentSection();
    }

    scrollToCurrentSection() {
        this.selectActiveNavItem();
        this.sections[this.currentSectionIndex].scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    drawNavigation() {
        this.navigationContainer = document.createElement("aside");
        this.navigationContainer.setAttribute("class", "scroller__navigation");
        const list = document.createElement("ul");

        this.sections.forEach((section, index) => {
            const listItem = document.createElement("li");

            listItem.addEventListener("click", () => {
                this.currentSectionIndex = index;
                this.scrollToCurrentSection();
            });

            list.appendChild(listItem);
        });

        this.navigationContainer.appendChild(list);

        document.body.appendChild(this.navigationContainer);

        this.selectActiveNavItem();
    }

    selectActiveNavItem() {
        if (this.navigationContainer) {
            const navigationItems = this.navigationContainer.querySelectorAll(
                "li"
            );
            navigationItems.forEach((item, index) => {
                if (index === this.currentSectionIndex) {
                    item.classList.add("active");
                } else {
                    item.classList.remove("active");
                }
            });
        }
    }
}

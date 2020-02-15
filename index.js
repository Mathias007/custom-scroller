document.addEventListener("DOMContentLoaded", function() {
    console.log("Hello world!");

    const rootElement = document.querySelector("#root");
    const sections = document.querySelectorAll("section");

    console.log(sections);

    document.addEventListener("mousewheel", function(event) {
        console.log(event.wheelDelta);
    });
});

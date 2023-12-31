document.addEventListener("DOMContentLoaded", function () {
    var scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(function (scrollLink) {
        scrollLink.addEventListener('click', function (e) {
            e.preventDefault();

            var targetId = this.getAttribute('href').substring(1);

            var targetElement = document.getElementById(targetId);
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

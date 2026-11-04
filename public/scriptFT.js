document.addEventListener('DOMContentLoaded', function() {
    const floatingImage = document.getElementById('floatingImage');
    const closeButton = document.getElementById('closeButton');

    closeButton.addEventListener('click', function() {
        floatingImage.style.display = 'none';
    });
});

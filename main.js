document.addEventListener("DOMContentLoaded", function() {
    var searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            buscarEnGoogle();
        }
    });
});

function buscarEnGoogle() {
    var searchTerm = document.getElementById('searchInput').value.trim();

    if (searchTerm !== "") {
        var searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(searchTerm);
        window.open(searchUrl, '_blank');
    }
}

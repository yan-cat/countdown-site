document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a.newpage').forEach(function(link) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
});

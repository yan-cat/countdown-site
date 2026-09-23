(function () {
    const href = '/img/logo.svg';
    let link = document.querySelector("link[rel~='icon']");

    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }

    link.type = 'image/svg+xml';
    link.href = href;
})();

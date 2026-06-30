// --- KONTROL MUAT GAMBAR OTOMATIS ---
function openFolder(folderName) {
    closeStartMenu();

    const win = document.getElementById('galleryWindow');
    const title = document.getElementById('windowTitle');
    const grid = document.getElementById('photoGridContent');

    title.textContent = `${folderName.toUpperCase()}.EXE`;
    grid.innerHTML = '';
    win.style.display = 'flex';

    let index = 1;
    let notFound = 0;
    const MAX_NOT_FOUND = 50; // berhenti jika 50 file berturut-turut tidak ada

    function loadNext() {
        if (notFound >= MAX_NOT_FOUND) return;

        const imgUrl = `${folderName}/${index}.jpg`;

        const img = new Image();

        img.onload = function () {
            notFound = 0;

            const photoItem = document.createElement('div');
            photoItem.className = 'photo-item';
            photoItem.setAttribute('data-index', index);

            photoItem.innerHTML = `<img src="${imgUrl}" alt="Foto ${index}" loading="lazy">`;

            photoItem.onclick = function () {
                openLightbox(imgUrl);
            };

            grid.appendChild(photoItem);
            sortGridItems(grid);

            index++;
            loadNext();
        };

        img.onerror = function () {
            notFound++;
            index++;
            loadNext();
        };

        img.src = imgUrl;
    }

    loadNext();
}

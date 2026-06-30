// --- KONTROL MUAT GAMBAR OTOMATIS (INTEGRASI INLINE - ANTI LAG) ---
function openFolder(folderName) {
    // Tutup start menu jika terbuka
    if (typeof closeStartMenu === 'function') closeStartMenu();

    const win = document.getElementById('galleryWindow');
    const title = document.getElementById('windowTitle');
    const grid = document.getElementById('photoGridContent');

    // Ubah nama windows/app sesuai folder
    title.textContent = `${folderName.toUpperCase()}.EXE`;
    
    // Reset isi grid agar foto dari folder sebelumnya tidak menumpuk
    grid.innerHTML = '';
    
    // Tampilkan galeri secara langsung/inline di bawah susunan folder
    win.style.style.cssText = "display: flex; position: relative; top: 0; left: 0; transform: none; width: 100%; box-shadow: none; margin-top: 20px;";

    let index = 1;
    let notFound = 0;
    const MAX_NOT_FOUND = 50; // Berhenti jika 50 file berturut-turut tidak ada

    function loadNext() {
        if (notFound >= MAX_NOT_FOUND) return;

        const imgUrl = `${folderName}/${index}.jpg`;
        const img = new Image();

        img.onload = function () {
            notFound = 0;

            const photoItem = document.createElement('div');
            photoItem.className = 'photo-item';
            photoItem.setAttribute('data-index', index);

            // Menambahkan attribute loading="lazy" dan class untuk performa optimal
            photoItem.innerHTML = `<img src="${imgUrl}" alt="Foto ${index}" loading="lazy" style="width:100%; height:100%; object-fit:cover;">`;

            // Aksi klik foto langsung memicu Lightbox bawaan Anda
            photoItem.onclick = function () {
                if (typeof openLightbox === 'function') {
                    openLightbox(imgUrl);
                }
            };

            grid.appendChild(photoItem);
            
            // Urutkan item jika fungsi shorting tersedia
            if (typeof sortGridItems === 'function') {
                sortGridItems(grid);
            }

            index++;
            loadNext(); // Rekursif muat gambar selanjutnya
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

// Fungsi tambahan pembantu untuk menutup galeri jika tombol [X] diklik
function closeFolder() {
    const win = document.getElementById('galleryWindow');
    if (win) win.style.display = 'none';
}

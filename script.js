// Fungsi untuk mengambil data dari file JSON
async function loadGames() {
    const container = document.getElementById('gameContainer');
    
    try {
        // Ambil file data.json
        const response = await fetch('data.json');
        const games = await response.json();
        
        // Bersihkan kontainer
        container.innerHTML = '';

        // Masukkan data satu per satu
        games.forEach(game => {
            const card = `
                <div class="glass-card rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-105">
                    <img src="${game.image}" class="w-full h-40 object-cover opacity-80" alt="Cover">
                    <div class="p-4">
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="text-lg font-bold truncate">${game.title}</h3>
                            <span class="bg-blue-900 text-blue-300 text-[10px] px-2 py-1 rounded font-bold">${game.region}</span>
                        </div>
                        <p class="text-xs text-slate-400 mb-4 line-clamp-2">${game.desc}</p>
                        
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-mono text-blue-400"><i class="fas fa-file-download"></i> ${game.size}</span>
                            <a href="${game.url}" class="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-bold transition">
                                DOWNLOAD
                            </a>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        });
    } catch (error) {
        container.innerHTML = '<div class="text-red-500">Gagal memuat data game. Pastikan file data.json tersedia.</div>';
        console.error("Error:", error);
    }
}

// Jalankan fungsi saat halaman dibuka
window.onload = loadGames;

// Fitur Pencarian Sederhana
document.getElementById('searchInput').addEventListener('input', function(e) {
    const term = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        if(title.includes(term)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

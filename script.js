document.addEventListener('DOMContentLoaded', () => {
    
    const selectButtons = document.querySelectorAll('.btn-select');

    selectButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const card = event.target.closest('.card');
            
            const serviceName = card.querySelector('h3').innerText;
            const servicePrice = card.querySelector('.price').innerText;

            const originalText = this.innerText;
            this.innerText = 'Tunggu sebentar...';
            this.style.backgroundColor = '#1a8c4b';
            this.style.color = '#fff';

            // Menyimpan data ke memori browser
            const selectedService = {
                name: serviceName,
                price: servicePrice
            };
            sessionStorage.setItem('chosenCarWashService', JSON.stringify(selectedService));

            // Menampilkan pop-up
            alert(`Anda memilih: ${serviceName} (${servicePrice}).\nKlik OK untuk lanjut ke pengisian jadwal.`);
            
            // PENTING: Baris ini yang memanggil/berpindah ke halaman booking
            window.location.href = 'booking.html';
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const selectButtons = document.querySelectorAll('.btn-select');

    selectButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            // 1. Ambil data dari kartu yang diklik
            const card = event.target.closest('.card');
            const serviceName = card.querySelector('h3').innerText;
            const servicePrice = card.querySelector('.price').innerText;

            // 2. Efek Visual pada Tombol (Biar kelihatan lagi proses)
            const originalText = this.innerText;
            this.innerText = 'Memproses...';
            this.style.opacity = '0.7';

            // 3. LOGIKA NOMOR 3 (Jeda sebentar lalu munculkan Modal)
            setTimeout(() => {
                const modal = document.getElementById('bookingModal');
                
                // Isi data ke dalam modal sebelum ditampilkan
                document.getElementById('modalTitle').innerText = serviceName;
                document.getElementById('modalDesc').innerText = "Paket Car Wash " + serviceName + " - " + servicePrice;
                
                // Tampilkan modalnya
                modal.style.display = 'flex';
                
                // Kembalikan tampilan tombol ke semula
                this.innerText = originalText;
                this.style.opacity = '1';
            }, 600); // 600ms = 0,6 detik jeda
        });
    });
});

// Tambahkan ini juga di paling bawah file JS agar tombol 'Batal' berfungsi
function closeModal() {
    document.getElementById('bookingModal').style.display = 'none';
}

// Data default jika storage kosong
const defaultServices = [
    { id: 1, name: 'Basic Wash', price: 'Rp 100.000' },
    { id: 2, name: 'Deluxe Wash', price: 'Rp 175.000' },
    { id: 3, name: 'Premium Detail', price: 'Rp 250.000' }
];

function loadServicesEditor() {
    const services = JSON.parse(localStorage.getItem('cwServices')) || defaultServices;
    const editorArea = document.getElementById('servicesEditor');

    editorArea.innerHTML = services.map((s, index) => `
        <div class="stat-card">
            <h3 style="color:#0088ff;">Paket ${index + 1}</h3>
            <input type="text" value="${s.name}" id="name-${index}" style="width:100%; padding:8px; margin:10px 0; border-radius:8px; border:1px solid #ddd;">
            <input type="text" value="${s.price}" id="price-${index}" style="width:100%; padding:8px; margin-bottom:15px; border-radius:8px; border:1px solid #ddd;">
            <button class="action-btn" onclick="saveService(${index})" style="width:100%">Update Harga</button>
        </div>
    `).join('');
}

function saveService(index) {
    let services = JSON.parse(localStorage.getItem('cwServices')) || defaultServices;
    services[index].name = document.getElementById(`name-${index}`).value;
    services[index].price = document.getElementById(`price-${index}`).value;

    localStorage.setItem('cwServices', JSON.stringify(services));
    alert("Layanan Berhasil Diupdate! Pelanggan akan melihat harga baru.");
    loadServicesEditor();
}

// Panggil fungsi saat load
loadServicesEditor();


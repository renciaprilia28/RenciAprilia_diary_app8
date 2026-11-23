# Diary App — React Native & Redux Toolkit (`diary-app8`)

Aplikasi pencatatan harian berbasis React Native + Expo Router dengan Global State Management menggunakan Redux Toolkit.

## Perbedaan Local State, Global Redux State, dan Persistent Database

1. Aspek Local State (`useState`) | Global Redux State (Redux Toolkit) Persistent Database (MySQL / SQLite / API)
2. Cakupan Data Hanya di dalam satu komponen/screen tertentu. Dapat diakses dan diubah secara terpusat oleh banyak screen sekaligus (single source of truth).Dapat diakses lintas perangkat/pengguna (jika berbasis server) atau lintas sesi aplikasi. 
3. Lokasi Penyimpanan Memori RAM (terikat pada siklus hidup komponen). Memori RAM aplikasi (Store global).Penyimpanan permanen (disk/server database).
4. Ketahanan Data Hilang saat komponen unmount atau pindah halaman.Hilang dan kembali ke `initialState` saat aplikasi ditutup/di-reload. Tetap tersimpan secara permanen meskipun aplikasi ditutup atau perangkat dimatikan. 
4. Contoh pada Diary App Nilai input form `title`, `body`, `mood` pada halaman Create/Edit, dan pilihan filter mood aktif.Daftar `entries` diary, status `liked` (favorite), serta aksi tambah, edit, hapus, dan bersihkan favorit. Penyimpanan permanen seluruh catatan diary pengguna agar tidak hilang setelah aplikasi di-restart.

### Ringkasan Alur Penggunaan
1. Local State dipakai untuk data sementara yang hanya relevan di satu tampilan (seperti ketikan pengguna di `TextInput`).
2. Global Redux State dipakai untuk menyinkronkan data yang dibutuhkan oleh banyak screen (Home, Detail, Edit, Favorites) agar selalu konsisten tanpa perlu prop drilling.
3. Persistent Database berperan sebagai media penyimpanan jangka panjang; pada aplikasi produksi, Redux berfungsi sebagai client-side state yang mengambil dan mengirim data ke database melalui REST API.
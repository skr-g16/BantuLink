# BantuLink
## Project Manajemen Logistik Bantuan Bencana dari Team DB3-PS007
BantuLink merupakan nama aplikasi web kami yang bertujuan untuk membantu manajemen bantuan bagi korban bencana. Aplikasi ini diharapkan dapat membantu untuk menangani masalah dilapangan yang tidak sesuai dengan kebutuhan. Misal, dilapangan memerlukan makanan tetapi sumbangan yang diterima berupa pakaian atau sebaliknya. Hal tersebut tentunya sangat tidak sinkron antara permintaan dan donasi. 
### Adapun Cakupan proyek yang kami buat adalah sebagai berikut:
1. Fitur Login dan Autentikasi Pengguna: Yang mana fitur dan sistem ini untuk sarana pendaftaran serta mengelola akses penyumbang, relawan, dan koordinator lapangan.
2. Manajemen Donasi: Pada halaman ini terdapat fitur pendaftaran donasi dan pencocokan dengan kebutuhan korban bencana.
4. Dashboard Koordinasi: Halaman Dashboard ini dashboard ini menyediakan informasi bantuan dan donasi real-time untuk tim di lapangan.
5. Inventarisasi Gudang: membangun sistem pelacakan stok di berbagai gudang bantuan.

## Instalasi

Untuk menginstal dan menjalankan proyek ini, ikuti langkah-langkah berikut:

1. Clone repositori ini ke mesin lokal Anda:
   bash
   git clone <URL_REPOSITORI>
   cd <NAMA_FOLDER>
2. Instal dependensi menggunakan pnpm:
    bash
    pnpm i
3. Jalankan aplikasi dalam mode pengembangan:
    ```bash
    pnpm run dev

## Fitur

- Login dan Registrasi: Pengguna harus login untuk mengakses fitur-fitur di dalam aplikasi. Jika belum memiliki akun, pengguna dapat mendaftar terlebih dahulu.
- Halaman Beranda: Setelah login, pengguna akan diarahkan ke halaman beranda yang menampilkan semua permintaan donasi.
- Navbar: Terdapat menu navigasi yang mencakup:
  - All Requests: Menampilkan semua permintaan donasi.
  - My Requests: Menampilkan permintaan donasi yang telah dibuat oleh pengguna (masih dalam pengembangan).
  - My Donations: Menampilkan donasi yang telah dilakukan oleh pengguna (masih dalam pengembangan).
  - Logout: Mengeluarkan pengguna dari aplikasi.
- Permintaan Donasi: Pengguna dapat melakukan permintaan donasi dengan mengklik tombol yang mengarahkan ke halaman permintaan.


## Cara penggunaan

# BantuLink

## Cara Penggunaan

1. Login: Buka aplikasi dan lakukan login. Jika Anda belum memiliki akun, silakan registrasi terlebih dahulu.
2. Halaman Beranda: Setelah login, Anda akan diarahkan ke halaman beranda yang menampilkan semua permintaan donasi.
3. Melihat Permintaan Donasi: Klik pada menu "All Requests" untuk melihat semua permintaan donasi yang tersedia.
4. Melakukan Donasi: Di halaman "All Requests", Anda akan menemukan tombol untuk melakukan donasi yang akan mengarahkan Anda ke halaman permintaan.
5. Logout: Setelah selesai, Anda dapat logout dari aplikasi.


## Dependencies

This project uses the following dependencies:

- [@heroicons/react](https://heroicons.com/) - A set of free MIT-licensed high-quality SVG icons for you to use in your web projects.
- [@reduxjs/toolkit](https://redux-toolkit.js.org/) - The official, recommended way to write Redux logic.
- [flowbite-react](https://flowbite-react.com/) - A library of UI components built with Tailwind CSS and React.
- [jwt-decode](https://github.com/auth0/jwt-decode) - A small browser library that helps decode JSON Web Tokens (JWT).
- [react](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [react-dom](https://reactjs.org/docs/react-dom.html) - The entry point to the DOM and server renderers for React.
- [react-icons](https://react-icons.github.io/react-icons/) - A library that provides popular icons as React components.
- [react-redux](https://react-redux.js.org/) - Official React bindings for Redux.
- [react-router-dom](https://reactrouter.com/) - Declarative routing for React.js.
- [react-toastify](https://fkhadra.github.io/react-toastify/) - A library for adding notifications to your React app.
- [sweetalert2](https://sweetalert2.github.io/) - A beautiful, responsive, customizable, accessible (WAI-ARIA) replacement for JavaScript's popup boxes.

## Dev Dependencies

This project uses the following development dependencies:

- [@eslint/js](https://eslint.org/) - The core ESLint library.
- [@types/react](https://www.npmjs.com/package/@types/react) - TypeScript definitions for React.
- [@types/react-dom](https://www.npmjs.com/package/@types/react-dom) - TypeScript definitions for React DOM.
- [@vitejs/plugin-react](https://vitejs.dev/plugin-react) - Vite plugin for React.
- [autoprefixer](https://github.com/postcss/autoprefixer) - A PostCSS plugin to parse CSS and add vendor prefixes.
- [eslint](https://eslint.org/) - A tool for identifying and reporting on patterns in JavaScript.
- [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) - React specific linting rules for ESLint.
- [eslint-plugin-react-hooks](https://reactjs.org/docs/hooks-rules.html) - Linting rules for React Hooks.
- [eslint-plugin-react-refresh](https://github.com/facebook/react-refresh) - ESLint plugin for React Fast Refresh.
- [globals](https://github.com/eslint/globals) - A list of global variables for various environments.
- [postcss](https://postcss.org/) - A tool for transforming CSS with JavaScript plugins.
- [tailwindcss](https://tailwindcss.com/) - A utility-first CSS framework for creating custom designs.
- [vite](https://vitejs.dev/) - A next-generation front-end tool that focuses on speed and performance.




## Contributing

Jika Anda ingin berkontribusi pada proyek ini, silakan buat pull request atau buka isu untuk diskusi.

## Contact

Untuk pertanyaan lebih lanjut, Anda dapat menghubungi [lamrostr03@gmail.com](gmailto:lamrostr03@gmail.com).

### BACKEND
**API Documentation**
For detailed API documentation, please visit: https://bantulink-api.site/docs#/

**Base URL**
All API requests should be made to: https://bantulink-api.site/

**How to Run the Project**
1. Clone the Repository
git clone https://github.com/your-username/BantuLink.git
cd BantuLink/Backend

2. Install Dependencies
   npm install
3. Set Up Environment Variables
* Create a new .env file in the root of the Backend directory
* Add the following variables (replace with your actual values):
`
HOST=localhost
PORT=5000
PGUSER=your_postgres_username
PGHOST=your_postgres_host
PGPASSWORD=your_postgres_password
PGDATABASE=your_database_name
PGPORT=5432
ACCESS_TOKEN_KEY=your_access_token_secret
REFRESH_TOKEN_KEY=your_refresh_token_secret
ACCESS_TOKEN_AGE=1800
`
4. Run Database Migrations
npm run migrate up
5. Start the Server
  For development:
   npm run dev
  For production:
   npm start
  The server should now be running on http://localhost:5000 (or the port you specified in the .env file).

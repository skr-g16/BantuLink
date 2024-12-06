# BantuLink
## Project Manajemen Logistik Bantuan Bencana dari Team DB3-PS007
BantuLink merupakan nama aplikasi web kami yang bertujuan untuk membantu manajemen bantuan bagi korban bencana. Aplikasi ini diharapkan dapat membantu untuk menangani masalah dilapangan yang tidak sesuai dengan kebutuhan. Misal, dilapangan memerlukan makanan tetapi sumbangan yang diterima berupa pakaian atau sebaliknya. Hal tersebut tentunya sangat tidak sinkron antara permintaan dan donasi. 
### Adapun Cakupan proyek yang kami buat adalah sebagai berikut:
1. Fitur Login dan Autentikasi Pengguna: Yang mana fitur dan sistem ini untuk sarana pendaftaran serta mengelola akses penyumbang, relawan, dan koordinator lapangan.
2. Manajemen Donasi: Pada halaman ini terdapat fitur pendaftaran donasi dan pencocokan dengan kebutuhan korban bencana.
4. Dashboard Koordinasi: Halaman Dashboard ini dashboard ini menyediakan informasi bantuan dan donasi real-time untuk tim di lapangan.
5. Inventarisasi Gudang: membangun sistem pelacakan stok di berbagai gudang bantuan.

### Frontend
#### React + Vite
how to install + run:
```pnpm i
pnpm run dev```
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:
@vitejs/plugin-react uses Babel for Fast Refresh
@vitejs/plugin-react-swc uses SWC for Fast Refresh

### Backend
**API Documentation**
For detailed API documentation, please visit: https://bantulink-api.site/docs#/

**Base URL**
All API requests should be made to: https://bantulink-api.site/

**How to Run the Project**
1. Clone the Repository
  `git clone https://github.com/your-username/BantuLink.git`
`cd BantuLink/Backend`
2. Install Dependencies
  `npm install`
3. Set Up Environment Variables
* Create a new .env file in the root of the Backend directory
* Add the following variables (replace with your actual values):
  `HOST=localhost`
  `PORT=5000
  `PGUSER=your_postgres_username`
  `PGHOST=your_postgres_host`
  `PGPASSWORD=your_postgres_password`
  `PGDATABASE=your_database_name`
  `PGPORT=5432`
  `ACCESS_TOKEN_KEY=your_access_token_secret`
  `REFRESH_TOKEN_KEY=your_refresh_token_secret`
  `ACCESS_TOKEN_AGE=1800`
4. Run Database Migrations
  `npm run migrate up`
5. Start the Server
  For development:
   `npm run dev`
  For production:
  `npm start`
  The server should now be running on http://localhost:5000 (or the port you specified in the .env file).

# BANTULINK API

## API Documentation

For detailed API documentation, please visit:
[https://bantulink-api.site/docs#/](https://bantulink-api.site/docs#/)

## Base URL

All API requests should be made to:
`https://bantulink-api.site/`

## How to Run the Project

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/your-username/BantuLink.git
    cd BantuLink/Backend
    ```
2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Set Up Environment Variables**

    - Create a new `.env` file in the root of the Backend directory
    - Add the following variables (replace with your actual values):

    ```bash
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
    ```

4.  **Run Database Migrations**

    ```bash
    npm run migrate up
    ```

5.  **Start the Server**

    For development:

    ```bash
    npm run dev
    ```

    For production:

    ```bash
    npm start
    ```

The server should now be running on http://localhost:5000 (or the port you specified in the .env file).

For detailed information on available endpoints and their usage, please refer to the API documentation linked at the top of this README.

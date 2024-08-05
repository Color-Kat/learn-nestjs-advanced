export default () => ({
    port      : parseInt(process.env.PORT) || 3000,
    jwt_secret: process.env.JWT_SECRET || "jwt_secret",

    // Database
    database: {
        host    : process.env.DB_HOST || "localhost",
        port    : parseInt(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        name    : process.env.DB_NAME
    }

});
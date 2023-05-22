export default () => ({
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: +process.env.DATABASE_PORT || 5432,
    user: process.env.DATABASE_USER || 'pg',
    pass: process.env.DATABASE_PASS || '',
    name: process.env.DATABASE_NAME || 'o2database',
    ssl: process.env.DATABASE_SSL === 'true',
  },
});

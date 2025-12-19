import { Pool, PoolClient } from 'pg';
import 'dotenv/config';

interface ConnectionResult {
  success: boolean;
  message: string;
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function testConnection(): Promise<ConnectionResult> {
  try {
    console.log('Attempting to connect with DATABASE_URL:', process.env.DATABASE_URL);
    const client: PoolClient = await pool.connect();
    await client.query('SELECT NOW()');
    client.release();
    console.log('Database connection successful');
    return { success: true, message: 'Database connection successful' };
  } catch (error) {
    const err = error as Error;
    console.error('Database connection error:', err);
    return { success: false, message: `Database connection failed: ${err.message}` };
  }
}

export default pool;


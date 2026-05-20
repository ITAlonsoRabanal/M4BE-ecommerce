import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export default registerAs('typeorm', () => ({
  type: 'postgres',
  database: process.env.PROD_DB_NAME || process.env.DB_NAME || 'mydatabase',
  url: process.env.PROD_DATABASE_URL,
  host: process.env.PROD_DB_HOST || process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.PROD_DB_USERNAME || process.env.DB_USERNAME || 'postgres',
  password: process.env.PROD_DB_PASSWORD || process.env.DB_PASSWORD || 'password',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  dropSchema: false,
  synchronize: false,
  logging: false,
  ssl: process.env.DB_SSL === 'true',
}) as DataSourceOptions);

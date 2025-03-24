import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export default registerAs('typeorm', () => ({
  type: 'postgres',
  database: process.env.DB_NAME || 'mydatabase',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  dropSchema: false,
  synchronize: true,
  logging: false,
  ssl: process.env.DB_SSL === 'true',
}) as DataSourceOptions);

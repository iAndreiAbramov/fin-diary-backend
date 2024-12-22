export interface IDbConfig {
  type: 'postgres';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  entities: string[];
  migrations: string[];
  migrationsTableName: string;
  migrationsRun: boolean;
  retryAttempts: number;
  retryDelay: number;
  autoLoadEntities: boolean;
  useUTC: boolean;
  synchronize: boolean;
}

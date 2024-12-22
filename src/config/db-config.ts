import { IDbConfig } from '@src/types/i-db-config';
import * as Joi from 'joi';

export const getDbConfig = () => {
  const config: IDbConfig = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/database/migrations/*.js'],
    migrationsTableName: 'migration',
    migrationsRun: true,
    retryAttempts: 5,
    retryDelay: 1000,
    autoLoadEntities: true,
    useUTC: true,
    synchronize: false,
  };

  const configSchema = Joi.object<IDbConfig, false, IDbConfig>({
    type: Joi.string().required(),
    host: Joi.string().required(),
    port: Joi.number().port().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    database: Joi.string().required(),
    entities: Joi.array().items(Joi.string()).required(),
    migrations: Joi.array().items(Joi.string()).required(),
    migrationsTableName: Joi.string().required(),
    migrationsRun: Joi.boolean().required(),
    retryAttempts: Joi.number().required(),
    retryDelay: Joi.number().required(),
    autoLoadEntities: Joi.boolean().required(),
    useUTC: Joi.boolean().required(),
    synchronize: Joi.boolean().required(),
  });

  const { error } = configSchema.validate(config);

  if (error) {
    throw new Error(`[db-config]: ${error.message}`);
  }

  return config;
};

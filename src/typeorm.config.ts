import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST ,
    port: +process.env.POSTGRES_PORT ,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DB ,
    entities: [__dirname + '/**/*.entity.ts', __dirname + '/**/*.entity.js'],
    migrationsRun: false,
    logging: true,
    migrationsTableName: "migration",
    migrations: [__dirname + '/migration/**/*.ts', __dirname + '/migration/**/*.js'],
    synchronize: false,
    cli: {
        migrationsDir: 'src/migration'
    }
    // "typeorm": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js --config src/typeorm.config.ts",
    // "typeorm:create": "npm run typeorm migration:create -- -n",
    // "typeorm:generate": "npm run typeorm migration:generate -- -n",
    // "typeorm:run": "npm run typeorm migration:run",
    // "typeorm:revert": "npm run typeorm migration:revert"
    //--config src/app.module.ts"
}

export = typeOrmConfig
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig = require("./typeorm.config")
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST ,
      port: +process.env.POSTGRES_PORT ,
      username: process.env.DB_USERNAME ,
      password: process.env.DB_PASSWORD ,
      database: process.env.POSTGRES_DB ,
      entities: [__dirname + '/**/*.entity.ts', __dirname + '/**/*.entity.js'],
      migrationsRun: true,
      logging: true,
      synchronize: true, // set it to false in production to avoid losing data
      migrationsTableName: "migration",// run npx typeorm migration:create -n UserData -d src/migrations, and npm run build
      //typeorm migration:run
      
      migrations: ["dist/src/migration/*.js'","dist/src/migration/*.ts'"],
      cli: {
          migrationsDir: 'src/migration'
      }
    }
    )
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

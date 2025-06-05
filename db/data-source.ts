import {DataSource,DataSourceOptions} from "typeorm";
import {config} from "dotenv";
config();

export const AppDataSourceOptions: DataSourceOptions = {
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: [],
    logging: false,
    synchronize: true,
}


const AppDataSource = new DataSource(AppDataSourceOptions);

export default AppDataSource;
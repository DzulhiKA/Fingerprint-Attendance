import { DataTypes, Sequelize } from 'sequelize';

// const sequelize = new Sequelize(
//   process.env.MYSQL_DATABASE || 'gym',
//   process.env.MYSQL_USER || 'gym_abm',
//   process.env.MYSQL_PASSWORD || '123@45',
//   {
//     host: process.env.MYSQL_HOST || '103.56.148.173',
//     port: parseInt(process.env.MYSQL_PORT || '3306'),
//     dialect: 'mysql',
//   }
// );

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || "gym", 
  process.env.MYSQL_USER || "gym_abm", 
  process.env.MYSQL_PASSWORD || "123@45", 
{
  host: process.env.MYSQL_HOST || "103.56.148.173",
  dialect: 'mysql',
  dialectModule: require('mysql2')
});

export default sequelize;

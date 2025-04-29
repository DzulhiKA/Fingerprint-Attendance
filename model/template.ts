import { DataTypes } from 'sequelize';
import sequelize from '@/lib/sequelize'; // your sequelize config

const Template = sequelize.define('tb_template_copy1', {
  pin: DataTypes.STRING,
  tmp: DataTypes.JSON, // assuming tmp is parsed JSON
});

export default Template;

import { DataTypes } from 'sequelize';
import sequelize from '@/lib/sequelize'; // your sequelize config

const User = sequelize.define('tb_user_copy1', {
  sn: DataTypes.STRING,
  pin: DataTypes.STRING,
  nama: DataTypes.STRING,
  pwd: DataTypes.STRING,
  rfid: DataTypes.STRING,
  priv: DataTypes.STRING,
  expiredAt:DataTypes.DATE,
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
});

export default User;

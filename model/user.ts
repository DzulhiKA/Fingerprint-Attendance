import { DataTypes } from 'sequelize';
import sequelize from '@/lib/sequelize'; // your sequelize config

const User = sequelize.define(
  "tb_user_copy1s",
  {
    sn: DataTypes.STRING,
    pin: {
      type: DataTypes.STRING,
      primaryKey: true, // jika `pin` unik
    },
    nama: DataTypes.STRING,
    pwd: DataTypes.STRING,
    rfid: DataTypes.STRING,
    priv: DataTypes.STRING,
    expiredAt: DataTypes.DATE,
  },
  {
    timestamps: true, // ini akan otomatis tambahkan createdAt & updatedAt
    tableName: "tb_user_copy1s",
  }
)

export default User;

import { DataTypes } from 'sequelize';
import sequelize from '@/lib/sequelize'; // your sequelize config

const User = sequelize.define('tb_user_copy1', {
  sn: DataTypes.STRING,
  pin: DataTypes.STRING,
  nama: DataTypes.STRING,
  pwd: DataTypes.STRING,
  rfid: DataTypes.STRING,
  priv: DataTypes.STRING,
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  expiredAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: () => {
      const now = new Date();
      now.setDate(now.getDate() + 30);  // Menambah 30 hari ke tanggal sekarang
      return now;  // Mengembalikan tanggal baru setelah penambahan 30 hari
    },
  },
});

export default User;

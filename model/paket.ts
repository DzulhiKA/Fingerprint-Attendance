// models/paket.ts

import { DataTypes } from "sequelize"
import sequelize from "@/lib/sequelize" // sesuaikan path ke koneksi Sequelize

const Paket = sequelize.define(
  "Paket",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    harga: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    keterangan: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    tableName: "tb_paket",
    timestamps: false,
  }
)

export default Paket

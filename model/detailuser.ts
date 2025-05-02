// models/detailUser.ts

import { DataTypes } from "sequelize"
import sequelize from "@/lib/sequelize" // Sesuaikan path
import user from "./user"
import Paket from "./paket"

const DetailUser = sequelize.define(
  "DetailUser",
  {
    user_id: {
      type: DataTypes.STRING, // karena PIN biasanya berupa string
      allowNull: false,
      references: {
        model: user,
        key: "pin", // foreign key ke kolom pin, bukan id
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    paket_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Paket,
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
    nama: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    alamat: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    no_hp: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  },
  {
    tableName: "tb_detailuser",
    timestamps: false,
  }
)

export default DetailUser

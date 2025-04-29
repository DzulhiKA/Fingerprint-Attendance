import { DataTypes } from "sequelize"
import sequelize from "@/lib/sequelize"

const NonMember = sequelize.define(
  "non_members",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    harga_dibayar: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    timestamps: true, // karena tidak ada kolom createdAt dan updatedAt
  }
)

export default NonMember

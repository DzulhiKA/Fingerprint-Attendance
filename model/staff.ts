import { DataTypes } from "sequelize";
import sequelize from "@/lib/sequelize"; // your sequelize config

const Staff = sequelize.define(
  "tb_staff",
  {
    nama: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    timestamps: true, // ini akan otomatis tambahkan createdAt & updatedAt
    tableName: "tb_staff",
  }
);

export default Staff;

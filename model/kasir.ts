import { DataTypes } from "sequelize";
import sequelize from "@/lib/sequelize"; // your sequelize config

const Kasir = sequelize.define("tb_kasir", {
  nama: DataTypes.STRING,
  quantity: DataTypes.INTEGER,
  total: {
    type: DataTypes.DECIMAL(10, 2),
  },
});

export default Kasir;

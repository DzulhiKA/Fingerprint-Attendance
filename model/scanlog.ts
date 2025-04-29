import { DataTypes } from "sequelize"
import sequelize from "@/lib/sequelize" // your sequelize config

const scanLog = sequelize.define('tb_scanlog_copy1',
  {
    sn: DataTypes.STRING,
    scan_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    pin: DataTypes.STRING,
    verifymode: DataTypes.INTEGER,
    iomode: DataTypes.INTEGER,
    workcode: DataTypes.INTEGER,
  },
);

export default scanLog

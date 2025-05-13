import { DataTypes } from "sequelize"
import sequelize from "@/lib/sequelize" // sesuaikan dengan path koneksi db kamu

const MemberActivityLog = sequelize.define(
  "MemberActivityLog",
  {
    pin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    action: {
      type: DataTypes.ENUM("new", "extend"),
      allowNull: false,
    },
    old_expired: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    new_expired: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "member_activity_logs",
    timestamps: true,
  }
)

export default MemberActivityLog

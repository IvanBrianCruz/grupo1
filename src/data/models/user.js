module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: DataTypes.STRING(255),
      },
      last_name: {
        type: DataTypes.STRING(255),
      },
      email: {
        type: DataTypes.STRING(255),
      },
      password: {
        type: DataTypes.STRING(255),
      },
      image: {
        type: DataTypes.STRING(255),
      },
      category: {
        type: DataTypes.STRING(255),
      },
    }, {
      timestamps: false,
      createdAt: false, // Deshabilitar la columna "created_at"
      updatedAt: false, // Deshabilitar la columna "updated_at"
      deletedAt: false,
      tableName: 'Users', // Nombre de la tabla
    });
  
    return User;
  };
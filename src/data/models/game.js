module.exports = (sequelize, DataTypes) => {
    const Game = sequelize.define('Game', {
      id: {
        type: DataTypes.BIGINT(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(255),
      },
      category: {
        type: DataTypes.STRING(255),
      },
      features: {
        type: DataTypes.STRING(1500),
      },
    }, {
      timestamps: false,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: false,
    });
  
    return Game;
  };
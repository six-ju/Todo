const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        static associate({ todolist }) {
            // 관계 설정
            this.hasMany(todolist, {
                foreignKey: 'userId',
                sourceKey: 'id',
            });
        }
    }
    user.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            social: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            instaUrl: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdBy: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'user',
            timestamps: true,
            paranoid: true,
        },
    );
    return user;
};

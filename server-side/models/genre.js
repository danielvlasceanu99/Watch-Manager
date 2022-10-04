module.exports = (sequelize, DataTyes) => {
    return sequelize.define(
        "genre",
        {
            id: {
                type: DataTyes.CHAR(36),
                primaryKey: true,
            },
            name: DataTyes.STRING(100),
        },
        {
            underscored: true,
            timestamps: false,
        }
    );
};

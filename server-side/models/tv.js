module.exports = (sequelize, DataTyes) => {
    return sequelize.define(
        "tv",
        {
            id: {
                type: DataTyes.CHAR(36),
                primaryKey: true,
            },
            name: DataTyes.STRING(100),
            tagline: DataTyes.STRING(150),
            overview: DataTyes.STRING(1000),
            first_air_date: DataTyes.DATE,
            in_production: DataTyes.BOOLEAN,
            network: DataTyes.STRING,
            poster_path: DataTyes.STRING,
            created_by: DataTyes.STRING,
            last_changed_by: DataTyes.STRING,
        },
        {
            underscored: true,
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "last_changed_at",
        }
    );
};

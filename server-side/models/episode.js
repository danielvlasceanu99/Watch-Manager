module.exports = (sequelize, DataTyes) => {
    return sequelize.define(
        "episode",
        {
            id: {
                type: DataTyes.CHAR(36),
                primaryKey: true,
            },
            episode_number: DataTyes.INTEGER,
            name: DataTyes.STRING(100),
            overview: DataTyes.STRING(1000),
            air_date: DataTyes.DATE,
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

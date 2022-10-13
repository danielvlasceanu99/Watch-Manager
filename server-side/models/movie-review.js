module.exports = (sequelize, DataTyes) => {
    return sequelize.define(
        "movie_review",
        {
            id: {
                type: DataTyes.CHAR(36),
                primaryKey: true,
            },
            title: DataTyes.STRING,
            content: DataTyes.STRING(1000),
            user_name: DataTyes.STRING,
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

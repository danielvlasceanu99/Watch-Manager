module.exports = (sequelize, DataTyes) => {
    return sequelize.define(
        "review",
        {
            id: {
                type: DataTyes.CHAR(36),
                primaryKey: true,
            },
            title: DataTyes.STRING,
            content: DataTyes.STRING(1000),
            user_name: DataTyes.STRING,
            media_type: {
                type: DataTyes.STRING,
                validate: {
                    isIn: [["tv", "movie"]],
                },
            },
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

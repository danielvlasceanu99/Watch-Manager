module.exports = (sequelize, DataTyes) => {
    return sequelize.define(
        "rating",
        {
            id: {
                type: DataTyes.CHAR(36),
                primaryKey: true,
            },
            score: DataTyes.INTEGER,
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

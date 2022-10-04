module.exports = (sequelize, DataTyes) => {
    return sequelize.define(
        "tv_review",
        {
            id: {
                type: DataTyes.CHAR(36),
                primaryKey: true,
            },
            content: DataTyes.STRING(1000),
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

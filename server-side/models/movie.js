module.exports = (sequelize, DataTyes) => {
    return sequelize.define(
        "movie",
        {
            id: {
                type: DataTyes.CHAR(36),
                primaryKey: true,
            },
            title: DataTyes.STRING(100),
            tagline: DataTyes.STRING(150),
            overview: DataTyes.STRING,
            runtime: DataTyes.INTEGER,
            release_date: DataTyes.DATE,
            status: {
                type: DataTyes.STRING,
                validate: {
                    isIn: [["Rumored", "Planned", "In Production", "Post Production", "Released", "Canceled"]],
                },
            },
            budget: DataTyes.INTEGER,
            revenue: DataTyes.INTEGER,
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

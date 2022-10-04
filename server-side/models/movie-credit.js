module.exports = (sequelize, DataTyes) => {
    return sequelize.define(
        "movie_credit",
        {
            id: {
                type: DataTyes.CHAR(36),
                primaryKey: true,
            },
            job: DataTyes.STRING,
            credit_type: {
                type: DataTyes.STRING,
                validate: {
                    isIn: [["Cast", "Crew"]],
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

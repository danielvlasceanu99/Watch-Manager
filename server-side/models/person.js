module.exports = (sequelize, DataTyes) => {
    return sequelize.define(
        "person",
        {
            id: {
                type: DataTyes.CHAR(36),
                primaryKey: true,
            },
            name: DataTyes.STRING(100),
            gender: {
                type: DataTyes.STRING,
                validate: {
                    isIn: [["Male", "Female", "Other"]],
                },
            },
            biography: DataTyes.STRING(1000),
            place_of_birth: DataTyes.STRING,
            birthday: DataTyes.DATE,
            death_date: DataTyes.DATE,
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

import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: `${__dirname}/database.sqlite`,
});

export { sequelize };
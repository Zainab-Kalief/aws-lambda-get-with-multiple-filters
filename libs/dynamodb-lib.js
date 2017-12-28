import dynamo from "dynamodb";
import Joi from "joi";

const PERSON = dynamo.define("PERSON", {
  hashKey: "mpId",
  timestamps: true,
  schema: {
    mpId: dynamo.types.uuid(),
    title: Joi.string().max(10),
    content: Joi.string(),
    createdBy: Joi.string(),
    address: Joi.string(),
    name: Joi.string(),
    userId: Joi.string()
  },
  tableName: "CoronaMP_DEV"
});

module.exports = PERSON;

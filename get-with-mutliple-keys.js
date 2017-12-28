import { success, failure } from "./libs/response-lib";
import PERSON from "./libs/dynamodb-lib";

function scanPromise(error, data) {
  return new Promise((resolve, reject) => {
    if (error) {
      reject(error);
    }
    resolve(data);
  });
}

export async function main(event, context, callback) {
  const eventData = event.queryStringParameters || {},
    params = Object.keys(eventData);

  let PersonScan = null;

  if (params.length) {
    PersonScan = PERSON.scan();
    params.forEach(key => (PersonScan = PersonScan.where(key).equals(eventData[key])));

    PersonScan.exec((error, data) => {
      scanPromise(error, data)
        .then(value => {
          let response = {};
          if (!value.Count) {
            response.message = "Person not found";
            return callback(null, failure(response, 404));
          } else {
            response.message = "successfully found";
            // response.data = value.Items
            console.log(value.Items);
            return callback(null, success(response));
          }
        })
        .catch(error => {
          console.log(error);
          return callback(null, failure({ error: error.message }));
        });
    });
  } else {
    return callback(null, failure({ error: "No Query String Parameter was given" }));
  }
}

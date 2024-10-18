const http = require("http");
const message = require('./message.js');

let response = {
  statusCode: 500,
  headers: { "Content-Type": "application/json" },
  body: "",
};

let request = async (httpOptions, data) => {
  return new Promise((resolve, reject) => {
    let req = http.request(httpOptions, (res) => {
      let body = "";
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => {
        resolve({
          status: "success",
          data: body,
        });
      });
    });
    req.on("timeout", (e) => {
      reject({
        status: "timeout",
        data: e,
      });
    });
    req.on("error", (e) => {
      reject({
        status: "error",
        data: e,
      });
    });
    req.write(data);
    req.end();
  });
};


exports.handler = async (event) => {
  console.log("event: ", event);
  try {
    let reqBody = event.reqBody;
    let originalRequest = event.originalRequest;
    
    if (reqBody.length > 10000) {
      response.statusCode = 400;
      response.body = `Max length Backend`;
      return response;
    }
    console.log(JSON.stringify(event));
    let server = event.reqServer;
    let headers = event.reqHeaders;
    const timeOut = parseInt(server.timeout) * 1000;
    let requestOptions = {
      timeout: timeOut,
      host: server.host,
      port: server.port,
      path: server.path,
      method: server.method,
      headers: headers,
    };

    let result = await request(
      requestOptions,
      JSON.stringify(reqBody).replaceAll(
        "{timeESB}",
        new Date(
          new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
        ).toISOString()
      )
    );
    console.log("result ne: ", result);
    if (result.status == "success") {
      response.body = JSON.parse(result.data);
      response.statusCode = 200;  

      let messageType = originalRequest.data.messageType;
      let point = originalRequest.data.point;
      let total = originalRequest.data.total;
  
      let startDate = "01/10/2024";
      let endDate = "31/12/2024";

      let generatedMessage;
      switch (messageType) {
        case "GET_SPIN":
          generatedMessage = message.GET_SPIN(point, total, startDate, endDate);
          break;
        case "REMIND_SPIN":
          generatedMessage = message.REMIND_SPIN(total, startDate, endDate);
          break;
        case "CLAIM_REWARD":
          generatedMessage = message.CLAIM_REWARD(startDate, endDate);
          break;
        case "SKYPOINT_BALANCE":
          generatedMessage = message.SKYPOINT_BALANCE(reqBody.dateTime, point, total, reqBody.extraInfo);
          break;
      }

      console.log("Generated Message: ", generatedMessage);
    }
    console.log(result);
  } catch (e) {
    console.log(e);
    if (e.status == "error") {
      response.statusCode = 500;
      response.body = `Internal server error: Unspecified`;
    }
    if (e.status == "timeout") {
      response.statusCode = 408;
      response.body = `Timeout Backend`;
    }
  }
  return response;
};

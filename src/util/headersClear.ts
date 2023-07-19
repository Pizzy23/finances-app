export class Headers {
  clear(headers: any) {
    const clearedHeaders = Object.assign({}, headers);

    delete clearedHeaders["accept"];
    delete clearedHeaders["accept-encoding"];
    delete clearedHeaders["connection"];
    delete clearedHeaders["content-length"];
    delete clearedHeaders["host"];
    delete clearedHeaders["postman-token"];
    delete clearedHeaders["user-agent"];
    delete clearedHeaders["content-type"];

    return clearedHeaders;
  }
}

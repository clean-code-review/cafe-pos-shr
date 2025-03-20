/* eslint-disable import/no-extraneous-dependencies */
import { Server } from "miragejs";

import responses from "./responses";

function enableMirageMock() {
  return new Server({
    environment: "development",
    routes() {
      this.namespace = "";
      this.timing = 500;
      Object.values(responses).forEach(({ uri, handleResponse }) => {
        this.get(uri, () => handleResponse());
      });
    },
  });
}

export default enableMirageMock;

import config from "../config";
import TokenService from "./token-service";
const learnService = {
  postGuess(guess) {
    return fetch(`${config.API_ENDPOINT}/language/guess`, {
      method: "POST",
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(guess),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getHead() {
    return fetch(`${config.API_ENDPOINT}/language/head`, {
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    });
  },
};

export default learnService;

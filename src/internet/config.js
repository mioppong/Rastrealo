// const Constants = require('expo-constants');


const isProd = false;

const url = "https://61aecea833653500172f9fbf.mockapi.io/loginRastrealo";

const config = {
  backendURL: isProd
    ?url
    :url
};

export default config;
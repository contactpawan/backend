module.exports = {
    apps: [
      {
        name: "backend",
        script: "./build/index.js",
        watch: true,
        env: {
          NODE_ENV: "staging"
        },
        env_production: {
          NODE_ENV: "production"
        }
      }
    ],
    deploy: {
      staging: {},
      production: {}
    }
  };
  
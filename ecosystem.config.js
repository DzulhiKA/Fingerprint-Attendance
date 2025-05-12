// module.exports = {
//   apps: [
//     {
//       name: "server",
//       script: "node_modules/next/dist/bin/next",
//       args: "dev",
//       watch: true, // opsional, restart kalau file berubah
//       env: {
//         NODE_ENV: "development"
//       }
//     }
//   ]
// }

module.exports = {
  apps: [
    {
      name: "mgym",
      script: "node_modules/next/dist/bin/next",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};

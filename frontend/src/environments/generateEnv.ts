const setEnv = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;
  const targetPath = './src/environments/environments.ts';
  require('dotenv').config({
    path: '.env',
  });
  // `environment.ts` file structure
  const envConfigFile = `export const environment = {
    production: false,
    domainUrl: '${process.env['NG_APP_DOMAIN_URL']}',
    contractAddress: '${process.env['NG_APP_CONTRACT_ADDRESS']}',
    adminAddress: '${process.env['NG_APP_ADMIN_ADDRESS']}',
    apiKeyAlchemy: '${process.env['NG_APP_API_KEY_ALCHEMY']}',
    projectId: '${process.env['NG_APP_PROJECT_ID']}',
    };
    `;
  writeFile(targetPath, envConfigFile, (err) => {
    if (err) {
      console.error(err);
      throw err;
    }
  });
};
setEnv();

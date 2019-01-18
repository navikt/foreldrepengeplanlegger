const fsExtra = require('fs-extra');

function createEnvSettingsFile(settingsFile) {
    fsExtra.ensureFile(settingsFile).then((f) => {
        fsExtra.writeFileSync(
            settingsFile,
            `window.appSettings = {
                FPP_API_URL: '${process.env.FPP_API_URL}'
            };`
        );
    });
}
module.exports = createEnvSettingsFile;

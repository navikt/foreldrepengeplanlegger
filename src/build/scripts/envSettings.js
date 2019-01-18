const fsExtra = require('fs-extra');

function createEnvSettingsFile(settingsFile) {
    fsExtra.ensureFile(settingsFile).then((f) => {
        fsExtra.writeFileSync(
            settingsFile,
            `window.appSettings = {
                UTTAK_API_URL: '${process.env.FP_UTTAK_SERVICE_URL}'
            };`
        );
    });
}
module.exports = createEnvSettingsFile;

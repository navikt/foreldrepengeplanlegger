const Environment = () => {
    return {
        FP_UTTAK_SERVICE_URL: (window as any).appSettings.FP_UTTAK_SERVICE_URL
    };
};

export default Environment();

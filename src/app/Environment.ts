const Environment = () => {
    return {
        FPP_API_URL: (window as any).appSettings.FPP_API_URL
    };
};

export default Environment();

const Environment = () => {
    return {
        UTTAK_API_URL: (window as any).appSettings.UTTAK_API_URL
    };
};

export default Environment();

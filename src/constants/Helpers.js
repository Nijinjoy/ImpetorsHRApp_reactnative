const generateRandomFilename = () => {
    const timestamp = Math.floor(Date.now() / 1000);
    const randomNumber = Math.floor(Math.random() * 10000);
    return `${timestamp}-${randomNumber}.jpeg`;
};

export { generateRandomFilename }

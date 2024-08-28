export const validate = (
    pn: string,
    message: string,
    phonePossibility: string,
    typeIsMobile: boolean,
    call = false
) => {
    const incomplete = "Invalid input";
    const invalidPhoneNumber = "Invalid phone number.";

    if (!call && (!pn || !message)) {
        return Promise.reject(incomplete);
    } else if ((pn && !typeIsMobile) || phonePossibility === "unknown") {
        return Promise.reject(invalidPhoneNumber);
    }

    return Promise.resolve();
};

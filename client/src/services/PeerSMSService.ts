import { axiosInstance } from "./config";

class PeerSMS {
    /**
     * @description
     * Sends sms with the params of message and receiverNumber to be sent to
     * server
     * @param {{message: string, receiverNumber: string}} data - message, receiverNumber
     */
    async sendMessage(message: string, receiverNumber: string) {
        const res = await axiosInstance.post("/sms", {
            message,
            receiverNumber,
        });

        return res;
    }
}

export default new PeerSMS();

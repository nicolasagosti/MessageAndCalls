// @ts-nocheck
import { axiosInstance } from "./config";

import { Device } from "@twilio/voice-sdk";

// import { Device } from "@twilio/voice-sdk/dist/twilio.min.js";
// Device = window["Twilio"].Device;

class PeerCall {
    async callbackCall(to: string) {
        await axiosInstance.post("/call/callback", { to });
    }

    /**
     * @description
     * Outbound Call
     * @param {{to: string}} to
     */
    async getToken(to: string) {
        await this.callbackCall(to);
        const res = await axiosInstance.get("/call/token");
        const device = await new Device(res.data, {
            codecPreferences: ["opus", "pcmu"],
            fakeLocalDTMF: true,
            enableRingingState: true,
            logLevel: 1,
        });

        if (device) {
            let call = await device.connect({ params: { To: to } });

            call.on("disconnect", () => {
                return Promise.reject("Call Disconnect");
            });
            return Promise.resolve(`Calling ${to}`);
        } else {
            return Promise.reject("Error on call, please try again.");
        }
    }
}

export default new PeerCall();

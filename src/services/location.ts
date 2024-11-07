import { LocationClient } from "@aws-sdk/client-location";

const locationClient = new LocationClient({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
    }
});

export default locationClient;
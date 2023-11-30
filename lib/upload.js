import { GCS_AUTH_PROVIDER_X509_CERT_URL, GCS_AUTH_URI, GCS_CLIENT_X509_CERT_URL, GCS_TOKEN_URI, GCS_UNIVERSE_DOMAIN } from "../src/constants/gcs";
import { Storage } from "@google-cloud/storage";
import axios from "axios";
import { createReadStream } from "fs";

const storage = new Storage({
  projectId: `${process.env.GCS_PROJECT_ID}`,
  credentials: {
    type: "service_account",
    project_id: `${process.env.GCS_PROJECT_ID}`,
    private_key_id: `${process.env.GCS_PRIVATE_KEY_ID}`,
    private_key: `${process.env.GCS_PRIVATE_KEY}`,
    client_email: `${process.env.GCS_CLIENT_EMAIL}`,
    client_id: `${process.env.GCS_CLIENT_ID}`,
    auth_uri: `${GCS_AUTH_URI}`,
    token_uri: `${GCS_TOKEN_URI}`,
    auth_provider_x509_cert_url: `${GCS_AUTH_PROVIDER_X509_CERT_URL}`,
    client_x509_cert_url: `${GCS_CLIENT_X509_CERT_URL}`,
    universe_domain: `${GCS_UNIVERSE_DOMAIN}`,
  },
});

export const uploadToGCS = async (fileUploaded) => {
  let fileName = "";

  const uploadedFile = fileUploaded;
  const gcBucket = storage.bucket(`${process.env.GCS_BUCKET}`);
  const file = gcBucket.file(uploadedFile.originalFilename);
  const options = {
    version: "v4",
    action: "write",
    expires: Date.now() + 1 * 60 * 1000, // 1 minute
  };

  const [url] = await file.getSignedUrl(options);

  const upload = await axios.put(url, createReadStream(uploadedFile.filepath), {
    headers: {
      "Content-Type": uploadedFile.mimetype,
    },
  });

  if (upload.status == 200) {
    fileName = `${process.env.GCS_URL}/${process.env.GCS_BUCKET}/${uploadedFile.originalFilename}`;
    console.error("Uploaded successfully!");
  } else {
    console.error("Upload failed.");
  }

  return fileName;
};

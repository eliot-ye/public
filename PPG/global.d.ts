interface Window {
  appVerify?: (option?: { promptMessage?: string }) => Promise<AppVerifyResult>;
}

interface AppVerifyResult {
  statusCode: "SUC200" | "VRF403" | "UNA404";
  verifySuccess?: boolean;
  error?: string;
}

declare module "native-browser-otp" {
  function totp(secret: string): Promise<string>;
}

import { jwtDecode } from "jwt-decode";

export default async function (req, res) {
    const code = req.query["code"] ?? "";
    const encodedCode = encodeURIComponent(code);
    const encodedRedirectUri = encodeURIComponent('https://poc-20231115.vercel.app/api');
    const encodedCodeVerifier = encodeURIComponent('hX8ZX3-ASJ12NWdtRZGceqCZnZmqf6QubwEGmHvnOZ3urvqFGYn99T6zk36RVcNBWXpSZ6_e0POeE2QjaZysm3VY9PXaNAhIqoaB1lziIv8YDOAH0n9LpropRlv_FB0I');
    const response = await fetch("https://login.katalon.com/realms/katalon/protocol/openid-connect/token", {
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
        },
        "body": `code=${encodedCode}&grant_type=authorization_code&client_id=katalon-g4&redirect_uri=${encodedRedirectUri}&code_verifier=${encodedCodeVerifier}`,
        "method": "POST"
    });
    const json = await response.json();
    console.log({ json });
    const decoded = jwtDecode(json.access_token);
    console.log({ decoded });
    res.send(`Hello ${decoded.name}`);
}
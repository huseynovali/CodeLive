import CryptoJS from "crypto-js";

export const setCryptLocalSrtorage = (name, data) => {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), "ILoveYouBaby");
    localStorage.setItem(name, encryptedData);

}



export const getCryptLocalSrtorage = (name) => {
    const encryptedData = localStorage.getItem(name);
    if (encryptedData) {
        const bytes = CryptoJS.AES.decrypt(encryptedData, "ILoveYouBaby");
        const originalData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return originalData
    }
    return null

}




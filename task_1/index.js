import { encoded, translations } from "./data.js";

function decryptEncoded(encodedData) {
  const decryptedData = [];
  const uniqueIds = new Set();

  encodedData.forEach((item) => {
    const decryptedItem = {};

    Object.keys(item).forEach((key) => {
      if (key.endsWith("Id")) {
        decryptedItem[key] = translations[item[key]] || item[key];
      } else if (["groupId", "service", "formatSize", "ca"].includes(key)) {
        decryptedItem[key] = item[key];
      }
      if (key == "groupId") {
        uniqueIds.add(item[key]);
      }
    });
    decryptedData.push(decryptedItem);
  });

  return { decryptedData, uniqueIds };
}

console.log(decryptEncoded(encoded));

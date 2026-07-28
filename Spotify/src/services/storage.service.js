const { ImageKit, toFile } = require("@imagekit/nodejs");

const imageKitClient = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile(file) {
  const result = await imageKitClient.files.upload({
    file: await toFile(file.buffer, "music"),
    fileName: "song" + Date.now(),
    folder: "backend-sheriyans/music",
  });
  return result;
}

module.exports = { uploadFile };

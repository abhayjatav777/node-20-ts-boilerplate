import FormData from "form-data";

import axios from "axios";

export const uploadFileMS = async (file: Express.Multer.File) => {
  try {
    const formData = new FormData();
    formData.append("file", file.buffer, file.originalname);
    const headers = {
      Authorization: `Bearer ${process.env.MSUPLOADKEY}`,
      "Content-Type": "multipart/form-data",
    };

    const response = await axios({
      url: `https://bucket.meerasolution.com/upload-file?bucketName=${process.env.MSBUCKETNAME}`,
      method: "POST",
      data: formData,
      headers: headers,
    });

    if (response.status === 201) {
      return response.data.data;
    } else {
      throw new Error(response.data.data.message);
    }
  } catch (error: unknown) {
    const newError = error as TError;
    throw new Error(newError.message);
  }
};

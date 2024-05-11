import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
export class Config {
  async start() {
    try {
      // Connect to mondoDb
      await this.dbConnect(process.env.DBURI ?? "");
    } catch (error: unknown) {
      const newError = error as { message: string };
      console.error("OOPS! ", newError);
      throw new Error("error");
    }
  }

  private async dbConnect(url: string) {
    try {
      await mongoose.connect(url);
      console.log("Connected to DB");
    } catch (error: unknown) {
      console.error("DB Connection Error ", error);
    }
  }
}

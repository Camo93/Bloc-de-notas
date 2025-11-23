import mongoose from 'mongoose';

export async function connectDB() {
  try {
    console.log("Conectando a MongoDB con URI:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("Mongo conectado correctamente ✅");
  } catch (error) {
    console.error("Error conectando a Mongo:", error);
  }
}

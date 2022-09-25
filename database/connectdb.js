import mongoose from "mongoose";

// try {
//     await mongoose.connect(process.env.URI_MONGO)
//     console.log('Connect DB ok')
// } catch (error) {
//     console.log(`Error de conexion a mongodb: ${error}`)
// }

try {
    mongoose.connect(process.env.URI_MONGO)
            .then(() => {
                console.log('db conectada')
            })
            .catch((e) => {
                console.log('fallo la conexion' + e)
            })
} catch (error) {
    console.log(`Error de conexion a mongodb: ${error}`)
}
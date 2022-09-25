import { Schema, model } from "mongoose";
import bcryptjs from 'bcryptjs'
const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true }
    },
    password: {
        type: String,
        require: true
    }
})

userSchema.pre("save", async function(next){
    const user = this

    if(!user.isModified('password')) return next()

    try {
        const jump = await bcryptjs.genSalt(10)
        user.password = await bcryptjs.hash(user.password, jump)
        next()
    } catch (error) {
        console.log(error)
        throw new Error('Fallo el hash de contrasenha')
    }
})

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcryptjs.compare(candidatePassword, this.password)
}

export const User = model('User', userSchema)
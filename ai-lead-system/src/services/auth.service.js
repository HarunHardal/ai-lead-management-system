const bcrypt = require("bcryptjs");
const {generateToken} = require("../utils/jwt");
const prisma = require("../config/prisma");

exports.register = async(email, password)=>{
    const hashed = await bcrypt.hash(password,10);

    const user = await prisma.user.create({
        data: {email, password: hashed},
    });
    return generateToken({id:user.id, role: user.role});
};

exports.login = async (email, password) => {
    const user = await prisma.user.findUnique({where: {email}});

    if(!user) throw new Error("User not found");
    const valid = await bcrypt.compare(password, user.password);

    if(!valid) throw new Error("Invalid credentials");

    return generateToken({id: user.id, role:user.role})
};

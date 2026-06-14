const authService = require("../services/auth.service");

exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const token = await authService.register(email, password);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        res.json({
            message: "Login başarılı"
        });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        res.json({
            message: "Login başarılı"
        });
    } catch (error) {
        next(error);
    }
};

exports.logout = (req, res) => {

    res.clearCookie("token");

    res.json({
        message: "Çıkış yapıldı"
    });

};

exports.me = (req, res) => { 
    res.json(req.user);
};
import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, user) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

    res.cookie("token", token, {
        httpOnly: true,             // Cookie is only accessible by the web server and not the client side scripts (XSS attacks)
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",         // Cookie is sent only to the same site as the request is being made from (CSRF attacks)
        maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    return token;
};

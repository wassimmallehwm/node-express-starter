const { APP_NAME, CLIENT_URL, DEFAULT_LOGO } = require("../../config");

module.exports = (firstname, lastname, token) => {
    return "<div style='padding: 3rem; height: 90%;width: 90%;background-color: rgb(243, 243, 243); text-align: center;'>" +
        "<div style='height: 200px; align-items: center;'>" +
        "<img style='width: 200px;' src='" + DEFAULT_LOGO + "' />" +
        "</div>" +
        "<h2 style='color:black; margin:0;'> Hello Mr/Mrs " + firstname + " " + lastname + "</h2><br>" +
        "<h2 style='color:black; margin:0;'> Welcome to <strong>" + APP_NAME + "</strong></h2><br>" +
        "<div style='height: 50px;background-color: #084259;width: 250px;font-size: 18px;text-align: center;margin: auto;border-radius: 5px;'>" +
        "<a style='background-color: #084259;text-decoration: none;color: white;height: 100%;line-height: 45px;'" +
        " target='_blank' href='" + CLIENT_URL + "verify-account?token=" + token + "'>Please verify your account</a></div></div>";
}
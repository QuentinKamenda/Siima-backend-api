

/* ----------------------------------------------------------------------------*/
/*                       MAIN PARAMETER CHECKER MODULE                         */
/* ----------------------------------------------------------------------------*/

/**
 * checkParameters - Calculates a checklist and verifies all the parameters, based on the API call type
 *
 * @param  {request} req     the user's request to verify
 * @param  {string} apiType  the type of the requested call (to assign a checklist)
 * @return {resolve or reject}         resolves if there's been no problem with the parameters ; rejects with an error message if a format problem has been spotted
 */
module.exports.checkParameters = function (req, apiType) {
    return new Promise((resolve, reject) => {
        // Assigns a checklist to the request
        let checkList = decideChecklistItems(apiType);
        try{
            // Goes through the checklist
            for(var i = 0; i <= checkList.length; i++){
                // If the checklist is completed, resolves without incident
                if (i === checkList.length){
                    resolve();
                }
                // Otherwise verifies the item of the list (throws an error if one of the verifications doesn't match)
                else{
                    let checkItem = checkList[i];
                    // Verifies the username
                    if (checkItem === "username"){
                        if (req.body.username === undefined || req.body.username === "") {
                            let response = {
                                isInternal: false,
                                message: "missing username"
                            };
                            throw response;

                        }else if ((typeof req.body.username) !== "string"){
                            let response = {
                                isInternal: false,
                                message: "invalid username: not a string"
                            };
                            throw response;
                        }else if (!verifyUsernameFormat(req.body.username)){
                            let response = {
                                isInternal: false,
                                message: "invalid username: invalid format (only a-z, A-Z and 0-9 allowed)"
                            };
                            throw response;
                        }
                    }
                    // Verifies the password
                    if (checkItem === "password"){
                        if (req.body.password === undefined || req.body.password === "") {
                            let response = {
                                isInternal: false,
                                message: "missing password"
                            };
                            throw response;

                        }else if ((typeof req.body.password) !== "string"){
                            let response = {
                                isInternal: false,
                                message: "invalid password: not a string"
                            };
                            throw response;
                        }else if (!verifyPasswordFormat(req.body.password)){
                            let response = {
                                isInternal: false,
                                message: "invalid password: invalid format (should contains from 8 to 20 characters with at least: 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character @#$%-_&)"
                            };
                            throw response;
                        }
                    }
                    // Verifies the mail address
                    if (checkItem === "mail"){
                        if (req.body.mail === undefined || req.body.mail === "") {
                            let response = {
                                isInternal: false,
                                message: "missing mail address"
                            };
                            throw response;

                        }else if ((typeof req.body.mail) !== "string"){
                            let response = {
                                isInternal: false,
                                message: "invalid mail address: not a string"
                            };
                            throw response;
                        }else if (!verifyMailFormat(req.body.mail)){
                            let response = {
                                isInternal: false,
                                message: "invalid mail address: invalid format"
                            };
                            throw response;
                        }
                    }
                }
            }
        }catch(err) {
            reject(err);
        }
    });
};

/* ----------------------------------------------------------------------------*/
/*                                 DECIDER                                     */
/* ----------------------------------------------------------------------------*/

/**
 * decideChecklistItems - Assigns a checklist (list of parameters to check) to a specified API call
 *
 * @param  {string} apiType the type of the API called
 * @return {list[string]}         the list of all the parameters to check
 */
function decideChecklistItems(apiType) {
    if (apiType === "create-user"){
        return ["username", "password", "mail"];
    }
    // TODO: Add Checklist for each API
}


/* ----------------------------------------------------------------------------*/
/*                             FORMAT VERIFIERS                                */
/* ----------------------------------------------------------------------------*/

/**
 * verifyUsernameFormat - Verifies the format of the input of type "username" (a-z, A-Z and/or 0-9 only)
 *
 * @param  {string} username the username to verify
 * @return {boolean}         true if the format is correct ; false if incorrect
 */
function verifyUsernameFormat(username){
    var usernameRegex = /^[a-zA-Z0-9]+$/;
    var validUsername = username.match(usernameRegex);
    return (validUsername == username)
}


/**
 * verifyPasswordFormat - Verifies the format of the input of type "password" (should contains from 8 to 20 characters with at least: 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character @#$%-_&)"
 *
 * @param  {string} password the password to verify
 * @return {boolean}          true if the format is correct ; false if incorrect
 */
function verifyPasswordFormat(password){
    var passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#_\-$&%]).{6,20}/;
    var validPassword = password.match(passwordRegex);
    return (validPassword == password)
}


/**
 * verifyMailFormat - Verifies the format of the input of type "mail" (from the OWASP recomendation)
 *
 * @param  {string} mail the mail to verify
 * @return {boolean}      true if the format is correct ; false if incorrect
 */
function verifyMailFormat(mail){
    var mailRegex = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;
    var validMail = mail.match(mailRegex);
    return (validMail == mail)
}

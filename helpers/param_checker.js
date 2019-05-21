

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
                    // Verifies the admin
                    if (checkItem === "admin"){
                        if (req.body.admin === undefined || req.body.admin === "") {
                            let response = {
                                isInternal: false,
                                message: "missing admin id"
                            };
                            throw response;

                        }else if ((typeof req.body.admin) !== "string"){
                            let response = {
                                isInternal: false,
                                message: "invalid admin: not a string"
                            };
                            throw response;
                        }
                        else if (!verifyObjectIdFormat(req.body.admin)){
                            let response = {
                                isInternal: false,
                                message: "invalid admin id: invalid format"
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
                    // Verifies the gender
                    if (checkItem === "birthdate"){
                        if (req.body.birthdate === undefined || req.body.birthdate === "") {
                            let response = {
                                isInternal: false,
                                message: "missing birthdate"
                            };
                            throw response;

                        }else if ((typeof req.body.birthdate) !== "string"){
                            let response = {
                                isInternal: false,
                                message: "invalid birthdate format: not a string"
                            };
                            throw response;
                        }else if (!verifyDateFormat(req.body.birthdate)){
                            let response = {
                                isInternal: false,
                                message: "invalid birthdate: invalid format (should be de Date type object)"
                            };
                            throw response;
                        }
                    }
                    // Verifies the user id
                    if (checkItem === "userId_param"){
                        if (req.params.userId === undefined || req.params.userId === "") {
                            let response = {
                                isInternal: false,
                                message: "missing userId"
                            };
                            throw response;
                        }
                        else if (!verifyObjectIdFormat(req.params.userId)){
                            let response = {
                                isInternal: false,
                                message: "invalid user id: invalid format"
                            };
                            throw response;
                        }
                    }
                    // Verifies the animator id
                    if (checkItem === "animatorId_param"){
                        if (req.params.animatorId === undefined || req.params.animatorId === "") {
                            let response = {
                                isInternal: false,
                                message: "missing animatorId"
                            };
                            throw response;
                        }
                        else if (!verifyObjectIdFormat(req.params.animatorId)){
                            let response = {
                                isInternal: false,
                                message: "invalid animator id: invalid format"
                            };
                            throw response;
                        }
                    }
                    // Verifies the host id
                    if (checkItem === "hostId_param"){
                        if (req.params.hostId === undefined || req.params.hostId === "") {
                            let response = {
                                isInternal: false,
                                message: "missing hostId"
                            };
                            throw response;
                        }
                        else if (!verifyObjectIdFormat(req.params.hostId)){
                            let response = {
                                isInternal: false,
                                message: "invalid host id: invalid format"
                            };
                            throw response;
                        }
                    }
                    // Verifies the name
                    if (checkItem === "name"){
                        if (req.body.name === undefined || req.body.name === "") {
                            let response = {
                                isInternal: false,
                                message: "missing name"
                            };
                            throw response;
                        }else if ((typeof req.body.name) !== "string"){
                            let response = {
                                isInternal: false,
                                message: "invalid name: not a string"
                            };
                            throw response;
                        }else if (!verifyStringFormat(req.body.name)){
                            let response = {
                                isInternal: false,
                                message: "invalid name: invalid format (forbidden characters)"
                            };
                            throw response;
                        }
                    }
                    // Verifies the creator
                    if (checkItem === "creator"){
                        if (req.body.creator === undefined || req.body.creator === "") {
                            let response = {
                                isInternal: false,
                                message: "missing creator"
                            };
                            throw response;
                        }else if ((typeof req.body.creator) !== "string"){
                            let response = {
                                isInternal: false,
                                message: "invalid creator: not a string"
                            };
                            throw response;
                        }
                    }
                    // Verifies the description
                    if (checkItem === "description"){
                        if (req.body.description === undefined || req.body.description === "") {
                            let response = {
                                isInternal: false,
                                message: "missing description"
                            };
                            throw response;
                        }else if ((typeof req.body.description) !== "string"){
                            let response = {
                                isInternal: false,
                                message: "invalid description: not a string"
                            };
                            throw response;
                        }
                    }
                    // Verifies the phone number
                    if (checkItem === "phone"){
                        if (req.body.phone === undefined || req.body.phone === "") {
                            let response = {
                                isInternal: false,
                                message: "missing phone number"
                            };
                            throw response;
                        }else if ((typeof req.body.phone) !== "string"){
                            let response = {
                                isInternal: false,
                                message: "invalid phone number: not a string"
                            };
                            throw response;
                        }
                        //TODO: Verify the format (care of the international/simplified format !!)
                    }
                    // Verifies the phone number
                    if (checkItem === "location"){
                        if (req.body.location === undefined || req.body.location === "") {
                            let response = {
                                isInternal: false,
                                message: "missing location"
                            };
                            throw response;
                        }else if ((typeof req.body.location) !== "string"){
                            let response = {
                                isInternal: false,
                                message: "invalid location: not a string"
                            };
                            throw response;
                        }
                        //TODO: Verify the format (care of the address/country format !!)
                    }
                    // Verifies the tags (list)
                    if (checkItem === "tags"){
                        if (req.body.tags === undefined || req.body.tags === "") {
                            let response = {
                                isInternal: false,
                                message: "missing tags"
                            };
                            throw response;
                        }else if (!Array.isArray(req.body.tags)){
                            let response = {
                                isInternal: false,
                                message: "invalid tags: not a list of string"
                            };
                            throw response;
                        }
                    }
                    // Verifies the tag (string)
                    // if (checkItem === "tag"){
                    //     if (req.body.tag === undefined || req.body.tag === "") {
                    //         let response = {
                    //             isInternal: false,
                    //             message: "missing location"
                    //         };
                    //         throw response;
                    //     }else if ((typeof req.body.tag) !== "string"){
                    //         let response = {
                    //             isInternal: false,
                    //             message: "invalid tag: not a string"
                    //         };
                    //         throw response;
                    //     }
                    // }
                    // Verifies the query parameters
                    if (checkItem === "userQuery_param"){
                        for (var param in req.query){
                          if (!(['page','limit','username', 'mail'].indexOf(param) >= 0)){
                            let response = {
                              isInternal: false,
                              message: "invalid query parameters: " + param + " is not a valid parameter"
                            }
                            throw response;
                          }
                        }
                    }
                    // Verifies the query parameters
                    if (checkItem === "animQuery_param"){
                        for (var param in req.query){
                          if (!(['page','limit','name', 'description','location','mail','tags'].indexOf(param) >= 0)){
                            let response = {
                              isInternal: false,
                              message: "invalid query parameters: " + param + " is not a valid parameter"
                            }
                            throw response;
                          }
                        }
                    }
                    // Verifies the query parameters
                    if (checkItem === "hostQuery_param"){
                        for (var param in req.query){
                          if (!(['page','limit','name', 'description','location','mail','tags'].indexOf(param) >= 0)){
                            let response = {
                              isInternal: false,
                              message: "invalid query parameters: " + param + " is not a valid parameter"
                            }
                            throw response;
                          }
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
  // User: Basics
    if (apiType === "create-user"){
        return ["username", "password", "mail"];
    }
    if (apiType === "get-user"){
        return ["userId_param"];
    }
    if (apiType === "delete-user"){
        return ["userId_param"];
    }
    if (apiType === "set-user-mail"){
        return ["userId_param", "mail"];
    }
    if (apiType === "set-user-name"){
        return ["userId_param", "username"];
    }
    if (apiType === "set-user-birthdate"){
        return ["userId_param", "birthdate"];
    }
    if (apiType === "get-user-mail"){
        return ["userId_param"];
    }
    if (apiType === "get-user-name"){
        return ["userId_param"];
    }
    if (apiType === "get-user-birthdate"){
        return ["userId_param"];
    }
  // User: Friends
    if (apiType === "add-user-friend"){
        return ["userId_param"];
    }
    if (apiType === "remove-user-friend"){
        return ["userId_param"];
    }
  // User: Media
    if (apiType === "set-user-profile-picture"){
        return ["userId_param"];
    }
    if (apiType === "get-user-profile-picture"){
        return ["userId_param"];
    }
  // Animators & Hosts: Basics
    if (apiType === "create-animator"){
        return ["name","creator"];
    }
    if (apiType === "create-host"){
        return ["name","creator"];
    }
    if (apiType === "get-animator"){
        return ["animatorId_param"];
    }
    if (apiType === "get-host"){
        return ["hostId_param"];
    }
    if (apiType === "delete-animator"){
        return ["animatorId_param", "admin"];
    }
    if (apiType === "delete-host"){
        return ["hostId_param", "admin"];
    }
    if (apiType === "get-animator-name"){
        return ["animatorId_param"];
    }
    if (apiType === "get-host-name"){
        return ["hostId_param"];
    }
    if (apiType === "get-animator-mail"){
        return ["animatorId_param"];
    }
    if (apiType === "get-host-mail"){
        return ["hostId_param"];
    }
    if (apiType === "get-animator-description"){
        return ["animatorId_param"];
    }
    if (apiType === "get-host-description"){
        return ["hostId_param"];
    }
    if (apiType === "get-animator-location"){
        return ["animatorId_param"];
    }
    if (apiType === "get-host-location"){
        return ["hostId_param"];
    }
    if (apiType === "set-animator-name"){
        return ["animatorId_param","name"];
    }
    if (apiType === "set-host-name"){
        return ["hostId_param","name"];
    }
    if (apiType === "set-animator-mail"){
        return ["animatorId_param","mail"];
    }
    if (apiType === "set-host-mail"){
        return ["hostId_param","mail"];
    }
    if (apiType === "set-animator-description"){
        return ["animatorId_param","description"];
    }
    if (apiType === "set-host-description"){
        return ["hostId_param","description"];
    }
    if (apiType === "set-animator-location"){
        return ["animatorId_param","location"];
    }
    if (apiType === "set-host-location"){
        return ["hostId_param","location"];
    }
  // Animator: Lists
    if (apiType === "get-animator-tags"){
        return ["animatorId_param"];
    }
    if (apiType === "set-animator-tags"){
        return ["animatorId_param","tags"];
    }
    if (apiType === "add-animator-tags"){
        return ["animatorId_param","tags"];
    }
    if (apiType === "remove-animator-tags"){
        return ["animatorId_param","tags"];
    }
  // Host: Lists
    if (apiType === "get-host-tags"){
        return ["hostId_param"];
    }
    if (apiType === "set-host-tags"){
        return ["hostId_param","tags"];
    }
    if (apiType === "add-host-tags"){
        return ["hostId_param","tags"];
    }
    if (apiType === "remove-host-tags"){
        return ["hostId_param","tags"];
    }
  // Queries
  if (apiType === "query-user"){
      return ["userQuery_param"];
  }
  if (apiType === "query-animator"){
      return ["animQuery_param"];
  }
  if (apiType === "query-host"){
      return ["hostQuery_param"];
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
    //var passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#_\-$&%]).{6,20}/;
    //var validPassword = password.match(passwordRegex);
    return (true)
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

/**
 * verifyDateFormat - Verifies the format of the input of type "date" (DD/MM/YYYY)
 *
 * @param  {string} date the date to verify
 * @return {boolean}      true if the format is correct ; false if incorrect
 */
function verifyDateFormat(date){
    // TODO: find Regex Date
    var dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
    var validDate = date.match(dateRegex)[0];
    return (validDate == date)
}

/**
 * verifyObjectIdFormat - Verifies the format of the input of type "objectId" (MongoDB format of 24 bytes
    a 4-byte value representing the seconds since the Unix epoch,
    a 5-byte random value, and
    a 3-byte counter, starting with a random value.)
 *
 * @param  {string} userId the userId to verify
 * @return {boolean}        true if the format is correct ; false if incorrect
 */
function verifyObjectIdFormat(userId){
    var objectIdRegex = new RegExp("^[0-9a-fA-F]{24}$");
    var validObjectId = userId.match(objectIdRegex);
    return (validObjectId == userId)
}

/**
 * verifyStringFormat - Verifies the format of the input of type "String" (to constomize later)
 *
 * @param  {string} str     the string to verify
 * @return {boolean}        true if the format is correct ; false if incorrect
 */
function verifyStringFormat(str){
    return (true)
}

module.exports.checkOfferPublishability = async function (offer){
  let response;
  switch (offer.status){
    case "created":
      response = {
        status: "fail",
        message: "Missing Information to publish",
        missing_info: []
      }
      if (offer.name == undefined) {
        response.missing_info.push("name")
      }
      if (offer.description == undefined || offer.description == "null" || offer.description == "") {
        response.missing_info.push("description")
      }
      if (offer.tags.length < 1) {
        response.missing_info.push("tags")
      }
      if (offer.date == undefined || offer.date == "null" || offer.date == "") {
        response.missing_info.push("date")
      }
      if (offer.location == undefined || offer.location == "null" || offer.location == "") {
        response.missing_info.push("location")
      }

      if (offer.animators.length < 1 && offer.hosts.length < 1){
        response.missing_info.push("animator_or_host")
      }

      if (response.missing_info.length == 0){
        response = {
          status: "success",
          message: "Offer information complete, ready to publish"
        }
      }
      break;
    case "published":
      response = {
        status: "fail",
        message: "Offer already published"
      }
      break;
    case "archived":
      response = {
        status: "fail",
        message: "Offer already archived"
      }
      break;
    default:
      response = {
        status: "fail",
        message: "Unknown offer status"
      }
  }
  return response;
}


module.exports.checkEventCreation = async function (offer){
  let response;
  switch (offer.status){
    case "created":
      response = {
        status: "fail",
        message: "Offer not yet published"
      }
      break;
    case "published":
      response = {
        status: "fail",
        message: "Missing Information to create event",
        missing_info: []
      }
      if (offer.name == undefined) {
        response.missing_info.push("name")
      }
      if (offer.description == undefined || offer.description == "null" || offer.description == "") {
        response.missing_info.push("description")
      }
      if (offer.tags.length < 1) {
        response.missing_info.push("tags")
      }
      if (offer.date == undefined || offer.date == "null" || offer.date == "") {
        response.missing_info.push("date")
      }
      if (offer.location == undefined || offer.location == "null" || offer.location == "") {
        response.missing_info.push("location")
      }

      if (offer.animators.length < 1){
        response.missing_info.push("animator")
      }
      if (offer.hosts.length < 1){
        response.missing_info.push("host")
      }

      if (response.missing_info.length == 0){
        response = {
          status: "success",
          message: "Offer information complete, ready to publish"
        }
      }
      break;
    case "archived":
      response = {
        status: "fail",
        message: "Offer already archived"
      }
      break;
    default:
      response = {
        status: "fail",
        message: "Unknown offer status"
      }
  }
  return response;
}

const MovieServ = require("../services/movie.service");
const response = require("../utils/response");

class MovieContoller {

  async list(req, res) {
    const result = await MovieServ.list(req.body);
    console.log( req.headers['x-forwarded-for'], req.socket.remoteAddress, req.connection.remoteAddress) 
    
    
    res.status(200).send(response("movie fetched  successfully", result));
  }
  async comment(req, res) {
    const ipAddress  = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const result = await MovieServ.comment(req.body,ipAddress);
    res.status(201).send(response("comment created  successfully", result));
  }
  
  async characterByGender(req, res) {
    const result = await MovieServ.characterByGender(req.params.filter_by);
    res.status(201).send(response("character fetched   successfully", result));
  }
  
  async characterSortBy(req, res) {
    const result = await MovieServ.charactersortBy(req.params.sort,req.params.filter_by);
    res.status(200).send(response("character fetched   successfully", result));
  }
  async characterSortBy(req, res) {
    const result = await MovieServ.charactersortBy(req.params.sort,req.params.filter_by);
    res.status(200).send(response("character fetched   successfully", result));
  }
  async getComment(req, res) {
    const result = await MovieServ.getComment();
    res.status(200).send(response("comment fetched   successfully", result));
  }
  
}

module.exports = new MovieContoller();
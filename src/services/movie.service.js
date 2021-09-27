const Axios = require('axios')
const  CustomError = require('../utils/custom-error')
const  { Comment } = require('../../models')


class MovieService {
    async fetchMovie(url) {
      return (await Axios.get(url)).data?.results
    }
    async list() {
//     // return data
    const store = []
//     const getMovieCharacters = []
let url = `https://swapi.dev/api/films`
    const listOfMovie =await  this.fetchMovie(url)
    for(const eachMovieDetails of listOfMovie){
      const eachFilteredMovie = {
        name:eachMovieDetails.title,
        openingCrawl:eachMovieDetails.opening_crawl,
      }
      // fetch comment for each movies
      const MoviesComment = await Comment.findAll({
        where:{
          movieTitle:eachMovieDetails.title
        }
      })
eachFilteredMovie.commentsCount=MoviesComment.length
eachFilteredMovie.release_date=eachMovieDetails.release_date
store.push(eachFilteredMovie)
    }
 return store.sort((a,b)=>new Date(a.release_date)- new Date(b.release_date))

}
async character(filterBy) {
  
let url = `https://swapi.dev/api/films`
const listOfMovie =await  this.fetchMovie(url)
const store =[]
const movieCharacters = await listOfMovie.map((each)=>{store.push(...each.characters)})

const characterNames = await Promise.all(store.map(async(characters)=>{
  const listOfCharacter = (await Axios.get(characters)).data
    return listOfCharacter
}));
// return characterNames
const filteredCharacterStore = []
for(const eachCharacterNames of characterNames){
if(eachCharacterNames.gender == filterBy){
  // 1centimeter = 0.0328084feet
  const height = (eachCharacterNames.height*0.0328084).toString().split(".")
const filteredCharacter = {
  name: eachCharacterNames.name,
  height: {
    inFootAnInch: `${height[0]}Ft  ${height[1]} inches`,
    inCentimeter:eachCharacterNames.height,
  },
}
filteredCharacterStore.push(filteredCharacter)
}
}
return filteredCharacterStore

}
async characterByGender(filterBy) {
  return await this.character('gender',filterBy)
}
async charactersortBy(sort,filterBy) {
  return await this.character(sort,filterBy)
}
async character(sort,filterBy) {
  
let url = `https://swapi.dev/api/films`
const listOfMovie =await  this.fetchMovie(url)
const store =[]
const movieCharacters = await listOfMovie.map((each)=>{
  store.push(...each.characters)
})

const characterNames = await Promise.all(store.map(async(characters)=>{
  const listOfCharacter = (await Axios.get(characters)).data
    return listOfCharacter
}));
// return characterNames
const filteredCharacterStore = []
for(const eachCharacterNames of characterNames){
if(eachCharacterNames[sort] == filterBy){
  // 1centimeter = 0.0328084feet
  const height = (eachCharacterNames.height*0.0328084).toString().split(".")
const filteredCharacter = {
  name: eachCharacterNames.name,
  height: {
    inFootAnInch: `${height[0]}Ft  ${height[1]}inches`,
    inCentimeter:eachCharacterNames.height,
  },
}
filteredCharacterStore.push(filteredCharacter)
}
}
return filteredCharacterStore

}
async getComment() {
return await Comment.findAll({where:{},order: [
  ['createdAt', 'DESC'],
],})
}
  async comment(data,ipAddress) {
  const { message, movieName}= data
if(!movieName || !message){
  throw new CustomError("provide  comment message and movie name to comment on")
  }

const commentCharacter = message.split(" ").filter((eachCharacter)=>(eachCharacter!='')).length
if(commentCharacter > 500){
throw new CustomError("chracters must not be more than 500 character")
}


  const movies = (await this.list()).filter((each)=>(each.name == movieName.trim()))
// (movieName)
 if(movies.length==0){
  throw new CustomError(" You can't comment on a movie that those not exist")

}
const newData= {
  comment:message.toString().trim(),
  movieTitle:movieName.toString().trim(),
  ipAddress:ipAddress.toString().trim(),
}

return await  Comment.create(newData)
}
}

module.exports = new MovieService();











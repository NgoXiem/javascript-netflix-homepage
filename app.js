//// ***API key and URL***/////
const key = "ae83a53061359d9b632a17003e454303";
//get genres id:  `https://api.themoviedb.org/3/genre/movie/list?api-key=${key}`
const originalsUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&year=2021`;
const topUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`;
const trendingUrl = `https://api.themoviedb.org/3/trending/all/week?api_key=${key}`;
const actionUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&with_genres=28`;
const horrorUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&with_genres=27`;
const dramaUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&with_genres=18`;
const romanceUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&with_genres=10749`;
const animationUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&with_genres=16`;

const imgUrl = "https://image.tmdb.org/t/p/original/";

//// ***query the DOM***/////
let originals = document.querySelector(".originals");
let topRated = document.querySelector(".top");
let trending = document.querySelector(".trending");
let action = document.querySelector(".action");
let horror = document.querySelector(".horror");
let drama = document.querySelector(".drama");
let romance = document.querySelector(".romance");
let animation = document.querySelector(".animation");
let banner = document.querySelector(".banner");
const bannerInfo = document.querySelector(".banner__info");
const nav = document.querySelector(".nav");

//// ***fetch function & generate row UI***/////
const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
  // console.log(data.results);
};

const content = (container, url) => {
  fetchData(url)
    .then((data) => {
      data.map((item) => {
        // console.log(item);
        if (container.classList.contains("originals")) {
          const img = `<img src=${imgUrl + item.poster_path} alt= ${
            item.overview
          } class="poster-large">`;
          container.innerHTML += img;
        } else {
          const img = `<img src=${imgUrl + item.backdrop_path} alt=${
            item.overview
          } class="poster">`;
          container.innerHTML += img;
        }
      });
    })
    .catch((err) => console.log(err));
};

content(originals, originalsUrl);
content(topRated, topUrl);
content(trending, trendingUrl);
content(action, actionUrl);
content(horror, horrorUrl);
content(drama, dramaUrl);
content(romance, romanceUrl);
content(animation, animationUrl);

////generate main banner UI***/////

const sub = (text) => {
  const newText = text.length < 150 ? text : text.substring(0, 150) + "...";
  return newText;
};

fetchData(originalsUrl)
  .then((data) => {
    const random = Math.floor(Math.random() * data.length);
    banner.style.backgroundImage = `url(${
      imgUrl + data[random].backdrop_path
    })`;
    bannerInfo.innerHTML = `
            <h1 class="banner__name">${data[random].title}</h1>
            <div class="banner__buttons">
                <button class="banner__button">Play</button>
                <button class="banner__button">My list</button>
            </div>
            <h1 class="banner__description">${sub(data[random].overview)}</h1>
        `;
  })
  .catch((err) => console.log(err));

////*** fixed navbar **/////

window.addEventListener("scroll", () => {
  scrollY > 70
    ? nav.classList.add("fixed-nav")
    : nav.classList.remove("fixed-nav");
});

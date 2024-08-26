<template>
  <div class="bodyhome">
    <header class="headerhome">
      <img src="/frontend/public/assets/icons/usericon.png" class="usericon" />
      <div class="greeting">
        <p>Hi, UserPlaceHolder!</p>
        <p>Lets watch a movie together!</p>
      </div>
      <img src="/frontend/public/assets/icons/notification.png" class="notification" />
    </header>

    <section class="homebody">
      <div class="searchmovie">
        <input type="text" name="searchmovie" id="searchmoviehome" placeholder="Search movie, genre" />
      </div>

      <div class="nowplaying">
        <h3 class="whitetext">Now Playing</h3>
        <p class="redtext">See all</p>
      </div>

      <div class="movie-scroller">
        <img src="/frontend/public/assets/images/movieplaceholder.png" />
        <img src="/frontend/public/assets/images/movieplaceholder.png" />
        <img src="/frontend/public/assets/images/movieplaceholder.png" />
      </div>

      <div class="moviedetailshome">
        <h2 class="whitetext">Movie Title Placeholder</h2>
        <p class="graytext">Movie Type Placeholder</p>
        <img src="/frontend/public/assets/icons/Slider Indicator.png" />
      </div>

      <div class="comingsoonhome">
        <div class="comingsoon">
          <h3 class="whitetext">Coming Soon</h3>
          <p class="redtext">See all</p>
        </div>
        <div class="comingsoonmovie">
          <div class="comingsoonmovieplace">
            <img src="/frontend/public/assets/images/comingsoonmovie.png" />
            <div class="comingsoonMovieDetails">
              <h3 class="whitetext">Coming Soon (2013)</h3>
              <p class="whitetext">Action, Adventure</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer>
      <img src="/frontend/public/assets/icons/homefooter.png" />
      <img src="/frontend/public/assets/icons/browsefooter.png" />
      <img src="/frontend/public/assets/icons/ticketsfooter.png" />
      <img src="/frontend/public/assets/icons/profilefooter.png" />
    </footer>
  </div>
</template>

<style scoped>

.bodyhome {
  background-color: #121212;
  padding-bottom: 80px;
  margin: 0;
  overflow-x: hidden;
  overflow-y: hidden;
  font-family: 'Arial', sans-serif;
}

/* Text colors */

.whitetext {
  color: white;
}

.redtext {
  color: red;
}

.graytext {
  color: white;
  opacity: 50%;
}

/* HEADER */

.headerhome {
  margin-top: 5%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: white;
}

.headerhome .usericon {
  width: 10%;
}

.headerhome .notification {
  width: 5%;
}

/* BODY */

.searchmovie {
  display: flex;
  align-items: center;
  justify-content: center;
}

#searchmoviehome {
  color: #9e9e9e;
  padding: 12px 20px;
  border: solid 1.5px #9e9e9e;
  border-radius: 0.5rem;
  width: 80%;
  height: 40px;
  margin-top: 5%;
  background: none;
}

.nowplaying {
  display: flex;
  padding: 3%;
  justify-content: space-around;
}

/* Movie Scroller */

.movie-scroller {
  height: 450px;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  gap: 20px;
  padding: 10px;
  scroll-snap-type: x mandatory;
}

.movie-scroller img {
  height: auto;
  cursor: pointer;
  scroll-snap-align: center;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

/* Movie Details home */

.moviedetailshome {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3%;
  gap: 10px;
}

/* Coming Soon */

.comingsoonhome {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.comingsoon {
  display: flex;
  padding: 2%;
  justify-content: space-around;
}

.comingsoonmovie {
  display: flex;
  justify-content: center;
}

.comingsoonmovieplace {
  display: flex;
  background-color: #303030;
  border-radius: 20px;
  width: 85%;
  padding: 10px;
  gap: 10px;
}

footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  border-top: 1px solid #424242;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #1b1b1b;
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
}

footer img {
  width: 40px;
  height: auto;
  cursor: pointer;
}

footer img:hover {
  opacity: 0.8;
  transition: opacity 0.3s ease;
}
</style>

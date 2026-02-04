const btnEl = document.getElementById("btn");
const welcome = document.querySelector(".welcome");
const descriptionEl = document.querySelector(".description-movie");
const releaseEl = document.querySelector(".release");
const filmContainerEl = document.querySelector(".box");
const filmImgEl =document.querySelector(".image-movie");
const filmNameEl =document.querySelector(".name-movie");

btnEl.addEventListener("click", async function(){
    try {
        btnEl.disabled =true ;
        btnEl.innerText = "Loading..." ;
        filmNameEl.innerText = "Updating...";
        descriptionEl.innerText ="Loading movie description...";
        releaseEl.innerText = "...";
        filmImgEl.src = "spiner.svg";
        let i = Math.floor(Math.random()*500)+1 ;
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=b54a39e43f8c56f229a4dcf689e5ca7c&language=ar-KSA&page=${i}`);
        const data = await response.json();
        btnEl.disabled =false ;
        btnEl.innerText = "Surprise me with a movie" ;
        console.log(data);
        let j = Math.floor(Math.random()*data.results.length)+1 ;
        filmContainerEl.style.display = "flex";
        welcome.style.display = "none" ;
        filmImgEl.src = `https://image.tmdb.org/t/p/w500${data.results[j].poster_path}`;
        filmNameEl.innerText = data.results[j].original_title;
        descriptionEl.innerText = data.results[j].overview ;
        if (data.results[j].overview === ""){
            descriptionEl.innerText = `Description :Movie description not available, sorry!` ;
        }else{
            descriptionEl.innerText = `Description :${data.results[j].overview}` ;
        }
        releaseEl.innerText = `Release date :${data.results[j].release_date}`;
    }catch(error){
        console.log(error);
        btnEl.disabled = false ;
        btnEl.innerText = "An error happend, please try again.";
    }
});
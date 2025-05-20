const apiKey = 'da40fc17411282846d4d4ef732875ba8';
const card = document.querySelector('.card');
const searchBox = document.querySelector('.card__input');
const searchBtn = document.getElementById('searchBtn');
const temp = document.querySelector('.card__title--temp');
const humidity = document.getElementById('humidity');
const cityName = document.getElementById('city');
const wind = document.getElementById('wind');
const icon = document.querySelector('.card__weatger-icon');
const date = document.getElementById('date');




 
const showDate = () => {
    const now = new Date ();
    const day = now.getDate();
    const monthName = now.toLocaleString ('en', {month: 'long'});
    date.innerHTML = `${day} ${monthName}`
}

async function getWeatcher (city){

    city = city.trim()
    if (!city) return;

    try{
       const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);



       if(!response.ok) throw new Error('city not found');
  const result = await response.json();
  card.classList.add('active');
  card.style.height = '530px';

  const iconUrl = ` https://openweathermap.org/img/wn/${result.weather[0].icon}@4x.png`
  icon.src = iconUrl


cityName.innerHTML = result.name;
humidity.innerHTML = `${ result.main.humidity}%`;
wind.innerHTML = `${ result.wind.speed} m/s`;
temp.innerHTML = `${ result.main.temp} °C`;



    }
  catch (err) { alert (err);
 
    }
}

searchBtn.addEventListener('click', () => {
    getWeatcher(searchBox.value);
})


searchBox.addEventListener('keypress', (e) => {
   
    if(e.key === 'Enter'){
        getWeatcher(searchBox.value);
        
    }
})


document.addEventListener('click', (e) => {
    if (card.classList.contains('active') && !card.contains(e.target)) {
      searchBox.value = '';
      card.classList.remove('active')
      card.style.height = '230px'
    }
  })

showDate();
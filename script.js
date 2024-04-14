const time = document.querySelectorAll("#left_time");
let model = document.querySelector('dialog')
const bars = document.querySelectorAll(".bar");
let dark = localStorage.getItem("dark");
let inputDate = document.getElementById('inputDate')
let inputMonth = document.getElementById('inputMonth')
let inputEvent = document.getElementById('inputEvent')
if (dark) {
  if (dark === "true") {
    toggleDark();
  } else {
    toggleLight();
  }
}

const festivals = {
  Christmas: new Date("12-25"),
  independence: new Date("08-15"),
  newYear: new Date("01-01"),
  teacherDay: new Date("09-05"),
  valentine: new Date("02-14"),
  children: new Date("11-14"),
  myBirthday: new Date("02-12"),
};
function nextMinute() {
  let second = new Date().getSeconds();
  setTime(second, second * 1.666, 0);
}

function nextHour() {
  let minute = new Date().getMinutes();

  setTime(Math.floor(60 - minute), minute * 1.666, 1);
}
function nextDay() {
  let hours = new Date().getHours();
  setTime(Math.floor(24 - hours), hours * 4.16, 2);
}

function nextWeek() {
  let day = new Date().getDay();
  setTime(Math.floor(7 - day), day * 14.28, 3);
}

function nextMonth() {
  let hours = new Date().getUTCDate();
  console.log(hours);
  setTime(
    Math.floor(getDaysInCurrentMonth() - hours),
    hours * (getDaysInCurrentMonth() === 31 ? 2.94 : 3.333),
    4
  );
}

function setTime(timeLeft, bar, index) {
  time[index].innerText = timeLeft;
  bars[index].style.width = bar + "%";
}

function getDaysInCurrentMonth() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const lastDayOfCurrentMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();
  return lastDayOfCurrentMonth;
}

function daysUntilNextBirthday(birthDate, index) {
  const today = new Date();
  const currentYear = today.getFullYear();
  birthDate.setFullYear(currentYear);

  if (today > birthDate) {
    birthDate.setFullYear(currentYear + 1);
  }

  const timeDifference = birthDate - today;

  const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  setTime(daysLeft, Math.floor(((365 - daysLeft) * 100) / 365), index);
}

daysUntilNextBirthday(festivals.newYear, 5);
daysUntilNextBirthday(festivals.Christmas, 6);
daysUntilNextBirthday(festivals.independence, 7);
daysUntilNextBirthday(festivals.teacherDay, 8);
daysUntilNextBirthday(festivals.valentine, 9);
daysUntilNextBirthday(festivals.children, 10);
daysUntilNextBirthday(festivals.myBirthday, 11);

function toggleDark() {
  document.body.classList.add("dark");
  localStorage.setItem("dark", "true");
  setButtonText("Dark ");
}
function toggleLight() {
  document.body.classList.remove("dark");
  localStorage.setItem("dark", "false");
  setButtonText("Light ");
}

function toggleSystem() {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  if (mediaQuery.matches) {
    toggleDark();
  } else {
    toggleLight();
  }
}

function setButtonText(text) {
  document.getElementById("bbtn").textContent = text;
}
function closeModel(){
  model.close()
}
function openModel(){
  model.showModal()

}

 function createNewEvent(){
  let event = inputEvent.value
  let date = inputDate.value
  let month= inputMonth.value
 if(date >=0&&date <=31&&month>=0&&month<=12&&event){

alert("Sorry\nWe are working on it")
closeModel()
 }else{
  alert("Not valid")
  return
 }
 }
 

nextMonth();
nextWeek();
nextDay();
nextMinute();
nextHour();
setInterval(nextMinute, 1000);
setInterval(nextHour, 1000);
setInterval(nextDay, 1000);

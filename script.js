// Clock
const time = document.getElementById("time");
setInterval(() => {
  const date = new Date();

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let meridian = hours < 12 ? "AM" : "PM";

  hours = hours > 12 ? hours - 12 : hours;
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  time.textContent = `${hours}:${minutes}:${seconds} ${meridian}`
});

// =========================== Settings ===========================
const selectColor1 = document.getElementById("color-1");
const selectColor2 = document.getElementById("color-2");
const selectColor3 = document.getElementById("color-3");
const wrapper = document.querySelector(".wrapper");
const selectColors = document.querySelectorAll(".select-color");
const btnOpenSettings = document.querySelector(".open-settings");
const settings = document.querySelector(".settings-container");

// Abrir la ventana de modificaciones
btnOpenSettings.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  settings.classList.add("open");
})

// Cerrar la ventana de modificaciones
document.addEventListener("click", (e) => {
  if (settings.classList.contains("open") && !settings.contains(e.target)) {
    settings.classList.remove("open");
  }  
})


let gradient = `linear-gradient(135deg, ${selectColor1.value}, ${selectColor2.value}, ${selectColor3.value})`;

// Agregar el color guardado
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("colors")) {
    const colors = JSON.parse(localStorage.getItem("colors"));
    const { color1, color2, color3 } = colors;
    selectColor1.value = color1;
    selectColor2.value = color2;
    selectColor3.value = color3;

    gradient = `linear-gradient(135deg, ${color1}, ${color2}, ${color3})`;
    wrapper.style.background = gradient;
    time.style.background = gradient;
  } 


  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  if (!prefersDark.matches || localStorage.getItem("theme") === "light") {
    document.getElementById("dark-light-checkbox").checked = true;
    document.body.setAttribute("data-theme", "light");
    return;
  }

  if (prefersDark.matches || localStorage.getItem("theme") === "dark") {
    document.body.removeAttribute("data-theme");
    return;
  }

})

// Asignar el color y guardar el nuevo
selectColors.forEach(color => {
  color.addEventListener("input", (e) => {
    e.preventDefault();
    gradient = `linear-gradient(135deg, ${selectColor1.value}, ${selectColor2.value}, ${selectColor3.value})`;

    wrapper.style.background = gradient;
    time.style.background = gradient;

    const colors = {
      color1: selectColor1.value,
      color2: selectColor2.value,
      color3: selectColor3.value
    }
    localStorage.setItem("colors", JSON.stringify(colors))
  })
})


const checkbox = document.getElementById("dark-light-checkbox");
const labelCheckbox = document.querySelector("label.toggle-container");

labelCheckbox.addEventListener("click", () => {
  if (checkbox.checked) {
    document.body.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  } else {
    document.body.removeAttribute("data-theme");
    localStorage.setItem("theme", "dark");
  }
})


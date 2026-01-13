const button = document.getElementById("go-button");
const refresh = document.getElementById("refresh");
const select = document.getElementById("time-selector");
const gong = document.getElementById("gong");
const zenGong = document.getElementById("zengong");
const el = document.getElementById("clock");
const input = document.getElementById("input");

button.addEventListener("click", () => {
  if (select.value === "") return;
  if (!input.checkValidity()) return;
  button.classList.add("hidden");
  select.classList.add("hidden");
  input.classList.add("hidden");
  el.classList.remove("hidden");
  startClock(parseFloat(select.value), input.value);
});

refresh.addEventListener("click", () => {
  window.location.reload();
});

const playSound = async (sounds) => {
  try {
    sounds.currentTime = 0;
    sounds.volume = 0.5;
    await sounds.play();
  } catch (error) {
    console.log(error.message);
  }
};

function formatMMSS(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

function startClock(timeInterval, totalTime) {
  let totalSecondsLeft = Math.round(Number(totalTime) * 60);
  const interval = Number(timeInterval);

  function tick() {
    el.textContent = formatMMSS(totalSecondsLeft);

    if (totalSecondsLeft <= 0) {
      playSound(zenGong);
      refresh.classList.remove("hidden");
      return;
    }

    const elapsed = Math.round(Number(totalTime) * 60) - totalSecondsLeft + 1;
    if (interval > 0 && elapsed % interval === 0) {
      playSound(gong);
    }

    totalSecondsLeft -= 1;

    const now = new Date();
    const msUntilNextSecond = 1000 - now.getMilliseconds();
    setTimeout(tick, msUntilNextSecond);
  }
  tick();
}

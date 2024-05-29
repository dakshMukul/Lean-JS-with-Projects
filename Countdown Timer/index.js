(function () {
  const hour = document.querySelector(".hour");
  const mins = document.querySelector(".minute");
  const sec = document.querySelector(".sec");
  const resetBtn = document.querySelector(".reset");
  const startBtn = document.querySelector(".start");

  resetBtn.addEventListener("click", () => {
    sec.value = "";
    hour.value = "";
    mins.value = "";
  });

  startBtn.addEventListener("click", startTimer);

  function startTimer() {
    console.log("start btn clicked");
    const time = sec.value;
    let secCounter = 0;
    for (let i = time; i >= 0; i--) {
      setTimeout(() => {
        sec.value = i;
      }, 1000 * secCounter);
      secCounter++;
    }
  }
})();

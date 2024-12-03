$(document).ready(function () {
    const $scoreBoard = $("#score");
    const $catchMessage = $("#catch-message");
    const $timerDisplay = $("#timer");
    const $gameOverPopup = $("#game-over-popup");
    const $finalScore = $("#final-score");
    const $finalTime = $("#final-time");
    const $closePopupButton = $("#close-popup");
    const $restartPopupButton = $("#restart-game-popup");
    const $restartMainButton = $("#restart-game-main .btn");
    const $holes = $(".hole");

    let score = 0;
    let lastHole;
    let timeUp = false;
    let timeLeft = 30;
    let timer;

    function randomTime(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function randomHole() {
        const index = Math.floor(Math.random() * $holes.length);
        const $selectedHole = $($holes[index]);
        if ($selectedHole.is(lastHole)) return randomHole();
        lastHole = $selectedHole;
        return $selectedHole;
    }

    function popOut() {
        const time = randomTime(450, 1200);
        const $hole = randomHole();
        const $dog = $hole.find(".dog");
        $dog.fadeIn(200);
        setTimeout(() => {
            $dog.fadeOut(200);
            if (!timeUp) popOut();
        }, time);
    }

    function hitDog() {
        const $dog = $(this);
        $dog.hide();
        score++;
        updateScore();
        updateCatchMessage("<i class='fa-solid fa-check-circle'></i> You hit a dog! 🎉");
    }

    function updateScore() {
        $scoreBoard.text(score).addClass("animate__animated animate__rubberBand");
        setTimeout(() => {
            $scoreBoard.removeClass("animate__animated animate__rubberBand");
        }, 500);
    }

    function updateCatchMessage(message) {
        $catchMessage.html(message).addClass("animate__animated animate__fadeInDown");
        setTimeout(() => {
            $catchMessage.removeClass("animate__animated animate__fadeInDown");
        }, 1000);
    }

    function updateTimer() {
        $timerDisplay.text(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        } else {
            timeLeft--;
        }
    }

    function endGame() {
        timeUp = true;
        updateCatchMessage(`Time's up! 🛑 Final Score: ${score}`);
        $finalScore.text(score);
        $finalTime.text(30 - timeLeft);

        $gameOverPopup.fadeIn(500);
        $restartMainButton.fadeIn(500);
    }

    function closePopup() {
        $gameOverPopup.fadeOut(500);
    }

    function restartGame() {
        // Reset game state
        score = 0;
        timeLeft = 30;
        timeUp = false;

        $scoreBoard.text(0);
        $catchMessage.html("Game restarted! <i class='fa-solid fa-bone'></i>");
        $gameOverPopup.hide();
        $restartMainButton.hide();

        startGame();
    }

    function startGame() {
        score = 0;
        timeLeft = 30;
        timeUp = false;

        $catchMessage.html("Game started! <i class='fa-solid fa-bone'></i>");
        updateScore();
        popOut();
        timer = setInterval(updateTimer, 1000);
    }

    $(".dog").on("click", hitDog);
    $closePopupButton.on("click", closePopup);
    $restartPopupButton.on("click", restartGame);
    $restartMainButton.on("click", restartGame);

    $(document).ready(function () {
    const $welcomePopup = $("#welcome-popup");
    const $closePopupButton = $welcomePopup.find(".close-btn");
    const $startGameButton = $welcomePopup.find(".btn-start-game");
    const $countdown = $("#countdown");
    let countdownNumbers = ["3", "2", "1", "GO!"];

    function showWelcomePopup() {
        $welcomePopup.fadeIn(500);
    }

    function startCountdown(callback) {
        let index = 0;

        // Add blur effect to body during countdown
        $("body").addClass("blur");

        $countdown.fadeIn(500);

        function nextCountdown() {
            if (index < countdownNumbers.length) {
                $countdown.text(countdownNumbers[index++]);
                setTimeout(nextCountdown, 1000);
            } else {
                $countdown.fadeOut(500, () => {
                    $("body").removeClass("blur"); // Remove blur after countdown
                    callback();
                });
            }
        }

        nextCountdown();
    }

    function startGameWithPopupClose() {
        $welcomePopup.fadeOut(500, () => {
            startCountdown(startGame);
        });
    }

    // Events
    $closePopupButton.on("click", startGameWithPopupClose);
    $startGameButton.on("click", startGameWithPopupClose);

    // Show the welcome popup on page load
    showWelcomePopup();
});

});

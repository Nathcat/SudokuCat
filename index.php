<!DOCTYPE html>
<html>

<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://nathcat.net/static/css/new-common.css">
    <link rel="stylesheet" href="/static/styles/sudoku.css">
    <link rel="stylesheet" href="/static/styles/home.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="/static/scripts/sudoku.js"></script>

    <title>SudokuCat</title>
</head>

<body>
    <?php $__REMOVE_PROFILE_BANNER__ = 1; include("header.php"); ?>

    <div class="main align-center">

        <?php
        if (!array_key_exists("user", $_SESSION)) {
            if ($_SERVER["SERVER_NAME"] === "localhost") {
                $_SESSION["user"] = [
                    "id" => 1,
                    "username" => "Nathcat",
                    "fullName" => "Nathan Baines",
                    "pfpPath" => "1.png"
                ];
            }
            else {
                header("Location: $_DATA_BASE_URL/sso?return-page=https://sudoku.nathcat.net");
                exit();
            }
        }
        ?>

        <div class="home-container">
            <div id="user-container" onclick="location = '/user';"class="greeting column align-center">
                <div class="profile-picture">
                    <img src="<?php echo "$_DATA_BASE_URL/pfps/" . $_SESSION["user"]["pfpPath"]; ?>">
                </div>
                <h3><i>Logged in as...</i></h3>
                <h1 style="text-align: center; margin-top: 0;"><?php echo $_SESSION["user"]["fullName"]; ?></h1>
            </div>

            <div id="leaderboard" class="content-card leaderboard column align-center">
                <h2>Leaderboard</h2>
                <p><b><i>Loading...</i></b></p>
            </div>

            <div class="play-container">
                <button onclick="location = '/game'">Continue</button>
                <button onclick="delete_saved_puzzle().then((r) => location = '/game');">Start a new puzzle</button>
            </div>
        </div>

        <?php include("footer.php"); ?>

<script>
window.onload = (e) => {
    fetch(DATA_BASE_URL + "/sudoku/leaderboard.php").then((r) => r.json()).then((r) => {
        let s = "<h2>Leaderboard</h2>";

        for (let i in r) {
            s += "<div class=\"user\"><div class=\"small-profile-picture\"><img src=\"" + DATA_BASE_URL + "/pfps/" + r[i]["pfpPath"] + "\"></div><div class=\"names\"><h3>" + r[i]["fullName"] + "</h3><p><i>" + r[i]["username"] + "</i></p></div><span class=\"spacer\" style=\"text-align: center\">" + (r[i]["streakLength"] === 0 ? "" : "<p><b><i>" + r[i]["streakLength"] + " day streak!</i></b></p>") + "</span><p>Has solved " + r[i]["puzzlesSolved"] + " puzzles.</p></div>";
        }

        $("#leaderboard").html(s);
    });

    fetch(DATA_BASE_URL + "/sudoku/get-user-data.php", {
        method: "GET",
        credentials: "include",
    }).then((r) => r.json()).then((r) => {
        if (r === null) {
            r = {
                "puzzlesSolved": 0,
                "currentPuzzle": null,
                "streakLength": 0,
                "hasSolvedToday": 0,
            };
        }

        if (r["hasSolvedToday"] === 0) {
            document.getElementById("user-container").innerHTML += "<div class='error-card'><h3>Don't forget your streak!</h3><p>You haven't solved a puzzle yet today!</p></div>";
        }
    });
};
</script>

</html>
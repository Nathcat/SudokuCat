<!DOCTYPE html>
<html>

<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://nathcat.net/static/css/new-common.css">
    <link rel="stylesheet" href="/static/styles/sudoku.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

    <title>SudokuCat</title>
</head>

<body>
    <?php include("../header.php"); ?>

    <div class="main align-center">

        <a style="margin-bottom: 20px;"href="/">Return to home page</a>

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

        <div class="sudoku-container">
            <div class="puzzle-container">
                <div id="0_0" class="number-space"></div>
                <div id="0_1" class="number-space"></div>
                <div id="0_2" class="number-space"></div>
                <div id="0_3" class="number-space"></div>
                <div id="0_4" class="number-space"></div>
                <div id="0_5" class="number-space"></div>
                <div id="0_6" class="number-space"></div>
                <div id="0_7" class="number-space"></div>
                <div id="0_8" class="number-space"></div>

                <div id="1_0" class="number-space"></div>
                <div id="1_1" class="number-space"></div>
                <div id="1_2" class="number-space"></div>
                <div id="1_3" class="number-space"></div>
                <div id="1_4" class="number-space"></div>
                <div id="1_5" class="number-space"></div>
                <div id="1_6" class="number-space"></div>
                <div id="1_7" class="number-space"></div>
                <div id="1_8" class="number-space"></div>

                <div id="2_0" class="number-space"></div>
                <div id="2_1" class="number-space"></div>
                <div id="2_2" class="number-space"></div>
                <div id="2_3" class="number-space"></div>
                <div id="2_4" class="number-space"></div>
                <div id="2_5" class="number-space"></div>
                <div id="2_6" class="number-space"></div>
                <div id="2_7" class="number-space"></div>
                <div id="2_8" class="number-space"></div>

                <div id="3_0" class="number-space"></div>
                <div id="3_1" class="number-space"></div>
                <div id="3_2" class="number-space"></div>
                <div id="3_3" class="number-space"></div>
                <div id="3_4" class="number-space"></div>
                <div id="3_5" class="number-space"></div>
                <div id="3_6" class="number-space"></div>
                <div id="3_7" class="number-space"></div>
                <div id="3_8" class="number-space"></div>

                <div id="4_0" class="number-space"></div>
                <div id="4_1" class="number-space"></div>
                <div id="4_2" class="number-space"></div>
                <div id="4_3" class="number-space"></div>
                <div id="4_4" class="number-space"></div>
                <div id="4_5" class="number-space"></div>
                <div id="4_6" class="number-space"></div>
                <div id="4_7" class="number-space"></div>
                <div id="4_8" class="number-space"></div>

                <div id="5_0" class="number-space"></div>
                <div id="5_1" class="number-space"></div>
                <div id="5_2" class="number-space"></div>
                <div id="5_3" class="number-space"></div>
                <div id="5_4" class="number-space"></div>
                <div id="5_5" class="number-space"></div>
                <div id="5_6" class="number-space"></div>
                <div id="5_7" class="number-space"></div>
                <div id="5_8" class="number-space"></div>

                <div id="6_0" class="number-space"></div>
                <div id="6_1" class="number-space"></div>
                <div id="6_2" class="number-space"></div>
                <div id="6_3" class="number-space"></div>
                <div id="6_4" class="number-space"></div>
                <div id="6_5" class="number-space"></div>
                <div id="6_6" class="number-space"></div>
                <div id="6_7" class="number-space"></div>
                <div id="6_8" class="number-space"></div>

                <div id="7_0" class="number-space"></div>
                <div id="7_1" class="number-space"></div>
                <div id="7_2" class="number-space"></div>
                <div id="7_3" class="number-space"></div>
                <div id="7_4" class="number-space"></div>
                <div id="7_5" class="number-space"></div>
                <div id="7_6" class="number-space"></div>
                <div id="7_7" class="number-space"></div>
                <div id="7_8" class="number-space"></div>

                <div id="8_0" class="number-space"></div>
                <div id="8_1" class="number-space"></div>
                <div id="8_2" class="number-space"></div>
                <div id="8_3" class="number-space"></div>
                <div id="8_4" class="number-space"></div>
                <div id="8_5" class="number-space"></div>
                <div id="8_6" class="number-space"></div>
                <div id="8_7" class="number-space"></div>
                <div id="8_8" class="number-space"></div>
            </div>

            <div class="puzzle-overlay">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>

            <div class="ask-new-puzzle-container">
                <button onclick="location.reload()">Start a new puzzle?</button>
            </div>
        </div>
        <div id="puzzle-loading" class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>

    <script src="/static/scripts/sudoku.js"></script>

    <?php include("../footer.php"); ?>
</body>

<script>
    $(".sudoku-container").css("display", "none");

    window.onload = () => {
    <?php if ($_SERVER["SERVER_NAME"] !== "localhost") : ?>
        fetch(DATA_BASE_URL + "/sudoku/get-user-data.php", {
            method: "GET",
            credentials: "include",
        }).then((r) => r.json()).then((r) => {
            if (r === null) {
                r = {
                    "puzzlesSolved": 0,
                    "currentPuzzle": null
                };
            }
        
            if (r["currentPuzzle"] === null) {
                let p = generate_new_puzzle(0.5);

                $(".sudoku-container").css("display", "grid");
                $("#puzzle-loading").css("display", "none");
                set_puzzle(p);
                fill_candidate_lists(p);
                save_puzzle();
            }
            else {
                $(".sudoku-container").css("display", "grid");
                $("#puzzle-loading").css("display", "none");
                    
                set_puzzle(from_puzzle_string(r["currentPuzzle"]));
                fill_candidate_lists(get_puzzle());
            }
        }); 
    <?php else : ?>
        let p = generate_new_puzzle(0.5);

        $(".sudoku-container").css("display", "grid");
        $("#puzzle-loading").css("display", "none");
        set_puzzle(p);
        fill_candidate_lists(p);
        
    <?php endif; ?>
    }
</script>

</html>
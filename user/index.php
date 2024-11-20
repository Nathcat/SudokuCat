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
    <?php include("../header.php"); include("../start-session.php");
        
        if (!array_key_exists("user", $_SESSION)) {
            header("Location: https://data.nathcat.net/sso?return-page=https://sudoku.nathcat.net/user");
            exit();
        }
    
    ?>

    <div class="main align-center">
        <div class="column justify-center align-center">
            <h1>Welcome, <?php echo $_SESSION["user"]["fullName"]; ?>.</h1>

            <div class="profile-picture">
                <img src="<?php echo "https://data.nathcat.net/pfps/" . $_SESSION["user"]["pfpPath"]; ?>">
            </div>

            <div id="user-data-container" class="content-card" style="width: 100%;">
                <p><b><i>Loading...</i></b></p>
            </div>
        </div>
    </div>

    <?php include("../footer.php"); ?>
</body>

<script>
fetch("https://data.nathcat.net/sudoku/get-user-data.php", {
    method: "GET",
    credentials: "include",
}).then((r) => r.json()).then((r) => {
    console.log(r);
});
</script>

</html>
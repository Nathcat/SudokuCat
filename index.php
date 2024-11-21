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
    <?php include("header.php"); ?>

    <div class="main align-center">

        <?php
        if (!array_key_exists("user", $_SESSION)) {
            header("Location: $_DATA_BASE_URL/sso?return-page=https://sudoku.nathcat.net");
            exit();
        }
        ?>

        <?php include("footer.php"); ?>

</html>
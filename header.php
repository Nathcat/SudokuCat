<?php include("start-session.php"); ?>

<script src="/static/scripts/collapsible-header.js"></script>

<div class="navbar column align-center justify-center">
    <div class="row align-center justify-center">
        <div class="column align-center justify-center">
            <h1 id="navbar-title">SudokuCat</h1>
            <a href="https://nathcat.net">Part of the Nathcat Network</a>
        </div>

        <div class="small-profile-picture">
            <img src="<?php echo "https://data.nathcat.net/pfps/" . $_SESSION["user"]["pfpPath"]; ?>">
        </div>

        <h2 style="margin-left: 20px;"><?php echo $_SESSION["user"]["fullName"]; ?></h2>
    </div>
</div>
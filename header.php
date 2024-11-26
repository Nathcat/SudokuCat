<?php include("start-session.php"); ?>

<script src="/static/scripts/collapsible-header.js"></script>

<div class="navbar column align-center justify-center">
    <div style="width: 100%" class="row align-center justify-center">
        <div class="column align-center justify-center">
            <h1 id="navbar-title">SudokuCat</h1>
            <a href="https://nathcat.net">Part of the Nathcat Network</a>
        </div>

        <?php if (!isset($__REMOVE_PROFILE_BANNER__)) : ?>
        <span class="half-spacer"></span>

        <div style="cursor: pointer;" class="row justify-center align-center" onclick="location = '/user';">
            <div class="small-profile-picture">
                <img src="<?php echo "$_DATA_BASE_URL/pfps/" . $_SESSION["user"]["pfpPath"]; ?>">
            </div>

            <h2 style="margin-left: 20px;"><?php echo $_SESSION["user"]["fullName"]; ?></h2>
        </div>
        <?php endif; ?>
    </div>
</div>
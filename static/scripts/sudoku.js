///
/// sudoku.js
///
/// Author: Nathan Baines
///
/// Okay, I'm not too proud of this one. It's very messy,
/// but I'm only intending to use this for one project,
/// I will probably try and improve it at some point.
///

//var test_puzzle = "- 8 - 5 3 - 2 7 6\n- 5 - 6 - - - - -\n6 1 3 - - - - - -\n- - 6 - 5 - - - -\n- 3 2 - - - 7 - 1\n7 4 5 - - 8 6 9 3\n- 7 - 9 6 - 5 - -\n4 - - 1 8 - - 6 7\n5 - - - - 4 8 2 9";

const DATA_BASE_URL = "https://data.nathcat.net";

function empty_puzzle() {
    return [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
}

function get_puzzle() {
    let p = empty_puzzle();

    $(".number-space").each(function() {
        let coords = $(this).attr("id").split("_").map(parseFloat);
        
        if ($(this).text() !== "") {
            p[coords[0]][coords[1]] = parseInt($(this).text());
        }

        if (!$(this).hasClass("fixed")) {
            let v = parseInt($(this).children().val());
            
            p[coords[0]][coords[1]] = isNaN(v) ? 0 : v;
        }
    });

    return p;
}

function set_puzzle(p) {
    $(".number-space").each(function() {
        let coords = $(this).attr("id").split("_").map(parseFloat);
        let value = p[coords[0]][coords[1]];

        $(this).html(
            value <= 0 ? "" : "<p>" + value + "</p>"
        );

        if (value !== 0 && value > 0) {
            $(this).addClass("fixed");
        }
        else {
            let in_id = coords[0] + "_" + coords[1] + "_value";
            $(this).html("<input id='" + in_id + "' type='text' maxlength='1' autocomplete='off'><div id=\"" + coords[0] + "_" + coords[1] + "_candidates\" class=\"candidates-list\"></div></input>");
            

            $("#" + in_id).on("input", (e) => evaluate_inputs(e.target.id));

            if (value < 0) {
                $(this).children().val(Math.abs(value).toString());
            }
        }
    });
}

function to_puzzle_string(p) {
    let s = "";
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            if (x !== 8) {
                s += p[y][x] + " ";
            }
            else if (y !== 8){
                s += p[y][x] + "\n";
            }
            else s += p[y][x];
        }
    }

    return s;
}

function mark_unfixed(p) {
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            $(".number-space input").each(function(e) {
                let coords = $(this).attr("id").split("_").map(parseFloat);

                p[coords[0]][coords[1]] *= -1;
            });
        }
    }

    return p;
}

function from_puzzle_string(p_str) {
    return p_str.split("\n").map(
        (r) => r.split(" ").map(parseFloat)
    );
}

function insert_puzzle(p_str) {
    let p = p_str.split("\n").map((v) => v.split(" "));
    
    if (p.length != 9) {
        console.error("Puzzle does not have 9 rows!");
        return;
    }

    for (let i = 0; i < 9; i++) {
        if (p[i].length != 9) {
            console.error("Must be 9 columns in each row!");
            return;
        }

        p[i] = p[i].map((v) => {
            let I = parseInt(v);
            if (isNaN(I)) {
                return 0;
            }
            else {
                return I;
            }
        })
    }

    set_puzzle(p);
}

function get_row(p, y) { return p[y]; }

function get_column(p, x) {
    let c = [];
    for (let y = 0; y < 9; y++) {
        c.push(p[y][x]);
    }

    return c;
}

function get_box(p, x, y) {
    let centre = [
        Math.floor(x / 3) * 3 + 1,
        Math.floor(y / 3) * 3 + 1
    ];

    let b = [];

    for (let r = centre[1] - 1; r <= centre[1] + 1; r++) {
        for (let c = centre[0] - 1; c <= centre[0] + 1; c++) {
            b.push(p[r][c]);
        }
    }

    return b;
}

function check_valid(i, l) {
    for (let v = 0; v < l.length; v++) {
        if (!Array.isArray(l[v]) && l[v] === i) {
            return false;
        }
    }

    return true;
}

function get_candidates(p, x, y) {
    let row = get_row(p, y);
    let column = get_column(p, x);
    let box = get_box(p, x, y);

    let c = [];
    for (let i = 1; i <= 9; i++) {
        if (check_valid(i, row) && check_valid(i, column) && check_valid(i, box)) {
            c.push(i);
        }
    }

    return c;
}

function find_all_candidates(p) {
    let solvable = true;
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            if (Array.isArray(p[y][x]) || p[y][x] === 0) {
                p[y][x] = get_candidates(p, x, y);
                if (p[y][x].length == 0) {
                    solvable = false;
                }
            }
            else {
                let v = p[y][x];
                p[y][x] = 0;
                let c = get_candidates(p, x, y);
                p[y][x] = v;
                if (!c.includes(v)) return false;
            }
        }
    }

    return solvable;
}

function solve(p) {
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            if (Array.isArray(p[y][x]) && p[y][x].length === 1) {
                p[y][x] = p[y][x][0];
            }
        }
    }

    if (!find_all_candidates(p)) {
        return false;
    }

    let candidates;
    let Y, X;
    for (let y = 0; y < 9; y++) {
        if (candidates === undefined) {
            for (let x = 0; x < 9; x++) {
                if (Array.isArray(p[y][x])) {
                    candidates = p[y][x];
                    X = x; Y = y;
                }
            }
        }
        else break;
    }

    if (candidates === undefined) return p;

    let p_copy = JSON.parse(JSON.stringify(p));
    for (let i = 0; i < candidates.length; i++) {
        p_copy[Y][X] = candidates[i];

        if (find_all_candidates(p_copy)) {
            let s = solve(p_copy);
            if (s !== false) {
                return s;
            }
        }
    }

    return false;
}

function __generate_sub_grid(p, x, y) {
    let c = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let cx = (Math.floor(x / 3) * 3) + 1;
    let cy = (Math.floor(y / 3) * 3) + 1;

    for (let Y = cy - 1; Y <= cy + 1; Y++) {
        for (let X = cx - 1; X <= cx + 1; X++) {
            let i = Math.floor(Math.random() * c.length);
            p[y][x] = c[i];
            c.splice(i, 1);
        }
    }

    return p;
}

function generate_new_puzzle(chance_of_number) {
    let p = empty_puzzle();

    // Start by randomly generating the diagonal sub-grids
    __generate_sub_grid(
        __generate_sub_grid(
            __generate_sub_grid(
                p, 1, 1
            ), 4, 4
        ), 7, 7
    );

    p = solve(p);

    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            if (Math.random() > chance_of_number) {
                p[y][x] = 0;
            }
        }
    }

    return p;
}

function load_sudoku() {
    $(".sudoku-container").css("display", "none");

    generate_new_puzzle(0.5).then((p) => {
        $(".sudoku-container").css("display", "grid");
        $("#puzzle-loading").css("display", "none");
        set_puzzle(p);
    });    
}

function is_solved(p) {
    let violating_squares = [];

    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            if (p[y][x] === 0) continue;

            let v = p[y][x];
            p[y][x] = 0;

            let c = get_candidates(p, x, y);
            p[y][x] = v;
            if (!c.includes(v)) violating_squares.push([x, y]);
        }
    }

    return violating_squares;
}

function no_empty_spaces(p) {
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            if (p[y][x] === 0) return false;
        }
    }

    return true;
} 

function ask_new_puzzle() {
    $(".puzzle-container").css("filter", "blur(2.5px)");
    $(".puzzle-overlay").css("filter", "blur(2.5px)");
    $(".ask-new-puzzle-container").css("display", "grid");

    fetch(DATA_BASE_URL + "/sudoku/add-solved.php", {
        method: "POST",
        headers: {
            "Content-Type": "text/plain"
        },
        body: to_puzzle_string(get_puzzle()),
        credentials: "include"
    }).then((r) => r.json()).then((m) => {
        console.log(m);
    });
}

function save_puzzle() {
    let p_str = to_puzzle_string(mark_unfixed(get_puzzle()));
                
    fetch(DATA_BASE_URL + "/sudoku/save-puzzle-state.php", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "text/plain"
        },
        body: p_str
    }).then((r) => r.json()).then((r) => {
        console.log(r);
    });
}

function delete_saved_puzzle() {
    return fetch(DATA_BASE_URL + "/sudoku/delete-saved-puzzle.php", {
        method: "GET",
        credentials: "include"
    }).then((r) => r.json());
}

function fill_candidate_lists(p) {
    $(".number-space .candidates-list").each(function() {
        let pos = $(this).attr("id").split("_");
        if ($("#" + pos[0] + "_" + pos[1] + "_value").val() !== "") {
            $(this).css("display", "none");
        }
        else {
            $(this).css("display", "grid");
            let s = "";

            let c = get_candidates(p, pos[1], pos[0]);
            for (let i = 0; i < c.length; i++) {
                s += "<p>" + c[i] + "</p>";
            }

            $(this).html(s);
        }
    });
}

function evaluate_inputs(e) {
    let p = get_puzzle();

    if (e !== "") {
        let doc = document.getElementById(e);

        if (doc.value === "") {
            let c = e.split("_").map(parseFloat);
            p[c[0]][c[1]] = 0;
        } 
        else {
            let v = parseInt(doc.value);
            if (isNaN(v) || v < 0 || v > 10) {
                doc.value = "";
                return;
            }
        }
    }
    
    let violations = is_solved(p);

    $(".number-space input").each(function() {
        $(this).removeClass("violating");
    });

    fill_candidate_lists(p);
    
    for (let i = 0; i < violations.length; i++) {
        $("#" + violations[i][1] + "_" + violations[i][0] + "_value").addClass("violating");
    }

    if (violations.length === 0 && no_empty_spaces(p)) {
        $(".number-space").each(async function() {
            $(this).children().addClass("solved");
        });

        delete_saved_puzzle().then((r) => console.log(r));

        ask_new_puzzle();
    }
    else if (violations.length === 0) {
        save_puzzle();
    }
}

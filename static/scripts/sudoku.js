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
            value === 0 ? "" : "<p>" + value + "</p>"
        );

        if (value !== 0) {
            $(this).addClass("fixed");
        }
        else {
            let in_id = coords[0] + "_" + coords[1] + "_value";
            $(this).html("<input id='" + in_id + "' type='text' maxlength='1' onchange='evaluate_inputs(\"" + in_id + "\")'></input>")
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
            else {
                s += p[y][x] + "\n";
            }
        }
    }

    return s;
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

function shuffle_list(l) {
    for (let i = 0; i < Math.floor(Math.random() * 100); i++) {
        let a = Math.floor(Math.random() * l.length);
        let b = Math.floor(Math.random() * l.length);

        let tmp = l[a];
        l[a] = l[b];
        l[b] = tmp;
    }

    return l;
}

function generate_puzzle(p, free_cells) {
    if (free_cells.length === 0) {
        return p;
    }

    let cell_index = Math.floor(Math.random() * free_cells.length);
    let cell = free_cells[cell_index];

    let candidates = get_candidates(p, cell[0], cell[1]);
    if (candidates.length === 0) {
        return false;
    }

    free_cells.splice(cell_index, 1);

    shuffle_list(candidates);
    for (let i = 0; i < candidates.length; i++) {
        p[cell[1]][cell[0]] = candidates[i];

        let p_copy = JSON.parse(JSON.stringify(p));

        if (solve(p_copy) !== false) {
            if (free_cells.length === 0) {
                return p;
            }
            else {
                let res = generate_puzzle(p, free_cells);

                if (res !== false) {
                    return res;
                }
            }
        }
    }

    p[cell[1]][cell[0]] = 0;
    free_cells.push(cell);
    return false;
}

function generate_random_free_cells(chance_of_number) {
    let free_cells = [];
    let unselected_cells = [];

    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            unselected_cells.push([x, y]);
        }
    }
    
    for (let i = 0; i < Math.floor(81 * chance_of_number); i++) {
        let s = Math.floor(Math.random() * unselected_cells.length);
        free_cells.push(unselected_cells[s]);
        unselected_cells.splice(s, 1);
    } 
    
    return free_cells;
}

async function generate_new_puzzle(chance_of_number) {
    let p = empty_puzzle();

    let free_cells = generate_random_free_cells(chance_of_number);

    p = generate_puzzle(p, free_cells);
    while (p === false) p = generate_puzzle(empty_puzzle(), generate_random_free_cells());

    while (solve(JSON.parse(JSON.stringify(p))) === false) { 
        p = generate_puzzle(p, free_cells);
        while (p === false) p = generate_puzzle(empty_puzzle(), generate_random_free_cells());
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

    let http = new XMLHttpRequest();
    http.open("GET", "/set-solved.php");
    http.onloadend = () => {
        fetch("/set-solved.php", {
            method: "POST",
            headers: {
                "Content-Type": "text/plain"
            },
            body: to_puzzle_string(get_puzzle())
        }).then((r) => r.json()).then((m) => {
            console.log(m);
        });
    }
}

function evaluate_inputs(e) {
    if (e !== "") {
        let doc = document.getElementById(e);
        
        let v = parseInt(doc.value);
        if (isNaN(v) || v < 0 || v > 10) {
            doc.value = "";
            return;
        }
    }
    
    let p = get_puzzle();
    let violations = is_solved(p);

    $(".number-space input").each(function() {
        $(this).removeClass("violating");
    });
    
    for (let i = 0; i < violations.length; i++) {
        $("#" + violations[i][1] + "_" + violations[i][0] + "_value").addClass("violating");
    }

    if (violations.length === 0 && no_empty_spaces(p)) {
        $(".number-space").each(async function() {
            $(this).children().addClass("solved");
        });

        ask_new_puzzle();
    }
}
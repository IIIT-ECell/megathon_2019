$(document).ready(main);

function randomSize(min=80, max=220) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomShape(square) {
    const coinToss = Math.random();

    if (coinToss < 0.5 || square) {
        // let's make it a square
        const dimen = randomSize();
        return [dimen, dimen];
    } else {
        // rectangle now
        // using value of coinToss as ratio

        const w = randomSize();
        return [ w, Math.floor(w * coinToss) ];
    }
}

function randomPosition(width, height, offset) {
    const x = Math.max(Math.random() * width - offset[0], 0),
        y = Math.max(Math.random() * height - offset[1], 0);

    return [x, y];
}

function randomColor(variant) {
    let color;

    switch (variant) {
        case "light":
            break;
        case "dark":
            break;
        case "any":
        default:
            color = (Math.floor(Math.random() * 0xffffff)).toString(16);
            break;
    }

    return `#${"0".repeat(6 - color.length)}${color}`;
}

/*
 * Border radius will be of the form
 *  `a 100-a b 100-b / x y 100-y 100-x`
 */
function randomBlob(shape, color, position, parent) {
    let randRad = []

    for (let i = 0; i < 4; i++)
        randRad[i] = Math.random() * 30 + 40;

    const [a, b, x, y] = randRad,
        $blob = $("<div>", {
            "id": `${shape}${color}${position}`
        });

    $blob.css({
        "width": `${shape[0]}px`,
        "height": `${shape[1]}px`,
        "position": "absolute",
        "left": `${position[0]}px`,
        "top": `${position[1]}px`,
        "background": `${color}`,
        "border-radius": `${a}% ${100-a}% ${b}% ${100-b}% / ${x}% ${y}% ${100-y}% ${100-x}%`,
        "opacity": "0.25"
    });

    $(parent).append($blob);
}

function main() {
    const parentContainers = [ "#aboutus", "#megathon_19",
        "#howzhack", "#probstat", "#event_timeline",
        "#sponsors0", "#sponsors1", "#contact_us" ];

    let parents = [];

    for (const container of parentContainers)
        parents.push(container + " .raise-box");

    for(const parent of parents) {
        for(let i = 0; i < 3; i++) {
            const shape = randomShape(square=true),
                color = randomColor(),
                position = randomPosition($(parent).width(), $(parent).height(), shape);

            randomBlob(shape, color, position, parent);
        }
    }
}

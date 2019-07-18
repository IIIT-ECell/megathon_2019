$(document).ready(main);

function randomSize(min=20, max=120) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomShape() {
    const coinToss = Math.random();

    if (coinToss < 0.5) {
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

function randomPosition(offset) {
    const x = Math.random() * screen.width - offset[0],
        y = Math.random() * screen.height - offset[1];

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
    })

    console.log($blob);

    $(parent).append($blob);
}

function main() {
    const parents = [ "body" ];

    for(const parent of parents) {
        for(let i = 0; i < 10; i++) {
            const shape = randomShape(),
                color = randomColor(),
                position = randomPosition(shape);

            randomBlob(shape, color, position, parent);
            console.log("Drew one at ", position, " with color ", color, " and shape ",  shape);
        }
    }
}

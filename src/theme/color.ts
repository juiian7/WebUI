export const color = {
    white: rgbToHex(250, 250, 250),
    black: rgbToHex(20, 20, 20),
    gray: rgbToHex(40, 40, 40),
    light_gray: rgbToHex(60, 60, 60),
    yellow: rgbToHex(255, 215, 0),
    ocher: rgbToHex(190, 150, 0),
    orange: rgbToHex(255, 155, 0),
    brown: rgbToHex(165, 110, 30),
    red: rgbToHex(255, 75, 75),
    dark_red: rgbToHex(170, 50, 50),
    pink: rgbToHex(230, 85, 150),
    magenta: rgbToHex(185, 85, 110),
    light_purple: rgbToHex(170, 90, 190),
    purple: rgbToHex(110, 50, 120),
    indigo: rgbToHex(100, 100, 190),
    dark_indigo: rgbToHex(70, 70, 140),
    blue: rgbToHex(65, 90, 160),
    dark_blue: rgbToHex(50, 70, 120),
    agua: rgbToHex(80, 170, 220),
    dark_agua: rgbToHex(50, 135, 180),
    cyan: rgbToHex(60, 220, 180),
    dark_cyan: rgbToHex(40, 170, 155),
    mint: rgbToHex(70, 200, 140),
    jade: rgbToHex(40, 145, 100),
    light_green: rgbToHex(100, 220, 100),
    green: rgbToHex(50, 165, 50),
    lime: rgbToHex(190, 220, 90),
    avocado: rgbToHex(160, 190, 50),
};

function componentToHex(c: number): string {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

export function rgbToHex(r: number, g: number, b: number): string {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

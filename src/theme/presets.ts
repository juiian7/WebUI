import { color } from "./color.js";
import { prefers_dark_theme, Theme, theme } from "./theme.js";

type DefaultThemes = "default" | "none" | "light" | "dark";

const presets: { [name: string]: Theme } = {};

export function initPresets() {
    presets["none"] = theme();

    // create empty theme
    let style = document.createElement("button").style;
    let readonlyProps = ["length", "parentRule"];
    for (const name in style) {
        if (!readonlyProps.includes(name)) presets.none.setRule(name as keyof CSSStyleDeclaration, "");
    }

    presets["light"] = theme()
        .background(color.white)
        .color(color.black)
        .setRule("fontFamily", "helvetica")
        .setRule("backgroundColor", color.agua, "button")
        .setRule("color", color.white, "button")
        .setRule("borderRadius", "4px", "button")
        .setRule("border", "none", "button")
        .setRule("fontSize", "1rem", "button")
        .setRule("padding", "0.4rem", "button")
        .setRule("cursor", "pointer", "button");

    presets["dark"] = presets["light"].clone().background(color.gray).color(color.white);
    //presets["dark"] = theme().background(color.black).color(color.white);
    //presets["blue"] = theme().background(color.blue).color(color.yellow).setRule("backgroundColor", color.yellow, "button");
}

export function preset(name: DefaultThemes, createCopy: boolean = false) {
    if (name === "default") name = prefers_dark_theme ? "dark" : "light";

    let preset = presets[name];
    if (!preset) throw new Error("No preset found with the name: " + name);

    return createCopy ? preset.clone() : preset;
}

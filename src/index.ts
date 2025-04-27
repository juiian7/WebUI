import { Elem } from "./Base.js";
import Element, { element, wrap } from "./Components/Element.js";
import Style, { style, includeExternalStyleSheet } from "./Theme/Style.js";
import Theme, { theme } from "./Theme/Theme.js";
import Rules from "./Theme/Rules.js";

import Container, { div, container, vsplit, hsplit, grid } from "./Components/Container.js";

import Text, { span, text, h1, h2, h3, p, heading } from "./Components/Text.js";

import Form, { form } from "./Components/Form.js";
import Button, { button } from "./Components/Button.js";
import Input, { input } from "./Components/Input.js";

import Img, { img } from "./Components/Img.js";
import Link, { link } from "./Components/Link.js";

import { dynamic, update } from "./dynamic.js";

import { router, useRouter } from "./router.js";

export {
    div,
    container,
    vsplit,
    hsplit,
    grid,
    //
    span,
    text,
    h1,
    h2,
    h3,
    p,
    heading,
    //
    form,
    button,
    input,
    //
    img,
    link,
    //
    element,
    wrap,
    style,
    theme,
    //
    dynamic,
    update,
    //
    includeExternalStyleSheet,
};

export { Elem, Element, Container, Text, Form, Button, Input, Img, Link, Style, Theme, Rules };

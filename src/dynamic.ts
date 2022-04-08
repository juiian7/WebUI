import Base, { Elem } from "./base.js";

type vars = string | number | boolean;

var registrations: IRegistrations[] = [];

interface IRegistrations {
    render(): Base<HTMLElement>;
    dependencies(): vars[];
    oldDependencies: vars[];
    oldRender: Base<HTMLElement>;
}

export function dynamic(render: () => Base<HTMLElement>, dependencies: () => any[]) {
    let registration = {
        render,
        dependencies,
        oldDependencies: dependencies(),
        oldRender: render(),
    };
    registrations.push(registration);
    return registration.oldRender;
}

export function update() {
    // find changed registrations
    let changes = registrations.filter((registration) =>
        registration.dependencies().some((dependency, index) => dependency !== registration.oldDependencies[index])
    );
    if (changes.length == 0) return;

    // render registration on correct position
    changes.forEach((registration) => {
        let render = registration.render();
        registration.oldRender.HTML.parentNode.replaceChild(render.HTML, registration.oldRender.HTML);
        registration.oldRender = render;
    });

    // update old dependencies
    for (let i = 0; i < registrations.length; i++) {
        const element = registrations[i];
        registrations[i].oldDependencies = element.dependencies();
    }
}

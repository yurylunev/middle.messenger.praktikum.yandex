export default function render(block: any, query: string): HTMLElement {
    const root: HTMLElement | null = document.querySelector(query);
    if (root) {
        root.innerHTML = ``;
        ([...block.element.children]).forEach((element) => root.appendChild(element))
        return root;
    }
    return document.createElement(`div`);
}

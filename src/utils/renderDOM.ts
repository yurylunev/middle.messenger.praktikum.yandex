export default function render(block, query: string): HTMLElement {
    const root: HTMLElement = document.querySelector(query);
    root.innerHTML = '';
    ([...block.element.children]).forEach((element) => root.appendChild(element))
    return root;
}

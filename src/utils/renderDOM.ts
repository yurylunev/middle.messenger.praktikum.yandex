export default function render(block, query: string): HTMLElement {
    const root: HTMLElement = document.querySelector(query);
    root.innerHTML = '';
    root.appendChild(block.element);
    return root;
}

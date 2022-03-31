export default function render(block: any, query: string): HTMLElement {
  console.count('Render to DOM');
  const root: HTMLElement | null = document.querySelector(query);
  console.log(root);
  if (root) {
    root.innerHTML = ``;
    console.log('Before: Block element children', block.element.children);
    ([...block.element.children]).forEach((element) => {
      console.log(element);
      root.appendChild(element);
    });
    console.log('After: Block element children', block.element.children);
    console.log('Rendered: ', root);
    return root;
  }
  return document.createElement(`div`);
}

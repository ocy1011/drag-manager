export default class {
  constructor() {
    this.draggingElement = null;
    this.draggingElementStyle = null;
    this.callback = {
      dragStart: null,
      dragMove: null,
      dragEnd: null
    };
    window.addEventListener("mousemove", this.dragMove.bind(this));
    window.addEventListener("mouseup", this.dragEnd.bind(this));
  }

  addDragListener(element) {
    element.style.userDrag = "none";
    element.style.userSelect = "none";
    element.addEventListener("mousedown", this.dragStart.bind(this, element));
  }

  dragStart(element, event) {
    if (this.draggingElement !== null) this.dragEnd(event);
    document.body.style.cursor = "move";
    this.draggingElementStyle = element.style.cssText;

    this.draggingElement = element;
    const rect = element.getBoundingClientRect();

    if (this.callback.dragStart !== null) this.callback.dragStart(event);

    document.body.appendChild(element);
    this.changeElementPosition(event.x, event.y);
    this.changeElementSize(rect.width, rect.height);
    element.style.position = "fixed";
    element.style.pointerEvents = "none";
    element.style.transform = `translate(${rect.x - event.x}px, ${rect.y -
      event.y}px)`;
  }

  dragMove(event) {
    if (this.draggingElement === null) return;
    this.changeElementPosition(event.x, event.y);
    if (this.callback.dragMove !== null) this.callback.dragMove(event);
  }

  dragEnd(event) {
    if (this.draggingElement === null) return;
    document.body.style.cursor = "auto";
    if (this.callback.dragEnd !== null) this.callback.dragEnd(event);
    this.draggingElement.setAttribute("style", this.draggingElementStyle);
    this.draggingElement = null;
  }

  changeElementPosition(x, y) {
    this.draggingElement.style.left = `${x}px`;
    this.draggingElement.style.top = `${y}px`;
  }

  changeElementSize(width, height) {
    this.draggingElement.style.width = `${width}px`;
    this.draggingElement.style.height = `${height}px`;
  }

  setDragStartCallback(callback) {
    this.callback.dragStart = callback;
  }

  setDragMoveCallback(callback) {
    this.callback.dragMove = callback;
  }

  setDragEndCallback(callback) {
    this.callback.dragEnd = callback;
  }
}

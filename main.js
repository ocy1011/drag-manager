import DragManager from "./DragManager.js";

(function init() {
  const dragManager = new DragManager();
  const container = document.querySelector("#container");
  const redBox = document.querySelector("#red");
  const blueBox = document.querySelector("#blue");
  dragManager.addDragListener(redBox);
  dragManager.addDragListener(blueBox);

  function appendChildToContainer() {
    const box = dragManager.draggingElement;
    container.appendChild(box);
    box.style.transform = "none";
    box.style.left = 0;
    box.style.top = 0;
  }

  function checkIsMouseInContainer(x, y) {
    const containerRect = container.getBoundingClientRect();
    if (
      x < containerRect.x ||
      x > containerRect.x + containerRect.width ||
      y < containerRect.y ||
      y > containerRect.y + containerRect.height
    )
      return;
    appendChildToContainer();
  }

  function handleDragEnd(event) {
    checkIsMouseInContainer(event.clientX, event.clientY);
  }

  dragManager.setDragEndCallback(handleDragEnd);
})();

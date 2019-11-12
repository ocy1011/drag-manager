# drag-manager

## 사용방법

```javascript
import DragManager from "./DragManager.js";

const dragManager = new DragManager();
dragManager.addDragListener(element);

function handleDragStart() {}
function handleDragMove() {}
function handleDragEnd() {}

dragManager.setDragStartCallback(handleDragStart);
dragManager.setDragMoveCallback(handleDragMove);
dragManager.setDragEndCallback(handleDragEnd);
```

1. DragManager 클래스를 생성한다.
2. dragManager.addDragListener(element)를 통하여 element를 drag 가능한 상태로 변경한다.
3. dragStart, dragMove, dragEnd에 행동에 따른 callback을 등록한다.

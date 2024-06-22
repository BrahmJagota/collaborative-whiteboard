let curr_index: number = -1;
let startX: number;
let startY: number;
let bool:boolean = false
export function isMouseInShape (x: number, y: number, shape: IShape) {
    let shapeLeft = shape.x;
    let shapeRight = shape.x + shape.width;
    let shapeTop = shape.y;
    let shapeBottom = shape.y + shape.height;
    if(x > shapeLeft && x < shapeRight && y > shapeTop && y < shapeBottom) {
        return true;
    }
    bool = false;
    return false;   
}

export function mouseDown (e: React.MouseEvent, shapes: IShape[]) {
   
    e.preventDefault();
     startX = e.nativeEvent.offsetX;
     startY = e.nativeEvent.offsetY;
    let index = 0;
    for(let shape of shapes){
        if(isMouseInShape(startX, startY, shape)) {
            bool = true;
            curr_index = index; 
            return; 
        } 
        index += 1;
    }
}
function drawShapes (context: CanvasRenderingContext2D, canvas:HTMLCanvasElement, shapes: IShape[]) {
    context.clearRect(0, 0, canvas.width, canvas.height)
    for(let shape of shapes){
        context.fillStyle = shape.color
        context.fillRect(shape.x, shape.y, shape.width, shape.height)
    }
}
export function mouseMove (context: CanvasRenderingContext2D, canvas:HTMLCanvasElement, e: React.MouseEvent,shapes: IShape[]) {
    if(!bool){
        return;
    }
    e.preventDefault();
    let mouseX = e.nativeEvent.offsetX;
    let mouseY = e.nativeEvent.offsetY;
    let dx = mouseX - startX;
    let dy = mouseY - startY;
    
    let currShape = shapes[curr_index];
    currShape.x += dx;
    currShape.y += dy;

    drawShapes(context, canvas, shapes)

    startX = e.nativeEvent.offsetX
    startY = e.nativeEvent.offsetY
}
export function eMouseUp () {
    bool = false
}

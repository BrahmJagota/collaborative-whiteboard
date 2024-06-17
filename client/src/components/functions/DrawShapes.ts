export function drawCircle(e: React.MouseEvent, prev: IPrevCords, context: CanvasRenderingContext2D,isFill: boolean,color: string) {
    const radius = Math.abs(e.nativeEvent.offsetX - prev.x); 
    context.beginPath();
    context.arc(prev.x, prev.y, radius, 0, 2 * Math.PI);
    context.closePath();
    if (isFill) {
        context.fillStyle = color;
        context.fill();
    } else {
        context.strokeStyle = color;  
        context.stroke();
    }
    
}

export function drawRect (e: React.MouseEvent,prev: IPrevCords, context: CanvasRenderingContext2D,isFill: boolean ,color: string) {
    if (isFill) {
        context.fillStyle = color;
        context.fillRect(e.nativeEvent.offsetX, e.nativeEvent.offsetY, prev.x - e.nativeEvent.offsetX, prev.y - e.nativeEvent.offsetY)
    } else {
        context.strokeStyle = color;  
        context.strokeRect(e.nativeEvent.offsetX, e.nativeEvent.offsetY, prev.x - e.nativeEvent.offsetX, prev.y - e.nativeEvent.offsetY)
        context.lineWidth = 4;
    }   
  }

export function drawTriangle(e: React.MouseEvent, prev: IPrevCords, context: CanvasRenderingContext2D, isFill: boolean, color: string) {
    const newCords = {
        x: prev.x - (e.nativeEvent.offsetX - prev.x),
        y: e.nativeEvent.offsetY - prev.y
    }
    context.beginPath();
    context.moveTo(prev.x, prev.y);
    context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    context.lineTo(newCords.x, e.nativeEvent.offsetY);
    context.closePath();
    if (isFill) {
        context.fillStyle = color;
        context.fill();
    } else {
        context.strokeStyle = color;  
        context.stroke();
    }    
}

export function drawLine(e: React.MouseEvent, prev: IPrevCords, context: CanvasRenderingContext2D, color: string) {
    context.beginPath();
    context.moveTo(prev.x, prev.y);
    context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    context.stroke()
}
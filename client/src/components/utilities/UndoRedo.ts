export function undo (stack: ImageData[], data: ImageData) {
    stack.push(data)
}

export function redo (stack: ImageData[]) {
    stack.pop()
}

export function test () {
    console.log("test successfull")
}
var controlsMovement = {
    hello_world: ()=>{
        console.log("hello world");
    }
}
var points = 
window.onload = ()=>{
    var gui = new dat.GUI();
    var folderMovement = gui.addFolder('Movement');
    var folderView = gui.addFolder('View');
    folderMovement.add(controlsMovement, "hello_world");
}
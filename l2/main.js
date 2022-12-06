let ns = 'http://www.w3.org/2000/svg';
//работает только через ns

let isRect = false;
let isCircle = false;

let isMouseDown = false;

window.onload = () => {   
    let svgCanvas = document.getElementById('svg');
    const canvas = document.getElementsByClassName('canvas')[0]; 

    const rectButton = document.getElementById('rect');
    const circleButton = document.getElementById('circle'); 
    const clearButton = document.getElementById('clear');
    svgCanvas = createCanvas();
    
function createCanvas(svgCanvas){
    svgCanvas = document.createElementNS(ns, 'svg');
    svgCanvas.setAttributeNS(null, 'width', window.outerWidth-100);
    svgCanvas.setAttributeNS(null, 'height', window.outerHeight-100);
    svgCanvas.setAttributeNS(null, 'id','svg');
    canvas.appendChild(svgCanvas);

    svgCanvas.addEventListener('mousedown', createRectEvents);    
    svgCanvas.addEventListener('mousedown', createCircleEvents);
    
    return svgCanvas;
}

//----------BUTTONS-------------------------------------
rectButton.addEventListener('click', ()=>{
    isRect = true;
    isCircle = false;
});
circleButton.addEventListener('click', ()=>{
    isRect = false;
    isCircle = true;
});
clearButton.addEventListener('click', () =>{
    canvas.removeChild(svgCanvas);
    createCanvas(svgCanvas);   

    svgCanvas = document.getElementById('svg');
});
//----------BUTTONS-----------------------------------------


function createRectEvents(e)
{
    if(!isRect) return;
    isMouseDown = true;
    let rect = document.createElementNS(ns, 'rect');
   
    rect.setAttributeNS(null, 'width', '1');
    rect.setAttributeNS(null, 'height', '1');
    rect.setAttributeNS(null, 'fill', '#fff');
    rect.setAttributeNS(null, 'stroke', '#000000');
    rect.setAttributeNS(null, 'x', (e.offsetX).toString());
    rect.setAttributeNS(null, 'y', (e.offsetY).toString());
    
    
    let shiftX = e.offsetX;
    let shiftY = e.offsetY;
    let origLoc = {X: e.offsetX, Y: e.offsetY};
    
    svgCanvas.addEventListener('mousemove', onMouseMoveRect);
    svgCanvas.addEventListener('mouseup',onMouseUpRect);
    svgCanvas.appendChild(rect);
    
    function onMouseMoveRect(event) {
        let status = rect.getAttributeNS(null, 'class');
        if(isMouseDown && status == null) moveAtRect(event.offsetX, event.offsetY);           
    }      
    function moveAtRect(dX, dY){
        let height = dY - shiftY; 
        if(height<0){
            height = -height;
            dY = origLoc.Y - height;
            rect.setAttributeNS(null, 'y', (dY).toString()); 
        }        
        let width = dX - shiftX;
        if(width<0){
            width = -width;
            dX = origLoc.X - width;
            rect.setAttributeNS(null, 'x', (dX).toString());
        }
        rect.setAttributeNS(null, 'width', width.toString());
        rect.setAttributeNS(null, 'height', height.toString());
    }

    function onMouseUpRect(){
        isMouseDown = false;   
        rect.setAttributeNS(null, 'class', 'completed');
        svgCanvas.removeEventListener('mousemove', onMouseMoveRect);        
        svgCanvas.removeEventListener('mouseup',onMouseUpRect);
    };

  
    };

function createCircleEvents(e)
{
    if(!isCircle) return;
    isMouseDown = true;
    let circle = document.createElementNS(ns,'circle');
 

    circle.setAttributeNS(null, 'r', '1');
    circle.setAttributeNS(null, 'fill', '#fff');
    circle.setAttributeNS(null, 'stroke', '#000000');
    circle.setAttributeNS(null, 'cx', (e.offsetX).toString());
    circle.setAttributeNS(null, 'cy', (e.offsetY).toString());


    let shiftX = e.offsetX;
    let shiftY = e.offsetY;

    svgCanvas.addEventListener('mousemove', onMouseMoveCircle, false);
    svgCanvas.addEventListener('mouseup',onMouseUpCircle);

    svgCanvas.appendChild(circle);

    function onMouseMoveCircle(event) {
        let status = circle.getAttributeNS(null, 'class');
        if(isMouseDown && status == null) moveAtCircle(event.offsetX, event.offsetY);           
    }      
    function moveAtCircle(offsetX, offsetY){
        let radius = Math.sqrt((offsetX-shiftX)**2+
        (offsetY-shiftY)**2); 
        circle.setAttributeNS(null, 'r', radius.toString());
    }

    function onMouseUpCircle(){
        isMouseDown = false;   
        circle.setAttributeNS(null, 'class', 'completed');
        svgCanvas.removeEventListener('mousemove', onMouseMoveCircle, false);
        svgCanvas.removeEventListener('mouseup',onMouseUpCircle);
    }

   
}
}
window.onload = () => {
    var canvas = document.getElementById('canvas');
    var isDrawRect = false;
    var isDrawCircle = false;
    var mouseIsDown = false;
    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight);

    let ctx = canvas.getContext('2d');
    
    //rectangle
    const butRect = document.getElementById('butRect');
    butRect.addEventListener('click', () => {
        isDrawRect = true;
        isDrawCircle = false;
    });
    canvas.addEventListener("mousedown", (e) => {
        
        if (!isDrawRect) return;
        let tempCanvas = canvas.cloneNode();
        document.body.appendChild(tempCanvas);
        tempCanvas.id = 'temp';
        tempCanvas.setAttribute('width', window.innerWidth);
        tempCanvas.setAttribute('height', window.innerHeight);
        tempCtx = tempCanvas.getContext('2d');
        mouseIsDown=true;
        var rx =e.offsetX;
        var ry =e.offsetY;
        tempCtx.fillRect(rx,ry,1,1);
        document.addEventListener("mousemove", (e) => {
            if(!isDrawRect) return;
            tempCtx.clearRect(0,0,window.outerWidth-100,window.outerHeight-100);
            var dX=rx;
            var dY=ry;
            if(mouseIsDown){ 
                var height = e.offsetY - ry;
                  if (height<0){
                     height = -height;
                     dY=e.offsetY;
                  }
                 var width = e.offsetX - rx;
                  if (width<0){
                     width = -width;
                     dX=e.offsetX;
                  }
                  tempCtx.strokeRect(dX,dY,width,height);
            }
        });
        document.addEventListener("mouseup", (e) => {
            mouseIsDown = false;
            ctx.drawImage(tempCanvas, 0, 0);
            if(document.getElementById('temp') != null)
                document.getElementById('temp').remove();
        });
    });

    // circle
    const butCircle = document.getElementById('butCircle');
    butCircle.addEventListener('click', () => {
        isDrawCircle = true;
        isDrawRect = false;
    });
    canvas.addEventListener("mousedown", (e) => {
        if (!isDrawCircle) return;
        let tempCCanvas = canvas.cloneNode();
        document.body.appendChild(tempCCanvas);
        tempCCanvas.id = 'temp';
        tempCCtx = tempCCanvas.getContext('2d');
        mouseIsDown = true;
        var cx = e.offsetX;
        var cy = e.offsetY;
        tempCCtx.beginPath();
        tempCCtx.arc(cx,cy,1,0,Math.PI*2,true); // Внешняя окружность
        tempCCtx.stroke();
        document.addEventListener("mousemove", (e) => {
            if (!isDrawCircle) return;
            tempCCtx.clearRect(0,0,window.outerWidth-100,window.outerHeight-100);
            if (mouseIsDown){
         var radius=Math.sqrt(Math.pow(e.offsetX - cx, 2) + Math.pow(e.offsetY - cy, 2));
         tempCCtx.beginPath();
         tempCCtx.arc(cx,cy,radius,0,Math.PI*2,true); // Внешняя окружность
         tempCCtx.stroke();
            }
        });
        document.addEventListener("mouseup", (e) => {
            mouseIsDown = false;
            tempCCtx.closePath();
            ctx.drawImage(tempCCanvas, 0, 0);
         if(document.getElementById('temp') != null)
             document.getElementById('temp').remove();
        });
    });

    //delete
    const butDelete = document.getElementById('delete');
    butDelete.addEventListener('click', () => {
        location.reload();
    });
}
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
        tempCtx = tempCanvas.getContext('2d');
        mouseIsDown=true;
        var rx =e.offsetX;
        var ry =e.offsetY;
        tempCtx.fillRect(rx,ry,1,1);
        document.addEventListener("mousemove", (e) => {
            if(!isDrawRect) return;
            tempCtx.clearRect(0,0,canvas.width,canvas.height);
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
            tempCCtx.clearRect(0,0,canvas.width,canvas.height);
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
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
}
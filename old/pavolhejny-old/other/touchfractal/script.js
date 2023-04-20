const TC = TouchController;

let drawingColorFill = '#ffb536';
const drawingColorFillInput = document.getElementById('drawing-color-fill');
drawingColorFillInput.value = drawingColorFill;
drawingColorFillInput.addEventListener(
    'change',
    (event) => (drawingColorFill = event.target.value),
    false,
);

let drawingColorStroke = '#191919';
const drawingColorStrokeInput = document.getElementById('drawing-color-stroke');
drawingColorStrokeInput.value = drawingColorStroke;
drawingColorStrokeInput.addEventListener(
    'change',
    (event) => (drawingColorStroke = event.target.value),
    false,
);

const sceneSize = new TC.Vector2(
    document.body.clientWidth,
    document.body.clientHeight,
);

function createSceneCtx(name) {
    const scene = document.getElementById(name + '-scene');
    scene.width = sceneSize.x;
    scene.height = sceneSize.y;
    return scene.getContext('2d');
}

const ctxDrawing = createSceneCtx('drawing');
const ctxFractal = createSceneCtx('fractal');

class Rect {
    constructor(position, ratio, rotation) {
        this.position = position;
        this.ratio = ratio;
        this.rotation = rotation;
    }

    render(ctx) {
        const ittTransformation1 = new TC.Transformation(
            new TC.Vector2(this.position.x, this.position.y),
            this.rotation,
            this.ratio,
        );
        let ittTransformation = ittTransformation1;

        this.renderitt(ctx, ittTransformation, true);
        for (let i = 1; i < 500; i++) {
            ittTransformation = ittTransformation.nest(
                ittTransformation1,
                sceneSize.scale(0.5),
            );

            if (ittTransformation.scale < 0.01) {
                break;
            }

            this.renderitt(ctx, ittTransformation);
        }
    }

    renderitt(ctx, ittTransformation, border = false) {
        ctx.save();
        ctx.beginPath();

        ctx.rotate(ittTransformation.rotate);
        ctx.translate(
            ...ittTransformation.translate
                .rotate(-ittTransformation.rotate)
                .subtract(
                    new TC.Vector2(
                        (sceneSize.x * ittTransformation.scale) / 2,
                        (sceneSize.y * ittTransformation.scale) / 2,
                    ),
                )
                .toArray(),
        );
        const box = [
            0,
            0,
            sceneSize.x * ittTransformation.scale,
            sceneSize.y * ittTransformation.scale,
        ];
        if (border) {
            ctx.strokeStyle = '#cdcdcd';
            ctx.lineWidth = 1;
            ctx.rect(...box);
            ctx.stroke();
        }
        ctx.drawImage(ctxDrawing.canvas, ...box);

        ctx.restore();
    }

    intersects(position) {
        const position1r = this.position; //.rotate(this.rotation);
        const position2r = position.rotate(-this.rotation, this.position);
        //const sceneSizer = sceneSize.rotate(this.rotation,this.position);

        return (
            position1r.x - (this.ratio * sceneSize.x) / 2 <= position2r.x &&
            position1r.y - (this.ratio * sceneSize.y) / 2 <= position2r.y &&
            position1r.x + (this.ratio * sceneSize.x) / 2 >= position2r.x &&
            position1r.y + (this.ratio * sceneSize.y) / 2 >= position2r.y
        );
    }
}

const rects = [
    new Rect(new TC.Vector2(sceneSize.x / 2, sceneSize.y), 0.5, Math.PI / 7),
];

function renderFractal() {
    ctxFractal.clearRect(
        0,
        0,
        ctxFractal.canvas.width,
        ctxFractal.canvas.height,
    );
    for (const rect of rects.slice().reverse()) {
        rect.render(ctxFractal);
    }
}

renderFractal();

const touchController = new TC.TouchController(ctxFractal.canvas);
touchController.addListener(new TC.listeners.TouchListener());
touchController.addListener(new TC.listeners.MouseListener());
const multiTC = new TC.MultiTouchController(touchController, function(
    position,
) {
    return rects.find((rect) => rect.intersects(position)) || 'unknown';
});

/*let lastHoverPosition = null;
 touchController.hover.positions.subscribe((position)=>{
 if(rects.some((rect)=>rect.intersects(position))){
 if(lastHoverPosition) {
 ctxFractal.strokeStyle = '#ff00ff';//rects[0].color;
 ctxFractal.lineCap = 'round';
 ctxFractal.lineWidth = 3;
 ctxFractal.beginPath();
 ctxFractal.moveTo(lastHoverPosition.x, lastHoverPosition.y);
 ctxFractal.lineTo(position.x, position.y);
 ctxFractal.stroke();
 }
 lastHoverPosition = position;
 }else{
 lastHoverPosition = null;
 }
 });*/

/*multiTC.unknownTouches.subscribe((touch)=>{
 lastPosition = touch.firstPosition;
 touch.positions.subscribe((position)=>{
 ctxDrawing.strokeStyle = '#191919';//rects[0].color;
 ctxDrawing.lineCap = 'round';
 ctxDrawing.lineWidth = 5;
 ctxDrawing.beginPath();
 ctxDrawing.moveTo(lastPosition.x, lastPosition.y);
 ctxDrawing.lineTo(position.x, position.y);
 ctxDrawing.stroke();
 lastPosition = position;
 render();
 });
 });*/

multiTC.multiTouches.subscribe(function(multitouch) {
    if (multitouch.element === 'unknown') {
        multitouch.ongoingPositionsChanges.subscribe((touches) => {
            ctxDrawing.strokeStyle = drawingColorStroke;
            ctxDrawing.lineCap = 'round';
            ctxDrawing.lineWidth = 3;
            ctxDrawing.fillStyle = drawingColorFill;

            if (touches.length === 1) {
                ctxDrawing.beginPath();
                ctxDrawing.moveTo(...touches[0].lastPosition2.toArray());
                ctxDrawing.lineTo(...touches[0].lastPosition.toArray());
                ctxDrawing.closePath();
                ctxDrawing.stroke();
            } else if (touches.length === 2) {
                ctxDrawing.beginPath();
                ctxDrawing.moveTo(...touches[0].lastPosition2.toArray());
                ctxDrawing.lineTo(...touches[0].lastPosition.toArray());
                ctxDrawing.lineTo(...touches[1].lastPosition.toArray());
                ctxDrawing.lineTo(...touches[1].lastPosition2.toArray());
                ctxDrawing.closePath();
                ctxDrawing.fill();

                ctxDrawing.beginPath();
                ctxDrawing.moveTo(...touches[0].lastPosition2.toArray());
                ctxDrawing.lineTo(...touches[0].lastPosition.toArray());
                ctxDrawing.closePath();
                ctxDrawing.stroke();

                ctxDrawing.beginPath();
                ctxDrawing.lineTo(...touches[1].lastPosition.toArray());
                ctxDrawing.lineTo(...touches[1].lastPosition2.toArray());
                ctxDrawing.closePath();
                ctxDrawing.stroke();
            } else if (touches.length > 2) {
                ctxDrawing.beginPath();
                touches.forEach((touch, i) => {
                    const position = touch.lastPosition;
                    if (i === 0) {
                        ctxDrawing.moveTo(...position.toArray());
                    } else {
                        ctxDrawing.lineTo(...position.toArray());
                    }
                });
                ctxDrawing.closePath();
                ctxDrawing.stroke();
                ctxDrawing.fill();
            }

            renderFractal();
        });
        return;
    }

    const rect = multitouch.element;
    const transformations = TC.multiTouchTransformations(
        multitouch,
        new TC.Transformation(rect.position, rect.rotation, rect.ratio),
    );
    transformations.subscribe(
        function(transformation) {
            //console.log(transformation);

            multitouch.element.position = transformation.translate;
            multitouch.element.rotation = transformation.rotate;
            multitouch.element.ratio = Math.min(transformation.scale, 0.85);

            //multitouch.element.position = multitouch.element.position.add(transformation.translate);

            renderFractal();
        },
        function() {},
        function() {},
    );
});

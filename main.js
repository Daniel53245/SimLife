window.onload = main
const canvs_with = 1440;
const canvas_height = 900;

const World = {
        width: canvs_with,
        height: canvas_height,
        cells:Array.from({length: 1440}, () => Array(900).fill(0)),
        world_init: function(){
                //init the world
                for(let x = 0; x < this.width; x++){
                        for(let y = 0; y < this.height; y++){
                                this.cells[x][y] = Math.floor(Math.random() * 2);
                        }
                }
        },

        world_step: function(){
                for(let x = 0; x < this.width; x++){
                        for(let y = 0; y < this.height; y++){
                                this.cells[x][y] = !this.cells[x][y];
                        }
                }
                //update the world
        },
        world_draw: function(ctx){
                //draw the world
                for(let x = 0; x < this.width; x++){
                        for(let y = 0; y < this.height; y++){
                                if(this.cells[x][y] == 1){
                                        ctx.fillStyle = "white";
                                        ctx.fillRect(x,y,1,1);
                                }
                                if(this.cells[x][y] == 0){
                                        ctx.fillStyle = "black";
                                        ctx.fillRect(x,y,1,1);
                                }
                        }
                }
        }
}


function main(){
        let ctx = initaliseCanvas(canvs_with,canvas_height);
        canvas = document.getElementById("mainCanvas");
        World.world_init();
        //fire up animation and main loop
        render(ctx,canvas);
}

//intialise the Canvas SIze and return the ctx object
function initaliseCanvas(size_x,size_y){
        let mainCanvas = document.getElementById("mainCanvas");
        mainCanvas.width = size_x;
        mainCanvas.height = size_y;
        return mainCanvas.getContext("2d");
}

let frame_counter  = 0;
function render(ctx,canvas,per_frame = 60){
        frame_counter++;
        if(frame_counter < per_frame-1){
                requestAnimationFrame(function(){render(ctx,canvas);});
                return;
        }
        console.log("Redraw");
        frame_counter = 0;
        //clear the canvas
        ctx.clearRect(0,0,canvas.width,canvas.height);
        //update the datastructure 
        World.world_step()
        //visulize the resutls        
        World.world_draw(ctx);
        requestAnimationFrame(function(){render(ctx,canvas);});
        return;
}

function wold_step(){

}
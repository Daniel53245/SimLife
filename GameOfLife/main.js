window.onload = main
const canvs_with = 1440;
const canvas_height = 900;

const World = {
        width: canvs_with,
        height: canvas_height,
        cells:Array.from({length: 1440}, () => Array(900).fill(0)),
        old_cells:Array.from({length: 1440}, () => Array(900).fill(0)),
        world_init: function(){
                //init the world
                for(let x = 0; x < this.width; x++){
                        for(let y = 0; y < this.height; y++){
                                this.cells[x][y] = Math.floor(Math.random() * 2);
                        }
                }
        },

        world_step: function() {
                // Create a copy of the current state to apply changes to
                let newCells = Array.from({ length: this.width }, () => Array(this.height).fill(0));
        
                for (let x = 0; x < this.width; x++) {
                    for (let y = 0; y < this.height; y++) {
                        let liveNeighbors = this.countLiveNeighbors(x, y);
        
                        if (this.cells[x][y] === 1) {
                            // Apply the rules for live cells
                            if (liveNeighbors < 2 || liveNeighbors > 3) {
                                newCells[x][y] = 0;
                            } else {
                                newCells[x][y] = 1;
                            }
                        } else {
                            // Apply the rules for dead cells
                            if (liveNeighbors === 3) {
                                newCells[x][y] = 1;
                            } else {
                                newCells[x][y] = 0;
                            }
                        }
                    }
                }
        
                // Update the cells with the new state
                this.old_cells = this.cells;
                this.cells = newCells;
            },
        countLiveNeighbors: function(x, y) {
                let count = 0;
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        if (dx === 0 && dy === 0) continue;
                        let nx = x + dx;
                        let ny = y + dy;
                        if (nx >= 0 && nx < this.width && ny >= 0 && ny < this.height) {
                            count += this.cells[nx][ny];
                        }
                    }
                }
                return count;
        },
        world_draw: function(ctx){
                //draw the world
                for(let x = 0; x < this.width; x++){
                        for(let y = 0; y < this.height; y++){
                                if(this.cells[x][y] == 1 && this.old_cells[x][y] == 0){
                                        ctx.fillStyle = "green";
                                        ctx.fillRect(x,y,1,1);
                                }
                                if(this.cells[x][y] == 0 && this.old_cells[x][y] == 1){
                                        ctx.clearRect(x,y,1,1);
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
function render(ctx,canvas,per_frame = 10){
        frame_counter++;
        if(frame_counter < per_frame-1){
                requestAnimationFrame(function(){render(ctx,canvas);});
                return;
        }
        console.log("Redraw");
        frame_counter = 0;
        //clear the canvas

        //update the datastructure 
        World.world_step()
        //visulize the resutls        
        World.world_draw(ctx);
        requestAnimationFrame(function(){render(ctx,canvas);});
        return;
}

function wold_step(){

}
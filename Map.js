export class GameMap {
    constructor(scene) {
        this.scene = scene;
        this.tileSize = 16; // Size of each tile in pixels
        this.walls = null;
        this.currentLayout = [];
        this.collectibles = null;
        this.totalCollectibles = 0;
        this.floorTiles = null;
    }

    // Preset map layouts
    static LAYOUTS = {
        LEVEL_1: [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,2,2,0,1,0,0,0,0,0,1,0,0,2,2,2,0,1,0,0,0,0,0,0,1,0,0,0,0,2,2,2,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,3,1],
        [1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,1,0,1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
        [1,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,0,2,2,2,0,0,1,0,1,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,1,0,1],
        [1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,0,0,1,1,1,1,1,0,0,1,1,1,1,1,0,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1],
        [1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1],
        [1,0,1,1,1,1,1,0,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,0,1],
        [1,0,2,2,0,0,1,0,1,2,1,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,2,0,0,0,1,0,1,0,0,0,0,0,0,0,2,0,0,2,0,0,2,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,1],
        [1,1,1,1,1,0,1,0,1,2,1,0,1,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,0,1,0,1,2,1],
        [1,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,1,0,0,1,0,0,0,1,2,1,0,1],
        [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,2,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,0,1,1,1,0,1,0,1],
        [1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,2,0,0,0,0,0,0,1,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,1],
        [1,0,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,0,1],
        [1,0,1,2,0,0,1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0,0,0,1,0,0,1,2,0,0,0,0,0,0,0,0,1,0,1],
        [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,2,2,2,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,1,2,0,1,0,0,0,0,0,0,0,0,0,0,2,1,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,2,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,0,0,0,1,0,1],
        [1,0,0,2,0,0,2,2,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,2,0,0,2,0,0,2,0,0,0,0,2,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,1,2,1],
        [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,0,1,1,0,1,0,1],
        [1,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,1,0,0,1,0,2,2,0,0,0,0,0,1,0,0,0,0,0,0,1,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,2,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1],
        [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1],
        [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,2,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1],
        [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,2,2,2,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,2,1],
        [1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,0,1,1,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,2,2,2,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,1],
        [1,0,0,0,0,0,2,2,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,2,0,1,0,0,0,2,2,0,0,0,1,0,0,0,0,0,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,2,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,2,0,0,0,0,1,0,0,0,0,0,1,0,1],
        [1,0,0,0,2,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,1,0,0,0,2,0,0,0,0,1,0,0,0,0,0,0,0,2,1,0,0,0,0,0,1,0,1],
        [1,0,0,0,0,0,0,2,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,2,2,1,0,0,0,0,0,1,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        ],
        LEVEL_2: [
            // Add more layouts as needed
        ]
    };

    preload() {
        // Load map tiles
        this.scene.load.image('wall', 'assets/wall.png');
        this.scene.load.image('floor', 'assets/floor.png');
        this.scene.load.image('fire', 'assets/fire.png');  // Add fire sprite
        this.scene.load.image('exit', 'assets/exit.png');  // Add exit sprite

    }

    create(layoutKey = 'LEVEL_1') {
        // Create physics group for walls
        this.walls = this.scene.physics.add.staticGroup();
        this.collectibles = this.scene.physics.add.staticGroup();
        this.floorTiles = this.scene.add.group(); //creates group for floor tiles
        this.totalCollectibles = 0;
        
        // Load the specified layout
        this.loadLayout(GameMap.LAYOUTS[layoutKey]);
        
        // Add collision between player and walls
        this.scene.physics.add.collider(this.scene.player.sprite, this.walls);
    }

    loadLayout(layout) {
        this.currentLayout = layout;
        
        // Clear existing walls if any
        if (this.walls) {
            this.walls.clear(true, true);
        }
        if (this.collectibles) {
            this.collectibles.clear(true, true);
        }

        layout.forEach((row, y) => {
            row.forEach((tile, x) => {
                const posX = x * this.tileSize + this.tileSize / 2;
                const posY = y * this.tileSize + this.tileSize / 2;
                
                // Always place floor first
                if (tile !== 1) {
                    const floorTile = this.scene.add.image(posX, posY, 'floor');
                    this.floorTiles.add(floorTile);
                }
                
                switch(tile) {
                    case 1: // Wall
                        this.walls.create(posX, posY, 'wall')
                            .setImmovable(true)
                            .setDepth(-1);
                        break;
                    case 2: // Collectible //const fire = ?
                        const fire = this.collectibles.create(posX, posY, 'fire')
                            .setScale(0.5)
                            .setDepth(0);
                        fire.setData('gridX', x); // Store grid position
                        fire.setData('gridY', y);
                        this.totalCollectibles++;
                        break;
                        // this.collectibles.create(posX, posY, 'fire')
                        //     .setScale(0.5); // Make fire smaller
                        // this.totalCollectibles++;
                        // break;
                    case 3: // Exit
                        this.exitTile = this.scene.add.image(posX, posY, 'exit').setDepth(0);
                        this.exitPos = { x: x, y: y };
                        break;
                }
            });
        });
    }

    isAtExit(player) {
    // Get the player's current tile position
    const playerTileX = Math.floor(player.sprite.x / this.tileSize);
    const playerTileY = Math.floor(player.sprite.y / this.tileSize);
    
    // Simply check if the player's current tile matches the exit tile position
    return playerTileX === this.exitPos.x && playerTileY === this.exitPos.y;
    }
}
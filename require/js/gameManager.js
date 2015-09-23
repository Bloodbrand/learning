define(["models", "sceneManager", "pathfinding", "underscore", "maps", "animate", "tween"],
    function(models, sceneManager, pathfinding, underscore, maps, animate, tween) {

    function makeSprite(text){
        //text = "h:" + text;
        var gyro = new THREE.Gyroscope(),
            sizeDivision = 80,
            font = "Trebuchet MS",
            size = 30,
            color = "#ffffff";

        font = size + "px " + font;
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        context.font = font;
        var metrics = context.measureText(text),
            textWidth = metrics.width;
        canvas.width = textWidth + 3;
        canvas.height = size + 3;

        context.font = font;
        context.fillStyle = color;
        context.fillText(text, 0, size);

        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;

        var spriteData = {c: canvas, t: texture, text: text};

        var planeMesh = new THREE.Mesh(
            new THREE.PlaneBufferGeometry (
                spriteData.c.width / sizeDivision,
                spriteData.c.height / sizeDivision),
            new THREE.MeshBasicMaterial({ map: spriteData.t, side: THREE.DoubleSide}));
        gyro.add(planeMesh);
        return gyro;
    }

    var gmPublic = {};

    gmPublic.startGame = function(){
        gmPublic.generateMap(maps.getMap());
        //pathfinding.start();
        gmPublic.spawnEnemy();
        //animate.Updater.addHandler(sceneManager.addRain());
        //animate.Updater.addHandler(sceneManager.addWater());
    };

    gmPublic.makeNode = function(row, num, tile){
        return{
            gVal: 0,
            hVal: undefined,
            fVal: undefined,
            id: _.uniqueId(),
            parentNode: undefined,
            row: row,
            col: num,
            mesh: models.returnTile(tile),
            sprite: undefined,
            tile: tile,
            setColor: function(color){
                this.mesh.material.color.setHex(color);
            },
            setScale: function(scale){
                this.mesh.scale.set(scale.x, scale.y, scale.z);
            }
            ,
            setSprite: function(text, h, f){
                var sprite = makeSprite(text);
                sprite.rotation.set(-Math.PI / 2, 0, 0);
                sprite.position.y += 0.4;
                this.sprite = sprite;
                this.mesh.add(sprite);
            }
            ,
            reset: function(){
                this.gVal = 0;
                this.hVal = undefined;
                this.fVal = undefined;
                this.parentNode = undefined;
            }
            ,
            populate: function(obj){
                sceneManager.add(obj, this.mesh);
            }
        }
    };

    gmPublic.generateMap = function(map){
        var holder = models.returnHolder(),
            tileWidth = models.get('tile', 'width'),
            tileLength = models.get('tile', 'length'),
            totalWidthOffset = tileWidth + map.tileInterval,
            totalHeightOffset = tileLength + map.tileInterval;

        for(var l = 0; l < map.length; l++){
            var row = [];

            for(var w = 0; w < map.width; w++){
                var tile;
                if(map.rows) tile = map.rows[l][w].tile;
                var node = this.makeNode(l, w, tile);
                node.mesh.node = node;

                node.mesh.position.setX(
                    -(map.width / 2) * totalWidthOffset +
                    w * tileWidth +
                    w * map.tileInterval +
                    totalWidthOffset / 2);

                node.mesh.position.setZ(
                    -(map.length / 2) * totalHeightOffset +
                    l * tileLength +
                    l * map.tileInterval +
                    totalHeightOffset / 2);

                //node.mesh.position.setY(_.random(-0.5, 0.5));

                pathfinding.addNode(node);
                row.push(node);
                sceneManager.nodeMeshes.push(node.mesh);
                holder.add(node.mesh);
            }
            pathfinding.rows.push(row);
        }

        _.each(map.obstacles, function (obs) {
            var obsNode = pathfinding.rows[obs.row][obs.col];
            obsNode.isObstacle = true;
            obsNode.populate(models.returnTree());
            pathfinding.addObstacle(obsNode);
        });

        sceneManager.mapHolder = holder;
        pathfinding.setStart(map.start);
        pathfinding.setEnd(map.end);
        sceneManager.add(holder);
    };

    gmPublic.rerollMap = function () {
        pathfinding.reset();
        pathfinding.rows = [];
        sceneManager.nodeMeshes = [];
        sceneManager.remove(sceneManager.mapHolder);
        this.generateMap();
    };

    gmPublic.spawnEnemy = function(){
        setInterval(function(){
            new Enemy({speed: 5.5});
        }, 100);
    };

    var Enemy = function(arg){
        /*TODO: optimize so start position doesn't get called every time, probably just make a class module*/

        var startPos = pathfinding.get("start").mesh.position;
        this.mesh = models.returnPlayer();
        this.mesh.position.setX(startPos.x);
        this.mesh.position.setZ(startPos.z);
        this.speed = arg.speed;
        var moveTween = new TWEEN.Tween( this.mesh.position),
            _this = this,
            path = pathfinding.start(pathfinding.get("start")),//pathfinding.get("path"),
            distance = path.length,
            baseTimePerTile = 5000,
            timeOfBirth = undefined,
            totalTime = (distance * baseTimePerTile) / this.speed,
            timePerTile = ((distance * baseTimePerTile) / this.speed) / distance;

        sceneManager.add(this.mesh);
        this.move = function(){
            var mesh = this.mesh, xPosArr = [], yPosArr = [], zPosArr = [];

            _.each(path, function(node){
                xPosArr.push(node.mesh.position.x);
                yPosArr.push(node.mesh.position.y + _this.mesh.height / 2 );
                zPosArr.push(node.mesh.position.z);
            });
            moveTween.to({ x: xPosArr, y: yPosArr, z: zPosArr }, totalTime);

            moveTween.onStart(function(){
                timeOfBirth = _.now();
            });

            moveTween.onComplete(function(){
                sceneManager.remove(mesh);
            });
            //moveTween.interpolation( TWEEN.Interpolation.Bezier );
            moveTween.start();
        };
        //console.log(this.move)
        this.move();

        this.stop = function(){
            tween.remove(moveTween);
        };

        this.reroute = function(){
            path = pathfinding.start(getCurrentNode());
            _this.move();
        };

        function getCurrentNode (){
            return path[Math.round((_.now() - timeOfBirth) / timePerTile)];
        }
    };

    return gmPublic;
});
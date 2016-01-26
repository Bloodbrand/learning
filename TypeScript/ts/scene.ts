interface ISceneFunction{
  (scene: string, loader: string): void;
}

class MainClass{
  static Scenes : Scene[] = [];
  static StartScene(i: number){
    MainClass.Scenes[i].Start();
  }
}

class Scene{
  private _onStartFunctions: ISceneFunction[] = [];
  private _assets: string[] = [];
  private _scene = undefined;
  private _loader = undefined;

  get OnStartFunctions(){ return this._onStartFunctions; };
  get Assets(){ return this._assets; }
  get Scene(){ return this._scene; }
  get Loader(){ return this._loader; }
  /*************************************/
  constructor(scene: string, loader: string){
    this._scene = scene;
    this._loader = loader;
    MainClass.Scenes.push(this);
  }
  /*************************************/
  Start(){
    //OnStartFunctions
    for(let i = 0; i < this._onStartFunctions.length; i++)
      this._onStartFunctions[i](this._scene, this._loader);
    //AddAssets
    for(let i = 0; i < this._assets.length; i++)
      console.log(this._loader + " loading " + this._assets[i]);
  }
  /*************************************/
  OnStart(fun: ISceneFunction){
    this._onStartFunctions.push(fun);
  }
  /*************************************/
  AddAsset(asset: string){ this._assets.push(asset); }
  /*************************************/
}
/*
var cardinal = new Scene("cardinal", "loader");
cardinal.OnStart((scene, loader) => {
    console.log(scene + " " + loader);
  }
);

cardinal.AddAsset("asset 1");
cardinal.AddAsset("asset 2");
cardinal.AddAsset("asset 3");

MainClass.StartScene(0);
*/

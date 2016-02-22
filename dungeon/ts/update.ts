interface IHandler{
  Update();
}

export class Update{
  private static handlers: IHandler[] = [];

  public static Add(handler: IHandler): void{
    this.handlers.push(handler);
  }

  public static Remove(handler: IHandler): void{
    let index = this.handlers.indexOf(handler);
    if(index > -1) this.handlers.splice(index, 1);
  }

  public static Tick(): void{
    for (let h = 0; h < this.handlers.length; h++)
      this.handlers[h].Update();
  }
}

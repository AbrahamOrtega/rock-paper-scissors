export default class Node {
  private data: { name: string; icon: string };
  private beats: Node[] | null;
  private loses: Node[] | null;

  /**
   * @constructor constructor de la clase
   * @param data {string} el dato que quieres que el nodo contenga
   */
  constructor(data: { name: string; icon: string }) {
    this.data = data;
    this.beats = null;
    this.loses = null;
  }

  public getBeast(): Node[] | null {
    return this.beats;
  }
  public getData(): { name: string; icon: string } {
    return this.data;
  }

  public getLoses(): Node[] | null {
    return this.loses;
  }

  public setBeast(beats: Node[]): void {
    this.beats = beats;
  }

  public setLoses(loses: Node[]): void {
    this.loses = loses;
  }

  public setName(data: { name: string; icon: string }): void {
    this.data = data;
  }
}

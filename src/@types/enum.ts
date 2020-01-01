declare module "enum" {
  export default class Enum<T = any> {
    public EVENTS: T[];
    constructor(map: T[], options?: string | {});
  }
}

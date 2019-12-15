import * as fs from "fs"
import * as path from "path";
import { IDisposable } from "./IDisposable"

class TempYaml implements IDisposable {
    
    fileName : string;
    dir : string;

    constructor(yaml: string) {
        this.dir = fs.mkdtempSync("sarooma");
        this.fileName = path.join(this.dir, "temp.yaml");
        fs.writeFileSync(this.fileName, yaml);
    }

    dispose() {
        fs.unlinkSync(this.fileName);
        fs.rmdirSync(this.dir);
    }
}

export default TempYaml;

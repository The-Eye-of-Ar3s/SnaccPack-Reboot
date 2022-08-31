import { DependencyContainer } from "tsyringe";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { VFS } from "@spt-aki/utils/VFS";
import path from "path";

class Mod implements IPostDBLoadMod
{
    // Code added here will load BEFORE the server has started loading
    postDBLoad(container: DependencyContainer): void
    {
        const JsonUtil = container.resolve<JsonUtil>("JsonUtil");
        const VFS = container.resolve<VFS>("VFS");
        const modPath = path.resolve(__dirname.toString()).split(path.sep).join("/")+"/";


        const item_object = JsonUtil.deserialize(VFS.readFile(`${modPath}/$../db/items/snaccPack.json`));
        console.log(item_object)
    }
}

module.exports = { mod: new Mod() }
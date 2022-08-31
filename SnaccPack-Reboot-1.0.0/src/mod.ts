import { DependencyContainer } from "tsyringe";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { VFS } from "@spt-aki/utils/VFS";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import path from "path";

class Mod implements IPostDBLoadMod
{
    private cfg = require("../config.json");
    
    postDBLoad(container: DependencyContainer): void
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const JsonUtil = container.resolve<JsonUtil>("JsonUtil");
        const VFS = container.resolve<VFS>("VFS");
        const modPath = path.resolve(__dirname.toString()).split(path.sep).join("/")+"/";


        const itemObject = JsonUtil.deserialize(VFS.readFile(`${modPath}../db/items/snaccPack.json`));
        db.templates.items[itemObject._id] = itemObject;

        const handbookItem = JsonUtil.deserialize(VFS.readFile(`${modPath}/../db/templates/handbook/snaccPack.json`));
        db.templates.handbook.Items.push(handbookItem)

        db.locales.global.en.templates["snaccPack"] = JsonUtil.deserialize(VFS.readFile(`${modPath}../db/locales/en/templates/snaccPack.json`));

        const ragfairItem = JsonUtil.deserialize(VFS.readFile(`${modPath}../db/assort/ragfair/items/snaccPack.json`));
        db.traders.ragfair.assort.items.push(ragfairItem);

        db.traders.ragfair.assort.loyal_level_items["snaccPack"] = JsonUtil.deserialize(VFS.readFile(`${modPath}../db/assort/ragfair/loyal_level_items/snaccPack.json`));
        db.traders.ragfair.assort.barter_scheme["snaccPack"] = JsonUtil.deserialize(VFS.readFile(`${modPath}../db/assort/ragfair/barter_scheme/snaccPack.json`));

        const traderItem = JsonUtil.deserialize(VFS.readFile(`${modPath}../db/assort/5c0647fdd443bc2504c2d371/items/snaccPack.json`));
        db.traders["5c0647fdd443bc2504c2d371"].assort.items.push(traderItem);
        
        db.traders["5c0647fdd443bc2504c2d371"].assort.loyal_level_items["snaccPack"] = JsonUtil.deserialize(VFS.readFile(`${modPath}../db/assort/5c0647fdd443bc2504c2d371/loyal_level_items/snaccPack.json`));
        db.traders["5c0647fdd443bc2504c2d371"].assort.barter_scheme["snaccPack"] = JsonUtil.deserialize(VFS.readFile(`${modPath}../db/assort/5c0647fdd443bc2504c2d371/barter_scheme/snaccPack.json`));

        db.templates.items["snaccPack"]._props.Grids[0]._props.cellsH = this.cfg["internalHeight"];
        db.templates.items["snaccPack"]._props.Grids[0]._props.cellsV = this.cfg["internalWidth"];

        ["544a11ac4bdc2d470e8b456a", "5857a8b324597729ab0a0e7d", "5857a8bc2459772bad15db29", "5c093ca986f7740a1867ab12"].forEach((id) =>
        {
            db.templates.items[id]._props.Grids[0]._props.filters[0].Filter.push("snaccPack")
        })
    }
}

module.exports = { mod: new Mod() }
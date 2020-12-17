/// <reference types="cookieclicker" />
export declare const customAchievements: Achievement[];
export declare class Achievement extends Game.Achievement {
    /**
     * Creates an achievement
     * @param name The name of the achievement
     * @param desc The description of it
     * @param icon  The icon for it
     */
    constructor(name: string, desc: string, icon: Game.Icon);
}
export declare class BankAchievement extends Achievement implements Game.BankAchievementClass {
    treshold: number;
    /**
     * Creates an achievement which is automatically unlocked on CBTA amount
     * @param name Name of the achievement
     * @param icon The icon of it
     * @param q The optional quote of it
     * @param treshold The amount of cookies required, if not set, automatically calculated
     */
    constructor(name: string, icon: Game.Icon, q?: string | null, treshold?: number);
}
export declare class CpsAchievement extends Achievement implements Game.CpsAchievementClass {
    treshold: number;
    /**
     * Creates an achievement which is automatically unlocked on CpS amount
     * @param name Name of the achievement
     * @param icon The icon of it
     * @param q The optional quote of it
     * @param treshold The amount of cookies per second required, if not set, automatically calculated
     */
    constructor(name: string, icon: Game.Icon, q?: string | null, treshold?: number);
}
export declare class TieredAchievement<Tier extends string | number> extends Achievement implements Game.TieredAchievementClass<Tier> {
    buildingTie: Game.Object;
    pool: "normal";
    tier: Tier;
    /**
     * Creates an achievement which is won by having an amount of buildings
     * @param name The name of it
     * @param quote The optional quote of it
     * @param tier The upgrade's tier, is the id of the tier, ex. `2`(Berrylium), `7`(Jetmint), etc. (Can be "cursor2" or "cursor50" for special cursor amounts)
     * @param building The buildings linked to this achievement
     */
    constructor(name: string, quote: string | null, building: Game.Object | string, tier: Tier | "cursor2" | "cursor50");
}
export declare class ProductionAchievement extends Achievement {
    /**
     * Creates a production achievement (Make \_ from only \_ achievements)
     * @param name Name of the achievement
     * @param building The building of the achivement
     * @param tier The tier of productivity, not the normal tier, fully works with only `1`, `2`, `3`, otherwise icon will be messed up.
     * @param quote The (optional) quote of it
     * @param mult The additional multiplier, should be used if the achievement is too easy to obtain
     */
    constructor(name: string, building: string | Game.Object, tier: number, quote?: string | null, mult?: number | null);
}

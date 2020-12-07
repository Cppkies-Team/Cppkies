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
     *
     * @param name
     * @param quote
     * @param tier The upgrade's tier, is the id of the tier, ex. `2`(Berrylium), `7`(Jetmint), etc.
     * @param building
     */
    constructor(name: string, quote: string | null, building: Game.Object | string, tier: Tier | "cursor2" | "cursor50");
}

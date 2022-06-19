# Effects

Cookie clicker has an amount of effects controlled by the `Game.effs` object, which is, in vanilla CC, only set by minigames.
Cppkies allows its users to control the effects and leverage it's power.

## Effect object

`Game.effs` has the following structure:

```ts
interface Effects {
	cps?: number
	click?: number
	cursorCps?: number
	grandmaCps?: number
	goldenCookieGain?: number
	goldenCookieFreq?: number
	goldenCookieDur?: number
	goldenCookieEffDur?: number
	wrathCookieGain?: number
	wrathCookieFreq?: number
	wrathCookieDur?: number
	wrathCookieEffDur?: number
	reindeerGain?: number
	reindeerFreq?: number
	reindeerDur?: number
	itemDrops?: number
	milk?: number
	wrinklerSpawn?: number
	wrinklerEat?: number
	upgradeCost?: number
	buildingCost?: number
}
```

## Cppkies usage

To controll the effects, the `effs` [hook](types/Hooks.md) must be used. For example:

```ts
import { hooks } from "cppkies"

hooks.on("effs", () => ({
	milk: 1.1,
}))
```

In the example above, the effect of milk is boosted by 10%.

It is also possible to observe the current effects when giving them.

```ts
hooks.on("effs", effs => ({
	upgradeCost: effs.buildingCost,
}))
```

The upgrade cost effect is multiplied by the current building cost effect.

> [!ATTENTION]
> The position of the hook in relation to other hook is volatile and will be affected by the mod load order.

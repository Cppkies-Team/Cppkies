# Hooks

Cppkies adds most of the custom APIs through hooks.

Cppkies creates the hooks by injecting code into functions.

Usually mods shouldn't use the hooks since most hooks are used for internal use in Cppkies.

## Hooks List

### Generic Hooks

- Menu hooks
  - `customMenu` - called when any menu is opened
  - `customOptionsMenu` - called when the options menu is opened
  - `customStatsMenu` - called when the stats menu is opened
  - `customInfoMenu` - called when the info menu is opened
- Data hooks
  - `customLoad` - called when a save is loaded
  - `customSave` - called when a save is saved
  - `customReset` - called when a save is wiped, first parameter is if the reset is hard.
- Buildings
  - `customGrandmaPic` - called when rendering grandmas, must return a link for an image
  - `postBuildStore` - called after `Game.BuildStore`

### Building Hooks

- `tooltip` - called on tooltip creation when hovering above a building

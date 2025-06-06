# Changelog

All notable changes to this project will be documented in this file.

## [v0.24.2](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.24.2)

> June 6, 2025

- **NormalMapPage**: adjust background color
- adjust canvas when image is smaller than viewport
- adjust background color calculation

## [v0.24.1](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.24.1)

> June 2, 2025

- **Select**: consume colors from tailwind
- **Modal**: remove will-change styles
- **AnimationPage**: disable onion when single sprite
- **Layout**: adjust center of the scale
- **Layout**: prevent Sidebar of being collapsed when no spritesheet
- **Layout**: update sidebarCollapsable name

## [v0.24.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.24.0)

> May 28, 2025

- **AnimationPage**: forward next and previous index callbacks
- **NormalMapPage**: rename SettingsItem component
- add missing hooks
- **NormalMapPage**: include all settings
- **HomePage**: validate settings
- **store**: encapsulate default settings
- **NormalMapPage**: adjust strength min and max
- **NormalMapPage**: add invertR and invertG parameters
- **Input**: forward checked attribute
- feat(Input) forward id attribute
- **Input**: add type checkbox
- **Input**: adjust padding for numbers
- **HomePage**: change name of NormalMap link

## [v0.23.2](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.23.2)

> May 26, 2025

- **NormalMapSlice**: adjust normal map calculation
- **UtilsSlice**: add isDirty method
- **store**: add minor adjustments

## [v0.23.1](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.23.1)

> May 26, 2025

- **HomePage**: calculate loss when new settings are entered
- **SpriteSheet**: remove background on export
- **Accordion**: scroll into view when item is expanded
- **HomePage**: prevent multiple sprite selection when no image

## [v0.23.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.23.0)

> May 26, 2025

- **HomePage**: add remove sprite sheet feature
- **AnimationPage**: add warning before deletion
- **HomePage**: add termination even when image has not been loaded
- move export zip feature to store
- **UtilsSlice**: rename it
- **Accordion**: add ability to collapse/expand by clicking on header
- **AnimatioPage**: move animations item to the top
- **AnimationPage**: merge fps and playing into single item
- **AnimationPage**: merge center and movements into single item
- **HomePage**: adjust order of items
- **Accordion**: add missing hooks
- **Typography**: add missing hooks

## [v0.22.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.22.0)

> May 24, 2025

- **HomePage**: add image name termination
- **HomePage**: remove name from the selector when empty
- **HomePage**: set the normal map section to be collapsed by default
- prevent user of editing the normal termination of the image
- adjust naming calculation
- **AnimationPage**: prevent showing empty title
- start using autoComplete attribute
- **Input**: start forwarding autoComplete attribute
- add missing name attributes
- **Select**: start forwarding name attribute
- **Input**: add placeholder styles
- adjust input name inputs
- **HomePage**: add ability to change sprite sheet image name
- **Input**: set min height to 42px
- **HomePage**: replace Reset by Clear
- **Icon**: add eraser variant
- **HomePage**: rename Configurations by Animations
- **HomePage**: export a zip instead of json

## [v0.21.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.21.0)

> May 24, 2025

- **NormalMapPage**: add ability to change the name
- **NormalMapSlice**: unify with settings
- **AnimationsSlice**: adjust setAnimations logic
- **SpriteSheetSlice**: unify with settings
- **importJSONFile**: move it to its own slice
- encapsulate scaling in one place
- align with the new destructuring style
- **store**: move imageData functions into a module

## [v0.20.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.20.0)

> May 21, 2025

- **HomePage**: import normal map stuffs
- **HomePage**: export normal map stuffs
- **HomePage**: add link to go to normal-map page
- **Icon**: add box variant
- **NormalMapPage**: add page
- **NormalMapSlice**: add slice
- **NormalMapSettingSlice**: add slice
- **SettingsSlice**: adjust logic to generate URL
- **SpriteSheetSlice**: move out some functions
- **HomePage**: add instruction to reset zoom
- **AnimationPage**: add instruction to reset zoom
- **AnimationPage**: add missing name attribute
- **HomePage**: adjust settings item
- **HomePage**: add missing hook
- **Divisor**: add missing hook
- remove uneeded libraries
- **Layout**: prevent displaying instructions button when no instructions

## [v0.19.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.19.0)

> May 20, 2025

- **SettingsSlice**: extends validations before importing file
- **AnimationPage**: separate movements into its component
- **Layout**: remove instructions for Tablet
- **Layout**: make side bar to collapse/expand
- **Layout**: move it to fragments
- **Accordion**: adjust arrow icon size

## [v0.18.2](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.18.2)

> May 18, 2025

- **InstructionsButton**: replace Alt by Opt whe is MacOS
- **isMacOS**: add utility
- **SpriteSheetSlice**: stop sending alert when new image loaded
- **AnimationPage**: adjust instructions keys

## [v0.18.1](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.18.1)

> May 18, 2025

- **InstructionsButton**: escape markdown and adjust order of keys

## [v0.18.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.18.0)

> May 18, 2025

- **Modal**: adjust padding when header or footer are not present
- **AnimationPage**: escape markdown for instructions
- **NotificationHandler**: move responsability to the slice
- forward rest parameters
- **useKeyDown**: prevent executing when notification is open
- **store**: add error handler
- **store**: perform some validations
- include settings within the exported file
- start using Markdown
- **Accordion**: adjust import path
- **getErrorMessage**: add utility
- stop using Toast in favor of Modal
- **Modal**: add footer support

## [v0.17.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.17.0)

> May 12, 2025

- **Modal**: adjust styles
- **HomePage**: add zoom
- **Typography**: remove hook
- adjust conditions
- bump dependencies
- **AnimationPage**: add instructions
- **HomePage**: add instructions modal
- **InstructionsButton**: add fragment
- **Icon**: add spaceBar variant
- **Icon**: add interrogation variant
- **Divisor**: add component
- **Typography**: add h3 variant
- **Modal**: add component
- **Icon**: add close variant
- **AnimationPage**: re-sort sidebar items
- **useKeyDown**: remove uneeded options
- **Accordion**: forward heading component
- **SideBar**: adjust types
- **HomePage**: stop hovering sprite when cursor leaves
- **AnimationsSlice**: adjust default playing state

## [v0.16.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.16.0)

> May 9, 2025

- bump library dependencies
- **Accordion**: adjust styles
- **AnimationPage**: move hooks to the corresponding components
- **HomePage**: add sprite hovering
- **HomePage**: rename properties
- **AnimationsSlice**: set a dynamic name when creating it
- sort animations by number
- **HomePage**: move hooks to the corresponding components
- **useKeyDown**: add hook
- **SettingsSlice**: set initial values to 0
- **Select**: adjust styles for disabled status
- **Icon**: forward style property
- support multiple notification types
- add all tailwind colors
- **SideBar**: adjust id
- **Icon**: add success variant
- **Icon**: add warning variant
- **Icon**: add info variant
- **Icon**: add error variant
- expose Animation type instead of Animations

## [v0.15.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.15.0)

> April 30, 2025

- **AnimationsSlice**: delete animations when a sprite is missing
- **HomePage**: add split sprites feature
- **Icon**: add split variant

## [v0.14.3](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.14.3)

> April 29, 2025

- bump dependencies

## [v0.14.2](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.14.2)

> April 6, 2025

- **\_app**: adjust icon
- **README.md**: update file
- bump dependencies

## [v0.14.1](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.14.1)

> March 23, 2025

- add favicon.ico

## [v0.14.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.14.0)

> March 22, 2025

- **HomePage**: start dispatching errors
- **AppPage**: add ErrorHandler component
- **ErrorSlice**: add slice

## [v0.13.2](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.13.2)

> March 22, 2025

- **HomePage**: remove merge loading status
- **SpriteSelectionSlice**: unselect all sprites on animations length change
- **AnimationPage**: reset sprite index on animation change
- bump dependencies

## [v0.13.1](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.13.1)

> March 22, 2025

- **AnimationPage**: reset sprite index on animation change
- make SpriteSheet a server slice
- **AnimationSlice**: make methods sync
- move sprite selection to store

## [v0.13.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.13.0)

> March 21, 2025

- **AnimationPage**: rename some properties
- **AnimationPage**: add ability to reset center using keyboard
- **AnimationPage**: add ability to enable fps using keyboard
- **AnimationPage**: add ability to enable zoom using keyboard
- **AnimationPage**: add ability to enable onion using keyboard
- **AnimationPage**: add ability to play and stop animation using keyboard
- **HomePage**: adjust useCallback type
- **HomePage**: add ability to merge sprites selection using keyboard
- **HomePage**: add ability to reset sprite selection using keyboard
- **HomePage**: add ability to create animation using keyboard
- **HomePage**: add ability to export file using keyboard
- **HomePage**: add ability to import file using keyboard

## [v0.12.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.12.0)

> March 20, 2025

- **AnimationPage**: add ability to move across sprites with keyboard
- add favicon
- **AnimationPage**: put the onion layer in front current sprite
- **useLoadImage**: start using the hook
- **Typography**: adjust logic
- bump dependencies

## [v0.11.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.11.0)

> March 14, 2025

- **AppPage**: style mobile version
- **HomePage**: include version in the json
- **HomePage**: remove animationSelectorDisabled property
- **AnimationPage**: add animation selector
- **HomePage**: add merge feature
- **HomePage**: set spriteSheet when importing the json file
- **AnimationSlice**: update animations on sprites change event
- **Carousel**: remove component
- **SpriteSheetSlice**: remove resetSpriteSheet method
- **Select**: adjust styles
- **SpriteSheetSlice**: represent slices as records instead of array
- **SetValue**: stop using it in favor of React.SetStateAction
- **SpriteSheetSlice**: create sheet object
- **HomePage**: rename some properties

## [v0.10.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.10.0)

> March 14, 2025

- **HomePage**: adjust select to show image name
- **Icon**: add merge variant
- **AnimationPage**: add onion feature
- **Icon**: add stack variant
- **SpriteSheetSlice**: remove background
- **Accordion**: change imports
- **HomePage**: set custom style for safari
- **Select**: add arrow

## [v0.9.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.9.0)

> March 13, 2025

- **HomePage**: add settings section
- **Accordion**: add defaultCollapsed property
- **Input**: add placeholder, step and name properties
- **Icon**: add refresh variant
- **SpriteSheetSlice**: add setSettings method
- **loadImage**: make method to receive signal
- **AnimationPage**: add ability to delete animation
- **AnimationSlice**: add delete method
- **Icon**: add trash variant

## [v0.8.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.8.0)

> March 13, 2025

- rename properties
- **AnimationPage**: improve layout and styles
- **HomePage**: improve layout and styles
- **useDimensions**: add utility
- **Accordion**: add component
- **Input**: adjust styles
- **Button**: adjust styles
- **Select**: adjust styles
- **Icon**: add arrowUp variant
- **Icon**: add arrowDown variant
- **AppPage**: readjust the layout
- **SideBar**: add fragment
- **Typography**: add component
- bump dependencies
- **Carousel**: adjust props definition

## [v0.7.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.7.0)

> March 10, 2025

- **README.md**: update file
- **AnimationPage**: add ability to reset animation offset
- **AnimationSlice**: add resetAnimationOffset method
- **AnimationPage**: rename reset by reset zoom
- **AnimationPage**: add ability to set offset with keyboard
- **Input**: set hover and focus styles for color variant
- **AnimationSlice**: add setAnimationOffset method
- **SpriteAnimator**: fix center
- **SpriteSheetSlice**: set background color as rgb
- bump dependencies

## [v0.6.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.6.0)

> March 9, 2025

- **AnimationPage**: handle color property
- **AnimationSlice**: add color property
- move color into the slice
- **AnimationPage**: adjust styles
- **Input**: handle color type
- **Select**: adjust styles
- **HomePage**: add ability to import json
- **AnimationsSlice**: add setAnimations method
- keep animation scale
- **AnimationPage**: draw center
- **SpriteSheetSlice**: improve the way sprites are calculated
- enable imageSmoothingQuality property
- **AnimationPage**: improve sprites calculation
- **HomePage**: add export feature
- **SpriteSheetSlice**: add name property
- start using useDevicePixelRatio hook
- **useDevicePixelRatio**: add utility
- **AnimationPage**: adjust tool bar styles
- **HomePage**: set devicePixelRatio as default scale
- **HomePage**: add ability to drag and select
- **HomePage**: adjust tool bar styles
- **AnimationPage**: set minimum scale

## [v0.5.1](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.5.1)

> March 8, 2025

- define types for useCallback and useMemo
- bump dependencies
- **AnimationPage**: stop listening for keys

## [v0.5.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.5.0)

> March 8, 2025

- **AnimationsSlice**: reset when new sprite sheet is loaded
- add fps into the animation
- add scale into the animation
- **Input**: add number variant
- **Icon**: add plus variant
- **Icon**: add minus variant
- **Carousel**: adjust page calculation
- disabled imageSmoothing feature
- **store**: split slices

## [v0.4.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.4.0)

> March 6, 2025

- **AnimationPage**: add page
- **Icon**: add home variant
- **README.md**: update file

## [v0.3.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.3.0)

> March 6, 2025

- **Carousel**: add arrows
- **Icon**: move some properties into the hook
- **Icon**: add arrowRight variant
- **Icon**: add arrowLeft variant
- **Button**: add raw variant
- **HomePage**: add animation selector
- **Select**: add component
- **Input**: adjust styles
- **Button**: addjust styles
- **HomePage**: add export method
- **Icon**: stop applying spinning behavior to the spinner
- **Icon**: add downloadFile variant

## [v0.2.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.2.0)

> March 5, 2025

- **HomePage**: add ability to unselect sprites
- **Carousel**: add component
- **SpriteSheetSlice**: add unselectAll method
- **SpriteSheetSlice**: add setAnimationName method
- use loadImage instead of getImageData
- **HomePage**: add comments
- **SetValue**: add utility
- **Input**: add component
- **Icon**: add reset variant
- **Icon**: add zoomOut variant
- **Icon**: add zoomIn variant
- **Icon**: add forward variant
- **Icon**: add backward variant
- **Icon**: add pause variant
- **Icon**: add play variant
- **Icon**: rename play by roundedPlay
- **store**: expose animations property
- **HomePage**: add mobile support
- **useViewport**: add utility
- **HomePage**: redirect user to animation page
- **AppPage**: add page
- **SpriteSheetSlice**: add background color

## [v0.1.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.1.0)

> March 4, 2025

- **HomePage**: add page
- **SpriteSheetSlice**: add slice
- **store**: add template
- **getImageData**: add utils
- **Button**: add secondary variant
- **Button**: add component
- **Icon**: add play variant
- **Icon**: add uploadFile variant
- **Icon**: add component
- setup project

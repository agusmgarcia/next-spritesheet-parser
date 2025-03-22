# Changelog

All notable changes to this project will be documented in this file.

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

# Changelog

All notable changes to this project will be documented in this file.

## [v0.26.2](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.26.2)

> August 9, 2025

### Fixes 🎯

- **AnimationPage**: pause animation when go to first or last frame

### Chores ⚙️

- bump dependencies

## [v0.26.1](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.26.1)

> August 4, 2025

### Fixes 🎯

- adjust normal map image when exporting

## [v0.26.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.26.0)

> August 4, 2025

### Features ✅

- **Divisor**: add className property
- **AnimationPage**: add ability to the center to be visible or hidden
- **Icon**: add eyeClosed variant
- **Icon**: add eye variant
- **AnimationPage**: collapse center item when animation is being played
- **AnimationPage**: move playing section after configurations item
- **AnimationPage**: automatically play the animation
- **AnimationPage**: add ability to go to the first and last sprite
- **Icon**: add forwardFast variant
- **Icon**: add backwardFast variant
- **HomePage**: remove minArea and maxArea props

### Fixes 🎯

- **AnimationPage**: reset index when animation changes
- **NormalMapPage**: adjust max strength to 10
- **AnimationPage**: disabled all the playing section when single sprite
- **ZoomItem**: sort buttons
- modify the key that makes sidebar collapse and expand

### Chores ⚙️

- **store**: sort methods of slices
- **SpriteSheetSlice**: store x and y instead of boundaries
- **Markdown**: add missing types
- **AnimationPage**: rename properties
- **AnimationsSlice**: invert y
- **AnimationsSlice**: rename offset by center
- set missing aria-labels
- move sidebar width into a constant
- **README.md**: update file
- **store**: use classes instead of functions
- bump depdendencies

## [v0.25.5](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.25.5)

> July 26, 2025

### Chores ⚙️

- bump dependencies

## [v0.25.4](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.25.4)

> July 1, 2025

### Fixes 🎯

- **Input**: adjust range styles

## [v0.25.3](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.25.3)

> June 29, 2025

### Chores ⚙️

- bump package dependencies

## [v0.25.2](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.25.2)

> June 29, 2025

### Chores ⚙️

- start using react-essentials

## [v0.25.1](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.25.1)

> June 14, 2025

### Fixes 🎯

- **Divisor**: adjust height

## [v0.25.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.25.0)

> June 14, 2025

### Features ✅

- add key to collapse and expand the sidebar
- **HomePage**: add min/max area settings
- start using workers
- **Input**: forward onMouseUp
- **Input**: add range type

### Fixes 🎯

- **SpriteSheetSlice**: include alpha in background
- **NormalMapPage**: adjust initial settings
- **Accordion**: trigger defaultCollapsed on disabled state
- **HomePage**: rollback settings change on cancel
- **SpriteSheetSlice**: store it without background
- **Input**: adjust styles for checkbox
- **NormalMapPage**: add max strength
- **HomePage**: add max delta

### Chores ⚙️

- adjust some styles
- **Icon**: stop using refresh variant
- **NormalMapPage**: use ranges instead of number
- **HomePage**: use ranges instead of number
- **store**: stop using React.SetStateAction when no needed
- **AnimationSlice**: move offset to its object
- update dependencies

## [v0.24.4](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.24.4)

> June 11, 2025

### Fixes 🎯

- **AnimationPage**: replace center icon
- **HomePage**: disabled items when no sprite sheet image
- **Button**: add text-black for raw variant

### Chores ⚙️

- **Icon**: add center variant
- **Accordion**: add disabled property to items

## [v0.24.3](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.24.3)

> June 11, 2025

### Fixes 🎯

- **HomePage**: reset sprite selection

### Chores ⚙️

- update dependencies

## [v0.24.2](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.24.2)

> June 6, 2025

### Fixes 🎯

- **NormalMapPage**: adjust background color
- adjust canvas when image is smaller than viewport
- adjust background color calculation

## [v0.24.1](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.24.1)

> June 2, 2025

### Fixes 🎯

- **Select**: consume colors from tailwind
- **Modal**: remove will-change styles
- **AnimationPage**: disable onion when single sprite
- **Layout**: adjust center of the scale
- **Layout**: prevent Sidebar of being collapsed when no spritesheet

### Chores ⚙️

- **Layout**: update sidebarCollapsable name

## [v0.24.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.24.0)

> May 28, 2025

### Features ✅

- **HomePage**: validate settings
- **NormalMapPage**: adjust strength min and max
- **NormalMapPage**: add invertR and invertG parameters
- **Input**: forward checked attribute
- **Input**: add type checkbox

### Fixes 🎯

- **NormalMapPage**: include all settings
- **Input**: adjust padding for numbers
- **HomePage**: change name of NormalMap link

### Chores ⚙️

- **AnimationPage**: forward next and previous index callbacks
- **NormalMapPage**: rename SettingsItem component
- add missing hooks
- **store**: encapsulate default settings
- feat(Input) forward id attribute

## [v0.23.2](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.23.2)

> May 26, 2025

### Fixes 🎯

- **NormalMapSlice**: adjust normal map calculation

### Chores ⚙️

- **UtilsSlice**: add isDirty method
- **store**: add minor adjustments

## [v0.23.1](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.23.1)

> May 26, 2025

### Fixes 🎯

- **HomePage**: calculate loss when new settings are entered
- **SpriteSheet**: remove background on export
- **Accordion**: scroll into view when item is expanded
- **HomePage**: prevent multiple sprite selection when no image

## [v0.23.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.23.0)

> May 26, 2025

### Features ✅

- **HomePage**: add remove sprite sheet feature

### Fixes 🎯

- **AnimationPage**: add warning before deletion
- **HomePage**: add termination even when image has not been loaded
- **Accordion**: add ability to collapse/expand by clicking on header
- **AnimatioPage**: move animations item to the top
- **AnimationPage**: merge fps and playing into single item
- **AnimationPage**: merge center and movements into single item
- **HomePage**: adjust order of items

### Chores ⚙️

- move export zip feature to store
- **UtilsSlice**: rename it
- **Accordion**: add missing hooks
- **Typography**: add missing hooks

## [v0.22.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.22.0)

> May 24, 2025

### Features ✅

- **HomePage**: add image name termination
- **HomePage**: add ability to change sprite sheet image name
- **Icon**: add eraser variant
- **HomePage**: export a zip instead of json

### Fixes 🎯

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
- **Input**: set min height to 42px
- **HomePage**: replace Reset by Clear
- **HomePage**: rename Configurations by Animations

## [v0.21.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.21.0)

> May 24, 2025

### Features ✅

- **NormalMapPage**: add ability to change the name

### Chores ⚙️

- **NormalMapSlice**: unify with settings
- **AnimationsSlice**: adjust setAnimations logic
- **SpriteSheetSlice**: unify with settings
- **importJSONFile**: move it to its own slice
- encapsulate scaling in one place
- align with the new destructuring style
- **store**: move imageData functions into a module

## [v0.20.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.20.0)

> May 21, 2025

### Features ✅

- **HomePage**: import normal map stuffs
- **HomePage**: export normal map stuffs
- **HomePage**: add link to go to normal-map page
- **Icon**: add box variant
- **NormalMapPage**: add page

### Fixes 🎯

- **HomePage**: add instruction to reset zoom
- **AnimationPage**: add instruction to reset zoom
- **AnimationPage**: add missing name attribute
- **HomePage**: adjust settings item
- **Layout**: prevent displaying instructions button when no instructions

### Chores ⚙️

- **NormalMapSlice**: add slice
- **NormalMapSettingSlice**: add slice
- **SettingsSlice**: adjust logic to generate URL
- **SpriteSheetSlice**: move out some functions
- **HomePage**: add missing hook
- **Divisor**: add missing hook
- remove uneeded libraries

## [v0.19.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.19.0)

> May 20, 2025

### Features ✅

- **SettingsSlice**: extends validations before importing file
- **AnimationPage**: separate movements into its component
- **Layout**: make side bar to collapse/expand

### Fixes 🎯

- **Layout**: remove instructions for Tablet
- **Accordion**: adjust arrow icon size

### Chores ⚙️

- **Layout**: move it to fragments

## [v0.18.2](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.18.2)

> May 18, 2025

### Fixes 🎯

- **InstructionsButton**: replace Alt by Opt whe is MacOS
- **SpriteSheetSlice**: stop sending alert when new image loaded
- **AnimationPage**: adjust instructions keys

### Chores ⚙️

- **isMacOS**: add utility

## [v0.18.1](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.18.1)

> May 18, 2025

### Fixes 🎯

- **InstructionsButton**: escape markdown and adjust order of keys

## [v0.18.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.18.0)

> May 18, 2025

### Features ✅

- start using Markdown
- **Modal**: add footer support

### Fixes 🎯

- **Modal**: adjust padding when header or footer are not present
- **AnimationPage**: escape markdown for instructions
- **NotificationHandler**: move responsability to the slice
- **useKeyDown**: prevent executing when notification is open
- **store**: perform some validations
- include settings within the exported file

### Chores ⚙️

- forward rest parameters
- **store**: add error handler
- **Accordion**: adjust import path
- **getErrorMessage**: add utility
- stop using Toast in favor of Modal

## [v0.17.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.17.0)

> May 12, 2025

### Features ✅

- **HomePage**: add zoom
- **AnimationPage**: add instructions
- **HomePage**: add instructions modal
- **InstructionsButton**: add fragment
- **Icon**: add spaceBar variant
- **Icon**: add interrogation variant
- **Divisor**: add component
- **Typography**: add h3 variant
- **Modal**: add component
- **Icon**: add close variant

### Fixes 🎯

- **Modal**: adjust styles
- **AnimationPage**: re-sort sidebar items
- **useKeyDown**: remove uneeded options
- **HomePage**: stop hovering sprite when cursor leaves
- **AnimationsSlice**: adjust default playing state

### Chores ⚙️

- **Typography**: remove hook
- adjust conditions
- bump dependencies
- **Accordion**: forward heading component
- **SideBar**: adjust types

## [v0.16.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.16.0)

> May 9, 2025

### Features ✅

- **HomePage**: add sprite hovering
- **AnimationsSlice**: set a dynamic name when creating it
- **Icon**: add success variant
- **Icon**: add warning variant
- **Icon**: add info variant
- **Icon**: add error variant

### Fixes 🎯

- **Accordion**: adjust styles
- sort animations by number
- **SettingsSlice**: set initial values to 0
- **Select**: adjust styles for disabled status

### Chores ⚙️

- bump library dependencies
- **AnimationPage**: move hooks to the corresponding components
- **HomePage**: rename properties
- **HomePage**: move hooks to the corresponding components
- **useKeyDown**: add hook
- **Icon**: forward style property
- support multiple notification types
- add all tailwind colors
- **SideBar**: adjust id
- expose Animation type instead of Animations

## [v0.15.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.15.0)

> April 30, 2025

### Features ✅

- **HomePage**: add split sprites feature
- **Icon**: add split variant

### Fixes 🎯

- **AnimationsSlice**: delete animations when a sprite is missing

## [v0.14.3](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.14.3)

> April 29, 2025

### Chores ⚙️

- bump dependencies

## [v0.14.2](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.14.2)

> April 6, 2025

### Fixes 🎯

- **\_app**: adjust icon

### Chores ⚙️

- **README.md**: update file
- bump dependencies

## [v0.14.1](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.14.1)

> March 23, 2025

### Fixes 🎯

- add favicon.ico

## [v0.14.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.14.0)

> March 22, 2025

### Features ✅

- **HomePage**: start dispatching errors
- **AppPage**: add ErrorHandler component
- **ErrorSlice**: add slice

## [v0.13.2](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.13.2)

> March 22, 2025

### Fixes 🎯

- **HomePage**: remove merge loading status
- **SpriteSelectionSlice**: unselect all sprites on animations length change
- **AnimationPage**: reset sprite index on animation change

### Chores ⚙️

- bump dependencies

## [v0.13.1](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.13.1)

> March 22, 2025

### Fixes 🎯

- **AnimationPage**: reset sprite index on animation change

### Chores ⚙️

- make SpriteSheet a server slice
- **AnimationSlice**: make methods sync
- move sprite selection to store

## [v0.13.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.13.0)

> March 21, 2025

### Features ✅

- **AnimationPage**: add ability to reset center using keyboard
- **AnimationPage**: add ability to enable fps using keyboard
- **AnimationPage**: add ability to enable zoom using keyboard
- **AnimationPage**: add ability to enable onion using keyboard
- **AnimationPage**: add ability to play and stop animation using keyboard
- **HomePage**: add ability to merge sprites selection using keyboard
- **HomePage**: add ability to reset sprite selection using keyboard
- **HomePage**: add ability to create animation using keyboard
- **HomePage**: add ability to export file using keyboard
- **HomePage**: add ability to import file using keyboard

### Chores ⚙️

- **AnimationPage**: rename some properties
- **HomePage**: adjust useCallback type

## [v0.12.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.12.0)

> March 20, 2025

### Features ✅

- **AnimationPage**: add ability to move across sprites with keyboard
- add favicon

### Fixes 🎯

- **AnimationPage**: put the onion layer in front current sprite

### Chores ⚙️

- **useLoadImage**: start using the hook
- **Typography**: adjust logic
- bump dependencies

## [v0.11.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.11.0)

> March 14, 2025

### Features ✅

- **HomePage**: include version in the json
- **AnimationPage**: add animation selector
- **HomePage**: add merge feature

### Fixes 🎯

- **AppPage**: style mobile version
- **HomePage**: set spriteSheet when importing the json file
- **AnimationSlice**: update animations on sprites change event
- **Select**: adjust styles

### Chores ⚙️

- **HomePage**: remove animationSelectorDisabled property
- **Carousel**: remove component
- **SpriteSheetSlice**: remove resetSpriteSheet method
- **SpriteSheetSlice**: represent slices as records instead of array
- **SetValue**: stop using it in favor of React.SetStateAction
- **SpriteSheetSlice**: create sheet object
- **HomePage**: rename some properties

## [v0.10.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.10.0)

> March 14, 2025

### Features ✅

- **Icon**: add merge variant
- **AnimationPage**: add onion feature
- **Icon**: add stack variant
- **SpriteSheetSlice**: remove background

### Fixes 🎯

- **HomePage**: adjust select to show image name
- **HomePage**: set custom style for safari
- **Select**: add arrow

### Chores ⚙️

- **Accordion**: change imports

## [v0.9.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.9.0)

> March 13, 2025

### Features ✅

- **HomePage**: add settings section
- **Accordion**: add defaultCollapsed property
- **Input**: add placeholder, step and name properties
- **Icon**: add refresh variant
- **SpriteSheetSlice**: add setSettings method
- **AnimationPage**: add ability to delete animation
- **AnimationSlice**: add delete method
- **Icon**: add trash variant

### Fixes 🎯

- **loadImage**: make method to receive signal

## [v0.8.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.8.0)

> March 13, 2025

### Features ✅

- **useDimensions**: add utility
- **Accordion**: add component
- **Icon**: add arrowUp variant
- **Icon**: add arrowDown variant
- **AppPage**: readjust the layout
- **SideBar**: add fragment
- **Typography**: add component

### Fixes 🎯

- **Input**: adjust styles
- **Button**: adjust styles
- **Select**: adjust styles

### Chores ⚙️

- rename properties
- **AnimationPage**: improve layout and styles
- **HomePage**: improve layout and styles
- bump dependencies
- **Carousel**: adjust props definition

## [v0.7.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.7.0)

> March 10, 2025

### Features ✅

- **AnimationPage**: add ability to reset animation offset
- **AnimationSlice**: add resetAnimationOffset method
- **AnimationPage**: add ability to set offset with keyboard
- **AnimationSlice**: add setAnimationOffset method
- **SpriteAnimator**: fix center

### Fixes 🎯

- **Input**: set hover and focus styles for color variant
- **SpriteSheetSlice**: set background color as rgb

### Chores ⚙️

- **README.md**: update file
- **AnimationPage**: rename reset by reset zoom
- bump dependencies

## [v0.6.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.6.0)

> March 9, 2025

### Features ✅

- **AnimationPage**: handle color property
- **AnimationSlice**: add color property
- **Input**: handle color type
- **HomePage**: add ability to import json
- **AnimationsSlice**: add setAnimations method
- **AnimationPage**: draw center
- enable imageSmoothingQuality property
- **HomePage**: add export feature
- **SpriteSheetSlice**: add name property
- **useDevicePixelRatio**: add utility
- **HomePage**: set devicePixelRatio as default scale
- **HomePage**: add ability to drag and select

### Fixes 🎯

- **AnimationPage**: adjust styles
- **Select**: adjust styles
- keep animation scale
- **SpriteSheetSlice**: improve the way sprites are calculated
- **AnimationPage**: adjust tool bar styles
- **HomePage**: adjust tool bar styles
- **AnimationPage**: set minimum scale

### Chores ⚙️

- move color into the slice
- **AnimationPage**: improve sprites calculation
- start using useDevicePixelRatio hook

## [v0.5.1](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.5.1)

> March 8, 2025

### Fixes 🎯

- **AnimationPage**: stop listening for keys

### Chores ⚙️

- define types for useCallback and useMemo
- bump dependencies

## [v0.5.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.5.0)

> March 8, 2025

### Features ✅

- add fps into the animation
- add scale into the animation
- **Input**: add number variant
- **Icon**: add plus variant
- **Icon**: add minus variant
- disabled imageSmoothing feature

### Fixes 🎯

- **AnimationsSlice**: reset when new sprite sheet is loaded
- **Carousel**: adjust page calculation

### Chores ⚙️

- **store**: split slices

## [v0.4.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.4.0)

> March 6, 2025

### Features ✅

- **AnimationPage**: add page
- **Icon**: add home variant

### Chores ⚙️

- **README.md**: update file

## [v0.3.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.3.0)

> March 6, 2025

### Features ✅

- **Carousel**: add arrows
- **Icon**: add arrowRight variant
- **Icon**: add arrowLeft variant
- **Button**: add raw variant
- **HomePage**: add animation selector
- **Select**: add component
- **HomePage**: add export method
- **Icon**: add downloadFile variant

### Fixes 🎯

- **Input**: adjust styles
- **Button**: addjust styles
- **Icon**: stop applying spinning behavior to the spinner

### Chores ⚙️

- **Icon**: move some properties into the hook

## [v0.2.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.2.0)

> March 5, 2025

### Features ✅

- **HomePage**: add ability to unselect sprites
- **Carousel**: add component
- **SpriteSheetSlice**: add unselectAll method
- **SpriteSheetSlice**: add setAnimationName method
- **SetValue**: add utility
- **Input**: add component
- **Icon**: add reset variant
- **Icon**: add zoomOut variant
- **Icon**: add zoomIn variant
- **Icon**: add forward variant
- **Icon**: add backward variant
- **Icon**: add pause variant
- **Icon**: add play variant
- **store**: expose animations property
- **HomePage**: add mobile support
- **useViewport**: add utility
- **HomePage**: redirect user to animation page
- **AppPage**: add page
- **SpriteSheetSlice**: add background color

### Fixes 🎯

- **Icon**: rename play by roundedPlay

### Chores ⚙️

- use loadImage instead of getImageData
- **HomePage**: add comments

## [v0.1.0](https://github.com/agusmgarcia/next-spritesheet-parser/tree/v0.1.0)

> March 4, 2025

### Features ✅

- **HomePage**: add page
- **SpriteSheetSlice**: add slice
- **store**: add template
- **getImageData**: add utils
- **Button**: add secondary variant
- **Button**: add component
- **Icon**: add play variant
- **Icon**: add uploadFile variant
- **Icon**: add component

### Chores ⚙️

- setup project

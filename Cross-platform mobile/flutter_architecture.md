## Why Flutter use Dart:

<img src="/assets/images/flutter/compilation_execution_overview.jpg"/>

<img src="/assets/images/flutter/compilation_execution_in_Dart.jpg"/>

## :zzz: System Architecture:

<img src="https://elevatex.de/wp-content/uploads/2019/04/Flutter-System-Architecture.png.webp"/>

Widgets can be themed to look like native Android (Material) or iOS (Cupertino) UI components.

Widgets are rendered onto a Skia canvas with support for advanced animations and gesture recognition.

#### Flutter's engine:

... hosts the core technologies:
- Skia (2D graphics rendering library)
- Dart language VM in a **platform-specific shell** (any shell implements the respective platform APIs and handles the system’s application lifecycle events)

:dolphin: Using the Dart language allows Flutter to **compile the source code ahead-of-time to ==native code==**.

The engine’s C/C++code is compiled with Android’s NDK or iOS’ LLVM. Both pieces are wrapped in a “runner” Android and iOS project, resulting in an `apk` or `ipa` file respectively. :bouquet::bouquet::bouquet:

On app launch, any rendering, input, or event is delegated to the compiled Flutter engine and app code.

#### :jack_o_lantern: ...benefits of compilation to native code

Fast startup and execution of an app are the benefits of compilation to native code. The UI is refreshed at 60fps – mostly using the GPU –  and every pixel on the screen is owned by the Skia canvas which leads to a smooth, highly customizable UI.


### References:

- [1] https://elevatex.de/blog/it-insights/how-flutter-works-under-the-hood-and-why-it-is-game-changing/
- [2] https://www.geeksforgeeks.org/just-in-time-compiler/
- [3] https://www.alibabacloud.com/blog/exploration-of-the-flutter-rendering-mechanism-from-architecture-to-source-code_597285
- [4] https://hackernoon.com/why-flutter-uses-dart-dd635a054ebf
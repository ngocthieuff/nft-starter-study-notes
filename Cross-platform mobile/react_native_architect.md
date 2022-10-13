# Dive into React Native

## Reference 1: [What is a bridge in React Native ?](https://www.geeksforgeeks.org/what-is-a-bridge-in-react-native/)

As we know, a React Native app comprises two side as given below:
1. JavaScript side
2. Native side

#### Working of bridge:

:point_right: Hit app icon to open app
:iphone: OS designs `main thread` (a.k.a `UI thread`), allots this thread to our app.
:family: `main thread` spawns `JavaScript thread` and the `shadow thread` (a.k.a `shadow tree`)

And now, the `shadow thread`’s task is to compute layouts described on the **JavaScript side** and redirect that detail to the **Native side**.

!!!Notes: :sparkling_heart: Views are set down in JavaScript, computed in the Shadow tree, and redirected to the UI thread.

<img src='https://miro.medium.com/max/1100/1*0LTWA_egTnRLRlqXoRUymg.png'/>

## Reference 2: [Deep dive into React Native’s New Architecture](https://medium.com/coox-tech/deep-dive-into-react-natives-new-architecture-fb67ae615ccd)

### 1. JavaScript Interface (JSI):

#### Recap old architecture - bridge:

<img src='https://miro.medium.com/max/1100/1*R23YGUmEok50UR77u_UZAw.png'/>

```
1) JS thread prepares message for the Native Thread
2) It is serizlized as JSON before sending across the bridge
3) It is decoded when recieved on the other end of the bridge
4) Then the native thread executes the required native code
```

#### ...in the New Architecture, the bridge is going to replaced with JavaScript Interface:

...which is a lightweight, general-purpose layer, written in C++ that can be used by JavaScript engine to directly invoke methods in the native realm.

##### general-purpose:

The current architecture uses the JavaScriptCore Engine. The bridge is only compatible with this particular engine.

But, JSI will be decoupled from the Engine, which means that the new architecture enables the use of other JavaScript Engines like Chakra, v8, Hermes etc.

##### how can JSI enable JavaScript to directly call native methods?

Through JSI, 

`native methods` ------be exposed------> `JavaScript` via C++ Host Objects

On the web, JavaScript code can hold a reference to any DOM element, and call methods on it, like:

```
const container = document.createElement('div');
```

Here, the container is a JavaScript variable, but it holds a reference to a DOM element which was probably initialized in C++. If we call any method on the “container” variable, it will in turn call the method on the DOM element. The JSI will work in a similar way.

<img src='https://miro.medium.com/max/1100/1*EZqdD2LVpbGrNdJZ0WqY5A.png' />

```
1) JavaScript has a direct reference to a native module
2) It calls a method on this native module, via the JavaScript Interface
```

### 2. Fabric replace the current UI Manager:

**Of course, let's recap how UI is currently rendered in React Native:**

Your app is run :running:, React executes your code and creates a `ReactElementTree` in JS :dizzy:, based on this tree, the `Renderer` creates a `ReactShadowTree` in C++.:couple:

:point_right: This `ShadowTree` is used by the `Layout Engine` to calculate positions of UI elements for the host screen.

<img src='https://miro.medium.com/max/1100/1*5a-rvja1slxMZH1_Zunxtg.png'/>

```
ReactElementTree (JavaScript) -> ReactShadowTree(C++) -> HostViewTree(Native)
```

##### ... problem with UI manager:

- Data is uplicated and stored separately in both the nodes.
- Since the JS and UI threads are not in sync, there are certain use cases when your app can seem laggy as it drops frames. (*eg: scrolling through a FlatList with a huge list of data*)
- ...

#### What is Fabric?

- The new name for the UIManager which will be responsible for the native side. :high_brightness::high_brightness::high_brightness:
- The biggest difference now is that instead of communicating the JS side by the bridge, it will `expose its native function using the JSI` so the JS side and vice-versa can communicate directly through ref functions.

### Turbo Modules:

In the current architecture, all the Native Modules used by JavaScript (e.g. Bluetooth, Geo Location, File Storage etc) have to be initialized before the app is opened. This means, even if the user doesn’t require a particular module, it still has to be initialized at start-up.

The purpose of Turbo modules is the same as `native modules` in the current architecture but are implemented and act differently. 
- At first, they are **lazy-loaded** which means it only loads when the app needs them instead of loading all of them on the launch time. 
- In addition, they are also exposed using the JSI so JS holds a ref to use them on the React Native JS lib side which results in better performance, especially on the launch time.



### References:

- [1] https://medium.com/coox-tech/deep-dive-into-react-natives-new-architecture-fb67ae615ccd
- [2] https://www.geeksforgeeks.org/what-is-a-bridge-in-react-native/
- [3] [How the React Native Bridge works (and how it will change in the future)
](https://www.youtube.com/watch?v=TU_kTuz2i9Y&t=224s)
- [4] https://medium.com/mindful-engineering/fabric-architecture-react-native-a4f5fd96b6d2
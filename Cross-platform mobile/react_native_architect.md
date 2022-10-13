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

### References:

- [1] https://medium.com/coox-tech/deep-dive-into-react-natives-new-architecture-fb67ae615ccd
- [2] https://www.geeksforgeeks.org/what-is-a-bridge-in-react-native/
- [3] [How the React Native Bridge works (and how it will change in the future)
](https://www.youtube.com/watch?v=TU_kTuz2i9Y&t=224s)
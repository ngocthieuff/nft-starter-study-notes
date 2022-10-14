# Flutter platform channels

Messages are passed between the client (UI) and host (platform) using platform channels as below

<img src='https://docs.flutter.dev/assets/images/docs/PlatformChannels.png' />

### ... types support and codecs:

##### :eyes: chotto a minute, [what is codec](https://www.lifewire.com/what-exactly-is-odec-2483426)?

> A `codec` (the term is a mashup of the words `code` and `decode`) is a computer program that uses compression to shrink a large movie file or convert between analog and digital sound.

##### ... standard platform channels use a [standard message codec](https://api.flutter.dev/flutter/services/StandardMessageCodec-class.html)

... that **supports efficent binary serialization** of simple JSON-like values (such as booleans, numbers, Strings, byte buffers...)

The serialization and deserialization of these values to and from messages happen **automatically** :cyclone: when you send and receive values.

### References:

- [1] https://docs.flutter.dev/development/platform-integration/platform-channels

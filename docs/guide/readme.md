# Quick Library Installation

## Android

### Requirements

- Android API 17+
- Android Studio 3.0+

### Gradle

**Step 1**: Add the JitPack repository to your root/project `build.gradle`

``` gradle {4}
allprojects {
  repositories {
    ...
    maven { url 'https://jitpack.io/' }
  }
}
```

<br>

**Step 2**: Add the dependency by including it in your module's `app/build.gradle`

``` gradle {3}
dependencies {
  ...
  implementation 'com.github.decentralised-home-automation-protocol:DHAP-Android:0.1.0'
}
```

<br>

**Step 3**: Add Java 1.8 compatibility. Add the following compileOptions to your `app/build.gradle`

``` gradle {3-6}
android {
  ...
  compileOptions {
      targetCompatibility JavaVersion.VERSION_1_8
      sourceCompatibility JavaVersion.VERSION_1_8
  }
}
```

::: tip
Don't forget to sync your project after modifying gradle files.
:::

## iOS

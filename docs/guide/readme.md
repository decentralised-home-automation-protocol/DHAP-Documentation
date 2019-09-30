# Quick Library Installation

## Android

This installation guide is aimed at developers who have experience with Android development and its build tools. An installation guide for new developers can be found [here](https://decentralised-home-automation-protocol.github.io/DHAP-Documentation/guide/android.html#library-installation).

A completed example application can be found in the [Android Repo](https://github.com/decentralised-home-automation-protocol/DHAP-Android) which has the ability to Join, Discover and Control compliant IoT devices. Simply clone the android repo and open it in [Android Studio](https://developer.android.com/studio). From here you can compile and run the example application on your Android device.

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

### Requirements

- iOS 12+
- XCode 10+
- [Cocoapods](https://guides.cocoapods.org/using/getting-started.html) is installed.

### Cocoapods


**Step 1**: Initialise the project with cocoapods.

``` bash
$ pod init
```

**Step 2**: Specify platform and version for project in `Podfile`.

``` {2}
# Uncomment the next line to define a global platform for your project
platform :ios, '12.0'

target 'DHAPLibTest' do
  # Comment the next line if you don't want to use dynamic frameworks
  use_frameworks!

  # Pods for DHAPLibTest

end
```

**Step 3**: Add the DHAP library as a dependency in `Podfile`.

``` {9}
# Uncomment the next line to define a global platform for your project
platform :ios, '12.0'

target 'DHAPLibTest' do
  # Comment the next line if you don't want to use dynamic frameworks
  use_frameworks!

  # Pods for DHAPLibTest
  pod 'DHAP', '~> 0.3'
end
```

**Step 4**: Install the dependency.

``` bash
$ pod install
```

**Step 5**: Open the workspace.

``` bash
open DHAPLibTest.xcworkspace
```

::: tip
Make sure to open the workspace and not the project from this point on.
:::

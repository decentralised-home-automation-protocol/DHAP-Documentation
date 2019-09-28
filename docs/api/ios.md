# iOS API

## DHAP Instance

The DHAP class contains the public API for the DHAP library. To start using the library, create an instance of the DHAP class. The DHAP class does not require any parameters.

``` swift {6,11}
import UIKit
import DHAP

class ViewController: UIViewController {

    private var dhap: DHAP?

    override func viewDidLoad() {
        super.viewDidLoad()

        dhap = DHAP()
    }
}
```

## Discovery

### Discover Devices

To being discovering compliant devices on the network, call the `discoverDevices(completion: (DevicesResult))` method on the DHAP instance. This method has a completion handler that provides a `DevicesResult` enum type upon completion that indicates the result of the discovery process.

``` swift {3,8,10}
dhap?.discoverDevices(completion: { (result) in
    switch result {
    case .foundDevices(let devices):
        print("\(devices.count) devices found.")
        for device in devices {
            print("Device Name: \(device.name!) - \(device.location!)")
        }
    case .noDevicesFound:
        print("No devices found.")
    case .failure(let error):
        print("Something went wrong: \(error.localizedDescription)")
    }
})
```

**Line 3** shows the `foundDevices([Device])` result. This type is defined by the `DevicesResult` enum shown in the code sniffet below. This result indicates that the discovery process successfully found one or more compliant devices on the network. The result also provides an array of `Device` structs that represent each device that was discovered. These Device structs have several properties that the real device would have including the devices MAC, IP Address, assigned name and location.

**Line 8** shows the `noDevicesFound` result. This result indicates that the discovery process completed but was unable to find any compliant devices on the network.

**Line 10** shows the `failure(Error)` result. This result indicates that something went wrong during the discovery process. The results provides the `Error` object that was caught.

``` swift
public enum DevicesResult {
    case foundDevices([Device])
    case noDevicesFound
    case failure(Error)
}
```

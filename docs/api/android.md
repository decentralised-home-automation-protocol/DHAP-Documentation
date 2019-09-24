# Android API

## DHAP Instance

The DHAP class contains the public API for the DHAP library. To start using the library, create an instance of the DHAP class. The DHAP class requires an Android context object, which can be the Activity that the instance is being created in or the application context.

``` java {3,10}
public class MainActivity extends AppCompatActivity {
    
    private DHAP dhap;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        dhap = new DHAP(this);
    }
}
```

## Discovery

### Discover Devices

To begin discovering compliant devices on the network, call the `discoverDevices` method on the DHAP instance. This method has several callbacks that make it easy to determine the outcome of the discovery. 

``` java {3,12,17}
dhap.discoverDevices(new DiscoverDevicesCallbacks() {
    @Override
    public void foundDevices(List<Device> devices) {
        Log.d(TAG, "Devices found.");
        for (Device device : devices) {
            Log.d(TAG, "\tMAC: " + device.getMacAddress() + ", IP: " + device.getIpAddress());
            Log.d(TAG, "\tName: " + device.getName() + ", Room: " + device.getRoom());
        }
    }

    @Override
    public void noDevicesFound() {
        Log.d(TAG, "No devices found.");
    }

    @Override
    public void discoveryFailure() {
        Log.d(TAG, "Discovery failed.");
    }
});
```

**Line 3** shows the `foundDevices(List<Device> devices)` callback. This callback indicates that the discovery process successfully found one or more compliant devices on the network. The callback also provides you with a list of `Device` objects that represent each device that was discovered. These Device objects have several properties that the real device would have including the devices MAC address, IP address, assigned name and location.

**Line 12** shows the `noDevicesFound()` callback. This callback indicates that the discovery process completed but was unable to find any compliant devices.

**Line 17** shows the `discoveryFailure()` callback. This callback indicates that something went wrong in the library during the process of attempting to find devices.

In addition to the normal discovery operation, the DHAP library also allows for debug devices to be discovered using the `discoverDebugDevices(DiscoverDevicesCallbacks)` method. This method will search for xml files in the assets folder rather then over the network. A device object will be created for each xml file found.

``` java {1}
dhap.discoverDebugDevices(new DiscoverDevicesCallbacks() {
    @Override
    public void foundDevices(List<Device> devices) {
        Log.d(TAG, "Debug Devices found.");
        for (Device device : devices) {
            Log.d(TAG, "\tMAC: " + device.getMacAddress() + ", IP: " + device.getIpAddress());
            Log.d(TAG, "\tName: " + device.getName() + ", Room: " + device.getRoom());
        }
    }

    @Override
    public void noDevicesFound() {
        Log.d(TAG, "No devices found.");
    }

    @Override
    public void discoveryFailure() {
        Log.d(TAG, "Discovery failed.");
    }
});
```

## Joining

### Join Device

The Joining API contains methods that allow for you to proceed with the joining protocol at your own pace or to complete the entire protocol in one method.

The `joinDevice(String networkSSID, String networkPassword, String deviceSSID, String devicePassword, String name, String location, JoinDeviceCallbacks callback)` will perform all of the joining protocol for you. This will first verify the network SSID and password by connecting to that network. Then it will connect to the IoT devices AP and send the credentials and header information. This method will wait for a verification from the IoT device that it has successfully joined the network before calling the `success` callback.

``` java {3,8,13,18,24}
dhap.joinDevice(networkSSID, networkPassword, deviceSSID, devicePassword, deviceName, deviceLocation, new JoinDeviceCallbacks() {
    @Override
    public void networkNotFound(String SSID) {
        Log.e(TAG, "Network not found: " + SSID);
    }

    @Override
    public void credentialsAcknowledged() {
        Log.e(TAG, "Credentials Acknowledged");
    }

    @Override
    public void sendCredentialsTimeout() {
        Log.e(TAG, "Sending of credentials timed out");
    }

    @Override
    public void success() {
        actionFragment.setActionEnabled(true);
        Log.d(TAG, "successfully joined device");
    }

    @Override
    public void failure(String message) {
        actionFragment.setActionEnabled(true);
        Log.e(TAG, "failure: " + message);
    }               
});
```
**Line 3** shows the `networkNotFound(String SSID)` callback This callback indicates that a network with the SSID could not be found. 

**Line 8** shows the `credentialsAcknowledged()` callback. This callback indicates that the device has responded that the credentials have been received.

**Line 13** shows the `sendCredentialsTimeout()` callback. This callback indicates that an acknowledgement was not received from the device. This most likely due to the device not receiving the credentials.

**Line 18** shows the `success()` callback. This callback indicates that the device has successfully joined the network.

**Line 24** shows the `failure(String message)` callback. This callback indicates that something went wrong in the library during the process of attempting to joining the device or the device could not join the network.

### Connect To Access Point

The `connectToAccessPoint(String SSID, String password, ConnectToApCallbacks callback)` method will connect to the designated AP and call the relevant callback methods. Note: this method will call the `success` callback once it has verified that a connection has been established and IP packets can now be sent. This has a 30 second timeout and will return `failure` if a connection is not established before the end of the timeout.

``` java {3,8,13}
dhap.connectToAccessPoint(SSID, password, new ConnectToApCallbacks() {
    @Override
    public void networkNotFound(String SSID) {
        Log.e(TAG, "Network not found: " + SSID);
    }

    @Override
    public void success() {
        Log.d(TAG, "Successfully connected to AP" );
     }

    @Override
    public void failure() {
        Log.d(TAG, "Failed to connect to AP");
    }                
});
```
**Line 3** shows the `networkNotFound()` callback This callback indicates that a network with that SSID could not be found. 

**Line 8** shows the `success()` callback. This callback indicates that the access point was successfully connected to.

**Line 13** shows the `failure()` callback. This callback indicates that something went wrong in the library during the process of connecting to the access point.

### Send Credentials

The `sendCredentials(String SSID, String password, String name, String location, SendCredentialsCallbacks callback)` method will broadcast the credentials and header information on its current network. This method should only be called after a connection to the IoT device has been established. Note: This method will only call the `success` callback once it has received an acknowledgement from the IoT device that credentials where received. This method will continuously broadcast the credentials once every second until an acknowledgement is received. If not acknowledgement is received within 20 seconds, `sendCredentialsTimeout` will be called and the credential broadcasts will cease.

``` java {3,8,13,18}
dhap.sendCredentials(SSID, password, name, location, new SendCredentialsCallbacks() {
    @Override
    public void credentialsAcknowledged() {
        Log.d(TAG, "networkNotFound");
    }

    @Override
    public void sendCredentialsTimeout() {
        Log.d(TAG, "successfully sent credentials" );
     }

    @Override
    public void success() {
        Log.d(TAG, "Successfully connected to AP" );
     }

    @Override
    public void failure() {
        Log.d(TAG, "Failed to connect to AP");
    }              
});
```
**Line 3** shows the `credentialsAcknowledged()` callback. This callback indicates that the credentials where sent successfully and an acknowledgement has been received from the device.

**Line 8** shows the `sendCredentialsTimeout()` callback. This callback indicates that no response was received when sending the credentials. 

**Line 13** shows the `success()` callback. This callback indicates that the device has successfully joined the network.

**Line 18** shows the `failure()` callback. This callback indicates that something went wrong in the library during the process of attempting to send credentials.

## Display

### Fetch Device Interface

To retrieve the user interface of a device, call the `fetchDeviceInterface(Device device, FetchDeviceInterfaceCallbacks callbacks)` method. This method takes a `device` instance in as a parameter and will retrieve the UI of that particular device. This method will return an intent to an activity which displays the user interface of that device.

``` java {3,5,9,14}
dhap.fetchDeviceInterface(device, new FetchDeviceInterfaceCallbacks() {
    @Override
    public void deviceActivityIntent(Intent intent) {
        Log.d(TAG, "Fetched device interface.");
        startActivity(intent);
    }

    @Override
    public void invalidDisplayXmlFailure() {
        Log.d(TAG, "invalidDisplayXmlFailure");
    }

    @Override
    public void displayTimeoutFailure() {
        Log.d(TAG, "displayTimeoutFailure");
    }
});
```
**Line 3** shows the `deviceActivityIntent()` callback. 

**Line 5** shows the usage of the intent that has been returned. This activity is started by calling the `startActivity()` method.

**Line 9** shows the `invalidDisplayXmlFailure()` callback. This callback indicates that the xml send from the device is invalid.

**Line 14** shows the `displayTimeoutFailure()` callback. This callback indicates that the devices xml was not received before the timeout ended.

## Status

To request a status lease and receive status updates, an instance of the `Device` class must be used. This class will handle all functions relating to status updates and will therefore update relevant elements when a new status update is received.

This class contains several public methods in its API relating to status updates.

`requestStatusLease(float leaseLength, float updatePeriod, boolean responseRequired,  StatusLeaseCallbacks callbacks)` is the main method that will be needed. This will request a status lease from the IoT device and begin listening for status updates. This function contains four parameters. `leaselength` is the requested duration of the lease in milliseconds. `updatePeriod` refers to how often the status updates should be broadcast by the IoT device. `responseRequired` indicates if the IoT device should respond with the lease length and update period that has been granted. 

Their is two callbacks for this function. `leaseResponse(float leaseLength, float updatePeriod)` will be called only when a response is received from the IoT device and will contain the lease length and update period that was granted. `shouldRenewStatusLease()` will be called when a lease expires, this function should return a boolean that determines if the lease will be requested again or not.

One would typically call this function in the `onCreate()` or `onResume()` method of an activity .

``` java {4}
@Override
protected void onResume() {
    super.onResume();
    device.requestStatusLease(10000, 1000, false, new StatusLeaseCallbacks() {
        @Override
        public void leaseResponse(float leaseLength, float updatePeriod) {
            Log.d("DeviceActivity", "leaseResponse: " + leaseLength + " UpdatePeriod: " + updatePeriod);
        }

        @Override
        public boolean shouldRenewStatusLease() {
            return true;
        }
    });
}
```

Conversely, you can also call `leaveLease()` which will indicate to the IoT device that you are no longer interested in status updates.

``` java {4}
@Override
protected void onStop() {
    super.onStop();
    device.leaveLease();
}
```

## Device 

The device class contains several other functions which can be used to control or change the state of an IoT device.

The name and location of a device represent the device header. These values can be changed for a specific device through the use of the `Device` class.

To change the name of a device use the `changeDeviceName(String name)` function

``` java {2}
Device device;
device.changeDeviceName("Name here");
```

To change the location of a device use the `changeDeviceLocation(String location)` function

``` java {2}
Device device;
device.changeDeviceLocation("Location here");
```

To send an IoT command to a device, use the `sendIoTCommand(String tag, String data)` function. `tag` represents the tag of the UI element that was interacted with while `data` is the new state of the elements.

``` java {2}
Device device;
device.sendIoTCommand("1-1", "3");
```
# Android API

## DHAP Instance

The DHAP class contains the public API for the DHAP library. To start using the library, create an instance of the DHAP class. The DHAP class requires an Android context object, which can be the Activity that the instance is being created in or the application context.

``` java {5,12}
public class MainActivity extends AppCompatActivity {
    
    private static final String TAG = MainActivity.class.getSimpleName();

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
dhap.discoverDevices(new GetDiscoveredDevicesCallbacks() {
    @Override
    public void foundDevices(List<Device> devices) {
        Log.e(TAG, "Devices found.");
        for (Device device : devices) {
            Log.d(TAG, "\tMAC: " + device.getMacAddress() + ", IP: " + device.getIpAddress());
            Log.d(TAG, "\tName: " + device.getName() + ", Room: " + device.getRoom());
        }
    }

    @Override
    public void noDevicesFound() {
        Log.e(TAG, "No devices found.");
    }

    @Override
    public void discoveryFailure() {
        Log.e(TAG, "Discovery failed.");
    }
});
```

**Line 3** shows the `foundDevices(List<Device> devices)` callback. This callback indicates that the discovery process successfully found one or more compliant devices on the network. The callback also provides you with a list of `Device` objects that represent each device that was discovered. These Device objects have several properties that the real device would have including the devices MAC address, IP address, assigned name and assigned room name.

**Line 12** show the `noDevicesFound()` callback. This callback indicates that the discovery process completed but was unable to find any compliant devices.

**Line 17** shows the `discoveryFailure()` callback. This callback indicates that something went wrong in the library during the process of attempting to find devices.

## Joining

### Send Credentials

``` java 
dhap.sendCredentials(new GetSendCredentialsCallbacks() {

});
```

## Display

### Fetch Device Interface

``` java {3,5,9}
dhap.fetchDeviceInterface(device, new GetDeviceInterfaceCallbacks() {
    @Override
    public void deviceActivityIntent(Intent intent) {
        Log.d(TAG, "Fetched device interface.");
        startActivity(intent);
    }

    @Override
    public void displayFailure() {
        Log.d(TAG, "Display failed.");
    }
});
```

## Status



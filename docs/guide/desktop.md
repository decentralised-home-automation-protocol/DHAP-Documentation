# Desktop Application

The Desktop application is a multiplatform app which allows you to view multiple devices simultaneously. This application will work on Windows, Mac and Linux and only requires the deivce to be connected to your home network to function.

## Installation

Clone the [Desktop Repo](https://github.com/decentralised-home-automation-protocol/DHAP-Desktop)

Ensure you have the latest version of [yarn](https://yarnpkg.com/lang/en/) or [npm](https://www.npmjs.com/get-npm) installed.

In the root directory of the repo you just cloned, run the following commands in a terminal.

``` bash
# install dependencies
yarn # or npm install

# serve with hot reload at localhost:9080
yarn run dev # or npm run dev
```

To build the project use

```bash
# build electron application for production
yarn run build # or npm run build
```

## Usage

This project allows for multiple IoT devices that support the DHAP protocol to be used simultaneously.
Devices can be discovered and controlled. In addition, if this project is deployed to a WiFi capable machine, IoT devices can also be joined onto a home network.

### Discovery

Discovery is achieved by clicking on the `discovery` tab on the sidebar to the left. This will expand the discovery tab where the current network interface and its broadcast address will be shown. The application will attempt to select the correct network interface and its broadcast address. However, a different interface can be chosen by selecting it from the dropdown box. In addition, the broadcast address can be changed by typing a different address in the text box.

To begin discovery, click the `Discover Devices`. A progress indicator will appear while the discovery protocol is in motion. Once this indicator disappears, discovery has been completed. Any devices that have been discovered will appear in the sidebar. Devices will initially appear as an IP address until the packet header has been recieved. At this point, the device wil be moved to a tab which corresponds to its location.

### Joining

Joining is only avaliable for devices with WiFi capabbilities. Joining can be started by expanding the `Joining` tab in the sidebar. If this tab displays the message `No WiFi detected` it means that no access points where found while scanning. This is most likely due to the WiFi on the device being non-existant or disabled. 

The joining tab contains a dropdown box for both your home network and the IoT device. Select the relevent networks in each dropdown, enter their associated passwords and click `Join Device`. A loading indicator will appear while joining is in progress. Your device will automatically change networks to the IoT device and send the credentials. The loading indicator will disappear once joining is complete. At this point you should click `Discover Devices` in the discovery tab to find your new device.

### Device Interfaces

Device interfaces can be retrieved by first expanding the relevant location tab in the sidebar. This will display all of the known devices with the same location. To get the user interface of a device, click on the green arrow to the right of the device name. This will retrieve the device xml and display it in its own window. In addition, this process will also request a status update lease from the device. When new status updates are recieved, the relevent element in the UI will be automatically updated. While the UI window is active, the application will continue to request status leases when they expire. To remove an interface, click the red cross in the top right of the interface window.


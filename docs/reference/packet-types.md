---
sidebarDepth: 2
---

# Packet Types

Each UDP packet is prefaced with a 3 digit code to determine its purpose.

## Joining

### Send Credentials

::: tip
This is a BROADCAST packet
:::

::: danger
This packet must be sent on a secure network
:::

Sent from `ICD`

ICD sends home network credentials to device so that it can join the network.

```
100|ssid,password
```

- **ssid**: the network router ssid
- **password**: the network router password

Example: `100|Telstra7000,83627465`

### Acknowledge Credentials

Sent from `Device`

Device acknowledges that it has received the network credentials.

```
110
```

Example: `110`

### Joined Network Successfully

Sent from `Device`

Device informs the ICD that it has successfully joined the network.

```
120
```

Example: `120`

### Failed to Join Network

Sent from `Device`

Device informs the ICD that it has failed connecting to the network.

```
130
```

Example: `130`

## Discovery

### Discovery Request

::: tip
This is a BROADCAST packet
:::

Sent from `ICD`

ICD requests that the device checks if it is on the census list.

```
300|[device,device,device...]
```

- **device**: the string representation of a currently discovered device

Where each **device** string contains:

```
mac,ip,statusbit,visibilitybit,headerVersion
```

- **mac**: device MAC address.
- **ip**: device network IP address.
- **statusbit**: whether the device is currently active or not. 1 or 0.
- **visibilitybit**: Specifies the visibility permission level.
- **headerVersion**: The current version of the device header.

Example: `300|` (no currently discovered devices)

Example: `300|B4:E6:2D:67:B5:3D,192.168.1.99,1,1,5`

Example: `300|B4:E6:2D:67:B5:3D,192.168.1.99,1,1,5-D5:0A:95:9D:68:16,192.168.0.15,1,1,9`

### Discovery Response

Sent from `Device`

Device will respond with its information if it is not on the received census list.

```
310|mac,statusbit,visibilitybit,headerVersion
```

- **mac**: device MAC address.
- **statusbit**: whether the device is currently active or not.  1 or 0.
- **visibilitybit**: Specifies the visibility permission level.
- **headerVersion**: The current version of the device header.

Example: `310|B4:E6:2D:67:B5:3D,1,1,5`

### Discovery Header Request

Sent from `ICD`

ICD requests the device to send its xml header information.

```
320
```

Example: `320`

### Discovery Header Response

Sent from `Device`

Device responds to a discovery header request with the devices xml header.

```
330|mac,name,location
```

- **mac**: device MAC address
- **name**: the name given to the device
- **location**: the location given to the device

Example: `310|B4:E6:2D:67:B5:3D,TV,Living Room`

## User Interface

### UI Request

Sent from `ICD`

ICD requests the device to send its full xml description.

```
200
```

Example: `200`

### UI Response

Sent from `Device`

Device responds to a ui request with its xml string.

```
210|xml
```

- **xml**: the devices xml string

Example: `210|<?xml version="1.0" encoding="UTF-8"?><device><name> ...`

## Command

### Command Request

Sent from `ICD`

ICD sends a command to request the device to update its state.

```
400|command
```

- **command**:

The command value should be in the following format `groupID-elementID=elementStatus`.

`groupID` is the value of the `group` ID which the element is a part of.

`elementID` is the value of the `gui_element` ID.

`elementStatus` is the string which represents that specific elements status. To see the syntax of the status of a particular element, see that elements section of the [elements documentation](/reference/elements.html).

the `-` and `=` characters are used as delimiters.

```xml
<group id="2" permisison="WR">
    <gui_element id="1">
        <type>stepper</type>
        <disp_settings>Number,0,10</disp_settings>
        <status_location>3</status_location>
        <comment>Number Counter</comment>
    </gui_element>
    <gui_element id="2">
        <type>buttontoggle</type>
        <disp_settings>Open/Close,Open,Close</disp_settings>
        <status_location>2</status_location>
        <comment>Light Switch</comment>
    </gui_element>
</group>
```

If the `buttontoggle` element was currently in the `True` state and the button was pressed. Its command would be: `400|2-2=False`.

If the `stepper` element currently had a value of `5` and it was incremented, its command would be `400|2-1=6`.

## Status

### Lease Request

Sent from `ICD`

ICD requests a status lease from the device.

```
500|duration,interval,response
```

- **duration**: requested lease duration in miliseconds
- **interval**: requested update interval in miliseconds
- **response**: whether the device should respond with the lease information

Example: `500|10000,2000,T`

### Lease Response

Sent from `Device`

Device responds to a lease request if the ICD requested lease information.

```
510|mac,duration,interval
```

- **mac**: device MAC address
- **duration**: the actual lease duration (may not be the same as the requested duration)
- **interval**: the actual update interval (may not be the same as the requested duration)

Example: `510|B4:E6:2D:67:B5:3D,50000,1000`

### Leave Lease

Sent from `ICD`

ICD informs the device that it is no longer interested in receiving status updates.

```
520
```

Example: `520`

### Status Update

::: tip
This is a BROADCAST packet
:::

Sent from `Device`

Device broadcasts its current state to all devices.

```
530|mac,lastUpdate,status[,status,status...]
```

- **mac**: devices MAC address
- **lastUpdate**: whether this is the final status update in the current lease. This value is either `T` or `F` where `T` indicates it is the final packet.
- **status**: contains state for one element

Each element must be updated in a status update. The index of the `status` value in the list, will corrospond to the value found in the `status_location` tag in an elements xml. This index starts at the value 1. Therefore, the first `status` value in the list will be assigned to the element that contains the xml `<status_location>1</status_location>`

For the following xml:

```xml
<group id="1" permisison="WR">
    <gui_element id="1">
        <type>progress</type>
        <disp_settings>Loading...</disp_settings>
        <status_location>1</status_location>
        <comment>Loading progression</comment>
    </gui_element>
</group>
<group id="2" permisison="WR">
    <gui_element id="1">
        <type>stepper</type>
        <disp_settings>Number,0,10</disp_settings>
        <status_location>3</status_location>
        <comment>Number Counter</comment>
    </gui_element>
    <gui_element id="2">
        <type>buttontoggle</type>
        <disp_settings>Open/Close,Open,Close</disp_settings>
        <status_location>2</status_location>
        <comment>Light Switch</comment>
    </gui_element>
</group>
```

An example status update packet for this device layout could look like the following:

`530|B4:E6:2D:67:B5:3D,F,13,True,4`

In this update packet, the progress bar is at `13%`, the stepper has a value of `4` and the buttontoggle is in a `True` state. Note, the elements do not need to be listed in order of status update index in the xml.

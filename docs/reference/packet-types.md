# Packet Types

Each UDP packet is prefaced with a 3 digit code to determine its purpose.

## Joining

### Send Credentials `ICD`

ICD sends home network credentials to device so that it can join

```
100|SSID,Password
```

- **SSID**: the home network router ssid
- **Password**: the home network router password

Example: `100|Telstra7000,83627465`

### Acknowledge Credentials `Device`

The device responds to the credentials with an acknowledge

```
110
```

Example: `110`

### Joined Network Successfully `Device`

The device informs the ICD that it has successfully joined the home network

```
120
```

Example: `120`

### Failed to Join Network `Device`

The device informs the ICD that it has failed connecting to the home network

```
130
```

Example: `130`

## Discovery

### Discovery Request `ICD`

The ICD requests that the device checks if its on the census list

```
300|censusList
```

- **censusList**: the string representation of the currently discovered devices

Example: `300|mac,ip,statusbit,visibilitybit-mac,ip,statusbit,visibilitybit`

### Discovery Response `Device`

If the device is not on the received censusList, it will respond with its information

```
310|mac,statusbit,visibilitybit
```

- **mac**: device MAC address
- **statusbit**: 
- **visibilitybit**: 

Example: `310|B4:E6:2D:67:B5:3D,1,1`

### Discovery Header Request `ICD`

ICD requests the device to send its xml header information

```
320
```

Example: `320`

### Discovery Header Response `Device`

Device responds to a discovery header request with the devices xml header

```
330|mac,name,room
```

- **mac**: device MAC address
- **name**: the name given to the device
- **room**: the room string given to the device

Example: `310|B4:E6:2D:67:B5:3D,TV,Living Room`

## User Interface

### UI Request `ICD`

ICD requests the device to send its full xml description

```
200
```

Example: `200`

### UI Response `Device`

Device responds to a ui request with its xml string

```
210|xml
```

- **xml**: the devices xml string

Example: `210|<?xml version="1.0" encoding="UTF-8"?> ...`

## Command

### Command Request `ICD`

ICD sends a command to request the device to update its state

```
400|command
```

- **command**:

Example: `400|`

## Status

### Lease Request `ICD`

ICD requests a status lease from the device

```
500|duration,interval,response
```

- **duration**: requested lease duration in miliseconds
- **interval**: requested update interval in miliseconds
- **response**: whether the device should respond with the lease information

Example: `500|10000,2000,T`

### Lease Response `Device`

Device responds to a lease request if the ICD requested lease information

```
510|mac,duration,interval
```

- **mac**: device MAC address
- **duration**: the actual lease duration (may not be the same as the requested duration)
- **interval**: the actual update interval (may not be the same as the requested duration)

Example: `510|B4:E6:2D:67:B5:3D,50000,1000`

### Leave Lease `ICD`

ICD informs the device that it is no longer interested in receiving status updates

```
520
```

Example: `520`

### Status Update `Device`

Device broadcasts its current state to all devices

```
530|mac,lastUpdate,status[,status,status...]
```

- **mac**: devices MAC address
- **lastUpdate**: whether this is the last status update in the current lease
- **status**: contains state for one element

```
groupId-elementId=value
```

- **groupId**: the id of the group the element is contained in
- **elementId**: the id of the element to update
- **value**: the updated value for the element

Example: `530|B4:E6:2D:67:B5:3D,F,2-1=7`

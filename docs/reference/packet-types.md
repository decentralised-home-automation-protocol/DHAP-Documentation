# Packet Types

## Joining

### Sending Credentials

Some short description

```
100|SSID,Password
```

Sent from `ICD`

- SSID: 
- Password: 

### Acknowledge Credentials

```
110
```

Sent from `Device`

### Joined Network Successfully

```
120
```

Sent from `Device`

### Failed to Join Network

```
130
```

Sent from `Device`

## Discovery

### Discovery Request

```
300|censusList
```

- censusList: `mac,ip,statusbit,visibilitybit-mac,ip,statusbit,visibilitybit`

Sent from `ICD`

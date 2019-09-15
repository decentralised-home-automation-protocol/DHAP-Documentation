# Elements

### Element Labels

Every element has a label tag. This tag can be ignored with the ~ character. The first value in the comma separated values in the display settings is the value of the label. If only the ~ character is present then the label will be removed.

#### Example with label

```xml
<gui_element id="1">
    <type>buttongroup</type>
    <disp_settings>Numbers,1,2,3</disp_settings>
    <comment>Numpad</comment>
</gui_element>
```

#### Example without label

```xml
<gui_element id="1">
    <type>buttongroup</type>
    <disp_settings>~,1,2,3</disp_settings>
    <comment>Numpad</comment>
</gui_element>
```

## Switch Toggle

#### XML Type

`switchtoggle`

#### Display Settings

`label`

#### Status Updates

A string `True` or `False`.

#### Example

```xml
<gui_element id="1">
    <type>switchtoggle</type>
    <disp_settings>On/Off</disp_settings>
    <status_location>1</status_location>
    <comment>Light Switch</comment>
</gui_element>
```

## Button Toggle

#### XML Type

`buttontoggle`

#### Display Settings

`label,positiveLabel,negativeLabel`

#### Status Updates

A string `True` or `False`.

This element will show the `positiveLabel` when it is `True` and the `negativeLabel` when it is `False`

#### Example

```xml
<gui_element id="1">
    <type>buttontoggle</type>
    <disp_settings>Open/Close,Open,Close</disp_settings>
    <status_location>1</status_location>
    <comment>Light Switch</comment>
</gui_element>
```

## Stepper

#### XML Type

`stepper`

#### Display Settings

`label,minValue,maxValue`

#### Status Updates

String value of any integer between the `maxValue` and `minValue` inclusive.

#### Example

```xml
<gui_element id="1">
    <type>stepper</type>
    <disp_settings>Number,0,10</disp_settings>
    <status_location>1</status_location>
    <comment>Number Counter</comment>
</gui_element>
```

## Range Input

#### XML Type

`rangeinput`

#### Display Settings

`label,buttonLabel,minValue,maxValue`

#### Status Updates

String value of any integer between the `maxValue` and `minValue` inclusive.

#### Example

```xml
<gui_element id="1">
    <type>rangeinput</type>
    <disp_settings>Volume,Set,1000,3000</disp_settings>
    <status_location>1</status_location>
    <comment>Volume Slider</comment>
</gui_element>
```

## Directional Buttons

#### XML Type

`directionalbuttons`

#### Display Settings

`label,topLabel,rightLabel,bottomLabel,leftLabel,centreLabel`

#### Status Updates

This element does not recieve status updates.

#### Example

```xml
<gui_element id="1">
    <type>directionalbuttons</type>
    <disp_settings>Direction,N,E,S,W</disp_settings>
    <comment>Directional movement</comment>
</gui_element>
```

## Selection

#### XML Type

`selection`

#### Display Settings

`label,option1,option2,option3,...,optionN`

#### Status Updates

The index of the selection. The first value in the display settings, `option1`, has an index of `0`

#### Example

```xml
<gui_element id="1">
    <type>selection</type>
    <disp_settings>Move Door,one,two,three,four,five,six</disp_settings>
    <status_location>1</status_location>
    <comment>Door positions</comment>
</gui_element>
```

## Status

#### XML Type

`status`

#### Display Settings

`label`

#### Status Updates

Any string can be used and will be displayed as the status.

#### Example

```xml
<gui_element id="1">
    <type>status</type>
    <disp_settings>Voltage</disp_settings>
    <status_location>1</status_location>
    <comment>Voltage level</comment>
</gui_element>
```

## Text Input

#### XML Type

`textinput`

#### Display Settings

`label,buttonLabel`

#### Status Updates

Any string can be used and will be displayed in the elements textbox.

#### Example

```xml
<gui_element id="1">
    <type>textinput</type>
    <disp_settings>Name,Submit</disp_settings>
    <status_location>1</status_location>
    <comment>Name</comment>
</gui_element>
```

## Progress

#### XML Type

`progress`

#### Display Settings

`label`

#### Status Updates

Any integer between `0` and `100`. This value represents the progress as a percentage.

#### Example

```xml
<gui_element id="1">
    <type>progress</type>
    <disp_settings>Loading...</disp_settings>
    <status_location>1</status_location>
    <comment>Loading progression</comment>
</gui_element>
```

## Button Group

#### XML Type

`buttongroup`

#### Display Settings

`label,buttonLabel1,buttonLabel2,...,buttonLabelN`

#### Status Updates

This element does not recieve status updates.

#### Example

```xml
<gui_element id="1">
    <type>buttongroup</type>
    <disp_settings>Numpad,1,2,3,4</disp_settings>
    <comment>Numpad</comment>
</gui_element>
```

## Schedular

#### XML Type

`scheduler`

#### Display Settings

`label,submitButtonLabel,option1,option2,...,optionN`

#### Status Updates

Update strings must be in the format `optionIndex!timeValue`. Where the `optionIndex` is the index of the selected value where the first value has an index `0`. The `timeValue` must be in a 24 hout format such as `16:30`. The `!` character is used as a delimiter. For example `1!14:00` will update the element with the below xml to selected value of `Tue` and a time of `14:00`.

#### Example

```xml
<gui_element id="1">
    <type>scheduler</type>
    <disp_settings>Schedule an event,Submit,Mon,Tue,Wed,Thu,Fri</disp_settings>
    <status_location>1</status_location>
    <comment>Event scheduler</comment>
</gui_element>
```

## Password

#### XML Type

`password`

#### Display Settings

`label,buttonLabel`

#### Status Updates

Any string can be used and will be displayed in the elements textbox as a password.

#### Example

```xml
<gui_element id="1">
    <type>password</type>
    <disp_settings>Password,Submit</disp_settings>
    <status_location>1</status_location>
    <comment>Enter your password</comment>
</gui_element>
```

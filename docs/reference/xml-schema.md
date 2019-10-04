# XML Schema

The xml schema developed for DHAP has several different tags. These tags do not need to be placed in any particular order in an xml file. However, some of the tags must be placed within another tag as a child or subchild.

The general structure for any XML schema can be seen below.

``` xml
<root>
  <child>
    <subchild>.....</subchild>
  </child>
</root>
```

Full examples of device layout XML can be found in the (Device Examples)[https://decentralised-home-automation-protocol.github.io/DHAP-Documentation/reference/device-examples.html] reference page.

The first thing that should be included in the device XML file is an XML prolog as seen below. This prolog outlines the XML version and the character encoding used.

``` xml
<?xml version="1.0" encoding="UTF-8"?>
```

## device

The device tag is the root tag. All other tags must be placed within this tag.

```xml {2,4}
<?xml version="1.0" encoding="UTF-8"?>
<device>
  ...
</device>
```

## group

The `group` tag defines a collection of GUI elements.

A `group` tag must have an attribute `id`. This is a unique identifier for a group and should be an integer value.

As an option, the `group` tag can also have a `frame` attribute which will draw a box around the group as well as an `orientation` attribute which will orientate the elements in this group vertically or horizontally. The `frame` attribute can have the values `true` and `false`. The default value is `false` if the attribute is not specified. The `orientation` attribute can have the values `vertical` and `horizontal`. The default value is `horizontal` if the attribute is not specified.

There is no limit to the number of groups you can have in a `device`.

```xml {3,5}
<?xml version="1.0" encoding="UTF-8"?>
<device>
  <group id="1" frame="false" orientation="vertical">
  ...
  </group>
</device>
```

## gui_element

The `gui_element` tag is used to describe a component of the devices user interface. This tag will contain several child tags that describe the type and content of this component. This tag should be placed in a `group` tag as a child.

A `gui_element` tag must have an attribute `id`. This is a unique identifier for a `gui_element` in a group and should be an integer value. `gui_element` tags can have duplicate `id` values if they are in different `group` tags.

There can be multiple `gui_element` tags in a `group`.

```xml {4,6}
<?xml version="1.0" encoding="UTF-8"?>
<device>
  <group id="1">
    <gui_element id="1">
    ...
    </gui_element>
  </group>
</device>
```

## type

The `type` tag is the main descriptor of a GUI element. The contents of this tag will determine which GUI element this `gui_element` tag describes. There are several predefined element types and a full list can be found in the [Elements reference](https://decentralised-home-automation-protocol.github.io/DHAP-Documentation/reference/elements.html) page.

There should only be 1 `type` tag in a `gui_element`.

```xml {5}
<?xml version="1.0" encoding="UTF-8"?>
<device>
  <group id="1">
    <gui_element id="1">
      <type>...</type>
    </gui_element>
  </group>
</device>
```

## disp_settings

The `disp_settings` tag describes the element specific settings of this GUI component. The value in this tag will contain a list of comma separated values that are unique to each element. The meaning of these values can be seen in the relevant section of the [Elements reference](https://decentralised-home-automation-protocol.github.io/DHAP-Documentation/reference/elements.html) page for any specific element.

There should only be 1 `disp_settings` tag in a `gui_element`.

```xml {6}
<?xml version="1.0" encoding="UTF-8"?>
<device>
  <group id="1">
    <gui_element id="1">
      <type>...</type>
      <disp_settings>...</disp_settings>
    </gui_element>
  </group>
</device>
```

## status_location

The `status_location` tag contains an integer value that determines the index of state value of this element in a status update packet. Status update packets contain a list of comma separated values. The value in this tag will be used to determine which value in that list relates to this specific `gui_element`.

The value in this tag must be unique to all `gui_element` tags. i.e no two elements should have the same status location value.

There should only be 1 `status_location` tag in a `gui_element`.

The index values for the status location begin at `1`. Therefore the first `status_location` value must be `1`, the second `2`, third `3` and so on. The `gui_elements` do not need to be listed in the XML in order of status location. However, the values in the `status_location` must not skip any values. For example, if there is a total of 8 `gui_elements` in a device description. The `status_location` values must range from `1` to `8` with no duplicate values.

```xml {7}
<?xml version="1.0" encoding="UTF-8"?>
<device>
  <group id="1">
    <gui_element id="1">
      <type>...</type>
      <disp_settings>...</disp_settings>
      <status_location>...</status_location>
    </gui_element>
  </group>
</device>
```

## comment

The `comment` tag contains a short description of this GUI element.

There should only be 1 `comment` tag in a `gui_element`.

```xml {8}
<?xml version="1.0" encoding="UTF-8"?>
<device>
  <group id="1">
    <gui_element id="1">
      <type>...</type>
      <disp_settings>...</disp_settings>
      <status_location>...</status_location>
      <comment>...</comment>
    </gui_element>
  </group>
</device>
```

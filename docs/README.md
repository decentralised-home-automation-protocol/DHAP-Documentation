# Introduction



## Background

Currently, smart homes are not very common and far from ubiquitous as expected. One of the main issues that has been identifed for the lack of smart homes and slow adoption of home automation technologies to the mainstream is the issues that arise due to the use of a central controller.

The central controller is responsible for joining new devices onto the network, maintaining a list of all currently connected devices and allowing the communication between control devices and smart devices.

However, the central controller presents a significant barrier to entry into the smart home market to due their high purchase costs and propietary software. This propietary software is required to control and maintain smart devices developed by the manufacturer and is incompatible with competitor's devices.

## Project Goals

The goal of this project is to implement a completed solution that could be adopted by smart device manufacturers and replace their existing systems. This will allow for the removal of the central controller and additionally allow for greater interoperability between home automation and smart devices from competing manufacturers as all devices will comply with the protocol.

## What Is It?

This project serves as a reference implementation of Steane's protocols. The project includes libraries on Android and iOS platforms that can be used to create native mobile applications that are compliant with the protocol specifications and will work with compliant devices. It also includes a complete cross-platform desktop application built with Electron that can be installed and used on Windows, Linux and macOS to control devices without any programming or setup required. 

Lastly, the project contains a reference device implementation for the ESP8266-12 module that can be used to aid in the development of the mobile applications or as a starting point for a completed smart device.

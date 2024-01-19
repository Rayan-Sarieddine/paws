I. Objective of the experiment
The objective of this experiment is to build a pet tracker that locates the pet's location through gps coordinates and sends the Longitude and Latitude to the backend to be stored in the database table "trackers"

II. Equipment used with role of each:
-Esp8266: is a low-cost Wi-Fi microchip, with built-in TCP/IP networking software, and microcontroller capability
-Neo-6M-GPS module: is a well-performing complete GPS receiver with a built-in 25 x 25 x 4mm ceramic antenna, which provides a strong satellite search capability. With the power and signal indicators, you can monitor the status of the module.
-Breadboard: used for prototyping and building circuits on it.
-Wires: used to set up and configure printed circuit boards.
-USB Wire: used to power the board and upload the program via a Micro USB port.
-Arduino Software (IDE): The Arduino Integrated Development Environment contains a text editor for writing code, a message area, a text console, a toolbar with buttons for common functions and a series of menus. It connects to the Arduino hardware to upload programs and communicate with them.

III. Procedure:
1-Attach the ESP8266 and the GPS module to the breadboard. Carefully insert the pins of the ESP8266 and the Neo-6M-GPS module into separate rows on the breadboard, ensuring that each pin has a firm and secure connection. This setup allows for an organized and modular approach to building the circuit.
2-Connect the D1 and D2 pins of the ESP8266 to the Tx (Transmit) and Rx (Receive) pins of the GPS module respectively. This establishes a serial communication link between the ESP8266 and the GPS module, allowing data to be transferred between the two. The D1 pin of the ESP8266 should be connected to the Rx pin of the GPS module, and the D2 pin of the ESP8266 should be connected to the Tx pin of the GPS module.
3-Connect the VCC (Voltage Common Collector) pin and the GND (Ground) pin of the GPS module to the 3.3V pin and the GND pin of the ESP8266 respectively. This step is crucial for powering the GPS module; the VCC pin supplies the necessary voltage to the GPS module, while the GND pin provides a common ground reference.
4-Connect the ESP8266 to the computer via the USB wire. Insert the micro USB end of the wire into the ESP8266 and the other end into the computer's USB port. This connection not only powers the ESP8266 board but also allows for the uploading of code from the computer to the microcontroller.
5-With all hardware components properly connected, the final step is to upload and execute the software code on the ESP8266.

IV. Code Files:
The project utilizes two distinct code files, each serving a specific purpose in the overall operation of the pet tracker system:

1-live_data_sender.ino: This is the primary code file that plays a crucial role in the system. Its main function is to gather live GPS data from the GPS module. Once the data is obtained, the code processes it and subsequently transmits it through the ESP8266's Wi-Fi capability. The destination for this data is a Node.js server API, specifically designed to receive and handle this incoming location data. Essentially, this code bridges the gap between the physical GPS tracking hardware and the digital backend, ensuring real-time tracking of the pet's location.

2-mock_data_sender.ino: This code file is instrumental during the testing and development phases of the project. It is not involved in the actual tracking process but is used to validate the reliability and efficiency of the Wi-Fi connection and the data transmission process to the Node.js server. Instead of using live GPS data, this code generates simulated (mock) GPS data that closely resembles the format and nature of actual data. By sending this mock data, developers can ensure that the system's components, such as the Wi-Fi module and the server's API endpoint, are functioning correctly without the need for real GPS signals. This allows for troubleshooting and fine-tuning of the system in a controlled environment before deploying the actual tracker in real-world scenarios.

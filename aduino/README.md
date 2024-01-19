I. Objective of the experiment
The objective of this experiment is to build a pet tracker that locates the pet's location through gps coordinates and sends the Longitude and Latitude to the backend to be stored in the database table "trackers"

II. Equipment used with role of each:
-Esp8266: is a low-cost Wi-Fi microchip, with built-in TCP/IP networking software, and microcontroller capability
-Neo-6M-GPS module: is a well-performing complete GPS receiver with a built-in 25 x 25 x 4mm ceramic antenna, which provides a strong satellite search capability. With the power and signal indicators, you can monitor the status of the module.
-Breadboard: used for prototyping and building circuits on it.
-Wires: used to set up and configure printed circuit boards.
-USB Wire: used to power the board and upload the program via a Micro USB port.

III. Procedure:

1-Attach the ESP8266 and the GPS module to the breadboard. Carefully insert the pins of the ESP8266 and the Neo-6M-GPS module into separate rows on the breadboard, ensuring that each pin has a firm and secure connection. This setup allows for an organized and modular approach to building the circuit.
2-Connect the D1 and D2 pins of the ESP8266 to the Tx (Transmit) and Rx (Receive) pins of the GPS module respectively. This establishes a serial communication link between the ESP8266 and the GPS module, allowing data to be transferred between the two. The D1 pin of the ESP8266 should be connected to the Rx pin of the GPS module, and the D2 pin of the ESP8266 should be connected to the Tx pin of the GPS module.

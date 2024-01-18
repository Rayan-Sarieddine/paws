#include <ESP8266WiFi.h>       
#include <TinyGPSPlus.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid     = "wifiName";       
const char* password = "wifipassword";   

const char *gpsStream =
 "$GPRMC,045103.000,A,3535.5350,N,3340.2650,E,0.67,161.46,030913,,,A*56\r\n"
  "$GPRMC,045103.000,A,3535.58084,N,3340.28808,E,0.67,161.46,030913,,,A*5F\r\n"
  "$GPRMC,045103.000,A,3535.5194,N,3340.28136,E,0.67,161.46,030913,,,A*63\r\n";

  TinyGPSPlus gps;

  unsigned long lastTime = 0; // Variable to keep track of the last time an item was processed
  int streamIndex = 0;// Index to keep track of the current position in the stream

  void setup() {
Serial.begin(115200);

  }
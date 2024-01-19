#include <ESP8266WiFi.h>       
#include <TinyGPS++.h>
#include <SoftwareSerial.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid     = "Rayan";       
const char* password = "brazillife2";   

TinyGPSPlus gps; // Create a GPS object
SoftwareSerial ss(D1, D2); //define the serial pins of the esp8266

unsigned long lastTime = 0;  // Track the last time data was sent
unsigned long interval = 15000;  // Interval at which to send data (15 seconds)

void setup() {
  Serial.begin(115200);// Setting the serial baud to match the esp8266 baud rate
  delay(5000);// to give the esp8266 processing time
  ss.begin(9600);  // Set baud rate for gps module

  WiFi.begin(ssid, password);  // Connect to Wi-Fi network
  while (WiFi.status() != WL_CONNECTED) { // wait for the Wi-Fi to connect
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
  Serial.println("GPS Tracker Initialized");
}

void loop() {
  unsigned long currentTime = millis(); // Get the current time
  if (currentTime - lastTime >= interval) { // Check if it's time to send data
    while (ss.available() > 0) {
      char c = ss.read();  // Read a char from the GPS
      if (gps.encode(c)) {   // Encode GPS data
        if (gps.location.isValid()) { // Check if location data is valid and get the lat and long
          double latitude = gps.location.lat();
          double longitude = gps.location.lng();

          Serial.print("Latitude: ");
          Serial.println(latitude, 6);
          Serial.print("Longitude: ");
          Serial.println(longitude, 6);
          
          // Send the latitude and longitude to the server
          sendToServer(latitude, longitude);
          lastTime = currentTime;  // Update the last time data was sent
        } else {
          Serial.println("Waiting for valid GPS signal...");
        }
      }
    }
  }
}

void sendToServer(float lat, float lng) {
  if(WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;

    StaticJsonDocument<200> jsonDoc;
    jsonDoc["secret"] = "123";
    jsonDoc["lat"] = lat;
    jsonDoc["long"] = lng;
    String requestBody;
    serializeJson(jsonDoc, requestBody);

    http.begin(client, "http://192.168.0.104:8000/tracker/");  
    http.addHeader("Content-Type", "application/json");
    int httpResponseCode = http.PUT(requestBody);

    if(httpResponseCode > 0) {
      String response = http.getString();
      Serial.println(httpResponseCode);
      Serial.println(response);
    } else {
      Serial.print("Error on sending POST: ");
      Serial.println(httpResponseCode);
    }

    http.end();    // Close the HTTP connection
  } else {
    Serial.println("Error in WiFi connection");
  }
}

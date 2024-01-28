#include <ESP8266WiFi.h>       
#include <TinyGPSPlus.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>


const char* ssid     = "wifiName";       
const char* password = "wifiPass";     

// Stream data that is in the same form as the data sent by the gps module (mock data)
const char *gpsStream =
 "$GPRMC,045103.000,A,3535.5350,N,3340.2650,E,0.67,161.46,030913,,,A*56\r\n"
  "$GPRMC,045103.000,A,3535.58084,N,3340.28808,E,0.67,161.46,030913,,,A*5F\r\n"
  "$GPRMC,045103.000,A,3535.5194,N,3340.28136,E,0.67,161.46,030913,,,A*63\r\n";

TinyGPSPlus gps;
unsigned long lastTime = 0; // Variable to keep track of the last time an item was processed
int streamIndex = 0; // Index to keep track of the current position in the stream
void setup() {
  Serial.begin(115200);
    delay(5000);
    

    WiFi.begin(ssid, password);

   
    while (WiFi.status() != WL_CONNECTED) { // Wait for the wifi to connect
        delay(1000);
     
    }
}

void loop() {
  unsigned long currentTime = millis();
  if (currentTime - lastTime >= 15000) { // Check if 15 seconds have passed
    lastTime = currentTime; // Update the last time an item was processed
    
    // Process one line from the stream
    bool isNewLine = true;
    while (gpsStream[streamIndex] && gpsStream[streamIndex] != '\n') {
        gps.encode(gpsStream[streamIndex]);
        streamIndex++;
        isNewLine = false;
    }

    if (gpsStream[streamIndex] == '\n') { // End of line
        streamIndex++; // Skip the newline character for the next read
        isNewLine = true;
    }

    if (!gpsStream[streamIndex]) {
        // Reset the index if reached the end of the stream
        streamIndex = 0;
    }

    if (isNewLine) {
        displayInfo(); // Display the info after processing a full line
    }
  }
}


void displayInfo() {
    if (gps.location.isValid()) {
        float latitude = gps.location.lat();
        float longitude = gps.location.lng();
        sendToServer(latitude, longitude);
    } else {
        Serial.println(F("Invalid GPS data"));
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


     http.begin(client, "api_url");  
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

    http.end();
  } else {
    Serial.println("Error in wifi connection");
  }
}
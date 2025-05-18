#include <AFMotor.h>

// Motors
AF_DCMotor leftMotor1(3);   // M1
AF_DCMotor leftMotor2(4);   // M2
AF_DCMotor rightMotor1(1);  // M3
AF_DCMotor rightMotor2(2);  // M4

uint8_t currentSpeed = 0;

void setup() {
  Serial.begin(9600);
  Serial.println("Tralala VrumVrumVrum");

  setAllSpeed(currentSpeed);
  stopAll();
  testRun();
}

void loop() {
 
  if (Serial.available()) {
    String command = Serial.readStringUntil('\n');
    command.trim();

    Serial.print("Received: ");
    Serial.println(command);

    if (command == "left") {
      Serial.println("Turning LEFT: L FORWARD, R BACKWARD");
      setAllSpeed(currentSpeed);
      leftMotor1.run(FORWARD);
      leftMotor2.run(FORWARD);
      rightMotor1.run(BACKWARD);
      rightMotor2.run(BACKWARD);
    } else if (command == "right") {
      Serial.println("Turning RIGHT: L BACKWARD, R FORWARD");
      setAllSpeed(currentSpeed);
      leftMotor1.run(BACKWARD);
      leftMotor2.run(BACKWARD);
      rightMotor1.run(FORWARD);
      rightMotor2.run(FORWARD);
    } else if (command == "forward") {
      Serial.println("Moving forward");
      leftMotor1.run(FORWARD);
      leftMotor2.run(FORWARD);
      rightMotor1.run(FORWARD);
      rightMotor2.run(FORWARD);
    } else if (command.toInt() > 0 || command == "0") {
      int val = command.toInt();
      if (val < 50) {
        Serial.println("Speed too low. Stopping all motors.");
        stopAll();
      } else {
        currentSpeed = constrain(val, 0, 255);
        Serial.print("Setting speed to ");
        Serial.println(currentSpeed);
        setAllSpeed(currentSpeed);
      }
    } else if ("stop") {
      Serial.println("Parking just here");
      stopAll();
    } else {
      Serial.println("Unknown command.");
    }
  }
}

void testRun() {
  Serial.println("Running motor test...");
  setAllSpeed(255);
  leftMotor1.run(FORWARD);
  leftMotor2.run(FORWARD);
  rightMotor1.run(FORWARD);
  rightMotor2.run(FORWARD);

  delay(1000);
  stopAll();
  delay(1000);

  Serial.println("Running motor test (right)...");
  leftMotor1.run(BACKWARD);
  leftMotor2.run(BACKWARD);
  rightMotor1.run(FORWARD);
  rightMotor2.run(FORWARD);

  delay(1000);
  stopAll();
  delay(1000);

  Serial.println("Running motor test (left)...");
  leftMotor1.run(FORWARD);
  leftMotor2.run(FORWARD);
  rightMotor1.run(BACKWARD);
  rightMotor2.run(BACKWARD);

  delay(1000);
  stopAll();
}

// Helper to set all motor speeds
void setAllSpeed(uint8_t speed) {
  leftMotor1.setSpeed(speed);
  leftMotor2.setSpeed(speed);
  rightMotor1.setSpeed(speed);
  rightMotor2.setSpeed(speed);
}

// Helper to stop all motors
void stopAll() {
  leftMotor1.run(RELEASE);
  leftMotor2.run(RELEASE);
  rightMotor1.run(RELEASE);
  rightMotor2.run(RELEASE);
}
mateux@bombardino ~/Downloads> curl -X POST -H 'Content-Type: application/json' -d '{"command":"forward"}' http://192.168.227.27:5000/instructions
{
  "command": "forward",
  "message": "Instruction sent"
}
mateux@bombardino ~/Downloads> curl -X POST -H 'Content-Type: application/json' -d '{"speed":125}' http://192.168.227.27:5000/speed
{
  "message": "Speed sent",
  "speed": 125
}
mateux@bombardino ~/Downloads> curl -X POST -H 'Content-Type: application/json' -d '{"speed":100}' http://192.168.227.27:5000/speed
{
  "message": "Speed sent",
  "speed": 100
}
mateux@bombardino ~/Downloads> curl -X POST -H 'Content-Type: application/json' -d '{"command":"stop"}' http://192.168.227.27:5000/instructions
{
  "command": "stop",
  "message": "Instruction sent"
}
mateux@bombardino ~/Downloads> curl -X POST -H 'Content-Type: application/json' -d '{"speed":255}' http://192.168.227.27:5000/speed
{
  "message": "Speed sent",
  "speed": 255
}
mateux@bombardino ~/Downloads> curl -X POST -H 'Content-Type: application/json' -d '{"command":"forward"}' http://192.168.227.27:5000/instructions
{
  "command": "forward",
  "message": "Instruction sent"
}
mateux@bombardino ~/Downloads> curl -X POST -H 'Content-Type: application/json' -d '{"command":"forward"}' http://192.168.227.27:5000/instructions
{
  "command": "forward",
  "message": "Instruction sent"
}
mateux@bombardino ~/Downloads> curl -X POST -H 'Content-Type: application/json' -d '{"command":"stop"}' http://192.168.227.27:5000/instructions
{
  "command": "stop",
  "message": "Instruction sent"
}

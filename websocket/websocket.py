# ! venv\Scripts\activate
import asyncio
import websockets

users = set() 

async def echo(websocket):
  users.add(websocket)
  try:
    while True:
      message = await websocket.recv()
      if(users): 
        websockets.broadcast([u for u in users if u != websocket],message)

  except websockets.exceptions.ConnectionClosed:
    pass
  finally:
    users.remove(websocket)



async def main():
    async with websockets.serve(echo, "localhost", 8765):
        await asyncio.Future()  

asyncio.run(main())
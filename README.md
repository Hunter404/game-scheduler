# Game Scheduler
![Screenshot of the application](https://github.com/Hunter404/game-scheduler/blob/master/example.png)
An attempt to improve the logistics of planning when we should host our game-nights. Very hardcoded for Barotrauma but shouldn't require too much effort to be used for other games :()

## Setup
Build docker container image with
`docker build -t game-scheduler .`

## Usage
1. Goto https://yourserveruri/#/schedule/create
   1. Use slider to configure when the schedule should start and end.
   2. Press Create
2. You're redirected to your created schedule (https://yourserveruri/#/schedule/uniqueId/register), copy the URL and paste it in your Discord channel or transmit it to your fellow cavemen using binary smoke signals.
3. Users should mark every hour they're available with green.
4. Users should now submit their Discord name and Id, hopefully without griefing.
5. User is redirected to the schedule's result screen (https://yourserveruri/#/schedule/uniqueId) where they can see how many are available when (going from green to red)

## Roadmap
  - [ ] Make application configurable for other games.
    - [ ] Fetch memes from service or configurable file.
  - [ ] Add unit tests.

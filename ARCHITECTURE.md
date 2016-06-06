Based on the Clean Architecture by Robert C. Martin
this application has the following layers.

## Entities - Enterprise wide business rules
* Players - linked to User Account, Game History and other entities
* Computers - they are also Players but linked to different entities than Players do
* Games - linked to other entities like Characters, Levels, Rules, etc.
* Devices - like desktop, mobile, tablet

## Use Cases - Application specific business rules, orchestrate the flow of data
* Play a game - Player vs Computer
* Play a game - Computer vs Computer
* Play a different game each time

## Interface Adapters - Glue between Use Cases and Frameworks and Drivers
* Controller (implements the Input boundary) - retrieves data from the Web Framework and passes to the Use Cases
* Gateway (implements the Database boundary) - input and output to and from the Use Cases and the Database
* Presenter (implements the Output boundary) - retrieves data from Use Cases and passes it to the Web Framework

## Frameworks and Drivers
* Web Framework - retrieves events from the user and passes to the Controller, and displays the output from the Presenter
* Database - has all the persistent data we need for both the Use Cases and the Entities

## File structure
### .
* config.js    - Configuration defaults
* index.html   - Main page
* index.js     - Entry point for bundling
* WebApp.js    - Starting point for the Web Application

### app/
* App.js       - Entry point for the Application
* Game.js      - Game Entity
* Players.js   - Entities: Players and Computers

### app/lib/
* PubSub.js - Publish-Subscribe system, this represents the Boundary

### data/
* "Database"

### gateway/
* Database Gateway

### lib/
* common lib utils for both the App and the Web UI

### webui/
* Web.js - Entry point for the Web UI
* .* - components' Presenter and View
Due to the small size of the components I chose to have the
Presenter and the View in the same file in the render method
for each components respectively.

### webui/lib
* domHelper.js - dom manipulations
* Render.js - a helper function for the Presenter writes to the DOM

### webui/styles/
* components.css  - component specific styles
* index.css       - entry point
* main.css        - generic styles
* media-*.css     - device specific styles
* media-sizes.css - device specific sizes
* transitions.css - css3 transitions for navigation
* variables.css   - main color, text and size variables



## Plugin Model Diagram
```
              ┌───────────┐
        UI ──▷│           │
              │ Use Cases │
 Framework ──▷│           │
              └───────────┘
                    ∆
                    |
                 Database
```

## Dependency Diagram
```
  W E B      :               A P P L I C A T I O N
             :
             :
             :
       ┌───────▷ Request model
       │     :      ∆            ┌──────────┐
       │     :      │  <I>       │          ├─▷ Entity ◁─┐
  Controller───▷ Boundary ◀──────┤          │            │
             :         <I>       │Interactor├─▷ Entity ◁─┤
  Presenter ───▷ Boundary ◀──────┤          │            │
   │   │     :      │            │          ├─▷ Entity ◁─┤
   │   │     :      ∇            └─────┬────┘            │
   │   └───────▷ Response model        │                 │
   ∇         :                         ∇    <I>          │
  View       :                   Entity Gateway          │
             :                     Interface             │
             :                         ∆                 │
             :.........................│.................│...
             :                         │                 │
             :                   Entity Gateway Implementation
             :                         │  (eg.: ORM)
             :                         │
             :                         ∇
             :                     Database API
```

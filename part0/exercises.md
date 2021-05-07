# 0.1: HTML

Read

# 0.2: CSS

Read

# 0.3: HTML forms

Read

# 0.4: new note

```
The user starts typing:
- The input field updates with the typed text

The user clicks the save button
- With the text as the form data, the browser makes a POST request to: /new_note

On the server:
- The form data that was sent is added to the list of notes.
- A status code of 302 is sent redirecting the client to /notes (a page reload on the client)

On the client:
- The browser fetches /favicon.ico, /main.css, and /main.js
- The browser starts executing the JS
- The browser fetches the updated list of notes in JSON format using a GET request from /data.json
- The updated notes are rendered in an unordered list
```

# 0.5: Single page app

```
On the client:
- The browser fetches /spa
- The browser fetches /main.css, /favicon.ico, and /spa.js
- The browser starts executing the JS
- The browser fetches the list of notes in JSON format using a GET request from /data.json
- The notes are rendered in an unordered list 
```

# 0.6: New note

```
The user starts typing:
- The input field updates with the typed text

The user clicks the save button
- Using a JS callback, the browser sends a POST request to /new_note_spa with a JSON object containing the new note's text and a timestamp.

On the server:
- The JSON payload is added to the list of notes.
- The server returns the updated JSON of the new list with a status code of 201

On the client:
- The client re-renders the list using JS without reloading the page
```

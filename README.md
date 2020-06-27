# one-button-tracker for _Puck.js_

The [_Puck.js_]() is a bluetooth beacon that's fully open source and can be programmed wirelessly using JavaScript. It comes with a ton of sensors (light, temperature, accelerometer, gyroscope, magnetometer) but more importantly: 

__It comes with a button__!

[This little website sets up the _Puck.js_ as a one-button tracker](https://tzovar.as/one-button-tracker), allowing you to track events when they happen. When you press the button the Puck will record these two things: 
- when you pressed the button
- for how long you pressed the button

Along with this it will also record some additional data which can be useful to rule out accidental button presses: 
- the current temperature (in ºC)
- the light reading (between 0-1)
- the accelerometer data (X/Y/Z coordinates)

This should allow for cleaning the data (e.g. if you accidentally pressed the button a ton of times while the _Puck.js_ was in your pocket). 

## Give it a try

- Go to https://tzovar.as/one-button-tracker in Chrome or Opera
- Press _install_ & select your _Puck.js_ from the connection popup
- You're done, you can now press the button
- Click _Download_ on the same page and it will download your CSV
- Click _Erase_ to remove an old recording file and start anew

## Example output

The resulting CSV you can download looks like this: 

```
#timestamp,left_empty,press_duration,temperature,light_level,x,y,z
1593285345.97545909881,-,0.66439819335,28.25,0.08263826370,-1553,6295,5529
1593285347.58358287811,-,0.68038940429,28.25,0.08237202962,-913,5278,5842
1593285349.11309337615,-,0.734375,28.25,0.08051554361,-677,4908,6672
1593285349.55758190155,-,0.14196777343,28.25,0.08287429809,-188,5605,5494
1593285349.77837657928,-,0.09814453125,28.25,0.07405344645,-526,5071,6381
1593285349.93651866912,-,0.07424926757,28.25,0.07080157597,-216,5056,6867
1593285350.08541393280,-,0.08676147460,28.25,0.07410049438,189,4421,7907;
```


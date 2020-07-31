var BANGLE_CODE = `
var light;
var temperature;
var accel;
var t;
setWatch(function(e) {
  digitalWrite(LED2,0);
  var duration = e.time - e.lastTime;
  t = new Date(e.time*1000);
  light = Puck.light();
  temperature = Puck.getTemperature();
  accel = Puck.accel().acc;
  recFile = require("Storage").open("button_presses.csv","a");
  recFile.write([t,'-',duration,temperature,light,accel.x,accel.y,accel.z].join(",")+';');
}, BTN, {edge:"falling", debounce:50, repeat:true});


setWatch(function(e) {
  digitalWrite(LED2,1);
}, BTN, {edge:"rising", debounce:200, repeat:true});\n
`;

// When we click the connect button...
document.getElementById("btnConnect").addEventListener("click", function() {
  $("#pb_div").show();
  Puck.write('reset();',function(){
    $("#progress_bar").removeClass('bg-success');
    Puck.setTime();
    Puck.write(BANGLE_CODE, function(){
    console.log('connected and installed 1button');
    $("#pb_div").hide();
    });
  });
})

function saveCSV(filename, csvData) {
  let a = document.createElement("a"),
    file = new Blob([csvData], {type: "Comma-separated value file"});
  let url = URL.createObjectURL(file);
  a.href = url;
  a.download = filename+".csv";
  document.body.appendChild(a);
  a.click();
  setTimeout(function() {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
  $("#pb_div").hide();
  console.log('finished download')
}

function saveButtonRecord(record,name) {
  var csv = `${record.map(rec=>[rec.time, rec.free,rec.duration,rec.temperature,rec.light,rec.x,rec.y,rec.z].join(",")).join("\n")}`;
  csv = csv + "\n";
  console.log(csv);
  saveCSV(name, csv);
};

function ButtonRecordLineToObject(l) {
  var t = l.trim().split(",");
  var o = {
    time: t[0],
    free: t[1],
    duration: parseFloat(t[2]),
    temperature: parseFloat(t[3]),
    light: parseFloat(t[4]),
    x: parseFloat(t[5]),
    y: parseFloat(t[6]),
    z: parseFloat(t[7]),
  };
  return o;
};

function downloadButtonPresses(callback) {
  var flength;
  var record;
  Puck.eval('require("Storage").open("button_presses.csv","r").getLength()',function(x){
    flength=x;
    Puck.eval('require("Storage").open("button_presses.csv","r").read('+flength+')',function(data){
      record = data.slice(0, -1).split(";").map(l=>ButtonRecordLineToObject(l));
      callback(record);
    })
  });
}

function deleteButtonPresses(callback) {
  Puck.eval('require("Storage").open("button_presses.csv","r").erase()',function(x){
    console.log('deleted storage');
  });
}

document.getElementById("btnDownload").addEventListener("click", function() {
  console.log('start download');
  $("#pb_div").show();
});

document.getElementById("btnDownload").addEventListener("click", function() {
  downloadButtonPresses(record => saveButtonRecord(record, `button_presses`));
});

document.getElementById("btnErase").addEventListener("click", function() {
  if (confirm("Are you sure? This will delete all of your button presses!")) {
      deleteButtonPresses();
  }
});

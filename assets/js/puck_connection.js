var BANGLE_CODE = `
setWatch(function(e) {
  digitalWrite(LED2,0);
  var duration = e.time - e.lastTime;
  recFile = require("Storage").open("button_presses.csv","a");
  recFile.write([e.time,'-',duration].join(",")+';');
}, BTN, {edge:"falling", debounce:50, repeat:true});


setWatch(function(e) {
  digitalWrite(LED2,1);
}, BTN, {edge:"rising", debounce:50, repeat:true});\n
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
  var csv = `${record.map(rec=>[rec.time, rec.free,rec.duration].join(",")).join("\n")}`;
  console.log(csv);
  saveCSV(name, csv);
};

function ButtonRecordLineToObject(l) {
  var t = l.trim().split(",");
  var o = {
    time: parseFloat(t[0]),
    free: t[1],
    duration: parseFloat(t[2]),
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

document.getElementById("btnDownload").addEventListener("click", function() {
  console.log('start download');
  $("#pb_div").show();
});

document.getElementById("btnDownload").addEventListener("click", function() {
  downloadButtonPresses(record => saveButtonRecord(record, `button_presses`));
});
